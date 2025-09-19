#!/bin/bash
echo "🔍 Running Next.js build with SWC disabled..."
echo

# Run build and capture all output
NEXT_DISABLE_SWC=1 npm run build 2>&1 | tee build.log

echo
echo "🔎 Searching for first error..."
# Find first "Error" or "Type error" line
grep -m 1 -i -E "error|failed|cannot" build.log || echo "✅ No obvious error found"
