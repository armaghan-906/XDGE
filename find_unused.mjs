import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, 'src');
const publicDir = path.join(__dirname, 'public');

// Recursively get all files in a directory
function getAllFiles(dir, extArray = null, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, extArray, fileList);
    } else {
      if (!extArray || extArray.some(ext => file.endsWith(ext))) {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
}

const allSrcFiles = getAllFiles(srcDir, ['.js', '.jsx', '.css']);
const allVideoFiles = getAllFiles(path.join(publicDir, 'assets', 'videos'), ['.mp4', '.webm']);
const allImageFiles = getAllFiles(path.join(publicDir, 'assets'), ['.jpg', '.jpeg', '.png', '.webp', '.svg']);
const allComponents = getAllFiles(path.join(srcDir, 'components'), ['.jsx', '.js']);

const unusedVideos = [];
const unusedImages = [];
const unusedComponents = [];

// Get all contents of src files to search within
const srcContents = allSrcFiles.map(f => fs.readFileSync(f, 'utf-8')).join('\n');

for (const video of allVideoFiles) {
  const baseName = path.basename(video);
  if (!srcContents.includes(baseName)) {
    unusedVideos.push(video);
  }
}

for (const img of allImageFiles) {
  const baseName = path.basename(img);
  // Exception for vite.svg or things like that
  if (!srcContents.includes(baseName) && !fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8').includes(baseName)) {
    unusedImages.push(img);
  }
}

for (const comp of allComponents) {
  const baseName = path.basename(comp, path.extname(comp));
  // Count occurrences of the component name
  const regex = new RegExp(`\\b${baseName}\\b`, 'g');
  const matches = srcContents.match(regex);
  // It will match at least once (its own definition). If it's <= 1, it's unused.
  // We should also check for its file name import
  if (!srcContents.includes(`/${baseName}`) && (!matches || matches.length <= 1)) {
    // some index.js or similar might be false positives
    if (baseName !== 'index' && baseName !== 'main') {
        unusedComponents.push(comp);
    }
  }
}

console.log('--- Unused Videos ---');
unusedVideos.forEach(v => console.log(path.relative(__dirname, v)));
console.log('\n--- Unused Images ---');
unusedImages.forEach(i => console.log(path.relative(__dirname, i)));
console.log('\n--- Unused Components ---');
unusedComponents.forEach(c => console.log(path.relative(__dirname, c)));
