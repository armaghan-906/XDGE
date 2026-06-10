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

  const replaceMap = {
    "'#3a3c3e'": "theme.subtitle",
    "'#5b5c5a'": "theme.subtitle",
    "'rgba(0,0,0,0.18)'": "'rgba(255,255,255,0.18)'",
    "'rgba(0,0,0,0.1)'": "'rgba(255,255,255,0.1)'",
    "'rgba(0,0,0,0.05)'": "'rgba(255,255,255,0.05)'",
    "'rgba(0, 0, 0, 0.18)'": "'rgba(255, 255, 255, 0.18)'",
    "'rgba(255,255,255,0.35)'": "'rgba(255,255,255,0.08)'",
    "background: '#f3f3f1'": "background: '#0e0e0e'",
    "background: '#000000'": "background: theme.dark",
    "background: '#fff'": "background: '#0e0e0e'"
  };

  for (const [key, value] of Object.entries(replaceMap)) {
    if (content.includes(key)) {
      content = content.split(key).join(value);
      changed = true;
    }
  }

  // Handle case where theme.subtitle is injected but not imported? 
  // Actually all components using these probably already import theme.
  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  }
});
