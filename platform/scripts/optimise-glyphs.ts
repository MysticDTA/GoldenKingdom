// platform/scripts/optimise-glyphs.ts
// Deno script to optimise SVG glyphs for faster builds and smaller bundle size

import { walk, ensureDir } from "https://deno.land/std/fs/mod.ts";

// Directory where your SVG glyphs live
const glyphDir = "./assets/glyphs";

// Make sure the directory exists
await ensureDir(glyphDir);

// Utility to minify simple SVG strings
function optimiseSvg(svg: string): string {
  return svg
    .replace(/\n+/g, " ")          // remove newlines
    .replace(/\s{2,}/g, " ")       // collapse multiple spaces
    .replace(/>\s+</g, "><")       // remove space between tags
    .replace(/<!--.*?-->/g, "");   // strip comments
}

console.log(`🔍 Optimising SVGs in: ${glyphDir}`);

let count = 0;

for await (const entry of walk(glyphDir, { exts: [".svg"], includeDirs: false })) {
  try {
    const original = await Deno.readTextFile(entry.path);
    const optimised = optimiseSvg(original);
    await Deno.writeTextFile(entry.path, optimised);
    console.log(`✅ Optimised: ${entry.path}`);
    count++;
  } catch (err) {
    console.error(`❌ Failed to optimise ${entry.path}:`, err);
  }
}

if (count === 0) {
  console.log("⚠️ No SVG files found — folder is empty, but build will continue.");
} else {
  console.log(`✨ All done! Optimised ${count} SVG file(s).`);
}
