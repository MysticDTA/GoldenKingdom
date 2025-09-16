// scripts/optimize-glyphs.ts
import { optimize } from "npm:svgo";
import { walk } from "https://deno.land/std/fs/walk.ts";

for await (const entry of walk("svg", { exts: [".svg"] })) {
  const raw = await Deno.readTextFile(entry.path);
  const result = optimize(raw, { multipass: true });
  await Deno.writeTextFile(entry.path, result.data);
  console.log(`🜁 Optimized: ${entry.path}`);
}
