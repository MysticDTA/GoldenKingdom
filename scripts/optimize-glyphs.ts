// scripts/optimize-glyphs.ts
import { optimize } from "npm:svgo";
import { walk } from "https://deno.land/std/fs/walk.ts";

try {
  for await (const entry of walk("public/svg", { exts: [".svg"] })) {
    const raw = await Deno.readTextFile(entry.path);
    const result = optimize(raw, { multipass: true });
    await Deno.writeTextFile(entry.path, result.data);
    console.log(`🜁 Optimized: ${entry.path}`);
  }
} catch (err) {
  console.warn("⚠️ Glyph folder not found. Skipping optimization.");
}
