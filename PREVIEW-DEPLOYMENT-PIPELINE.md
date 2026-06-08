# ScreenStory Client Site Preview Deployment Pipeline

## Purpose
Zero-ambiguity process for deploying client sites to **preview URLs only**. DNS cutover is a separate, explicit step requiring user approval.

---

## Naming Convention (NON-NEGOTIABLE)

| Production Domain | Preview URL |
|---|---|
| `yiapanis.co` | `yiapanis-co.preview.screenstory.co` |
| `screenstory.co` | `screenstory-co.preview.screenstory.co` |
| `clientname.co.uk` | `clientname-co-uk.preview.screenstory.co` |

**Rules:**
- Dots → dashes
- Hash-based `pages.dev` URLs are **banned** for client review
- All preview URLs are subdomains of `screenstory.co` for central brand control

---

## Phase 1: Content Extraction (from legacy site)

**Input:** Weebly/Wix/Squarespace/live site URL  
**Output:** Structured content directory + `site-inventory.md`

1. **Extract verbatim** — no rewriting
2. **Structure into Markdown frontmatter**:
   ```
   {site-slug}-content/
   ├── pages/          → Static pages (about, services, contact)
   ├── blog/           → Blog posts with YAML frontmatter
   ├── forms/          → Contact forms, fields, endpoints
   ├── legal/          → Privacy, terms (copy verbatim)
   ├── media/          → Images, videos, downloads
   └── site-inventory.md   ← Master handoff document
   ```
3. **Inventory file must include:**
   - Total page count
   - All external links (will break on new domain)
   - Form endpoints and expected behavior
   - Media file list with source URLs
   - SEO metadata (titles, descriptions)
   - Any dynamic elements (JS widgets, embeds)

---

## Phase 2: Site Scaffold (Astro + Decap CMS)

**Input:** `site-inventory.md` + extracted content  
**Output:** Git repo ready for Cloudflare Pages

1. **Create repo** under `screenstory-co/{site-slug}`
2. **Astro 5 static site** with:
   - `output: 'static'`
   - `build.format: 'directory'`
   - `site: 'https://{site-slug}.preview.screenstory.co'` ← Preview URL, never production
3. **Decap CMS** from `public/admin/index.html` (static file, not Astro page)
   - Pin to `decap-cms@3.5.0`
   - Inline config via `window.__DECAP_CONFIG`
   - Clerk auth (global app, never per-client)
4. **Content collections** in `src/content/{pages,blog,...}/`
5. **All production URLs replaced** with preview URLs:
   - `astro.config.mjs` → `site:`
   - `sitemap.xml.ts` → all `<loc>` entries
   - Any hardcoded canonical links in templates

---

## Phase 3: Build & Deploy

**Input:** Scaffolded repo with content  
**Output:** Live preview URL

### Prerequisites Checklist
- [ ] Node 20+ installed (`node --version`)
- [ ] `CLOUDFLARE_API_TOKEN` set (single canonical token, no aliases)
- [ ] `CLOUDFLARE_ACCOUNT_ID` set
- [ ] Wrangler CLI authenticated: `npx wrangler whoami`
- [ ] GitHub repo exists and is pushable
- [ ] `.gitignore` includes `.dev.vars`, `node_modules/`, `dist/`

> **Node version note:** Astro 5 supports Node 18+. Wrangler v3 supports Node 20. Wrangler v4 requires Node 22+. Pin wrangler to v3 if on Node 20: `npm install wrangler@3 --save-dev`

### Build Steps
```bash
cd {site-slug}-content
npm install          # Uses package-lock.json for reproducibility
npm run build        # Output: dist/
```

### Cloudflare Pages Project
```bash
# Create project (one-time)
npx wrangler pages project create {site-slug}

# Deploy
cd {site-slug}-content
npx wrangler pages deploy dist --project-name={site-slug} --branch=main
```

### DNS (preview subdomain)
```bash
# Add CNAME in screenstory.co zone
# Name:     {site-slug}.preview
# Content:  {site-slug}.pages.dev
# Proxied:  Yes
```

### Manual Pages Dashboard Step (for .co TLDs)
Because of Cloudflare API bug 8000015:
1. Log into Cloudflare Dashboard → Pages → {site-slug} project
2. Custom domains → Add domain: `{site-slug}.preview.screenstory.co`
3. Wait for "Active" status (usually < 2 min)

---

## Phase 4: Preview-Only Safeguards

**These are MANDATORY until explicit go-live approval.**

| Safeguard | Implementation |
|---|---|
| **robots.txt** | `Disallow: /` + Sitemap points to preview URL |
| **No production DNS** | A/CNAME for apex domain untouched |
| **No email sending** | Contact forms log submissions only; SMTP vars not set |
| **Canonical links** | All point to preview subdomain |
| **Sitemap** | All URLs use preview subdomain |
| **Assets** | All uploaded to `/uploads/` (not production CDN) |

### robots.txt Template
```
User-agent: *
Disallow: /
# Preview deployment — block crawlers until go-live
# After DNS cutover: change to Allow and update sitemap URL
Sitemap: https://{site-slug}.preview.screenstory.co/sitemap.xml
```

---

## Phase 5: Client Review Loop

**Input:** Live preview URL  
**Output:** Approval or revision task

1. **Share preview URL** with client: `https://{site-slug}.preview.screenstory.co`
2. **Client reviews** on any device (mobile, tablet, desktop)
3. **Feedback collection:**
   - Decap CMS edits → commit → auto-redeploy
   - Structural changes → kanban task to `kinyras`
4. **Revisions** trigger new preview deploys automatically (git push)
5. **Approval** = client signs off, ready for go-live

---

## Phase 6: Go-Live (SEPARATE PROCESS)

**Requires explicit user approval. Never automated.**

### Checklist before cutover
- [ ] Client has approved preview
- [ ] All content proofread
- [ ] Contact form tested with real SMTP
- [ ] All external links verified
- [ ] robots.txt changed to `Allow: /`
- [ ] Sitemap updated to production domain
- [ ] Google Analytics / Search Console configured
- [ ] SSL certificate active on custom domain

### DNS Cutover
```bash
# Delete legacy A record (Weebly/Wix/etc)
# Add CNAME:
#   Name:    @ (apex) or www
#   Content: {site-slug}.pages.dev
#   Proxied: Yes (after verification)
```

### Post-Cutover
- Update `astro.config.mjs` `site:` to production domain
- Update `sitemap.xml.ts` all URLs to production domain
- Update `robots.txt` Sitemap URL to production domain
- Redeploy
- Verify SSL, forms, analytics

---

## Environment Variable Templates

### Per-Client Preview (minimal)
```
CLERK_SECRET_KEY=sk_test_...          # Global Clerk app
GITHUB_TOKEN=ghp_...                   # GitHub PAT (repo scope)
```

### Per-Client Production (full)
```
CLERK_SECRET_KEY=sk_test_...
GITHUB_TOKEN=ghp_...
SMTP_HOST=smtp.fastmail.com
SMTP_PORT=465
SMTP_USER=demetris@yiapanis.co
SMTP_PASS=...                          # Fastmail app password
SMTP_TO=hello@{client-domain}
```

---

## Troubleshooting Matrix

| Symptom | Cause | Fix |
|---|---|---|
| `8000015 invalid TLD` | Pages API rejects `.co` domains | Add custom domain in Dashboard manually |
| `500 GITHUB_CLIENT_ID` | Env var dropped from deployment | Hardcode public Client ID or migrate to Clerk |
| `Authentication error [code: 10000]` | Wrong `CLOUDFLARE_API_TOKEN` active | Consolidate to single canonical token |
| Contact form 500 | Missing SMTP env vars in preview | Expected — forms log only in preview mode |
| `/admin/` redirects to `/` | Clean URLs + Astro router conflict | Use `/admin/index.html` directly, or add `_redirects` rule |
| Decap CMS blank | React hydration conflict | Serve from `public/admin/index.html`, pin to 3.5.0 |
| Build fails Node version | `create-astro` CLI needs Node 22+ | Use manual scaffold or upgrade Node |

---

## File: References

- `screenstory-cms-platform` skill (full architecture)
- `content-extraction-workflow.md`
- `clerk-credential-verification-protocol.md`
- `wrangler-auth-token-conflicts.md`
- `cloudflare-pages-custom-domain-api-quirks.md`

---

*Last updated: 2026-06-08 by Kinyras*  
*Applies to: All ScreenStory client deployments*