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
    "'#5a5b58'": "theme.subtitle",
    "'#7d7e7c'": "theme.subtitle",
    "'#8a8a87'": "theme.subtitle",
  };

  for (const [key, value] of Object.entries(replaceMap)) {
    if (content.includes(key)) {
      content = content.split(key).join(value);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  }
});
