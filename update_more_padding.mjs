import fs from 'fs';
import path from 'path';

const dir = '/Users/mac/Downloads/new/xdge-app/src/components/sections';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  // ProgrammesHero, ExperienceHero, CohortsHero, OutcomesHero, ApplyHero uses:
  // padding: 'clamp(96px, 12vw, 140px) clamp(20px, 4vw, 56px) clamp(40px, 6vw, 64px)'
  content = content.replace(/clamp\(96px, 12vw, 140px\) clamp\(20px, 4vw, 56px\) clamp\(40px, 6vw, 64px\)/g, "clamp(96px, 12vw, 140px) clamp(20px, 4vw, 56px) clamp(160px, 18vw, 240px)");
  
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log('Updated ' + file);
  }
});
