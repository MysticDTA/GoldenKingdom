// scripts/optimize-glyphs.ts
import { promises as fs } from "fs";
import path from "path";
import { optimize } from "svgo";

async function optimiseGlyphs(dir: string) {
  const files = await fs.readdir(dir, { withFileTypes: true });

  for (const file of files) {
    if (file.isFile() && file.name.endsWith(".svg")) {
      const filePath = path.join(dir, file.name);

      // Read file
      const original = await fs.readFile(filePath, "utf-8");

      // Optimise
      const result = optimize(original, { multipass: true });

      // Save file
      await fs.writeFile(filePath, result.data, "utf-8");

      console.log(`🜁 Optimized: ${filePath}`);
    }
  }
}

// Default glyphs path (adjust if needed)
optimiseGlyphs(path.resolve("public/svg")).catch((err) => {
  console.error("⚠️ Glyph optimization failed:", err);
  process.exit(1);
});
