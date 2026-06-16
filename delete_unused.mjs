import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, 'src');
const publicDir = path.join(__dirname, 'public');

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

const srcContents = allSrcFiles.map(f => fs.readFileSync(f, 'utf-8')).join('\n');

for (const video of allVideoFiles) {
  const baseName = path.basename(video);
  if (!srcContents.includes(baseName)) {
    unusedVideos.push(video);
  }
}

for (const img of allImageFiles) {
  const baseName = path.basename(img);
  if (!srcContents.includes(baseName) && !fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8').includes(baseName)) {
    unusedImages.push(img);
  }
}

for (const comp of allComponents) {
  const baseName = path.basename(comp, path.extname(comp));
  const regex = new RegExp(`\\b${baseName}\\b`, 'g');
  const matches = srcContents.match(regex);
  if (!srcContents.includes(`/${baseName}`) && (!matches || matches.length <= 1)) {
    if (baseName !== 'index' && baseName !== 'main') {
        unusedComponents.push(comp);
    }
  }
}

console.log(`Deleting ${unusedVideos.length} unused videos...`);
unusedVideos.forEach(v => fs.unlinkSync(v));

console.log(`Deleting ${unusedImages.length} unused images...`);
unusedImages.forEach(i => fs.unlinkSync(i));

console.log(`Deleting ${unusedComponents.length} unused components...`);
unusedComponents.forEach(c => fs.unlinkSync(c));

console.log('Cleanup complete!');
