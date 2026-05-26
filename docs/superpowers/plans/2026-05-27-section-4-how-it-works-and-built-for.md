# Section 4 — How It Works Walkthrough + Built For Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Keytom "Keytom Virtual" / card-flip walkthrough (currently in `VirtualCard.tsx` on home and again across 1097 lines of `app/cards/page.tsx`) with a Swahilies "How it works" 3-pillar walkthrough (Business Management / Collection & Banking / Credit & Lending). Drop the Individuals tab from `BuiltFor.tsx` and rewrite the Businesses panel with cross-border / multi-currency / onboarding / credit bullets. Slim the `/cards` page from 1097 lines to ~80 lines by reusing the new `<VirtualCard />`.

**Architecture:** `VirtualCard.tsx` keeps its existing GSAP item-reveal-on-scroll timeline structurally. We drop the 3D `rotateY` card-flip tween (no front/back faces to flip in the new design) and replace `card1.jpeg`/`card2.jpeg` on the left column with a stylized brand card. The 5-feature array shrinks to 3 pillars. `BuiltFor.tsx` drops its `activeTab` state, the tab buttons, and the Individuals panel; the Businesses panel is rewritten with new copy. `app/cards/page.tsx` becomes a thin server-renderable page: small hero header + `<VirtualCard />` re-render + small CTA strip.

**Tech Stack:** React 19, Tailwind v4, GSAP + ScrollTrigger, no new dependencies. Per-route metadata already set in Section 1 (`app/cards/layout.tsx` → "How it works · Swahilies").

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `app/components/VirtualCard.tsx` | Modify (content + visual rewrite) | 5 features → 3 pillars; drop `rotateY` flip tween; replace card1/card2 imgs with stylized brand block; rename section title from "Keytom Virtual" to "How it works"; convert dead colors to tokens |
| `app/components/BuiltFor.tsx` | Modify (remove tabs + rewrite Businesses) | Drop `useState` + tab buttons + Individuals branch; render single Businesses panel with new bullets; replace Keytom violet/pink card gradient with brand tokens |
| `app/cards/page.tsx` | Replace contents wholesale | New ~80-line page: hero header + `<VirtualCard />` + small App Store / Google Play CTA strip; drops ~1000 lines including the "PHYSICAL CARDS (COMING SOON)" section |

---

## Conventions for this section

- **Three commits.** Commit A at end of Phase A (`VirtualCard.tsx`). Commit B at end of Phase B (`BuiltFor.tsx`). Commit C at end of Phase C (`/cards` page).
- **VirtualCard's item-reveal GSAP is kept structurally** (we still want each pillar's description to fade in on scroll). Only the rotateY block is dropped.
- **No new image assets in this section.** The brand-block replacement for the card flip uses gradient + text + the Swahilies logo via `next/image` from the existing `public/assets/images/logo.png`.
- **Section 4 acceptance:**
  - VirtualCard section title is "How it works" (not "Keytom Virtual"); shows exactly 3 items.
  - No `card1.jpeg` / `card2.jpeg` references in `VirtualCard.tsx` or `app/cards/page.tsx`.
  - BuiltFor has no Individuals tab and renders one centered Businesses panel.
  - `/cards` route renders the same `<VirtualCard />` from home + a thin header + an App Store / Google Play strip.
  - `grep -RIin "Keytom\|crypto\|ATM\|virtual cards\|contactless\|130 million\|PHYSICAL CARDS\|COMING SOON" app/components/VirtualCard.tsx app/components/BuiltFor.tsx app/cards/page.tsx` returns nothing.
  - `npm run build` is clean.

---

## Phase A — VirtualCard: 3-pillar walkthrough

### Task 1: Replace the `features` array and section title

**Files:**
- Modify: `app/components/VirtualCard.tsx`

- [ ] **Step 1: Replace the 5-feature array with 3 pillars**

In `app/components/VirtualCard.tsx`, replace the existing `features` array (lines 8–40) with:

```tsx
const features: Array<{
  number: string;
  title: string;
  description: string;
  wash: string;
}> = [
  {
    number: "1",
    title: "Business Management",
    description:
      "Manage sales, stock, and debts on Swahilies. Better record-keeping, fewer losses — built around how Tanzanian SMEs actually run a business.",
    wash: "var(--wash-cream)",
  },
  {
    number: "2",
    title: "Collection & Banking",
    description:
      "Receive digital payments from customers and pay suppliers locally and abroad at fair rates. Bank transfer, mobile money, or stablecoin — settle in TZS, USD, CNY or INR.",
    wash: "var(--wash-lavender)",
  },
  {
    number: "3",
    title: "Credit & Lending",
    description:
      "Request loans directly in-app. Your day-to-day transactions build a credit profile that opens you up to our lending partners.",
    wash: "var(--wash-peach)",
  },
];
```

(Each pillar gains a `wash` token so the step indicator pill matches the deck's yellow / lavender / peach colors.)

- [ ] **Step 2: Rename the section title**

In the same file, find:

```tsx
        <h2
          ref={titleRef}
          className="text-[#3a57b5] relative z-50 font-semibold max-[900px]:text-[clamp(2rem,4vw,2rem)] text-[clamp(2.6rem,4.6vw,4.8rem)] mb-8"
        >
          Keytom Virtual
        </h2>
```

Replace with:

```tsx
        <h2
          ref={titleRef}
          className="relative z-50 font-semibold max-[900px]:text-[clamp(2rem,4vw,2rem)] text-[clamp(2.6rem,4.6vw,4.8rem)] mb-8"
          style={{ color: "var(--color-primary)" }}
        >
          How it works
        </h2>
```

### Task 2: Drop the `rotateY` flip + replace the left-column visual

**Files:**
- Modify: `app/components/VirtualCard.tsx`

The current left column has a 3D-flipping card stack with `card1.jpeg` and `card2.jpeg`. We drop the flip (no front/back faces in the new design) and replace the two `<img>` tags with a stylized brand card that uses the Swahilies logo.

- [ ] **Step 1: Drop the rotateY tween in the GSAP timeline**

In `app/components/VirtualCard.tsx`, find the `rotateY` block inside the GSAP timeline (currently lines 107–117):

```tsx
        if (cardFlipRef.current) {
          timeline.to(
            cardFlipRef.current,
            {
              rotateY: 360,
              ease: "none",
              duration: totalDuration,
            },
            0,
          );
        }
```

Delete the entire `if (cardFlipRef.current) { ... }` block. The `cardFlipRef` itself stays declared (the new left-column block still uses the ref so the existing `gsap.from(cardStackRef ...)` initial reveal still has something to target).

- [ ] **Step 2: Replace the left-column card visual**

In the same file, find the entire left-column visual (currently around lines 205–239):

```tsx
          <div className="flex items-center justify-center  min-h-105 sticky top-20 max-[900px]:static max-[900px]:min-h-[180px] max-[900px]:max-h-[200px] max-[900px]:mb-0">
            <div
              ref={cardStackRef}
              className="relative w-[min(90%,460px)] h-[320px] max-[900px]:w-[min(100%,340px)] max-[900px]:h-[240px]"
              style={{ perspective: "1000px" }}
            >
              <div
                ref={cardFlipRef}
                className="relative w-full 0 lg:h-full md:h-full h-fit"
                style={{
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                }}
              >
                <img
                  src="/assets/images/card1.jpeg"
                  alt="Keytom card front"
                  className="w-full lg:min-w-115 max-[900px]:h-47.5 z-40 rounded-[1px]  absolute lg:-top-9 lg:-left-9 md:-top-9 md:-left-9"
                  style={{
                    backfaceVisibility: "hidden",
                    
                  }}
                />
                <img
                  src="/assets/images/card2.jpeg"
                  alt="Keytom card back"
                  className="w-full lg:min-w-115 z-40 max-[900px]:h-47.5  -rotate-5 rounded-[1px]  absolute lg:-top-9 lg:-left-9 md:-top-9 md:-left-9"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                />
              </div>
            </div>
          </div>
```

Replace with:

```tsx
          <div className="flex items-center justify-center min-h-105 sticky top-20 max-[900px]:static max-[900px]:min-h-[260px] max-[900px]:mb-6">
            <div
              ref={cardStackRef}
              className="relative w-[min(90%,460px)] max-[900px]:w-full"
            >
              <div
                ref={cardFlipRef}
                className="relative w-full rounded-[20px] p-8 max-[900px]:p-6 overflow-hidden"
                style={{
                  background: "var(--color-primary)",
                  color: "#fff",
                  minHeight: 320,
                }}
              >
                <div
                  className="absolute -top-16 -right-16 w-[260px] h-[260px] rounded-full blur-2xl"
                  style={{ background: "var(--color-accent)", opacity: 0.35 }}
                />
                <div className="relative z-10 flex flex-col gap-3">
                  <div className="text-xs uppercase tracking-[0.25em] opacity-70">
                    How Swahilies works
                  </div>
                  <div className="text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-tight">
                    One app.
                    <br />
                    Three jobs.
                  </div>
                  <div className="mt-4 flex flex-col gap-3">
                    {features.map((f) => (
                      <div
                        key={f.number}
                        className="flex items-center gap-3 rounded-xl px-4 py-3"
                        style={{ background: "rgba(255,255,255,0.08)" }}
                      >
                        <span
                          className="inline-flex items-center justify-center w-8 h-8 rounded-md text-sm font-bold"
                          style={{
                            background: f.wash,
                            color: "var(--color-primary)",
                          }}
                        >
                          {f.number}
                        </span>
                        <span className="text-sm font-semibold">
                          {f.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
```

(The left column is now a single sticky-positioned dark card showing the three pillars with their deck-matched wash chips. Right column still scroll-reveals the long-form description per pillar.)

### Task 3: Update the right-column item palette tokens

**Files:**
- Modify: `app/components/VirtualCard.tsx`

The current right column uses hardcoded Keytom blue/violet pill colors (`#3a57b5`, `#b9c4ff`, `#b9c3ff95`, `#4b5fc0`). Swap to brand tokens.

- [ ] **Step 1: Update the per-item border + pill colors**

In `app/components/VirtualCard.tsx`, find the `.vc-item` map (currently around lines 245–264):

```tsx
            {features.map((feature, index) => (
              <div
                key={index}
                className="vc-item py-4 border-b border-[#b9c3ff95] last:border-b-0"
              >
                <div className="vc-header flex items-center lg:gap-4 md:gap-4 gap-2">
                  <div className="inline-flex items-center gap-2 lg:px-4 px-3 lg:py-1 py-0 rounded-full border border-[#b9c4ff] text-[#3a57b5] font-semibold text-[0.95rem] lg:min-w-[56px] justify-center">
                    <span className="lg:w-2 lg:h-2 md:h-2 md:w-2 w-1 h-1 rounded-full bg-[#3a57b5]" />
                    <span>{feature.number}</span>
                  </div>
                  <h3 className="text-[1.4rem] max-[900px]:text-[1rem] font-semibold text-[#3a57b5]">
                    {feature.title}
                  </h3>
                </div>

                <p className="vc-desc lg:ml-18 ml-13 mt-2 lg:text-[0.98rem] text-[0.8rem] leading-snug text-[#4b5fc0]">
                  {feature.description}
                </p>
              </div>
            ))}
```

Replace with:

```tsx
            {features.map((feature, index) => (
              <div
                key={index}
                className="vc-item py-5 border-b last:border-b-0"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="vc-header flex items-center lg:gap-4 md:gap-4 gap-2">
                  <div
                    className="inline-flex items-center gap-2 lg:px-4 px-3 lg:py-1 py-0 rounded-full border font-semibold text-[0.95rem] lg:min-w-[56px] justify-center"
                    style={{
                      background: feature.wash,
                      borderColor: "var(--color-border)",
                      color: "var(--color-primary)",
                    }}
                  >
                    <span
                      className="lg:w-2 lg:h-2 md:h-2 md:w-2 w-1 h-1 rounded-full"
                      style={{ background: "var(--color-primary)" }}
                    />
                    <span>{feature.number}</span>
                  </div>
                  <h3
                    className="text-[1.4rem] max-[900px]:text-[1rem] font-semibold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {feature.title}
                  </h3>
                </div>

                <p
                  className="vc-desc lg:ml-18 ml-13 mt-2 lg:text-[0.98rem] text-[0.8rem] leading-snug"
                  style={{ color: "var(--color-muted)" }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
```

### Task 4: Verify + Commit Phase A

- [ ] **Step 1: Build**

```bash
npm run build 2>&1 | tail -15
```
Expected: build completes, no errors.

- [ ] **Step 2: Smoke test**

If dev server isn't running:

```bash
npm run dev
```

Open `http://localhost:3000` and scroll past Services + Traction to the "How it works" section. Confirm:
- Title reads "How it works" (not "Keytom Virtual").
- Left column: dark Swahilies-primary card with three step pills (1 cream / 2 lavender / 3 peach) — no card-flip animation.
- Right column: scrolling reveals three pillar descriptions one at a time as you scroll.

- [ ] **Step 3: Commit**

```bash
git add app/components/VirtualCard.tsx
git commit -m "$(cat <<'EOF'
section 4a virtualcard: three-pillar how-it-works walkthrough

Replace the Keytom 5-feature card walkthrough (easy & fully online /
pay in-store / top up with digital assets / contactless / ATM) with
the deck's 3 pillars: Business Management, Collection & Banking,
Credit & Lending.

Drop the 3D rotateY card-flip animation and the card1/card2 Keytom
card images. The left column is now a sticky dark Swahilies-primary
card listing the three pillars with deck-matched wash chips
(cream / lavender / peach). The right column keeps its item-reveal-
on-scroll GSAP timeline, now with 3 items instead of 5.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Phase B — BuiltFor: drop Individuals tab + rewrite Businesses

### Task 5: Strip the tab state + buttons + Individuals branch

**Files:**
- Modify: `app/components/BuiltFor.tsx`

- [ ] **Step 1: Replace the entire component with the no-tabs version**

The simplest path is a full file rewrite — the structure is small enough and the changes are pervasive (drop state, drop tab buttons, drop Individuals JSX). Replace the entire contents of `app/components/BuiltFor.tsx` with:

```tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { APP_STORE_URL, PLAY_STORE_URL } from "../lib/storeLinks";

export default function BuiltFor() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.from(".builtfor-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  const cardBase =
    "builtfor-card relative overflow-hidden rounded-2xl p-6 max-[900px]:p-5";

  return (
    <section
      ref={sectionRef}
      className="py-[120px] max-[900px]:py-16"
      style={{ background: "var(--color-bg)", color: "var(--color-text)" }}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2
            className="text-[clamp(2.4rem,4vw,4.2rem)] font-semibold mb-3"
            style={{ color: "var(--color-primary)" }}
          >
            Built for African SMEs
          </h2>
          <p
            className="text-base sm:text-lg max-w-2xl mx-auto"
            style={{ color: "var(--color-muted)" }}
          >
            Swahilies is a single app that replaces the patchwork of bookkeeping
            apps, mobile money, and bank tools that most African SMEs juggle
            today.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 max-w-[1100px] mx-auto max-[900px]:grid-cols-1 max-[900px]:gap-4">
          <div className="flex flex-col gap-3">
            <div
              className={`${cardBase} min-h-[260px]`}
              style={{
                background: "var(--color-primary)",
                color: "#fff",
              }}
            >
              <div
                className="absolute -top-10 -right-10 w-[180px] h-[180px] rounded-full blur-2xl"
                style={{ background: "var(--color-accent)", opacity: 0.35 }}
              />
              <div className="relative z-10">
                <h3 className="text-[1.4rem] font-semibold mb-2">
                  Cross-border supplier payments
                </h3>
                <p className="text-[0.95rem] leading-[1.5] text-white/85">
                  Pay suppliers in USD, CNY, or INR directly from your TZS
                  balance — fund via bank transfer, mobile money, or
                  stablecoin. Fair rates, no extra rails.
                </p>
              </div>
            </div>

            <div
              className={`${cardBase} min-h-[200px]`}
              style={{
                background: "var(--wash-lavender)",
                color: "var(--color-primary)",
              }}
            >
              <h3 className="text-[1.4rem] font-semibold mb-2">
                Multi-currency settlement
              </h3>
              <p
                className="text-[0.95rem] leading-[1.5]"
                style={{ color: "var(--color-muted)" }}
              >
                Hold TZS, settle in foreign currency. Customer payments come
                in, supplier bills go out, you stay in control of the FX.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div
              className={`${cardBase} min-h-[200px]`}
              style={{
                background: "var(--wash-cream)",
                color: "var(--color-primary)",
              }}
            >
              <h3 className="text-[1.4rem] font-semibold mb-2">
                Fast onboarding
              </h3>
              <p
                className="text-[0.95rem] leading-[1.5]"
                style={{ color: "var(--color-muted)" }}
              >
                Open an account on your phone in minutes — no branch visits,
                no five-day document reviews.
              </p>
            </div>

            <div
              className={`${cardBase} min-h-[260px] flex flex-col gap-4`}
              style={{
                background: "var(--wash-peach)",
                color: "var(--color-primary)",
              }}
            >
              <div>
                <h3 className="text-[1.4rem] font-semibold mb-2">
                  In-app loans &amp; credit
                </h3>
                <p
                  className="text-[0.95rem] leading-[1.5]"
                  style={{ color: "var(--color-muted)" }}
                >
                  Request loans directly from the app. Your transaction
                  history builds the credit profile our lending partners
                  underwrite against — capital-light, risk-free.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto">
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative border rounded-md px-3 py-2 pl-7 font-semibold text-[0.75rem] leading-[1.1] flex flex-col items-start hover:opacity-90 transition-opacity"
                  style={{
                    borderColor: "rgba(14,14,16,0.20)",
                    color: "var(--color-primary)",
                  }}
                >
                  <span className="absolute left-[6px] top-1/2 -translate-y-1/2 text-[1.25rem] opacity-95">
                    <FaApple />
                  </span>
                  <span className="text-[0.55rem] font-medium opacity-80">
                    Download on the
                  </span>
                  App Store
                </a>
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative border rounded-md px-3 py-2 pl-7 font-semibold text-[0.75rem] leading-[1.1] flex flex-col items-start hover:opacity-90 transition-opacity"
                  style={{
                    borderColor: "rgba(14,14,16,0.20)",
                    color: "var(--color-primary)",
                  }}
                >
                  <span className="absolute left-[6px] top-1/2 -translate-y-1/2 text-[1.25rem] opacity-95">
                    <FaGooglePlay />
                  </span>
                  <span className="text-[0.55rem] font-medium opacity-80">
                    Get it on
                  </span>
                  Google Play
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

(All four cards now use brand tokens; primary card uses Swahilies near-black; the three others use cream / lavender / peach washes. App Store + Google Play hooks reuse the shared `storeLinks` module.)

### Task 6: Verify + Commit Phase B

- [ ] **Step 1: Build**

```bash
npm run build 2>&1 | tail -15
```
Expected: build completes, no errors.

- [ ] **Step 2: Smoke test**

Reload `http://localhost:3000`, scroll past "How it works" to the BuiltFor section:
- Title: "Built for African SMEs" (no tabs).
- 2×2 card grid: Cross-border supplier payments / Multi-currency settlement / Fast onboarding / In-app loans & credit.
- Bottom-right card has App Store + Google Play links that open in new tabs.

- [ ] **Step 3: Commit**

```bash
git add app/components/BuiltFor.tsx
git commit -m "$(cat <<'EOF'
section 4b builtfor: drop individuals tab, rewrite businesses panel

Swahilies is SME-only — the Individuals tab was carrying a story we
don't tell anymore (crypto wallets, fiat IBANs, contactless cards).
Drop the activeTab state and both tab buttons; render a single
"Built for African SMEs" panel.

Four cards rewritten to: cross-border supplier payments, multi-
currency settlement, fast onboarding, in-app loans & credit. Card
palette swaps from the Keytom violet/pink gradient to brand tokens
(primary near-black + wash-lavender / wash-cream / wash-peach). App
Store + Google Play CTAs on the in-app-loans card reuse the shared
storeLinks module.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Phase C — `/cards` page: slim rewrite

### Task 7: Replace `app/cards/page.tsx` entirely

**Files:**
- Modify: `app/cards/page.tsx` (1097-line replacement → ~80 lines)

The current page renders a 1097-line Keytom card walkthrough with a complex physical-card-flip GSAP timeline and a "PHYSICAL CARDS (COMING SOON)" pseudo-section. We replace it with a thin client page that reuses the new `<VirtualCard />` (which is the actual "how it works" content) plus a short hero header. The existing `app/cards/layout.tsx` (from Section 1) already provides the page metadata.

- [ ] **Step 1: Replace the file contents**

Open `app/cards/page.tsx` and replace the entire file with:

```tsx
"use client";

import { FaApple, FaGooglePlay } from "react-icons/fa";
import VirtualCard from "../components/VirtualCard";
import { APP_STORE_URL, PLAY_STORE_URL } from "../lib/storeLinks";

export default function CardsPage() {
  return (
    <main className="overflow-x-hidden">
      <section
        className="relative pt-32 pb-12 px-6 max-w-6xl mx-auto"
        style={{ color: "var(--color-primary)" }}
      >
        <div className="max-w-3xl">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] mb-6"
            style={{
              background: "var(--wash-lavender)",
              color: "var(--color-primary)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "var(--color-accent)" }}
            />
            How it works
          </div>
          <h1 className="text-[clamp(2.4rem,6vw,4rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
            One app. Three jobs. Built for African SMEs.
          </h1>
          <p
            className="mt-5 text-base sm:text-lg leading-relaxed max-w-2xl"
            style={{ color: "var(--color-muted)" }}
          >
            Swahilies is a single tool for the three jobs every African SME
            does every day — running the business, moving money in and out,
            and getting access to credit. Here's how each piece works.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-md text-white px-5 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
              style={{ background: "var(--color-primary)" }}
            >
              <FaApple className="text-xl" />
              <span className="flex flex-col items-start leading-tight">
                <span className="text-[0.65rem] font-medium opacity-80">
                  Download on the
                </span>
                <span>App Store</span>
              </span>
            </a>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-md text-white px-5 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
              style={{ background: "var(--color-primary)" }}
            >
              <FaGooglePlay className="text-xl" />
              <span className="flex flex-col items-start leading-tight">
                <span className="text-[0.65rem] font-medium opacity-80">
                  Get it on
                </span>
                <span>Google Play</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      <VirtualCard />
    </main>
  );
}
```

(The page's metadata is set by `app/cards/layout.tsx` — created in Section 1 — so we don't need a `metadata` export here.)

### Task 8: Verify + Commit Phase C

- [ ] **Step 1: Run the Section-4 grep**

```bash
grep -RIin "Keytom\|crypto\|ATM\|virtual cards\|contactless\|130 million\|PHYSICAL CARDS\|COMING SOON" app/components/VirtualCard.tsx app/components/BuiltFor.tsx app/cards/page.tsx
```
Expected: no matches.

- [ ] **Step 2: Run the full Section-6 grep (informational)**

```bash
grep -RIin 'keytom\|IBAN\|SEPA\|crypto insurance\|126+ countries' app/ public/ 2>/dev/null | wc -l
```
Expect a meaningful drop from the 79 we hit at the end of Section 3.

- [ ] **Step 3: Build**

```bash
npm run build 2>&1 | tail -15
```
Expected: build completes, no errors. The `/cards` route is still present and statically prerendered.

- [ ] **Step 4: Smoke test**

Reload `http://localhost:3000/cards`. The page should now render:
- A "How it works" pill chip.
- Headline: "One app. Three jobs. Built for African SMEs."
- Subhead + two App Store / Google Play buttons.
- Below, the same `<VirtualCard />` walkthrough as on home — three pillars, sticky dark card on the left, scroll-reveal items on the right.
- Global FAQ + Footer render below (from `layout.jsx`).

- [ ] **Step 5: Commit**

```bash
git add app/cards/page.tsx
git commit -m "$(cat <<'EOF'
section 4c cards page: slim rewrite reusing virtualcard

Drop the 1097-line Keytom virtual+physical card walkthrough (with
the "PHYSICAL CARDS (COMING SOON)" section, the complex card-flip
GSAP timeline, and the duplicate 5-feature array) and replace with a
thin ~80-line client page: a "How it works" hero header (chip,
headline, subhead, App Store + Google Play CTAs) followed by the
same <VirtualCard /> the home page already renders.

Net change: -~1000 lines of Keytom-specific content gone; /cards is
now a deeper read of the same "how it works" story that lands on
home. Page metadata comes from app/cards/layout.tsx (added in
Section 1) so no metadata export needed here.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 6: Verify**

```bash
git log --oneline -4
git status
```
Expected: latest three commits are the three Section-4 commits; clean working tree.

---

## Section 4 acceptance criteria (recap)

- ✅ `VirtualCard.tsx` section title is "How it works".
- ✅ `VirtualCard.tsx` shows exactly 3 walkthrough items (Business Management / Collection & Banking / Credit & Lending).
- ✅ `card1.jpeg` / `card2.jpeg` references gone from `VirtualCard.tsx` and `app/cards/page.tsx`.
- ✅ 3D `rotateY` flip animation is gone from `VirtualCard.tsx`.
- ✅ `BuiltFor.tsx` has no `useState`, no tab buttons, no Individuals branch.
- ✅ `BuiltFor.tsx` renders a single "Built for African SMEs" panel with 4 cards using brand tokens.
- ✅ `app/cards/page.tsx` is under ~100 lines and reuses `<VirtualCard />`.
- ✅ `/cards` route still loads and shows the new content with `<title>` "How it works · Swahilies" (from Section 1's `app/cards/layout.tsx`).
- ✅ `grep -RIin "Keytom\|crypto\|ATM\|virtual cards\|contactless\|130 million\|PHYSICAL CARDS\|COMING SOON" app/components/VirtualCard.tsx app/components/BuiltFor.tsx app/cards/page.tsx` returns nothing.
- ✅ `npm run build` is clean.

## Out of scope for Section 4 (explicit deferrals)

- Comparison / FAQ / Footer-content rewrites — Section 5.
- The placeholder images `swahi1.png` / `phone2.png` still used in `Intro.jsx` and `Services.tsx` — Section 6.
- `app/business/page.tsx` (24 lines) — flagged for Section 6 final pass. It's tiny and may already be Swahilies-clean; if not we'll cleanup-sweep it then.
- `app/components/About.jsx`, `Actions.jsx`, `Cards.jsx`, `Groups.jsx`, `Video.jsx` — none are imported by the home page or any route we render. Leave alone for Section 6 dead-code audit.
- The `.why-keytom-*` CSS classes still hanging around in `globals.css` — Section 6 cleanup.
