const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.jsx') || file.endsWith('.js')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Replace data-section-theme="light" with "dark"
  if (content.includes('data-section-theme="light"')) {
    content = content.replace(/data-section-theme="light"/g, 'data-section-theme="dark"');
    changed = true;
  }
  
  // Replace background: theme.base with background: theme.dark
  if (content.includes('background: theme.base')) {
    content = content.replace(/background:\s*theme\.base/g, 'background: theme.dark');
    changed = true;
  }
  
  // Replace color: theme.ink with color: theme.base
  if (content.includes('color: theme.ink')) {
    content = content.replace(/color:\s*theme\.ink/g, 'color: theme.base');
    changed = true;
  }
  
  // Also fix theme.ink used in borders or other places if needed, but maybe leave them or change to theme.base
  // e.g., borderColor: theme.ink -> borderColor: theme.base
  if (content.includes('borderColor: theme.ink')) {
    content = content.replace(/borderColor:\s*theme\.ink/g, 'borderColor: theme.base');
    changed = true;
  }

  // Also fix border: `... theme.ink` -> `... theme.base` or borderLight -> borderDark?
  
  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  }
});
