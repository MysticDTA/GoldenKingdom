import { promises as fs } from "fs";
import path from "path";

/**
 * Optimises all .svg glyphs inside a directory.
 */
async function optimiseGlyphs(dir: string) {
  const files = await fs.readdir(dir, { withFileTypes: true });

  for (const file of files) {
    if (file.isFile() && file.name.endsWith(".svg")) {
      const filePath = path.join(dir, file.name);

      // Read file
      const original = await fs.readFile(filePath, "utf-8");

      // TODO: apply real optimisation logic here
      const optimised = original;

      // Write back
      await fs.writeFile(filePath, optimised, "utf-8");
      console.log(`Optimised ${filePath}`);
    }
  }
}

// Run on assets/glyphs by default
optimiseGlyphs(path.resolve(__dirname, "../assets/glyphs")).catch((err) => {
  console.error("Error optimising glyphs:", err);
  process.exit(1);
});
