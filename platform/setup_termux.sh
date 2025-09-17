#!/bin/bash
# setup_termux.sh - Set up Next.js platform on Galaxy S25 Termux

set -e

echo "Step 1: Creating missing folders and files..."
mkdir -p src/components src/lib

# Header.tsx
cat > src/components/Header.tsx <<'EOF'
export default function Header() {
  return (
    <header style={{ padding: "1rem", background: "#222", color: "#fff" }}>
      <h1>Golden Kingdom</h1>
    </header>
  );
}
EOF

# lib/index.ts
cat > src/lib/index.ts <<'EOF'
export function getMessage() {
  return "Hello from lib!";
}
EOF

echo "Step 2: Fixing tsconfig.json..."
cat > tsconfig.json <<'EOF'
{
  "compilerOptions": {
    "target": "esnext",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": "./src",
    "paths": {
      "@/*": ["*"]
    },
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF

echo "Step 3: Installing Termux-compatible SWC override and dependencies..."
# Clean old installs
rm -rf node_modules package-lock.json

# Install Termux-compatible SWC
npm install @next/swc-android-arm64-old@14.1.0 --save-dev

# Ensure overrides in package.json
jq '.overrides = {"@next/swc-android-arm64":"npm:@next/swc-android-arm64-old@14.1.0","@next/font":"14.1.0","lightningcss":"1.21.5"}' package.json > package.tmp.json && mv package.tmp.json package.json

# Install all dependencies
npm install

echo "Step 4: Ready to run the dev server!"
echo "Run: NEXT_DISABLE_SWC_DOWNLOAD=1 npm run dev"
