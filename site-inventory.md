# screenstory.co — Full Site Content Inventory

Extracted from Weebly site on 2024-06-08. Ready for Astro/Decap CMS migration.

---

## Page Structure

| # | Source URL | New File | Status | Notes |
|---|-----------|----------|--------|-------|
| 1 | `/` | `pages/index.md` | ✅ Extracted | Homepage with service category grid |
| 2 | `/about.html` | `pages/about.md` | ✅ Extracted | Company story |
| 3 | `/services.html` | `pages/services.md` | ✅ Extracted | Services overview with 3 cards |
| 4 | `/digital-strategy.html` | `pages/digital-strategy.md` | ✅ Extracted | Sub-service page |
| 5 | `/websites.html` | `pages/websites.md` | ✅ Extracted | Sub-service page |
| 6 | `/contact-us.html` | `pages/contact-us.md` | ✅ Extracted | Contact form (fields listed) |
| 7 | `/privacy.html` | `pages/privacy.md` | ✅ Extracted | Full privacy policy text |
| 8 | `/terms--conditions.html` | `pages/terms--conditions.md` | ✅ Extracted | Full T&C text |
| 9 | `/our-work.html` | `pages/our-work.md` | ✅ Extracted | Portfolio page (screenshot-based, needs images) |
| 10 | `/blog.html` | `pages/blog.md` | ⬜ Not created | Blog index — needs pagination logic |
| 11 | `/business-profiler.html` | `forms/business-profiler.md` | ✅ Extracted | Lead-gen form (12 fields) |
| 12 | `/website-brief.html` | `forms/website-brief.md` | ✅ Extracted | Lead-gen form (9 fields) |

---

## Blog Posts (12 posts)

All extracted to `blog/` with frontmatter:

| File | Title | Date | Category |
|------|-------|------|----------|
| `what-is-seo.md` | What is Search Engine Optimisation? | — | SEO |
| `choosing-your-domain-name.md` | Choosing Your Domain Name Beyond .COM | — | Domains |
| `andrew-place-clinic-website.md` | Andrew Place Clinic Website Redesign | 2022-10-13 | Healthcare |
| `rebecca-mcphail-massage-website-launch.md` | Rebecca McPhail Massage Website Launch | 2017-08-02 | Health & Fitness |
| `relaunch-michaelmitchener-co.md` | Relaunch of michaelmitchener.co | 2017-06-14 | Business Strategy |
| `partnership-timely.md` | Partnership: 3 Things Digital loves Timely | 2017-05-04 | Partnerships |
| `the-kimberley-is-calling.md` | The Kimberley is Calling | 2016-07-12 | Environmental |
| `inov8-technology-digital-strategy.md` | Inov8 Technology Digital Strategy | 2016-05-25 | Retail Technology |
| `kew-osteopathic-clinic-website.md` | Redesign of Kew Osteopathic Clinic Website | 2016-05-11 | Healthcare |
| `my-yoga-life-website-launch.md` | My Yoga Life Website Launch | 2016-02-23 | Health & Fitness |
| `black-sequin-productions-website.md` | Black Sequin Productions Website | 2014-08-19 | Arts & Entertainment |
| `seo-lessons-tour-de-france.md` | SEO Lessons from the Tour De France | 2014-06-01 | SEO |

---

## Open Questions for Phoenix / Demetri

1. **CLIENT LOGIN link** — Currently points to `https://screenstory.weeblycloud.com`. Is this a Weebly-specific client portal that dies with the migration, or should it redirect to `studio.screenstory.co/admin/?site=screenstory`?
2. **Our Work page images** — The original page is screenshot-based (shows client website screenshots as images). We don't have those image files extracted. Need to either:
   - Screenshot each client site fresh
   - Use placeholder thumbnails
   - Ask Demetri for the original Weebly assets
3. **Form handling** — `business-profiler` and `website-brief` were Weebly forms. Need an SMTP/Formspree/Zapier handler for the new static site. Cloudflare Pages Function recommended.
4. **Blog pagination** — `blog.html` was not extracted as it needs dynamic index generation. Standard Astro blog collection with pagination.
5. **Image assets** — All image URLs in the extracted content still point to Weebly CDN (`/uploads/2/5/9/3/...`). These need to be downloaded and moved to `public/` or a CMS image collection.

---

## Navigation Map

```
SERVICES  → /services
          ├── /digital-strategy
          └── /websites
BLOG      → /blog (index)
          └── /blog/[slug] (individual posts)
OUR WORK  → /our-work
ABOUT     → /about
CONTACT   → /contact-us
CLIENT LOGIN → ??? (see Q1 above)
```

---

### Assets status: ✅ ALL DOWNLOADED

| Asset | Local Path | Status |
|-------|-----------|--------|
| Logo | `assets/logo/screen-story-co-logo.png` | ✅ 5KB |
| 12 category/service icons | `assets/icons/*.png` | ✅ 3–9KB each |
| SEO image (digital strategy) | `assets/other/seo-image.jpg` | ✅ 40KB |
| Responsive website image | `assets/other/responsive-website.jpg` | ✅ 19KB |
| Rebecca McPhail screenshot | `assets/screenshots/rebecca-mcphail-massage.jpg` | ✅ 14KB |
| Black Sequin screenshot | `assets/screenshots/black-sequin-productions.png` | ✅ 277KB |
| Andrew Place Clinic screenshot | `assets/screenshots/andrew-place-clinic.png` | ✅ 839KB |

All content Markdown files updated to reference local `/uploads/*` paths.

---

## DNS / Hosting

- **Target:** Cloudflare Pages
- **Zone:** `a158a5c27b27f97ce24c5a5e12da3f33`
- **Admin:** `studio.screenstory.co/admin/?site=screenstory`
