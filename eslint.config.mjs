import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      // default: don't block "any"
      "@typescript-eslint/no-explicit-any": "warn",
    },
    overrides: [
      {
        files: ["src/**/*.{ts,tsx}", "pages/**/*.{ts,tsx}"],
        rules: {
          // stricter in production code
          "@typescript-eslint/no-explicit-any": "error",
        },
      },
      {
        files: ["**/test-*.ts", "**/*.test.ts"],
        rules: {
          // looser for test/dev files
          "@typescript-eslint/no-explicit-any": "off",
        },
      },
    ],
  },
];

export default eslintConfig;
