#!/data/data/com.termux/files/usr/bin/bash

echo "🌟 Initiating GoldenKingdom Setup Ritual..."

# Core tools
pkg update -y
pkg upgrade -y
pkg install -y git python nodejs curl jq tree tsu

# Optional enhancements
pkg install -y neovim openssh figlet toilet

# Python tools
pip install git-filter-repo

echo "🔮 All ritual tools installed. Your sanctuary is ready."
