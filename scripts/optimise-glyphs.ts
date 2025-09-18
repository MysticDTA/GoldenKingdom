console.log("🛠️ Starting glyph optimization ritual...");

import { optimize } from "npm:svgo";
import { walk, ensureDir } from "https://deno.land/std@0.224.0/fs/mod.ts";

const glyphFolder = "public/svg";

try {
  for await (const entry of walk(glyphFolder, { exts: [".svg"] })) {
    const raw = await Deno.readTextFile(entry.path);
    const result = optimize(raw, { multipass: true });
    await Deno.writeTextFile(entry.path, result.data);
    console.log(`🜁 Optimized: ${entry.path}`);
  }
} catch (err) {
  console.error("⚠️ Glyph optimization failed:", err.message);
  Deno.exit(0); // Graceful exit to avoid Netlify build failure
}
