# Section 2 — Hero + Services Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Keytom "Financial Institution / Imagine more" hero and the four crypto/IBAN service cards with Swahilies content. Hero becomes "Bookkeeping and payments, built for African SMEs" with real App Store + Google Play badges and a row of Malipo / Wateja / Invoice / Loans feature chips. Services becomes "Manage your business — all in one app" with the three deck pillars (Business Management, Collection & Banking, Credit & Lending). The footer's previously-dead App Store / Google Play buttons get wired to the same URLs.

**Architecture:** Pure content + token-substitution work inside two existing client components (`Hero.jsx`, `Services.tsx`) and one server-rendered component (`Footer.jsx`). Animations stay; the GSAP timeline already targets refs by name and works with whatever children we put in. Decorative orbs that referenced the dead `bg-keytom-*` Tailwind classes get rewired to the new tokens. App store URLs come from a single shared constant so the hero, services-section, and footer can't drift.

**Tech Stack:** React 19, Tailwind v4 (`@theme inline` tokens from Section 1), GSAP for hero animation, `react-icons/fa` for App Store / Google Play marks. No new dependencies.

**App store URLs (confirmed by Prosper, treated as the real app while store-listing rename is pending — no "Kuza" appears on the site):**

- App Store: `https://apps.apple.com/tz/app/kuza-business/id1616310003`
- Google Play: `https://play.google.com/store/apps/details?id=com.kuza.com&hl=en`

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `app/lib/storeLinks.ts` | Create | Single source of truth for App Store + Google Play URLs |
| `app/components/Hero.jsx` | Modify (full content rewrite) | New headline / subhead / description / CTAs / chip row; fix dead `bg-keytom-*` classes |
| `app/components/Services.tsx` | Modify (content rewrite + section bg) | "Manage your business" title, 3 pillar entries, wire store badges, replace Keytom blue background with Swahilies primary |
| `app/components/Footer.jsx` | Modify (wire store badges) | Turn the two dead `<button>` store badges into anchor links pointing at the shared URLs |

---

## Conventions for this section

- **No CSS file edits.** Section 1 already centralized tokens. Section 2 stays inside JSX/TSX.
- **Two commits.** Commit A at end of Phase A (Hero done). Commit B at end of Phase C (Services + Footer badges).
- **Section 2 acceptance:**
  - `<h1>` on `/` no longer reads "Financial Institution" / "Imagine more"; reads the Swahilies headline.
  - Hero CTAs are two anchor links (App Store + Google Play) opening in a new tab.
  - Services section title reads "Manage your business — all in one app" with three pillars.
  - Footer App Store / Google Play badges are now `<a>` tags with the shared URLs.
  - `grep -RIin "Financial Institution\|Imagine more\|crypto\|IBAN\|SEPA" app/components/Hero.jsx app/components/Services.tsx` returns nothing.
  - `npm run build` is clean.

---

## Phase A — Hero rewrite

### Task 1: Create the shared store-links constant

**Files:**
- Create: `app/lib/storeLinks.ts`

- [ ] **Step 1: Create the file**

```ts
export const APP_STORE_URL =
  "https://apps.apple.com/tz/app/kuza-business/id1616310003";

export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.kuza.com&hl=en";
```

(The URLs reference the existing Kuza Business store listings while the rename to Swahilies is pending — agreed with Prosper. No "Kuza" appears on the marketing site itself; only the destination of these two links.)

- [ ] **Step 2: Verify file exists**

```bash
ls -la app/lib/storeLinks.ts
```
Expected: file present.

### Task 2: Rewrite Hero content

**Files:**
- Modify: `app/components/Hero.jsx`

- [ ] **Step 1: Replace the imports**

In `app/components/Hero.jsx`, replace lines 1–8 (the existing `'use client'` + imports block) with:

```jsx
'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { FaApple, FaGooglePlay } from 'react-icons/fa'
import { useGSAP } from '@gsap/react'
import { APP_STORE_URL, PLAY_STORE_URL } from '../lib/storeLinks'
```

(`ArrowRight`, the star image, and `Image` are no longer used — the hero no longer has the star/line/orb decoration; cleaner palette.)

- [ ] **Step 2: Simplify the refs**

Replace lines 11–19 (the `useRef` block) with:

```jsx
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const ctaRef = useRef(null)
  const chipsRef = useRef(null)
```

(`subtitleRef`, `visualRef`, `starRef`, `redLineRef`, `blueLineRef` are dropped — the elements they targeted are gone.)

- [ ] **Step 3: Replace the GSAP timeline**

Replace the entire `useGSAP` block (lines 21–102) with this shorter timeline that animates only the elements we now render:

```jsx
  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

      tl.from(titleRef.current, {
        y: -60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      })

      tl.from(
        descRef.current,
        { y: -30, opacity: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.5',
      )

      tl.from(
        ctaRef.current,
        { y: 30, opacity: 0, duration: 0.7, ease: 'back.out(1.5)' },
        '-=0.3',
      )

      tl.from(
        chipsRef.current?.children ?? [],
        { y: 20, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
        '-=0.4',
      )
    }, heroRef)

    return () => ctx.revert()
  }, { scope: heroRef })
```

- [ ] **Step 4: Replace the JSX body**

Replace the entire `return (...)` block (lines 104–173) with:

```jsx
  return (
    <section
      ref={heroRef}
      className="hero-pin min-h-screen mesh-gradient overflow-hidden pt-20 pb-24 max-[768px]:pt-24 max-[768px]:pb-16"
    >
      {/* Decorative wash orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl max-[768px]:hidden"
           style={{ background: 'var(--wash-lavender)', opacity: 0.7 }} />
      <div className="absolute bottom-24 right-10 w-[28rem] h-[28rem] rounded-full blur-3xl max-[768px]:hidden"
           style={{ background: 'var(--wash-peach)', opacity: 0.7 }} />
      <div className="absolute bottom-16 left-1/3 w-80 h-80 rounded-full blur-3xl max-[768px]:hidden"
           style={{ background: 'var(--wash-cream)', opacity: 0.7 }} />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div ref={titleRef} className="max-w-4xl">
          <h1
            className="text-[clamp(2.4rem,7vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.02em]"
            style={{ color: 'var(--color-primary)' }}
          >
            Bookkeeping and payments,
            <br />
            built for African SMEs.
          </h1>
        </div>

        <p
          ref={descRef}
          className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed"
          style={{ color: 'var(--color-muted)' }}
        >
          One app for business management, cross-border payments, and credit
          access. Track sales, stock, and debts; pay suppliers locally and
          abroad at fair rates; and unlock loans powered by your transaction
          history.
        </p>

        <div
          ref={ctaRef}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-md bg-[var(--color-primary)] text-white px-5 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <FaApple className="text-xl" />
            <span className="flex flex-col items-start leading-tight">
              <span className="text-[0.65rem] font-medium opacity-80">Download on the</span>
              <span>App Store</span>
            </span>
          </a>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-md bg-[var(--color-primary)] text-white px-5 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <FaGooglePlay className="text-xl" />
            <span className="flex flex-col items-start leading-tight">
              <span className="text-[0.65rem] font-medium opacity-80">Get it on</span>
              <span>Google Play</span>
            </span>
          </a>
        </div>

        <div
          ref={chipsRef}
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl"
        >
          {[
            { sw: 'Malipo', en: 'Payments' },
            { sw: 'Wateja', en: 'Customers' },
            { sw: 'Invoice', en: 'Invoicing' },
            { sw: 'Loans', en: 'Credit' },
          ].map((chip) => (
            <div
              key={chip.sw}
              className="rounded-xl border px-4 py-3 backdrop-blur-sm"
              style={{
                background: 'rgba(255, 255, 255, 0.6)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div
                className="text-base font-semibold leading-tight"
                style={{ color: 'var(--color-primary)' }}
              >
                {chip.sw}
              </div>
              <div
                className="text-xs mt-0.5"
                style={{ color: 'var(--color-muted)' }}
              >
                {chip.en}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Verify the build**

```bash
npm run build 2>&1 | tail -15
```
Expected: build completes, no errors. (Type warnings about the `chipsRef.current?.children ?? []` cast are acceptable — `useGSAP` accepts an `HTMLCollection`-shaped target.)

- [ ] **Step 6: Smoke test in dev server**

If not already running, start:
```bash
npm run dev
```

Open `http://localhost:3000`. The hero now reads "Bookkeeping and payments, built for African SMEs." with a description below, two dark App Store / Google Play buttons, and four feature chips (Malipo / Wateja / Invoice / Loans with English subtitles). Three soft wash orbs (lavender / peach / cream) sit behind the content. Click each store button — opens the App Store / Play Store listing in a new tab.

### Task 3: Commit Phase A

- [ ] **Step 1: Stage and commit**

```bash
git add app/lib/storeLinks.ts app/components/Hero.jsx
git commit -m "$(cat <<'EOF'
section 2 hero: swahilies headline + app store ctas + feature chips

Replace the Keytom "Financial Institution / Imagine more" hero with the
Swahilies headline ("Bookkeeping and payments, built for African SMEs."),
real App Store + Google Play CTAs, and a row of four feature chips with
Swahili labels and English subtitles (Malipo / Wateja / Invoice / Loans).

Move the App Store and Google Play URLs into app/lib/storeLinks.ts as a
single source of truth so the hero, services section, and footer can't
drift apart. The URLs target the existing Kuza Business store listings
while the rename is pending; no "Kuza" appears in marketing copy.

Slim the GSAP timeline to animate only the elements still present
(headline, description, CTAs, chips). Replace the dead bg-keytom-* blur
orbs with three soft wash orbs (lavender / peach / cream) using the
Section-1 tokens.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 2: Verify clean tree**

```bash
git status
git log --oneline -2
```
Expected: working tree clean; latest commit is the hero rewrite.

---

## Phase B — Services rewrite

### Task 4: Rewrite the `services` array

**Files:**
- Modify: `app/components/Services.tsx`

- [ ] **Step 1: Replace imports + services array**

In `app/components/Services.tsx`, replace lines 1–54 (imports + the four-entry `services` array) with:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import image from "../../public/assets/images/swahi1.png";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { FaApple, FaGooglePlay, FaBook, FaUniversity, FaHandHoldingUsd } from "react-icons/fa";
import { APP_STORE_URL, PLAY_STORE_URL } from "../lib/storeLinks";

const services = [
  {
    icon: FaBook,
    title: "Business management",
    description:
      "SMEs manage sales, stock, and debts on Swahilies — improving record-keeping and reducing losses. Built around how African small businesses actually run.",
    label: "business management",
  },
  {
    icon: FaUniversity,
    title: "Collection & banking",
    description:
      "Receive digital payments from customers and pay suppliers locally and abroad at fair rates. Saves time, reduces costs, and builds the trust SMEs need to grow.",
    label: "collection & banking",
  },
  {
    icon: FaHandHoldingUsd,
    title: "Credit & lending",
    description:
      "Request loans directly from the app. Your daily transactions build a credit profile that makes you visible to our lending partners — capital-light, risk-free.",
    label: "credit & lending",
  },
];
```

(Note: `TbArrowsExchange2`, `FaExchangeAlt`, `FaWallet`, `FaBolt`, `FaCreditCard` are no longer imported — the new pillars use the three new icons.)

- [ ] **Step 2: Update activeIndex initial state**

In the same file, find:

```tsx
  const [activeIndex, setActiveIndex] = useState(1);
```

and change to:

```tsx
  const [activeIndex, setActiveIndex] = useState(0);
```

(The previous default of `1` was second-of-four; now we have three entries — starting at index 0 reads more honestly.)

- [ ] **Step 3: Verify the file's interior types compile**

```bash
npm run build 2>&1 | tail -15
```
Expected: build completes. If TS complains about the icon types, the icons we import are all `IconType` and assignment to `icon` on the entries is structurally compatible.

### Task 5: Rewrite the section title and wire store badges

**Files:**
- Modify: `app/components/Services.tsx`

- [ ] **Step 1: Replace the section title**

In `app/components/Services.tsx`, find the title block:

```tsx
        <h2
          ref={titleRef}
          className="text-center font-semibold leading-[1.1] text-5xl mb-12 max-[768px]:text-2xl"
        >
          <span className="block">Manage your fiat and crypto</span>
          <span className="block">-all in one app</span>
        </h2>
```

Replace with:

```tsx
        <h2
          ref={titleRef}
          className="text-center font-semibold leading-[1.1] text-5xl mb-12 max-[768px]:text-2xl"
        >
          <span className="block">Manage your business</span>
          <span className="block">— all in one app</span>
        </h2>
```

- [ ] **Step 2: Update the section background to Swahilies primary**

Find the opening `<section ref={sectionRef} ...>` (currently around line 98):

```tsx
    <section
      ref={sectionRef}
      data-nav-theme="light"
      className="bg-[#3c56ab]  relative  z-40 text-white py-28 max-[900px]:py-20"
    >
```

Replace with:

```tsx
    <section
      ref={sectionRef}
      data-nav-theme="light"
      className="relative z-40 text-white py-28 max-[900px]:py-20"
      style={{ background: 'var(--color-primary)' }}
    >
```

- [ ] **Step 3: Update the inner card background**

Find the inner card (currently around line 115):

```tsx
            className="relative w-full max-w-[54rem] min-w-[53rem] bg-[#3d57b0] border border-white/20 lg:rounded-[14px] md:rounded-[14px] px-7 py-6 max-[900px]:min-w-0 max-[900px]:max-w-full max-[768px]:px-5 max-[768px]:py-5"
```

Replace with:

```tsx
            className="relative w-full max-w-[54rem] min-w-[53rem] border border-white/20 lg:rounded-[14px] md:rounded-[14px] px-7 py-6 max-[900px]:min-w-0 max-[900px]:max-w-full max-[768px]:px-5 max-[768px]:py-5"
            style={{ background: 'rgba(255, 255, 255, 0.04)' }}
```

(Subtle translucent overlay on the dark primary — replaces the Keytom blue inner card.)

- [ ] **Step 4: Update the badge dot color**

In the same file, find the two `<span className="w-2 h-2 rounded-full bg-[#ffefac]" />` instances (lines ~121 and the right-side text block has the title with `text-[#ffefac]`). Replace ALL `bg-[#ffefac]` with `style={{ background: 'var(--color-accent)' }}` and `text-[#ffefac]` with `style={{ color: 'var(--color-accent)' }}` for the matching active service title (use the existing `className` minus `text-[#ffefac]`).

For the badge dot on line ~121, replace:
```tsx
                  <span className="w-2 h-2 rounded-full bg-[#ffefac]" />
```
with:
```tsx
                  <span className="w-2 h-2 rounded-full" style={{ background: 'var(--color-accent)' }} />
```

For the two `<h3>` blocks (lines ~126 and ~146), replace the `text-[#ffefac]` class with an inline `style`:

Find:
```tsx
                  <h3 className="text-[1.7rem] font-semibold text-[#ffefac] mb-3">
                    {activeService.title}
                  </h3>
```
Replace with:
```tsx
                  <h3
                    className="text-[1.7rem] font-semibold mb-3"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    {activeService.title}
                  </h3>
```

And the mobile sibling:
```tsx
                <h3 className="text-[1rem] font-semibold text-[#ffefac] mb-3">
                  {activeService.title}
                </h3>
```
Replace with:
```tsx
                <h3
                  className="text-[1rem] font-semibold mb-3"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {activeService.title}
                </h3>
```

- [ ] **Step 5: Wire the store badges to real URLs**

Find the two App Store / Google Play `<button>` elements at the bottom of the file (around lines 187–204). Replace the entire `<div className="flex flex-wrap gap-2">...</div>` block (the wrapper containing both buttons) with:

```tsx
          <div className="flex flex-wrap gap-2">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative border border-white/70 rounded-1 px-2 py-1 pl-6 bg-transparent text-white font-semibold text-[0.7rem] leading-[1.1] flex flex-col items-start hover:bg-white/10 transition-colors"
            >
              <span className="absolute left-[4px] top-1/2 -translate-y-1/2 text-[1.15rem] opacity-95">
                <FaApple />
              </span>
              <span className="text-[0.5rem] font-medium opacity-80">
                Download on the
              </span>
              App Store
            </a>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative border border-white/70 rounded-1 px-2 py-1 pl-6 bg-transparent text-white font-semibold text-[0.7rem] leading-[1.1] flex flex-col items-start hover:bg-white/10 transition-colors"
            >
              <span className="absolute left-[4px] top-1/2 -translate-y-1/2 text-[1.15rem] opacity-95">
                <FaGooglePlay />
              </span>
              <span className="text-[0.5rem] font-medium opacity-80">
                Get it on
              </span>
              Google Play
            </a>
          </div>
```

- [ ] **Step 6: Smoke test**

Reload `http://localhost:3000`. Scroll to the Services section:
- Background is now Swahilies near-black (not Keytom blue).
- Title reads "Manage your business — all in one app".
- The cycling card shows three pillars (Business management / Collection & banking / Credit & lending), auto-rotating every 3.5s.
- The pill labels at the bottom read "business management", "collection & banking", "credit & lending".
- Tapping an App Store / Google Play badge opens the right store page in a new tab.

---

## Phase C — Footer store badges

### Task 6: Wire Footer App Store + Google Play buttons

**Files:**
- Modify: `app/components/Footer.jsx`

- [ ] **Step 1: Add the import at the top of the file**

In `app/components/Footer.jsx`, find the existing import block (lines 3–13). After the existing imports, add:

```jsx
import { APP_STORE_URL, PLAY_STORE_URL } from "../lib/storeLinks";
```

- [ ] **Step 2: Convert the two store buttons to anchor links**

Find the App Store + Google Play `<button>` pair (currently around lines 94–111). Replace the entire pair with `<a>` elements that include the URLs and standard target/rel:

```jsx
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative border border-white/70 rounded-1 px-2 py-1 pl-6 bg-transparent text-white font-semibold text-[0.7rem] max-[900px]:text-[0.4rem] leading-[1.1] flex flex-col items-start hover:bg-white/10 transition-colors"
              >
                <span className="absolute left-[4px] top-1/2 -translate-y-1/2 lg:text-[1.15rem] md:text-[1.15rem] text-[0.8rem] opacity-95">
                  <FaApple />
                </span>
                <span className="text-[0.5rem] font-medium opacity-80">
                  Download on the
                </span>
                App Store
              </a>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative border border-white/70 rounded-1 px-2 py-1 pl-6 bg-transparent text-white font-semibold text-[0.7rem] max-[900px]:text-[0.4rem] leading-[1.1] flex flex-col items-start hover:bg-white/10 transition-colors"
              >
                <span className="absolute left-1 top-1/2 -translate-y-1/2 lg:text-[1.15rem] md:text-[1.15rem] text-[0.8rem] opacity-95">
                  <FaGooglePlay />
                </span>
                <span className="text-[0.5rem] font-medium opacity-80">
                  Get it on
                </span>
                Google Play
              </a>
```

- [ ] **Step 3: Smoke test**

Reload `http://localhost:3000`, scroll to the footer. Click the two store badges. Each opens the right store listing in a new tab.

---

## Phase D — Verify + commit

### Task 7: Acceptance check + Commit B

- [ ] **Step 1: Run the Section-2 grep**

```bash
grep -RIin "Financial Institution\|Imagine more\|crypto\|IBAN\|SEPA" app/components/Hero.jsx app/components/Services.tsx
```
Expected: no matches.

- [ ] **Step 2: Run the full Section-6 grep (informational)**

```bash
grep -RIin 'keytom\|IBAN\|SEPA\|crypto insurance\|126+ countries' app/ public/ 2>/dev/null | wc -l
```
Note the number. It should be lower than the 92 we hit at the end of Section 1.

- [ ] **Step 3: Build check**

```bash
npm run build 2>&1 | tail -15
```
Expected: build completes with zero errors.

- [ ] **Step 4: Stage and commit**

```bash
git add app/components/Services.tsx app/components/Footer.jsx
git commit -m "$(cat <<'EOF'
section 2 services + footer badges

Rewrite the Services section as the three deck pillars: Business
Management, Collection & Banking, Credit & Lending. Replace the
"Manage your fiat and crypto" headline and the four crypto/IBAN
service cards. Move the section background from Keytom blue to the
Swahilies near-black primary so the cards read on the new palette.
Wire the App Store and Google Play badges at the bottom of the
section to the shared URLs.

Convert the previously-dead App Store / Google Play <button>s in the
footer to <a> elements pointing at the same URLs. Both new and
existing link sites import from app/lib/storeLinks.ts so there's a
single source of truth.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 5: Final verify**

```bash
git log --oneline -3
git status
```
Expected: latest two commits are the Phase A and Phase D commits from this section; clean working tree.

---

## Section 2 acceptance criteria (recap)

- ✅ Hero headline: "Bookkeeping and payments, built for African SMEs." (no "Financial Institution / Imagine more").
- ✅ Hero CTAs: App Store + Google Play anchor links opening in new tabs.
- ✅ Hero chips: Malipo / Wateja / Invoice / Loans with English subtitles.
- ✅ Decorative orbs in hero use new `--wash-*` tokens (no `bg-keytom-*` dead classes).
- ✅ Services section title: "Manage your business — all in one app".
- ✅ Services entries: Business management / Collection & banking / Credit & lending (3 entries, cycling).
- ✅ Services background uses `--color-primary` (not Keytom blue `#3c56ab`).
- ✅ Footer App Store / Google Play badges are `<a>` tags with real URLs.
- ✅ Single source of truth: `app/lib/storeLinks.ts`.
- ✅ `grep -RIin "Financial Institution\|Imagine more\|crypto\|IBAN\|SEPA" app/components/Hero.jsx app/components/Services.tsx` returns nothing.
- ✅ `npm run build` is clean.

## Out of scope for Section 2 (explicit deferrals)

- Replacing `swahi1.png` (the placeholder phone image in the Services carousel) — Section 4 brings real app screenshots from `data/`.
- The Intro section (`Intro.jsx`) sitting between Hero and Services — its copy still talks about Keytom. Section 3 handles it as part of the cross-border-payments narrative.
- WhyKeytom → Traction rename + stats — Section 3.
- VirtualCard / cards page repurpose — Section 4.
- Comparison + FAQ + Footer content rewrite — Section 5.
- Touch-ups to the Services GSAP scroll-trigger registration (currently registered on the module level — fine, but a Section 6 cleanup candidate).
