# Section 6 — Final Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Drive the full acceptance grep (`grep -RIin "keytom\|IBAN\|SEPA\|crypto insurance\|126+ countries" app/ public/`) to zero by removing the last 27 hits, all of which live in dead code: six unused component files, six unused module CSS files, the dead `.why-keytom-*` / `.footer-lower__*` zombies in `globals.css`, and a stray Keytom reference + dead Telegram import in `app/contact/page.jsx`. Then a final build + visual smoke test.

**Architecture:** Pure deletion work — no new code, no behavior change. Every file we delete has been confirmed by grep to have no inbound imports anywhere in the app. CSS classes we delete have no consumers (the new Swahilies components use inline `style={{...}}` and Tailwind utilities, not the old `.why-keytom-*` / `.footer-lower__*` classes). The `app/contact/page.jsx` edit is the only place we change code; everything else is `git rm` or CSS deletion.

**Tech Stack:** No new dependencies. No new files.

---

## File Structure

| File | Action | Why |
|---|---|---|
| `app/components/About.jsx` | Delete | No imports anywhere |
| `app/components/Actions.jsx` | Delete | No imports anywhere |
| `app/components/Cards.jsx` | Delete | No imports anywhere |
| `app/components/Groups.jsx` | Delete | No imports anywhere |
| `app/components/Video.jsx` | Delete | No imports anywhere |
| `app/components/Comparison.jsx` | Delete | Stale duplicate; `Comparison.tsx` is the live file |
| `app/components/Comparison.module.css` | Delete | Was for the dead `Comparison.jsx`; not imported |
| `app/components/VirtualCard.module.css` | Delete | Not imported (VirtualCard.tsx uses Tailwind/inline) |
| `app/components/BuiltFor.module.css` | Delete | Same |
| `app/components/Faqs.module.css` | Delete | Same |
| `app/components/Footer.module.css` | Delete | Same |
| `app/components/Services.module.css` | Delete | Same |
| `app/globals.css` | Modify | Remove `.why-keytom-*` rules, `.footer-lower*` rules, `.intro-headline2` (unused), `.text-gradient`/`.mesh-gradient*` audit |
| `app/contact/page.jsx` | Modify | Drop stray Keytom reference; remove `PiTelegramLogoFill` import + its `<span>` (we dropped Telegram everywhere in Section 5) |

---

## Conventions for this section

- **Two commits.** Commit A at end of Phase A (file deletions). Commit B at end of Phase B (CSS + contact-page cleanup + final acceptance).
- **Verify-then-delete.** For each dead-code file, the plan already lists the precise grep that proves no imports exist. The deletion steps re-run that grep before the `git rm`.
- **Section 6 acceptance:**
  - `grep -RIin "keytom\|IBAN\|SEPA\|crypto insurance\|126+ countries" app/ public/ 2>/dev/null` returns nothing.
  - `npm run build` is clean; all 9 routes still prerender.
  - Visual smoke test on `/`, `/business`, `/cards`, `/contact` shows no broken styles.

---

## Phase A — Delete dead component + module CSS files

### Task 1: Verify and delete the 6 dead JSX/TSX components

**Files:**
- Delete: `app/components/About.jsx`, `app/components/Actions.jsx`, `app/components/Cards.jsx`, `app/components/Groups.jsx`, `app/components/Video.jsx`, `app/components/Comparison.jsx`

- [ ] **Step 1: Confirm no inbound imports**

```bash
for name in About Actions Cards Groups Video Comparison; do
  echo "--- $name ---"
  grep -RIn "from ['\"]\\.[^'\"]*$name['\"]" app/ 2>/dev/null || echo "(no imports)"
done
```

Expected for each: either `(no imports)` OR for `Comparison` only — exactly one match in `app/home/page.tsx:12` which says `import Comparison from "../components/Comparison";`. That import resolves to `Comparison.tsx` (TypeScript-preferred), so deleting `Comparison.jsx` is safe. All five `.jsx` deletions show `(no imports)`.

- [ ] **Step 2: Delete the six files**

```bash
git rm app/components/About.jsx \
       app/components/Actions.jsx \
       app/components/Cards.jsx \
       app/components/Groups.jsx \
       app/components/Video.jsx \
       app/components/Comparison.jsx
```

- [ ] **Step 3: Build to confirm Comparison.tsx is what gets resolved**

```bash
npm run build 2>&1 | tail -15
```
Expected: build completes; all routes still prerender; no missing-module errors.

### Task 2: Verify and delete the 6 dead module CSS files

**Files:**
- Delete: `app/components/Comparison.module.css`, `app/components/VirtualCard.module.css`, `app/components/BuiltFor.module.css`, `app/components/Faqs.module.css`, `app/components/Footer.module.css`, `app/components/Services.module.css`

- [ ] **Step 1: Confirm no inbound imports**

```bash
grep -RIn "\\.module\\.css" app/ 2>/dev/null | grep -v "^Binary" || echo "(no module.css imports anywhere)"
```

Expected: `(no module.css imports anywhere)`. The Section 1–5 rewrites moved everything to Tailwind + inline `style={{...}}`; none of the `.tsx`/`.jsx` files reference these module CSS files anymore.

- [ ] **Step 2: Delete the six files**

```bash
git rm app/components/Comparison.module.css \
       app/components/VirtualCard.module.css \
       app/components/BuiltFor.module.css \
       app/components/Faqs.module.css \
       app/components/Footer.module.css \
       app/components/Services.module.css
```

- [ ] **Step 3: Build to confirm no broken style references**

```bash
npm run build 2>&1 | tail -15
```
Expected: build completes; no errors. (Tailwind doesn't try to resolve module CSS unless something imports it.)

### Task 3: Commit Phase A

- [ ] **Step 1: Stage and commit**

```bash
git status
git commit -m "$(cat <<'EOF'
section 6 dead-code audit: delete unused components and module css

Six unreferenced component files removed: About.jsx, Actions.jsx,
Cards.jsx, Groups.jsx, Video.jsx, Comparison.jsx (the stale .jsx
duplicate; Comparison.tsx is the live file the home page imports).

Six dead module CSS files removed: Comparison / VirtualCard /
BuiltFor / Faqs / Footer / Services .module.css. The Section 1-5
rewrites moved every component onto Tailwind + inline style={{...}}
so nothing imports these modules anymore.

Net change: ~1500 lines of dead Keytom-era code gone. All 9 routes
still prerender; npm run build is clean.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 2: Verify clean tree**

```bash
git status
git log --oneline -2
```

---

## Phase B — Clean globals.css + contact page + final acceptance

### Task 4: Audit and trim `globals.css`

**Files:**
- Modify: `app/globals.css`

The Section 1 rewire kept legacy CSS class names alive (`.why-keytom-section`, `.why-keytom-card`, `.why-keytom-watermark`, `.why-keytom-star`, `.why-keytom-stat`, `.why-keytom-label`, `.why-keytom-desc`, `.why-keytom-links`, `.why-keytom-link`, `.why-keytom-link-single`, `.footer-lower__*` family, `.intro-headline2`). None of those classes are referenced by the current Swahilies components — Section 3 (Traction), Section 4 (BuiltFor / VirtualCard), and Section 5 (Footer / FAQ) all use Tailwind + inline styles instead.

- [ ] **Step 1: Confirm the CSS classes are truly unused**

```bash
grep -RIn "why-keytom\|footer-lower\|intro-headline2" app/ 2>/dev/null | grep -v "globals.css"
```
Expected: no matches. The classes only appear in `globals.css`; no `.tsx` / `.jsx` file references them.

- [ ] **Step 2: Delete the `.why-keytom-*` block**

In `app/globals.css`, find the `.why-keytom-section` rule (around line 246) and delete the entire run of `.why-keytom-*` rules through `.why-keytom-link-single`. The block to remove:

```css
.why-keytom-section { ... }
.why-keytom-watermark { ... }
.why-keytom-star { ... }
.why-keytom-star::before { ... }
.why-keytom-star::after { ... }
.why-keytom-star::before { ... }
.why-keytom-star::after { ... }
.why-keytom-card { ... }
.why-keytom-stat { ... }
.why-keytom-label { ... }
.why-keytom-desc { ... }
.why-keytom-links { ... }
.why-keytom-link { ... }
.why-keytom-link-single { ... }
```

(That's roughly lines 246–342 of the current file. Use a grep search inside the file to find the start and the next non-`why-keytom` rule that starts after it, and delete everything between.)

- [ ] **Step 3: Delete the `.footer-lower*` block**

In `app/globals.css`, find the `.footer-lower` rule (around line 449) and delete the entire run through the responsive override that touches it. The block:

```css
.footer-lower { ... }
.footer-lower__top { ... }
.footer-lower__controls { ... }
.footer-lower__lang { ... }
.footer-lower__icon { ... }
.footer-lower__arrow { ... }
.footer-lower__open { ... }
.footer-lower__right { ... }
.footer-lower__star { ... }
.footer-lower__copy { ... }
.footer-lower__legal { ... }
```

Then in the `@media (max-width: 900px)` block at the bottom (around line 537), delete the `.footer-lower__top` and `.footer-lower__right` overrides — they reference dead classes. Keep the `.keytom-heading { font-weight: 400; }` rule's wrapper but remove the rule itself (no component uses `.keytom-heading` after Section 5; verify with: `grep -RIn "keytom-heading" app/`).

Concretely: find the `@media (max-width: 900px)` block and replace:

```css
@media (max-width: 900px) {
  .keytom-heading{
    font-weight: 400;
  }
  .footer-lower__top {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer-lower__right {
    width: 100%;
    justify-content: space-between;
  }
}
```

with an empty `@media (max-width: 900px) {}` block — or delete the entire empty block if nothing else lives inside it. If the rest of the file has other `@media` rules that DO reference live classes, leave those untouched.

- [ ] **Step 4: Delete `.intro-headline2`**

In `app/globals.css`, find the `.intro-headline2` rule and delete it. `.intro-headline2` is no longer referenced — Section 1 rewired its background but it remains unused by any JSX. The active `.intro-headline` rule stays.

- [ ] **Step 5: Build**

```bash
npm run build 2>&1 | tail -15
```
Expected: build completes; no errors.

- [ ] **Step 6: Smoke test**

Reload `http://localhost:3000` and scroll through every section. Confirm nothing visibly broken — Hero, Intro, Services, Traction (which used to have the deleted `.why-keytom-*` rules), VirtualCard, BuiltFor, Comparison, FAQ, Footer all render correctly.

### Task 5: Clean up `app/contact/page.jsx`

**Files:**
- Modify: `app/contact/page.jsx`

- [ ] **Step 1: Find the remaining Keytom hit**

```bash
grep -n "Keytom\|keytom\|IBAN\|SEPA" app/contact/page.jsx
```
Note the line number(s) and surrounding context.

- [ ] **Step 2: Replace the offending content**

Based on the grep output, edit the surrounding JSX. Likely candidates:
- "Contact Keytom" or "Keytom team" → "Contact Swahilies" or "Swahilies team"
- An alt text or aria-label mentioning Keytom
- A heading with "Keytom" in it

If the line is a heading/title/paragraph: edit to remove "Keytom" and replace with "Swahilies".
If it's a Keytom email like `support@keytom.com`: replace with `contact@swahilies.com`.

- [ ] **Step 3: Drop the Telegram import + icon (dead since Section 5)**

In `app/contact/page.jsx`, find:

```jsx
import { PiTelegramLogoFill } from "react-icons/pi";
```

and delete that line. Then find any usage of `<PiTelegramLogoFill />` in the JSX body and delete the wrapping element (icon span/anchor). Match the pattern of Section 5's Footer cleanup: the Telegram icon goes; LinkedIn / X / Instagram remain if they're in this file.

- [ ] **Step 4: Also drop `GiTireIronCross` if unused**

The contact page imports `GiTireIronCross` from `react-icons/gi`. That's an odd choice — likely placeholder. Run:

```bash
grep -n "GiTireIronCross" app/contact/page.jsx
```

If the import is the only mention (no JSX uses it), delete the import line.

- [ ] **Step 5: Build**

```bash
npm run build 2>&1 | tail -15
```
Expected: build completes; no errors.

- [ ] **Step 6: Visual check `/contact`**

```bash
# Reload http://localhost:3000/contact
```
Confirm the page renders, no missing-icon errors in the browser console, no broken layouts.

### Task 6: Run the final acceptance grep

**Files:** none — verification only.

- [ ] **Step 1: The grep that has been the target since Section 1**

```bash
grep -RIin "keytom\|IBAN\|SEPA\|crypto insurance\|126+ countries" app/ public/ 2>/dev/null
```
Expected: **no output, exit code 1**. This is the spec's final acceptance criterion.

- [ ] **Step 2: Wider grep including any remaining stray strings**

```bash
grep -RIin "Financial Institution\|Imagine more\|next-generation digital\|Western Union\|MoneyGram\|FINTRAC\|GB44\|EUR" app/ public/ 2>/dev/null | grep -v "Comparison.tsx\|Faqs.tsx"
```
Expected: no output (the Comparison and FAQ files legitimately mention Western Union, MoneyGram, USD, etc., so they're excluded).

- [ ] **Step 3: Final build**

```bash
npm run build 2>&1 | tail -20
```
Expected: build completes; 9 routes prerender (/ , /_not-found, /business, /cards, /contact, /home, /icon.png + 2 implicit metadata files).

- [ ] **Step 4: TypeScript check (just in case)**

```bash
npx tsc --noEmit 2>&1 | tail -20
```
Expected: no TS errors. (If any remaining .jsx files have type issues that the build ignores, they'd show here.)

### Task 7: Final visual smoke test across all routes

**Files:** none — manual verification.

- [ ] **Step 1: Start dev server (if not running)**

```bash
npm run dev
```

- [ ] **Step 2: Walk through every route**

Open each in a browser and confirm no visible regression:
- `http://localhost:3000/` — Hero / Intro pinned scroll / Services / Traction / VirtualCard (How it works) / BuiltFor / Comparison / global FAQ / global Footer
- `http://localhost:3000/business` — page renders + global FAQ + Footer
- `http://localhost:3000/cards` — slim header + VirtualCard re-render + global FAQ + Footer
- `http://localhost:3000/contact` — contact info + socials + global FAQ + Footer

Page tab `<title>` should be Swahilies-correct on each route (set in Section 1).

- [ ] **Step 3: Mobile viewport pass**

Resize to ~360px and walk through `/` again. Confirm responsive behavior on Hero chips, Intro card swarm, Traction card carousel, Comparison stacked view, FAQ accordion, Footer.

### Task 8: Commit Phase B

- [ ] **Step 1: Stage and commit**

```bash
git add app/globals.css app/contact/page.jsx
git commit -m "$(cat <<'EOF'
section 6 final pass: strip zombie css + contact page polish

Delete the dead .why-keytom-* class family (section bg, watermark,
stars, stat cards, links) and .footer-lower__* family from
globals.css - none of the new Swahilies components use those
selectors. Remove the dead .intro-headline2 rule and the
.keytom-heading responsive override.

Clean up app/contact/page.jsx: drop the lone remaining "Keytom"
reference, remove the dead PiTelegramLogoFill import + icon
(Section 5 dropped Telegram everywhere), and drop the unused
GiTireIronCross placeholder import.

Acceptance grep is now zero:
grep -RIin "keytom|IBAN|SEPA|crypto insurance|126+ countries"
app/ public/ -> no matches.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 2: Final verification**

```bash
git log --oneline -10
git status
```

Expected: working tree clean; the section 6 commits sit at the top of the log alongside sections 1–5.

---

## Section 6 acceptance criteria (recap)

- ✅ Six dead component files deleted (About / Actions / Cards / Groups / Video / Comparison.jsx).
- ✅ Six dead module CSS files deleted.
- ✅ `globals.css` has no `.why-keytom-*`, no `.footer-lower__*`, no `.intro-headline2`, no `.keytom-heading` rules.
- ✅ `app/contact/page.jsx` has no Keytom reference and no dead Telegram / GiTireIronCross imports.
- ✅ `grep -RIin "keytom\|IBAN\|SEPA\|crypto insurance\|126+ countries" app/ public/` returns zero matches.
- ✅ `npm run build` is clean; all 9 routes prerender.
- ✅ All routes render visually correct in dev server.

## Out of scope (acknowledged but not done in this section)

- A proper 1200×630 OG image (currently we reuse the lockup `og-image.jpeg`). A future polish task.
- Converting `app/favicon.ico` to a true .ico from the Swahilies mark (Next.js auto-uses `app/icon.png` for modern browsers; the legacy `.ico` is the Keytom one as a fallback). A future polish task.
- The `app/business/page.tsx` content — it's 24 lines and renders something; if it has Keytom strings, the acceptance grep above will catch them. If the page is mostly empty/placeholder, that's a content task for whoever builds out the business page proper.
- Accessibility audit (color contrast, focus states, keyboard nav).
- Lighthouse / Core Web Vitals pass.
- Real OG image testing (paste a URL into Twitter/LinkedIn debuggers).
- Removing the 8 npm-audit vulnerabilities inherited from the template — separate dependency hygiene task.
