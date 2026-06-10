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

      // Find any fontSize clamp that has a max pixel size > 80px
      content = content.replace(/fontSize:\s*'clamp\(\s*([\d.]+)px\s*,\s*([\d.]+)vw\s*,\s*([\d.]+)px\s*\)'/g, (match, minStr, vwStr, maxStr) => {
        let min = parseFloat(minStr);
        let vw = parseFloat(vwStr);
        let max = parseFloat(maxStr);
        
        // If it's a huge heading (max > 80)
        if (max > 80) {
          // Cap the minimum at 36px unless it was already smaller
          let newMin = Math.min(min, 36);
          // Cap vw at 5vw for elegance
          let newVw = Math.min(vw, 5.5).toFixed(1).replace(/\.0$/, '');
          // Cap max at 96px (except for the absolute main Hero "XDGE" title which we can leave a bit bigger if we want, but let's just cap everything to 120 absolute max, and scale down)
          let newMax = Math.round(max * 0.6); // aggressively shrink by 40%
          if (newMax > 120) newMax = 120; // Hard cap at 120px for the biggest ones
          if (newMax < 64) newMax = 64; // Don't make them too small

          changed = true;
          return `fontSize: 'clamp(${newMin}px, ${newVw}vw, ${newMax}px)'`;
        }
        return match;
      });

      if (changed && content !== fs.readFileSync(fullPath, 'utf8')) {
        fs.writeFileSync(fullPath, content);
        console.log(`Shrunk headings in ${fullPath}`);
      }
    }
  }
}

processDir('src/components');
processDir('src/pages');
