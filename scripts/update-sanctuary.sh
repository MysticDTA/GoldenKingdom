#!/usr/bin/env bash

echo "🌿 Starting sanctuary update ritual..."

# Step 1: Load sacred environment variables
source .env

# Step 2: Pull latest scrolls from the lineage
echo "📜 Pulling latest scrolls from origin..."
git pull origin main

# Step 3: Install or refresh dependencies
echo "📦 Installing dependencies..."
npm install

# Step 4: Regenerate Supabase types
echo "🔮 Regenerating Supabase types..."
supabase gen types typescript \
  --project-id "$SUPABASE_PROJECT_REF" \
  > platform/src/lib/database.types.ts

# Step 5: Invoke the dev server
echo "🌀 Invoking the sanctuary portal..."
HOST=127.0.0.1 PORT=3000 npm run dev
