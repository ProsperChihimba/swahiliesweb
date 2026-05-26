# Section 1 — Brand Tokens + Global Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Define centralized Swahilies brand tokens in CSS, replace the Keytom logo + favicon, set proper page metadata, and fix the most visible Keytom strings (copyright, dead links, alt text). This lands the brand foundation that every later section relies on. No content rewrites yet — those happen in Sections 2–5.

**Architecture:** All new color tokens live in `app/globals.css :root` and the `[data-theme="light"]` block. Old token names (`--accent`, `--bg`, `--text`, etc.) become thin aliases pointing at the new `--color-*` tokens, so existing Keytom components keep rendering with the new palette (they'll be content-rewritten section by section). Per-page metadata uses Next.js App Router's `layout.tsx` convention for client pages (`/business`, `/cards`) so we don't have to refactor them.

**Tech Stack:** Next.js 16 App Router, Tailwind v4 (`@theme inline`), CSS custom properties. No new dependencies.

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `app/globals.css` | Modify | Add `--color-*` tokens, alias old `--accent`/`--bg`/etc to new tokens, drop Keytom-specific tokens |
| `public/assets/images/logo.png` | Replace contents | Swahilies dark-tile + gold-S logo (from `data/logo.png`) |
| `public/assets/images/og-image.jpeg` | Create | OG card image (from `data/logo_.jpeg` — full lockup) |
| `app/icon.png` | Create | Next.js auto-detected favicon (from `data/logo.png`) |
| `app/layout.jsx` | Modify | Site-wide `metadata` (title template, description, OG, icons) |
| `app/business/layout.tsx` | Create | Per-route metadata for `/business` (page is client component) |
| `app/cards/layout.tsx` | Create | Per-route metadata for `/cards` (page is client component) |
| `app/contact/page.jsx` | Modify | Inline `metadata` export (page is server component) |
| `app/components/Footer.jsx` | Modify | Copyright → "© Swahilies Inc. 2026", contact info, remove dead `<li>` items, delete commented Keytom legal blocks, swap alt text |
| `app/components/Navbar.jsx` | Modify | Logo alt text → "Swahilies", remove dead FAQ nav item (no page exists), update hardcoded hex colors that reference Keytom palette |

---

## Conventions for this section

- **No content rewrites.** Section 2+ will rewrite hero copy, services, comparison rows, etc. Section 1 is brand + global plumbing only.
- **TDD doesn't apply directly** (no unit tests for marketing components). Each task ends with a verification command (`npm run build`, dev server screenshot, or `grep`) that proves the change worked.
- **Two commits.** Commit A at end of Phase B (tokens + assets land together). Commit B at end of Phase D (metadata + cleanup).
- **Section 1 acceptance:** `npm run build` is clean; dev server `/` renders with new logo + colors; `grep -RIin "© Keytom" app/` returns nothing; `<title>` no longer says "Create Next App".

---

## Phase A — Brand tokens in CSS

### Task 1: Add new `--color-*` tokens to `:root`

**Files:**
- Modify: `app/globals.css:4-35` (`:root` block)

- [ ] **Step 1: Replace the `:root` block**

In `app/globals.css`, replace the existing `:root { ... }` block (lines 4–35) with this. The old token names (`--accent`, `--bg`, `--text`, etc.) are kept as aliases so existing components still work; new code consumes `--color-*`.

```css
:root {
  color-scheme: light;

  /* === Swahilies brand tokens (canonical) === */
  --color-primary:       #0E0E10;
  --color-accent:        #F0A020;
  --color-secondary:     #7C5CE0;
  --color-tertiary:      #F4A28C;

  --color-bg:            #FFFFFF;
  --color-surface:       #FAF7F2;
  --color-surface-alt:   #F2EEFF;
  --color-text:          #0E0E10;
  --color-muted:         #5C5C66;
  --color-subtle:        rgba(14, 14, 16, 0.55);
  --color-border:        rgba(14, 14, 16, 0.10);
  --color-border-strong: rgba(14, 14, 16, 0.20);

  --wash-lavender:       #E6E0F5;
  --wash-peach:          #FAE0D4;
  --wash-cream:          #FAF1D0;

  --color-success:       #2FA86A;
  --color-warning:       #E0A82E;
  --color-danger:        #D64550;

  /* === Legacy aliases (consumed by existing components) === */
  --bg:                  var(--color-bg);
  --bg-soft:             var(--color-surface);
  --surface:             rgba(14, 14, 16, 0.04);
  --surface-strong:      rgba(14, 14, 16, 0.06);
  --border:              var(--color-border);
  --border-strong:       var(--color-border-strong);
  --text:                var(--color-text);
  --text-muted:          var(--color-muted);
  --text-subtle:         var(--color-subtle);
  --accent:              var(--color-accent);
  --accent-contrast:     var(--color-primary);
  --accent-rgb:          240, 160, 32;
  --accent-faint:        rgba(240, 160, 32, 0.18);
  --nav-bg:              rgba(255, 255, 255, 0.75);
  --nav-border:          rgba(14, 14, 16, 0.08);
  --overlay:             rgba(14, 14, 16, 0.2);
  --gradient-end:        var(--color-primary);
  --card-shadow:         rgba(14, 14, 16, 0.12);
  --hero-orb:            rgba(240, 160, 32, 0.25);
  --hero-orb-secondary:  rgba(124, 92, 224, 0.18);
  --msg-two:             var(--color-text);
  --noise-opacity:       0.03;
  --radius:              0.625rem;
  --background:          var(--color-bg);
  --foreground:          var(--color-text);
  --card:                var(--color-surface);
  --card-foreground:     var(--color-text);
  --popover:             var(--color-surface);
  --popover-foreground:  var(--color-text);
}
```

- [ ] **Step 2: Drop the `[data-theme="light"]` override block**

The layout sets `data-theme="light"` and the `:root` is now light-by-default, so the override is dead weight. Delete `app/globals.css` lines 54–77 in their entirety (the `[data-theme="light"] { ... }` block).

- [ ] **Step 3: Verify the CSS parses**

Run:
```bash
npm run build
```
Expected: build completes; no PostCSS errors. (If build complains about unknown property syntax, fix the specific line it points to — every token in step 1 is plain CSS, so a failure means a typo.)

### Task 2: Replace Keytom tokens in `@theme inline`

**Files:**
- Modify: `app/globals.css:37-52` (`@theme inline` block)

- [ ] **Step 1: Replace the `@theme inline` block**

In `app/globals.css`, replace the existing `@theme inline { ... }` block (lines 37–52) with this. The Keytom blue/purple/peach Tailwind utilities are removed; Tailwind utilities for the new tokens are added so component code can use `text-primary`, `bg-accent`, etc.

```css
@theme inline {
  --color-background: var(--color-bg);
  --color-foreground: var(--color-text);
  --font-sans: "Inter", "Montserrat", sans-serif;
  --font-mono: var(--font-geist-mono);

  /* Brand tokens exposed to Tailwind */
  --color-primary:       var(--color-primary);
  --color-accent:        var(--color-accent);
  --color-secondary:     var(--color-secondary);
  --color-tertiary:      var(--color-tertiary);
  --color-surface:       var(--color-surface);
  --color-surface-alt:   var(--color-surface-alt);
  --color-muted:         var(--color-muted);
  --color-border:        var(--color-border);

  --color-wash-lavender: var(--wash-lavender);
  --color-wash-peach:    var(--wash-peach);
  --color-wash-cream:    var(--wash-cream);

  --color-success:       var(--color-success);
  --color-warning:       var(--color-warning);
  --color-danger:        var(--color-danger);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
  --radius-3xl: calc(var(--radius) + 12px);
  --radius-4xl: calc(var(--radius) + 16px);
}
```

- [ ] **Step 2: Update the `.text-gradient` utility**

Still in `app/globals.css`, find `.text-gradient { ... }` (around line 344). It uses the removed `--color-keytom-*` tokens. Replace its body with:

```css
.text-gradient {
  background: linear-gradient(135deg, var(--color-accent), var(--color-secondary), var(--color-tertiary));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

- [ ] **Step 3: Update `.intro-headline` + `.intro-headline2`**

In `app/globals.css`, find `.intro-headline` (around line 425) and `.intro-headline2` (around line 443). Both use Keytom hardcoded blue/purple/peach. Replace each `background:` line with the same gradient:

```css
background: linear-gradient(110deg, var(--color-accent), var(--color-tertiary) 45%, var(--color-secondary) 85%);
```

- [ ] **Step 4: Update `.mesh-gradient` and `.mesh-gradient-blue`**

In `app/globals.css`, replace the bodies of `.mesh-gradient` (around line 222) and `.mesh-gradient-blue` (around line 239) with neutral, brand-aligned gradients:

```css
.mesh-gradient {
  background:
    radial-gradient(circle at 15% 20%, var(--wash-lavender), transparent 55%),
    radial-gradient(circle at 85% 15%, var(--wash-peach), transparent 50%),
    linear-gradient(135deg, #fefcf8 0%, #fbf6ef 45%, #f4ecdf 100%);
}

.mesh-gradient-blue {
  background:
    radial-gradient(circle at 15% 20%, rgba(124, 92, 224, 0.20), transparent 55%),
    radial-gradient(circle at 85% 15%, rgba(240, 160, 32, 0.18), transparent 50%),
    linear-gradient(135deg, #0E0E10 0%, #161420 45%, #0E0E10 100%);
}
```

- [ ] **Step 5: Verify build still passes**

Run:
```bash
npm run build
```
Expected: build completes; no errors about undefined Tailwind classes.

### Task 3: Smoke test the dev server

**Files:** none — visual verification only.

- [ ] **Step 1: Start dev server**

Run (in a separate terminal or background):
```bash
npm run dev
```
Expected: server starts on `http://localhost:3000`.

- [ ] **Step 2: Open `/` in a browser and confirm**

- Hero pin section + intro: background is now warm cream + lavender washes (not the previous pink/peach Keytom mix).
- Any visible button/link that used the old `--accent` sage green now shows the gold `#F0A020`.
- Footer is still its original Keytom blue (intentional — we touch it in Phase D).

If text becomes unreadable on any section (e.g. cream-on-cream), note the section name and stop here — the contrast tweak belongs in this section, not later.

---

## Phase B — Logo + favicon assets

### Task 4: Replace the navbar/intro logo

**Files:**
- Replace contents: `public/assets/images/logo.png`

- [ ] **Step 1: Copy the Swahilies dark-tile logo over the Keytom one**

```bash
cp data/logo.png public/assets/images/logo.png
```

- [ ] **Step 2: Verify file size changed**

```bash
ls -la public/assets/images/logo.png data/logo.png
```
Expected: both files are the same byte size.

- [ ] **Step 3: Visual check in dev server**

Reload `http://localhost:3000`. The navbar logo (top-left) now shows the Swahilies dark-tile + gold S, not the Keytom mark.

### Task 5: Add the Next.js auto-favicon

**Files:**
- Create: `app/icon.png` (copied from `data/logo.png`)

- [ ] **Step 1: Copy logo to the app icon convention**

```bash
cp data/logo.png app/icon.png
```

Next.js App Router automatically wires `<link rel="icon">` from this file. The pre-existing `app/favicon.ico` is the legacy fallback; it stays in place but `icon.png` takes precedence in modern browsers.

- [ ] **Step 2: Verify in dev server**

In the browser tab for `http://localhost:3000`, the favicon switches from the Keytom mark to the Swahilies S after a hard refresh (`Cmd+Shift+R`). If it still shows Keytom, the browser cached it — try an incognito window.

### Task 6: Add the Open Graph card image

**Files:**
- Create: `public/assets/images/og-image.jpeg` (copied from `data/logo_.jpeg`)

- [ ] **Step 1: Copy the full lockup as OG image**

```bash
cp data/logo_.jpeg public/assets/images/og-image.jpeg
```

This is the lockup banner (black background + gold S tile + white "swahilies" wordmark). It's not 1200×630 — a proper OG image is a Section 6 polish item.

- [ ] **Step 2: Verify the file exists**

```bash
ls -la public/assets/images/og-image.jpeg
```
Expected: file present, ~14 KB.

### Task 7: Commit Phase A + B

- [ ] **Step 1: Stage and commit**

```bash
git add app/globals.css public/assets/images/logo.png public/assets/images/og-image.jpeg app/icon.png
git commit -m "$(cat <<'EOF'
swahilies brand tokens + logo swap

Centralize color tokens in :root (--color-primary, --color-accent, etc.)
and alias the old --accent/--bg/--text names to point at them so existing
components keep rendering. Drop the Keytom blue/purple/peach tokens and
the dead [data-theme="light"] override. Update .text-gradient,
.intro-headline*, .mesh-gradient* to use the new palette.

Replace public/assets/images/logo.png with the Swahilies dark-tile + gold
S mark. Add app/icon.png so Next.js wires the favicon automatically.
Drop in the lockup as the placeholder OG image.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 2: Verify clean working tree**

```bash
git status
```
Expected: "nothing to commit, working tree clean".

---

## Phase C — Page metadata

### Task 8: Site-wide metadata in root layout

**Files:**
- Modify: `app/layout.jsx:17-20`

- [ ] **Step 1: Replace the `metadata` const**

In `app/layout.jsx`, replace the existing metadata export (lines 17–20):

```js
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
```

with:

```js
export const metadata = {
  metadataBase: new URL("https://swahilies.com"),
  title: {
    default: "Swahilies — Bookkeeping and Payments App for African SMEs",
    template: "%s · Swahilies",
  },
  description:
    "Swahilies is the operating and financial system for African SMEs. Manage sales, stock, and debts; receive and send cross-border payments; and access credit — all in one app.",
  applicationName: "Swahilies",
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    title: "Swahilies — Bookkeeping and Payments App for African SMEs",
    description:
      "One app for business management, cross-border payments, and credit access. Built for African SMEs.",
    url: "https://swahilies.com",
    siteName: "Swahilies",
    images: [{ url: "/assets/images/og-image.jpeg" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swahilies — Bookkeeping and Payments App for African SMEs",
    description:
      "One app for business management, cross-border payments, and credit access. Built for African SMEs.",
    images: ["/assets/images/og-image.jpeg"],
  },
};
```

- [ ] **Step 2: Verify the build is clean**

```bash
npm run build
```
Expected: build completes; no TypeScript / metadata-schema warnings.

- [ ] **Step 3: Verify the rendered title**

In the running dev server, open `/` and inspect the page source (`view-source:http://localhost:3000/`). The `<title>` tag should now read "Swahilies — Bookkeeping and Payments App for African SMEs" — not "Create Next App".

### Task 9: Per-route metadata for `/business` and `/cards`

**Files:**
- Create: `app/business/layout.tsx`
- Create: `app/cards/layout.tsx`

These pages are `"use client"` components, so we can't add a `metadata` export inside them. Next.js App Router supports a `layout.tsx` per route — placing one alongside the client page lets us set route-level metadata without touching the page itself.

- [ ] **Step 1: Create `app/business/layout.tsx`**

```tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Business",
  description:
    "Manage sales, stock, and debts; receive digital payments; pay suppliers locally and abroad — built for African SMEs.",
};

export default function BusinessLayout({ children }: { children: ReactNode }) {
  return children;
}
```

- [ ] **Step 2: Create `app/cards/layout.tsx`**

```tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How Swahilies works: business management, collection & banking, and credit & lending in one app.",
};

export default function CardsLayout({ children }: { children: ReactNode }) {
  return children;
}
```

(Note: `/cards` is the URL we'll keep through the rebrand — the brief says it will be repurposed as "How It Works." The title reflects the repurpose; the route stays.)

- [ ] **Step 3: Verify**

Open `http://localhost:3000/business` — page source `<title>` should read "Business · Swahilies".
Open `http://localhost:3000/cards` — page source `<title>` should read "How it works · Swahilies".

### Task 10: Add metadata to `/contact`

**Files:**
- Modify: `app/contact/page.jsx` (top of file)

- [ ] **Step 1: Add the metadata export at the top of the file**

Open `app/contact/page.jsx`. Below the existing imports (after `import Image from "next/image";` line 1), add:

```jsx
export const metadata = {
  title: "Contact",
  description:
    "Get in touch with the Swahilies team — contact@swahilies.com or +255 682 411 725.",
};
```

- [ ] **Step 2: Verify**

Open `http://localhost:3000/contact` — page source `<title>` should read "Contact · Swahilies".

---

## Phase D — Footer + Navbar visible Keytom strings

### Task 11: Footer copyright + contact + alt text + dead-content cleanup

**Files:**
- Modify: `app/components/Footer.jsx`

- [ ] **Step 1: Replace copyright text**

In `app/components/Footer.jsx` line 156, change:

```jsx
© Keytom Ltd 2026
```

to:

```jsx
© Swahilies Inc. 2026
```

- [ ] **Step 2: Replace placeholder lists with real Discover / Get-in-touch entries**

The current footer has dead `<li>` items (Personal/Business/Cards/FAQ, Terms/AML/Privacy, Blog, Email) — none are links. Per the spec, we drop the Legal column (no policy pages exist yet) and the Company column (About + Blog don't exist), leaving Discover + Get-in-touch.

Replace the entire `<div className="grid grid-cols-4 ...">` block — from line 44 through its closing `</div>` at line 90 — with:

```jsx
<div className="grid grid-cols-2 gap-16 max-[900px]:gap-7 text-white max-[900px]:grid-cols-1 max-w-2xl">
  <div className="space-y-4 max-[900px]:space-y-0">
    <div className="flex items-center gap-2 text-[#f6e2a3] font-semibold uppercase text-[0.95rem] tracking-wide">
      <span className="w-2 h-2 rounded-full bg-[#f6e2a3]" />
      Discover
    </div>
    <ul className="space-y-3 max-[900px]:text-[0.8rem] text-[1rem] max-[900px]:space-y-1">
      <li><a href="/business" className="hover:underline">Business</a></li>
      <li><a href="/cards" className="hover:underline">How it works</a></li>
      <li><a href="/contact" className="hover:underline">Contact</a></li>
    </ul>
  </div>

  <div className="space-y-4 max-[900px]:space-y-0">
    <div className="flex items-center gap-2 text-[#f6e2a3] font-semibold uppercase text-[0.95rem] tracking-wide">
      <span className="w-2 h-2 rounded-full bg-[#f6e2a3]" />
      Get in touch
    </div>
    <ul className="space-y-3 max-[900px]:text-[0.8rem] text-[1rem] max-[900px]:space-y-1">
      <li><a href="mailto:contact@swahilies.com" className="hover:underline">contact@swahilies.com</a></li>
      <li><a href="tel:+255682411725" className="hover:underline">+255 682 411 725</a></li>
    </ul>
  </div>
</div>
```

(FAQ moves out of the footer until Section 5 wires it to the accordion anchor.)

- [ ] **Step 3: Delete the commented-out Keytom legal paragraphs**

In `app/components/Footer.jsx`, delete the commented `{/* ... */}` blocks at lines 167–199. Those blocks contain "KEYTOM", "FINTRAC", etc., and are dead code — they fail the final acceptance grep.

The visible paragraph (`<p>Not all products and services...</p>` lines 162–166) is generic; keep it.

- [ ] **Step 4: Verify the footer renders**

Reload `http://localhost:3000`. Scroll to the footer:
- Copyright reads "© Swahilies Inc. 2026".
- Three columns (Discover / Company / Get in touch) — no Legal column, no dead Personal/Cards/FAQ-without-anchor items.
- Email link opens mail client; phone link opens dialer (test on a device with handlers).

### Task 12: Navbar logo alt text + nav items audit

**Files:**
- Modify: `app/components/Navbar.jsx`

- [ ] **Step 1: Replace alt text on both `<Image>` instances**

In `app/components/Navbar.jsx` line 104, change:

```jsx
<Image src={logo} alt="Keytom logo" priority className="h-5 w-auto" />
```

to:

```jsx
<Image src={logo} alt="Swahilies" priority className="h-5 w-auto" />
```

And in line 182 (mobile menu):

```jsx
<Image
  src={logo}
  alt="Keytom logo"
  priority
  className="h-7 w-auto"
/>
```

to:

```jsx
<Image
  src={logo}
  alt="Swahilies"
  priority
  className="h-7 w-auto"
/>
```

- [ ] **Step 2: Drop the FAQ nav item (no `/faq` route exists)**

In `app/components/Navbar.jsx` line 87, change:

```jsx
const navItems = ["CONTACT", "BUSINESS", "CARDS", "FAQ"];
```

to:

```jsx
const navItems = ["BUSINESS", "CARDS", "CONTACT"];
```

(`CARDS` will be relabeled "HOW IT WORKS" in Section 4 when we rewrite the page; the route stays `/cards`. Keeping the label CARDS in Section 1 preserves visual continuity.)

- [ ] **Step 3: Verify navbar renders**

Reload `http://localhost:3000`. The navbar now shows three items (Business / Cards / Contact); no FAQ link. Clicking each lands on the right route.

### Task 13: Final acceptance check

**Files:** none — verification only.

- [ ] **Step 1: Run the visible-string grep**

```bash
grep -RIin "© Keytom\|Keytom Ltd\|Keytom logo\|alt=\"Keytom" app/
```
Expected: no matches. (We are intentionally leaving filenames like `WhyKeytom.jsx` and CSS class names like `.why-keytom-card` — those are renamed in Sections 3 and 4 when their content is rewritten.)

- [ ] **Step 1b: Run the full Section 6 grep — informational only**

```bash
grep -RIin "keytom\|IBAN\|SEPA\|crypto insurance\|126+ countries" app/ public/ 2>/dev/null | wc -l
```
This is the final-acceptance grep that must return zero at the end of Section 6. Right now it will still match plenty of things (component filenames, CSS classes, body copy in Hero/Services/Comparison/FAQ). Note the count — it should shrink as later sections land. Do not try to drive it to zero in this section.

- [ ] **Step 2: Run the build**

```bash
npm run build
```
Expected: build completes; no errors.

- [ ] **Step 3: Confirm the dev server still renders**

Reload `http://localhost:3000`, `/business`, `/cards`, `/contact`. None of the pages crash. Page source `<title>` on each route reflects the Section 1 metadata.

### Task 14: Commit Phase C + D

- [ ] **Step 1: Stage and commit**

```bash
git add app/layout.jsx app/business/layout.tsx app/cards/layout.tsx app/contact/page.jsx app/components/Footer.jsx app/components/Navbar.jsx
git commit -m "$(cat <<'EOF'
section 1 global cleanup: metadata, footer, navbar

Set proper site-wide + per-route metadata (title template, OG, icons)
so /<route> tabs and link previews show real Swahilies info instead of
"Create Next App". Per-route layouts are used for /business and /cards
because their pages are client components.

Footer: copyright -> Swahilies Inc. 2026, real contact mailto/tel,
remove dead Personal/Cards/FAQ/Blog/Email list items and the unused
Legal column, delete the commented Keytom regulatory paragraphs.

Navbar: drop FAQ nav item (no /faq route), update logo alt text.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 2: Verify**

```bash
git status
git log --oneline -3
```
Expected: clean working tree; the last two commits are the Phase B and Phase D commits from this section.

---

## Section 1 acceptance criteria (recap)

- ✅ `app/globals.css` defines `--color-*` brand tokens, with legacy `--accent`/`--bg`/`--text` aliased to them.
- ✅ `public/assets/images/logo.png` is the Swahilies logo (not Keytom).
- ✅ `app/icon.png` exists; favicon shows the Swahilies S in browser tab.
- ✅ `<title>` is "Swahilies — Bookkeeping and Payments App for African SMEs" on `/`, "Business · Swahilies" on `/business`, "How it works · Swahilies" on `/cards`, "Contact · Swahilies" on `/contact`.
- ✅ Footer copyright reads "© Swahilies Inc. 2026"; commented Keytom legal paragraphs are removed.
- ✅ Footer has real `mailto:` and `tel:` links; no dead-anchor `<li>` items.
- ✅ Navbar has no dead FAQ link; alt text is "Swahilies".
- ✅ `grep -RIin "© Keytom\|Keytom Ltd\|Keytom logo\|alt=\"Keytom" app/` returns nothing.
- ✅ `npm run build` is clean.

## Out of scope for Section 1 (explicit deferrals)

- Component file renames (`WhyKeytom.jsx` → `Traction.jsx`, `VirtualCard.tsx` → `HowItWorks.tsx`) — happens in Sections 3 and 4 when content is rewritten.
- CSS class renames (`.why-keytom-*`, `.intro-headline*`, `.footer-lower__*`) — same; rewritten with content.
- Hero copy ("Imagine more — Combine your crypto and fiat...") — Section 2.
- Services / Comparison / FAQ / Built-for content — their respective sections.
- Replacing `swahi1.png` / `phone2.png` / `card1.jpeg` / `card2.jpeg` with real app screenshots — done per section when each component is rewritten; final sweep in Section 6.
- Generating a real 1200×630 OG image and converting `app/favicon.ico` to a true `.ico` from the Swahilies mark — Section 6 polish.
