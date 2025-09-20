#!/bin/bash
# Installer for git hooks

HOOKS_DIR=".git/hooks"
SRC_DIR="scripts/hooks"

echo "🔧 Installing Git hooks..."

for hook in pre-commit pre-push; do
  if [ -f "$SRC_DIR/$hook" ]; then
    cp "$SRC_DIR/$hook" "$HOOKS_DIR/$hook"
    chmod +x "$HOOKS_DIR/$hook"
    echo "✅ Installed $hook hook"
  fi
done

echo "🎉 All hooks installed successfully"
