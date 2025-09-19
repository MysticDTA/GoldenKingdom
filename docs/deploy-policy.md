`Deployment Policy — docs/deploy-policy.md

🕊️ Purpose

This scroll outlines how GoldenKingdom protects sacred environment variables during deploys—especially those triggered by external contributors or forks. It ensures clarity, safety, and stewardship across all build flows.

---

🌿 Sensitive Variable Policy

Netlify considers deploys from unrecognized forks as untrusted. To protect sacred keys:

- ✅ Untrusted deploys build automatically, but sensitive variables are excluded
- 🔐 Sensitive variables (e.g. SUPABASESERVICEROLE_KEY) are never exposed
- 🧘 Project members may manually approve deploys if full access is needed

---

🧾 Recommended Settings

In Netlify’s Site Settings → Environment Variables → Sensitive Variable Policy, select:

`plaintext
Deploy without sensitive variables
`

This balances automation with protection—allowing previews while safeguarding lineage secrets.

---

🧬 What Counts as Sensitive

Variables like these must never be exposed in untrusted deploys:

| Variable                    | Description                                  |
|----------------------------|----------------------------------------------|
| SUPABASESERVICEROLE_KEY| Full access key for server-side operations   |
| NODE_VERSION             | Node.js version used in build                |
| Any secret API keys        | Stripe, SendGrid, etc.                       |

---

🧭 Stewardship Rituals

- Store sensitive keys in Netlify’s Environment Variables UI, not in netlify.toml
- Use NEXTPUBLIC prefix only for safe, public-facing keys
- Review deploy logs for any unexpected variable exposure

