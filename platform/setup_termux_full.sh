#!/data/data/com.termux/files/usr/bin/bash
set -e

echo "=== Setting up GoldenKingdom Termux environment ==="

cd "$(dirname "$0")"

# 1️⃣ Remove invalid SWC overrides
echo "Removing invalid SWC overrides from package.json..."
jq 'del(.overrides["@next/swc-android-arm64"])' package.json > package.tmp.json && mv package.tmp.json package.json

# 2️⃣ Install correct dependencies
echo "Installing Tailwind/PostCSS dependencies..."
npm install --save-dev tailwindcss@^3.4.1 postcss@^8 autoprefixer@^10

# 3️⃣ Apply clean tsconfig.json
echo "Writing clean tsconfig.json..."
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
      { "name": "next" }
    ]
  },
  "include": ["next-env.d.ts","**/*.ts","**/*.tsx",".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF

# 4️⃣ Create missing Header.tsx
mkdir -p src/components
if [ ! -f src/components/Header.tsx ]; then
cat > src/components/Header.tsx <<'EOF'
export default function Header() {
  return (
    <header style={{ padding: "1rem", background: "#222", color: "#fff" }}>
      <h1>Golden Kingdom</h1>
    </header>
  );
}
EOF
fi

# 5️⃣ Create missing lib/index.ts
mkdir -p src/lib
if [ ! -f src/lib/index.ts ]; then
cat > src/lib/index.ts <<'EOF'
export function getMessage() {
  return "Hello from lib!";
}
EOF
fi

# 6️⃣ Clean install
echo "Cleaning node_modules and reinstalling dependencies..."
rm -rf node_modules package-lock.json
npm install

# 7️⃣ Start dev server with SWC disabled
echo "Starting Next.js dev server with SWC disabled..."
export NEXT_DISABLE_SWC_DOWNLOAD=1
npm run dev
