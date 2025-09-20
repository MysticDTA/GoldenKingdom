// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // ✅ Use Next.js recommended configs
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // ✅ Ignore build/system files
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "platform/src/lib/database.types.ts", // optional: ignore generated file
    ],
  },

  // ✅ Rules (global)
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn", // was "error"
      "@typescript-eslint/ban-ts-comment": "off",
      "react-hooks/exhaustive-deps": "warn",
    },
  },

  // ✅ Example of per-file rules (replace overrides with `files`)
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
];
