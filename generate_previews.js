const fs = require('fs');
const path = require('path');

const logosDir = path.join(__dirname, 'assets/logos');
const mainCrests = ['logo-primary.svg', 'crest-monochrome.svg'];

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

mainCrests.forEach(file => {
  html += `<img src="${file}" alt="${file}">\n`;
});

html += `</div>\n<h2>Assets Logos</h2>\n<div class="logo-container">\n`;

// Read all SVG files in assets/logos
fs.readdirSync(logosDir).forEach(file => {
  if (file.endsWith('.svg')) {
    html += `<img src="assets/logos/${file}" alt="${file}">\n`;
  }
});

html += `</div>\n</body>\n</html>`;

// Write to previews.html
fs.writeFileSync('previews.html', html);
console.log('previews.html generated successfully!');
