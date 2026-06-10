const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      // 1. Remove hardcoded Inter
      const inter1 = /['"]Inter['"], ['"]Inter Display['"], ['"]Inter Placeholder['"], sans-serif/g;
      if (inter1.test(content)) {
        content = content.replace(inter1, 'theme.body');
        changed = true;
      }
      const inter2 = /['"]Inter['"], ['"]Inter Display['"], sans-serif/g;
      if (inter2.test(content)) {
        content = content.replace(inter2, 'theme.body');
        changed = true;
      }
      const inter3 = /fontFamily:\s*['"]Inter['"], ['"]Inter Display['"], sans-serif/g;
      if (inter3.test(content)) {
        content = content.replace(inter3, 'fontFamily: theme.body');
        changed = true;
      }

      // 2. ONLY adjust fontSize clamps that are extremely large (vw >= 12)
      content = content.replace(/fontSize:\s*'clamp\(\s*([\d.]+)px\s*,\s*([\d.]+)vw\s*,\s*([\d.]+)px\s*\)'/g, (match, min, vw, max) => {
        let v = parseFloat(vw);
        let m = parseFloat(max);
        
        // Only target massive hero fonts to prevent Syne overflow
        if (v >= 12) {
          let newVw = (v * 0.75).toFixed(1).replace(/\.0$/, '');
          let newMax = Math.round(m * 0.8);
          changed = true;
          return `fontSize: 'clamp(${min}px, ${newVw}vw, ${newMax}px)'`;
        }
        return match;
      });

      if (changed && content !== fs.readFileSync(fullPath, 'utf8')) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated fonts in ${fullPath}`);
      }
    }
  }
}

processDir('src/components');
processDir('src/pages');
