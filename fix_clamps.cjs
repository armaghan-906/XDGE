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

      // Adjust huge clamps for font sizes: clamp(Xpx, Yvw, Zpx)
      content = content.replace(/clamp\(\s*([\d.]+)px\s*,\s*([\d.]+)vw\s*,\s*([\d.]+)px\s*\)/g, (match, min, vw, max) => {
        let v = parseFloat(vw);
        let m = parseFloat(max);
        
        // Only scale down large display text
        if (v > 6 || m > 120) {
          let newVw = (v * 0.75).toFixed(1).replace(/\.0$/, '');
          let newMax = Math.round(m * 0.8);
          changed = true;
          return `clamp(${min}px, ${newVw}vw, ${newMax}px)`;
        }
        return match;
      });

      // Relax line heights for paragraphs
      // Outfit looks better with higher line heights.
      content = content.replace(/lineHeight:\s*1\.2(?!5|\d)/g, 'lineHeight: 1.35');
      content = content.replace(/lineHeight:\s*1\.3(?!5|\d)/g, 'lineHeight: 1.4');
      content = content.replace(/lineHeight:\s*1\.4(?!5|\d)/g, 'lineHeight: 1.5');
      
      // Slightly widen max-widths that use 'ch' because Syne/Outfit are geometric
      content = content.replace(/maxWidth:\s*'(\d+)ch'/g, (match, ch) => {
        let val = parseInt(ch, 10);
        if (val < 60) {
          return `maxWidth: '${Math.round(val * 1.15)}ch'`;
        }
        return match;
      });

      if (changed && content !== fs.readFileSync(fullPath, 'utf8')) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDir('src/components');
processDir('src/pages');
