# Keytom → Swahilies Rebrand — Design Spec

**Date:** 2026-05-26
**Owner:** Prosper Chihimba (proc@swahilies.com)
**Stack:** Next.js 16 (App Router), React 19, Tailwind v4, MUI 7, Ant Design 6, GSAP

---

## 1. Goal

Repurpose the existing Keytom marketing template into the Swahilies marketing site. This is **content + brand**, not a colors-and-logo swap: every section's copy must describe Swahilies accurately (bookkeeping, cross-border payments, credit for African SMEs) and every Keytom-specific product claim (IBAN, SEPA, EUR balances, crypto insurance, "126+ countries") must be removed.

Final acceptance check: `grep -ri "keytom\|IBAN\|SEPA\|126+ countries\|crypto insurance" src/ app/ public/` returns nothing.

## 2. Brand identity

- **Company:** Swahilies (legal entity: Swahilies Inc.)
- **Wordmark:** lowercase `swahilies`
- **Tagline / positioning:** "Bookkeeping and Payments App for African SMEs"
- **Mission (footer/about):** "To build the operating and financial system for Africa's 100M SMEs."
- **Logo:** dark rounded-square tile with the gold/orange "S" mark. Replaces every `logo.png` reference.
- **Site language:** English. Swahili stays only inside product screenshots (Malipo, Madeni, Wateja, etc.).

### Design tokens (in `app/globals.css` `:root`)

Replace the current Keytom palette (sage `#afd3a1` accent, hardcoded `--color-keytom-blue/purple/peach`) with:

```
Brand
  --color-primary       #0E0E10   near-black (logo tile)
  --color-accent        #F0A020   warm gold (S mark)
  --color-secondary     #7C5CE0   lavender chip text
  --color-tertiary      #F4A28C   peach

Surfaces / text
  --color-bg            #FFFFFF
  --color-surface       #FAF7F2   soft cream
  --color-surface-alt   #F2EEFF   pale lilac
  --color-text          #0E0E10
  --color-muted         #5C5C66
  --color-border        rgba(14,14,16,0.10)

Accent washes (for glow / cards / pill chips)
  --wash-lavender       #E6E0F5
  --wash-peach          #FAE0D4
  --wash-cream          #FAF1D0

Semantic (Comparison table)
  --color-success       #2FA86A   ✅
  --color-warning       #E0A82E   ⚠️
  --color-danger        #D64550   ❌
```

All Keytom-specific tokens (`--color-keytom-blue`, `--color-keytom-purple`, `--color-keytom-peach`) are removed. Component CSS that referenced them is updated to consume the new tokens. Existing CSS that uses `--accent` / `--accent-contrast` / `--bg` / `--surface` / `--text` / `--border` is rewired to the new variables (mapping table will be enumerated in the Section 1 implementation plan).

Typography stays on Inter / Geist (no serif introduced).

### Visual treatment scope

The design inspirations in `data/` (`SwahiliesWeb1.png`, `web2.png`, `web3.png`, `loading.png`) inform **colors + small visual cues only** — not a full layout redesign. That means we adopt:

- Pastel pill chips for section headers (yellow / lavender / peach), as the deck uses.
- Soft glow-orb backgrounds where one already exists (hero, intro).
- Cream and lilac surface washes for cards.

We do **not** redesign existing section layouts to mirror the inspo screens. The Keytom layout structure (Hero pin, Intro, Services, etc.) stays; only colors, copy, and small visual flourishes change.

## 3. Decisions locked in this brainstorm

| Decision | Outcome |
|---|---|
| Asset delivery | Source-of-truth assets live in repo at `data/` (logos: `logo.png` dark tile, `logo.jpeg` inverted, `logo_.jpeg` full lockup; design inspirations; full pitch deck PDFs). Section 1 copies logos into `public/assets/images/` and generates a favicon. App screenshots will be pulled from the deck PDFs (`1. Home.pdf`, `4. How it Works.pdf`, `5. How it Works.pdf`). The `data/` folder must be added to `.gitignore` or moved out — the pitch deck should not ship in the public bundle. |
| Traction numbers (canonical) | Four stat cards: **12,000 Monthly Active Users · 1,100 Paying SMEs · $500K Processed (last 4 months) · $10K Monthly revenue**. Below the stats, a callout line: *"5,000+ SMEs on the waitlist for cross-border payments & lending."* (Earlier draft had the waitlist as a stat — corrected to match the actual deck layout.) Projections-slide figures dropped. |
| Component file naming | Rename to neutral names: `WhyKeytom.jsx` → `Traction.jsx`, `VirtualCard.tsx` → `HowItWorks.tsx`. `Comparison`, `BuiltFor`, `Services`, `Hero`, `Intro`, `Footer`, `Faqs` stay. |
| Contact info | `contact@swahilies.com` + `+255 682 411 725`. Used in footer, contact page, `mailto:` / `tel:` links. |
| Dead `#` anchor links | Remove entirely (drop the elements rather than stubbing). |
| Global `<FAQ />` + `<Footer />` (rendered from `layout.jsx`) | Stay rendering during Sections 1–4. In Section 1, fix copyright + remove obvious Keytom wordmarks + remove dead links. Full content rewrite happens in Section 5. |
| Business-model section (SaaS pricing, FX margin, etc.) | Skip on public marketing site. |
| Brand-color hex values | TBD — locked in Section 1 once real logo is provided. Tokens are defined centrally in `globals.css`; no hex hardcoded per component. |

## 4. Section-by-section deliverables

The user's "Working order" maps to six sections, each ending with a review pause.

### Section 1 — Brand tokens + global cleanup
- Define new tokens in `app/globals.css :root` (and `[data-theme="light"]` if needed).
- Remove `--color-keytom-blue/purple/peach`; update any consuming CSS classes (`.text-gradient`, `.mesh-gradient*`, `.intro-headline*`, `.footer-lower`, `.why-keytom-*`) to use new tokens.
- Replace `app/assets/images/logo.png` with the real Swahilies logo. Replace `app/favicon.ico`.
- Update `app/layout.jsx`:
  - `metadata.title` → "Swahilies — Bookkeeping and Payments App for African SMEs" (per-page titles set in step 1 for `/`, `/business`, `/cards`, `/contact`).
  - `metadata.description` → real description.
  - Open Graph + favicon links.
- Footer: copyright `© Swahilies Inc. 2026`, contact email/phone, remove dead `#` links from nav/footer.
- Grep for `Keytom` strings in JSX/CSS and replace the visible ones (full FAQ/footer content rewrite happens Section 5).

### Section 2 — Hero + first feature section (`Services`)
- Hero: headline "Bookkeeping and payments, built for African SMEs." + subhead + primary CTA (App Store / Google Play badges if URLs available; otherwise "Open account" / "Join waitlist" CTA — confirm at section start).
- Action chips reframed to Malipo / Wateja / Invoice / Loans (or closest honest set).
- `Services` (the "Manage your fiat and crypto — all in one app" block) → "Manage your business — all in one app" with three pillars:
  1. Business Management (sales, stock, debts)
  2. Collection & Banking (digital payments, supplier payments local + abroad)
  3. Credit & Lending (in-app loans, transaction-data-driven credit profile)

### Section 3 — Cross-border payments + traction stats
- Replace the entire "Crypto wallet and personal IBAN" block with the cross-border payments story: SME holds TZS, funds via bank / mobile money / stablecoin, supplier paid in USD / CNY / INR.
- Keep app-store badges if real URLs exist.
- `Traction` (renamed from `WhyKeytom`) shows the 4 canonical stats in colored stat cards (yellow / mint / lavender / lavender, matching the deck), with the "5,000+ waitlist" callout below. Removes "126+ countries" and "$100M crypto insurance". Keep "100% online onboarding" only if true.

### Section 4 — How-it-works (renamed from VirtualCard) + Built for businesses
- `HowItWorks` is the repurpose of the cards block: a 3-step walkthrough (or app screen feature tour). No ATM / contactless / crypto-card-topup copy.
- `BuiltFor` keeps Businesses framing; rewrites bullets to: cross-border supplier payments, multi-currency settlement, fast onboarding, in-app loans/credit. Drops crypto-wallet-card lines.

### Section 5 — Comparison + FAQ + Footer
- `Comparison` columns: **Swahilies** vs **Traditional Banks** vs **Western Union / MoneyGram** vs **Bumpa / Settlo / QuickBooks**. Full matrix (from `data/8. Competition.pdf`):

  | Row | Swahilies | Traditional Banks | Western Union / MoneyGram | Bumpa / Settlo / QuickBooks |
  |---|---|---|---|---|
  | First-Mover in Data Monetization | ✅ infrastructure to power future SME finance | ❌ Not designed for SME data | ❌ Only transaction-level data | ❌ Limited business activity data |
  | Proprietary SME Data Engine | ✅ Operational and financial data | ❌ only transactions | ❌ Only transaction-level data | ⚠️ Good data, but not localized |
  | Capital-Light, Risk-Free Lending Model | ✅ Off-balance sheet loans | ❌ only transactions | ❌ No lending role | ❌ No lending role |
  | Instant - cross border payments | ✅ Instant payment | ❌ Take 1-3 days | ⚠️ Same day to 3 days | ❌ No cross border payments |
- FAQ rewritten for SMEs: "Do I need a bank account?", "Which payment methods can I receive?", "How do loans work?", "Is it available outside Tanzania?", "How do cross-border payments work?". Remove all EU / residence-permit questions.
- Footer fully rewritten:
  - Discover: Business / Features / FAQ
  - Company: About / Blog (only if real)
  - Contact: `contact@swahilies.com`, `+255 682 411 725`
  - App Store + Google Play badges
  - `© Swahilies Inc. 2026`

### Section 6 — Final pass
- Responsive check on hero, services, comparison, FAQ.
- Replace any remaining placeholder images (`swahi1.png` repeats, `phone2.png`, `card1/2.jpeg`).
- Run the acceptance grep: `grep -ri "keytom\|IBAN\|SEPA\|126+ countries\|crypto insurance" src/ app/ public/` must return nothing.
- Run `npm run build` and `npm run lint`; verify pages load in dev.

## 5. Pause gates (review checkpoints)

After Section 1, 2, 3, 4, and 5 the implementation stops and waits for explicit "continue" from Prosper. Each section ends with: (a) what changed, (b) screenshots/dev-server check, (c) blockers for the next section if any.

## 6. Outstanding inputs needed before each section starts

| Section | Needs | Status |
|---|---|---|
| 1 | Real Swahilies logo + favicon + brand colors | ✅ Have logos in `data/`, palette locked above |
| 2 | App Store + Google Play URLs (or confirmation those CTAs are deferred) | ⏳ Confirm at section start |
| 3 | App screenshots for the cross-border story | ⏳ Will extract from `data/1. Home.pdf` and inspo screens |
| 4 | App screen captures for the "How it works" walkthrough | ✅ Available in `data/4. How it Works.pdf` and `5. How it Works.pdf` |
| 5 | Final Comparison matrix values | ✅ Captured in section 4 above |
| 6 | None — verification only | — |

## 7. Non-goals

- No new pages beyond what exists (`/`, `/business`, `/cards`, `/contact`).
- No backend changes.
- No new dependencies unless required (e.g., a token replacement that needs a Tailwind plugin — flag before adding).
- No business-model / pricing section on the public marketing site.
- No Swahili UI (English only on marketing site).
