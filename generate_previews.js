const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch'); // Make sure node-fetch is installed

// ------------------- Config -------------------
const siteURL = 'https://yoursite.netlify.app/'; // Replace with your Netlify URL

// List all logos relative to project root
const svgFiles = [
  'logo-primary.svg',
  'crest-monochrome.svg',
  'assets/logos/logo-monochrome.svg',
  'assets/logos/logo-variantB.svg'
];

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
  </style>
</head>
<body>
  <h1>DivineTruthAscension Crest Previews</h1>
  ${svgFiles.map(f => `<div><strong>${f}</strong><br/><img src="${f}" alt="${f}"/></div>`).join('\n')}
</body>
</html>
`;

fs.writeFileSync('previews.html', previewsHTML);
console.log('✅ previews.html generated.');

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
