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

const files = walk('./src/components');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // We want to replace <div variants= with <motion.div variants=
  // and </div> with </motion.div> IF we replaced <div variants= ...
  // Actually, since this is React JSX, replacing all </div> with </motion.div> might break things if they weren't opened as motion.div.
  // The simplest reliable regex for this specific codebase:
  
  const tagsToFix = ['div', 'p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'article', 'button', 'img'];
  let fileChanged = false;

  tagsToFix.forEach(tag => {
    // Find all tags that have animation props
    const openTagRegex = new RegExp(`<${tag}(\\s+[^>]*?(?:variants|initial|whileInView|animate|whileHover|whileTap)=)`, 'g');
    if (openTagRegex.test(content)) {
      // First, we replace the opening tag
      content = content.replace(openTagRegex, `<motion.${tag}$1`);
      
      // Now we have to fix the closing tags.
      // Wait! If we have nested tags or multiple tags, doing this perfectly with Regex is impossible.
      // But in this specific codebase, usually `variants={fadeUp}` is used on simple wrapper divs.
      // Let's do a naive replace of closing tags but ONLY if there's an opening motion tag.
      // Actually, if we change the open tag to motion.tag, we MUST change the corresponding close tag.
      // This is risky with regex. 
    }
  });

  if (content !== originalContent) {
    console.log("Found motion props in", file, "- but regex replacement of closing tags is unsafe. Will do manual replacements or use an AST transformer.");
  }
});
