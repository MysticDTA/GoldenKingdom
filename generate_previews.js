const fs = require('fs');
const path = require('path');

// Folders to scan
const rootDir = __dirname;
const logosDir = path.join(__dirname, 'assets/logos');

// Main SVGs in root
const mainSvgs = ['logo-primary.svg', 'crest-monochrome.svg'];

// Get all SVGs in assets/logos
const assetSvgs = fs.existsSync(logosDir)
  ? fs.readdirSync(logosDir).filter(f => f.endsWith('.svg'))
  : [];

// Start building HTML
let html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>DivineTruthAscension Logo Previews</title>
<style>
body { font-family: sans-serif; padding: 2rem; background: #111; color: #fff; }
h1 { margin-bottom: 1rem; }
img { max-width: 300px; margin: 1rem; border: 2px solid #ffd36b; border-radius: 8px; }
.logo-container { display: flex; flex-wrap: wrap; }
</style>
</head>
<body>
<h1>DivineTruthAscension Logo Previews</h1>

<h2>Main Crests</h2>
<div class="logo-container">
`;

mainSvgs.forEach(file => {
  if (fs.existsSync(path.join(rootDir, file))) {
    html += `<img src="${file}" alt="${file}">\n`;
  }
});

html += `</div>\n<h2>Assets Logos</h2>\n<div class="logo-container">\n`;

assetSvgs.forEach(file => {
  html += `<img src="assets/logos/${file}" alt="${file}">\n`;
});

html += `</div>\n</body>\n</html>`;

// Write previews.html
fs.writeFileSync(path.join(rootDir, 'previews.html'), html);
console.log('previews.html generated successfully!');
