import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch'; // make sure npm install node-fetch

// ------------------- Config -------------------
const siteURL = 'https://yoursite.netlify.app/'; // Replace with your Netlify URL
const projectRoot = '.'; // relative to this script

// ------------------- Helper: recursively find all SVGs -------------------
function findSVGs(dir) {
  let results = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      results = results.concat(findSVGs(fullPath));
    } else if (item.isFile() && item.name.endsWith('.svg')) {
      results.push(fullPath.replace(/\\/g, '/')); // normalize path for URLs
    }
  }
  return results;
}

// ------------------- Detect all SVG files -------------------
const svgFiles = findSVGs(projectRoot);
if (svgFiles.length === 0) {
  console.error('🚨 No SVG files found!');
  process.exit(1);
}

// ------------------- Generate previews.html -------------------
const previewsHTML = `
<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>DivineTruthAscension Crest Previews</title>
  <style>
    body { font-family: Arial, sans-serif; background: #111; color: #fff; padding: 20px; }
    img { width: 200px; margin: 10px; border: 2px solid #fff; }
    div.logo { display: inline-block; text-align: center; margin: 10px; }
  </style>
</head>
<body>
  <h1>DivineTruthAscension Crest Previews</h1>
  ${svgFiles.map(f => `<div class="logo"><strong>${f}</strong><br/><img src="${f}" alt="${f}"/></div>`).join('\n')}
</body>
</html>
`;

fs.writeFileSync('previews.html', previewsHTML);
console.log('✅ previews.html generated with', svgFiles.length, 'logos.');

// ------------------- Verify logos on deployed site -------------------
(async () => {
  let hasMissing = false;
  console.log(`\nChecking ${svgFiles.length} logos on ${siteURL} ...\n`);

  for (const file of svgFiles) {
    const url = siteURL + file;
    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (res.ok) {
        console.log(`✅ ${file} -> ${res.status} OK`);
      } else {
        console.log(`❌ ${file} -> ${res.status} ${res.statusText}`);
        hasMissing = true;
      }
    } catch (err) {
      console.log(`❌ ${file} -> ERROR: ${err.message}`);
      hasMissing = true;
    }
  }

  if (hasMissing) {
    console.error('\n🚨 Some logos are missing! Build will fail.\n');
    process.exit(1);
  } else {
    console.log('\n✅ All logos are present. Build succeeded.\n');
  }
})();
