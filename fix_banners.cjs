const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(dirPath);
  });
}

walk(srcDir, (filePath) => {
  if (filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let changed = false;

    // Remove <div className="xg-stick-wrap"> and its closing tag
    if (content.includes('xg-stick-wrap')) {
      content = content.replace(/<div\s+className="xg-stick-wrap"\s*>/g, '');
      // Since it's a wrapper, we need to remove the matching </div>. 
      // To be safe and simple, we can just use regex if the structure is strictly known, 
      // but actually it's easier to just remove `<div className="xg-stick-wrap">` and then we have extra `</div>`s.
      // Wait, let's write a smarter replace for pages:
      content = content.replace(/<div className="xg-stick-wrap">\s*([\s\S]*?)\s*<\/div>/g, '$1');
      changed = true;
    }

    // Remove className="xg-stick-pin" and className="xg-stick-pin xg-stick-pin--natural"
    if (content.includes('xg-stick-pin')) {
      content = content.replace(/className="xg-stick-pin xg-stick-pin--natural"/g, '');
      content = content.replace(/className="xg-stick-pin"/g, '');
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log('Fixed', filePath);
    }
  }
});
