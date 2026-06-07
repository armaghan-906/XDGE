import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src/components/sections').filter(f => f.includes('Banner'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (content.includes('<img') && content.includes('initial=')) {
    content = content.replace(/<img/g, '<motion.img');
    changed = true;
  }

  if (changed) {
    if (!content.includes('import { motion }')) {
      content = "import { motion } from 'framer-motion';\n" + content;
    }
    fs.writeFileSync(file, content);
    console.log('Fixed:', file);
  }
});
