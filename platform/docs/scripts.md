Ritual Script Scroll — docs/scripts.md

🕊️ Purpose

This scroll documents the sacred scripts defined in platform/package.json. Each invocation serves a ceremonial role—whether preparing the environment, optimizing glyphs, or initiating the build. Stewards may use this guide to understand, extend, or align with the sanctuary’s technical rhythm.

---

🔮 Script Overview

| Script Name         | Invocation                  | Purpose                                                                 |
|---------------------|-----------------------------|-------------------------------------------------------------------------|
| dev               | npm run dev               | Starts the development server with hot reload                          |
| build             | npm run build             | Builds the platform for production, using fallback if SWC fails        |
| start             | npm run start             | Starts the production server                                           |
| lint              | npm run lint              | Runs ESLint to check for code clarity and consistency                  |
| precommit-check   | npm run precommit-check   | Validates required environment variables before commit (optional)      |
| optimise-glyphs   | npm run optimise-glyphs   | Runs glyph optimization script via ts-node                           |
| prepare           | npm run precommit-check   | Automatically runs before npm install or git commit (optional)     |

---
