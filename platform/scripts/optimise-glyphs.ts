// scripts/optimise-glyphs.ts
// Deno script to optimize SVG glyphs in ./assets/glyphs

import { walk } from "https://deno.land/std/fs/mod.ts";

const glyphDir = "./assets/glyphs";
for await (const entry of walk(glyphDir, { exts: [".svg"] })) {
  if (entry.isFile) {
    const data = await Deno.readTextFile(entry.path);
    const optimised = data
      .replace(/\s+/g, " ")   // collapse whitespace
      .replace(/> </g, "><"); // remove tag gaps
    await Deno.writeTextFile(entry.path, optimised);
    console.log(`Optimised: ${entry.path}`);
  }
}
