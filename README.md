# 🌟 GoldenKingdom Platform

A Next.js application powered by Supabase.  
This project integrates user profiles, glyphs, posts, and messages with a spiritual theme of sovereignty and ascension.  

---

## ✨ Features
- 🔐 User authentication & profiles  
- 🌀 Glyphs database with meanings  
- 📝 Posts & direct messages  
- 🚀 Supabase backend + Next.js frontend  
- ⚡ Deploy-ready on Netlify  

---

## 🚀 Setup Guide

### 1. Clone the Repository
```bash
git clone https://github.com/MysticDTA/GoldenKingdom.git
cd GoldenKingdom/platform

## 🔑 Supabase Types Workflow

We no longer generate Supabase types automatically in CI/CD (GitHub Actions).  
Instead, types are committed manually to keep builds fast and stable.

### How to update types

1. Make sure you have the Supabase CLI installed:
   ```bash
   supabase --version
