import fs from 'fs';
import path from 'path';

const dir = '/Users/mac/Downloads/new/xdge-app/src/components/sections';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  content = content.replace(/clamp\(120px, 15vw, 240px\)/g, 'clamp(180px, 22vw, 320px)');
  content = content.replace(/clamp\(120px, 18vw, 240px\)/g, 'clamp(180px, 22vw, 320px)');
  content = content.replace(/clamp\(64px, 7\.5vw, 96px\)/g, 'clamp(180px, 22vw, 320px)');
  content = content.replace(/clamp\(56px, 6vw, 80px\)/g, 'clamp(180px, 22vw, 320px)');
  content = content.replace(/clamp\(72px, 11vw, 140px\)/g, 'clamp(180px, 22vw, 320px)');
  content = content.replace(/clamp\(80px, 10vw, 120px\)/g, 'clamp(160px, 18vw, 240px)');
  
  // Update Hero bottom paddings if they use 140px
  // Actually, hero top padding is fine, but bottom might need more spacing.
  
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log('Updated ' + file);
  }
});
