const fs = require('fs');
const path = require('path');

const sectionsDir = path.join(__dirname, 'src', 'components', 'sections');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Regex to find clamp(min, mid, max) or just pixel values in font sizes
  // Example: fontSize: 'clamp(45px, 7.5vw, 135px)'
  // We want to target fontSize for headings (often near fontFamily: theme.display)
  
  // We will look for clamp expressions globally and scale them by 1.25
  // But ONLY for headings? The user said "heading need to be 25% larger"
  // Usually they are near <h1, <h2, <h3, <SplitHeading
  
  const regex = /fontSize:\s*['"]clamp\(([^,]+),\s*([^,]+),\s*([^)]+)\)['"]/g;
  
  content = content.replace(regex, (match, minStr, midStr, maxStr) => {
    // Only scale if it's a large heading (e.g., max > 40px)
    let min = parseFloat(minStr);
    let mid = parseFloat(midStr);
    let max = parseFloat(maxStr);
    
    // Check if max is substantial enough to be a heading (e.g. > 30px)
    if (max > 30) {
      changed = true;
      let newMin = (min * 0.8).toFixed(1).replace('.0', '') + (minStr.includes('px') ? 'px' : minStr.replace(/[\d.]/g, ''));
      let newMid = (mid * 0.8).toFixed(1).replace('.0', '') + (midStr.includes('vw') ? 'vw' : midStr.replace(/[\d.]/g, ''));
      let newMax = (max * 0.8).toFixed(1).replace('.0', '') + (maxStr.includes('px') ? 'px' : maxStr.replace(/[\d.]/g, ''));
      return `fontSize: 'clamp(${newMin}, ${newMid}, ${newMax})'`;
    }
    return match;
  });

  // Also catch simple pixel values like fontSize: 40
  // Note: we're only going to target elements that look like headings
  // It's safer to just do the clamp scaling for now since most headings use clamp.
  
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${path.basename(filePath)}`);
  }
}

function walk(dir) {
  const list = fs.readdirSync(dir);
  for (let file of list) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      walk(file);
    } else if (file.endsWith('.jsx')) {
      processFile(file);
    }
  }
}

walk(sectionsDir);
