import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List of logos to check
const logos = [
  'logo-primary.svg',
  'crest-monochrome.svg',
  'assets/logos/logo-monochrome.svg',
  'assets/logos/logo-variantB.svg'
];

// Base URL if you want to check deployed site (optional)
const baseURL = 'https://yoursite.netlify.app/';

// Check all logos
async function checkLogos() {
  let missing = [];

  for (const logo of logos) {
    const filePath = path.join(__dirname, logo);
    if (!fs.existsSync(filePath)) {
      missing.push(logo);
      console.log(`❌ ${logo} -> NOT FOUND`);
    } else {
      console.log(`✅ ${logo} exists locally`);
    }
  }

  if (missing.length) {
    console.log('\n🚨 Some logos are missing! Build will fail.');
    process.exit(1); // Fail Netlify build if missing
  } else {
    console.log('\nAll logos verified!');
  }
}

// Run
checkLogos();
