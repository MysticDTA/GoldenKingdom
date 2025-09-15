const fs = require('fs');
const path = require('path');

// Replace with your Netlify site URL
const siteURL = 'https://yoursite.netlify.app/';

// Recursively collect all .svg files from a folder
function getSVGFiles(dir, base = '') {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of list) {
    const fullPath = path.join(dir, item.name);
    const relativePath = path.join(base, item.name).replace(/\\/g, '/');
    if (item.isDirectory()) {
      results = results.concat(getSVGFiles(fullPath, relativePath));
    } else if (item.isFile() && item.name.endsWith('.svg')) {
      results.push(relativePath);
    }
  }
  return results;
}

// Scan root + assets/logos
const svgFiles = getSVGFiles('.', '').filter(f => f.endsWith('.svg'));

console.log(`Found ${svgFiles.length} SVGs to check on ${siteURL}\n`);

(async () => {
  for (const file of svgFiles) {
    const url = siteURL + file.replace(/^\.\//, ''); // remove leading ./
    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (res.ok) {
        console.log(`✅ ${file} -> ${res.status} OK`);
      } else {
        console.log(`❌ ${file} -> ${res.status} ${res.statusText}`);
      }
    } catch (err) {
      console.log(`❌ ${file} -> ERROR: ${err.message}`);
    }
  }
})();
