# Section 5 — Comparison + FAQ + Footer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Keytom 3-column / 7-row comparison table with the deck's 4-column / 4-row Competition matrix (Swahilies vs Traditional Banks vs Western Union/MoneyGram vs Bumpa/Settlo/QuickBooks). Rewrite the FAQ from a tabbed-and-categorized 10-question structure to a flat 5-question accordion focused on SME-relevant questions. Polish the footer with the mission tagline, wire real social URLs (LinkedIn / Instagram / X), and drop the dead Telegram icon.

**Architecture:** All three rewrites stay within the existing components — no file renames, no new files except updates to existing components. Comparison's `Feature` type widens from 3 status-cell fields to 4. The FAQ's tab + category state is dropped; we keep the accordion's open/closed `useState` and the GSAP title fade-in. Footer's existing structure stays; we add a mission `<p>` and turn the four dead social `<span>`s into `<a>` tags using a small shared `socialLinks.ts` module (mirrors the Section-2 `storeLinks.ts` pattern).

**Tech Stack:** React 19, Tailwind v4, GSAP + ScrollTrigger, `react-icons` (existing usage). No new dependencies.

**Real social URLs (confirmed by Prosper):**
- LinkedIn: `https://www.linkedin.com/company/swahilies/`
- Instagram: `https://www.instagram.com/swahilieshq/`
- X / Twitter: `https://x.com/Swahiliestz`
- Telegram: **none — drop the icon**

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `app/lib/socialLinks.ts` | Create | Single source of truth for the three real social URLs |
| `app/components/Comparison.tsx` | Modify (rewrite features array + columns + title + drop CTA) | New 4-row × 4-column Competition matrix; brand tokens; title "How Swahilies compares" |
| `app/components/Faqs.tsx` | Modify (full rewrite of data + render) | Drop tab state, drop categories sidebar, render single accordion of 5 SME questions; brand tokens |
| `app/components/Footer.jsx` | Modify (mission tagline + social anchors) | Add mission paragraph near copyright; replace dead social `<span>`s with `<a>` tags pointing at real URLs; drop Telegram icon |

---

## Conventions for this section

- **Three commits.** Commit A at end of Phase A (Comparison). Commit B at end of Phase B (FAQ). Commit C at end of Phase C (Footer).
- **Comparison's `Status` enum stays** (`"yes" | "no" | "limited"`). The deck's ✅ / ❌ / ⚠️ map cleanly onto it. The Status renders as the same icon system (filled circle with check / X / triangle warning).
- **FAQ background switches** from Keytom blue `#3c56ab` to Swahilies near-black `--color-primary`. White text reads cleanly on it; matches the dark Services section above.
- **Section 5 acceptance:**
  - Comparison shows 4 rows × 4 columns matching the deck Competition slide exactly. Column headers are Swahilies / Traditional Banks / Western Union & MoneyGram / Bumpa, Settlo, QuickBooks.
  - FAQ has exactly 5 questions, no tabs, no category sidebar.
  - Footer has the mission tagline visible near the copyright.
  - Three social icons (LinkedIn / Instagram / X) link to real URLs; Telegram icon is gone.
  - `grep -RIin "Keytom\|crypto\|IBAN\|SEPA\|FINTRAC\|residence permit\|OTC\|126+" app/components/Comparison.tsx app/components/Faqs.tsx app/components/Footer.jsx` returns nothing.
  - `npm run build` is clean.

---

## Phase A — Comparison: deck Competition matrix

### Task 1: Replace the `Feature` type + features array

**Files:**
- Modify: `app/components/Comparison.tsx`

- [ ] **Step 1: Replace the type definitions + features array**

In `app/components/Comparison.tsx`, replace the existing type block + features array (lines 10–74) with:

```tsx
type Status = "yes" | "no" | "limited";

type Cell = { status: Status; note: string };

type Feature = {
  name: string;
  swahilies: Cell;
  banks: Cell;
  remittance: Cell;
  smeTools: Cell;
};

const features: Feature[] = [
  {
    name: "First-mover in data monetization",
    swahilies: { status: "yes", note: "Infrastructure to power future SME finance" },
    banks: { status: "no", note: "Not designed for SME data" },
    remittance: { status: "no", note: "Only transaction-level data" },
    smeTools: { status: "no", note: "Limited business activity data" },
  },
  {
    name: "Proprietary SME data engine",
    swahilies: { status: "yes", note: "Operational and financial data" },
    banks: { status: "no", note: "Only transactions" },
    remittance: { status: "no", note: "Only transaction-level data" },
    smeTools: { status: "limited", note: "Good data, but not localized" },
  },
  {
    name: "Capital-light, risk-free lending model",
    swahilies: { status: "yes", note: "Off-balance sheet loans" },
    banks: { status: "no", note: "Only transactions" },
    remittance: { status: "no", note: "No lending role" },
    smeTools: { status: "no", note: "No lending role" },
  },
  {
    name: "Instant cross-border payments",
    swahilies: { status: "yes", note: "Instant payment" },
    banks: { status: "no", note: "Takes 1–3 days" },
    remittance: { status: "limited", note: "Same day to 3 days" },
    smeTools: { status: "no", note: "No cross-border payments" },
  },
];
```

### Task 2: Rewrite the section + table render with 4 columns

**Files:**
- Modify: `app/components/Comparison.tsx`

- [ ] **Step 1: Replace the section title**

Find the `<h2 ref={titleRef}>` block (around lines 139–144):

```tsx
        <h2
          ref={titleRef}
          className="text-center font-semibold text-3xl md:text-5xl lg:text-6xl text-[#4a4a4a] mb-8 md:mb-12"
        >
          <span className="text-[#3657ba]">Keytom</span> vs others
        </h2>
```

Replace with:

```tsx
        <h2
          ref={titleRef}
          className="text-center font-semibold text-3xl md:text-5xl lg:text-6xl mb-8 md:mb-12"
          style={{ color: "var(--color-primary)" }}
        >
          How <span style={{ color: "var(--color-accent)" }}>Swahilies</span> compares
        </h2>
```

- [ ] **Step 2: Replace the section wrapper background tokens**

Find the `<section ref={sectionRef} ...>` element (around lines 133–137):

```tsx
    <section
      ref={sectionRef}
      className="bg-white text-[#1f1f1f] py-20 md:py-28"
    >
```

Replace with:

```tsx
    <section
      ref={sectionRef}
      className="py-20 md:py-28"
      style={{ background: "var(--color-bg)", color: "var(--color-text)" }}
    >
```

- [ ] **Step 3: Replace the desktop table header (3 → 4 data columns)**

Find the desktop table header block (around lines 147–162):

```tsx
        <div ref={tableRef} className="hidden lg:block max-w-[1160px] mx-auto">
          {/* Table Header */}
          <div className="grid grid-cols-[1.25fr_1.2fr_1.35fr_0.8fr] border-b border-[#d8dff4]">
            <div className="px-5 py-4 font-semibold text-[#4a4a4a] text-base">
              Feature
            </div>
            <div className="px-5 py-4 font-semibold text-[#3657ba] text-base bg-[#e8ebf7] rounded-tl-xl">
              Keytom
            </div>
            <div className="px-5 py-4 font-semibold text-[#4a4a4a] text-base">
              Other financial institutions
            </div>
            <div className="px-5 py-4 font-semibold text-[#4a4a4a] text-base">
              OTC
            </div>
          </div>
```

Replace with:

```tsx
        <div ref={tableRef} className="hidden lg:block max-w-[1240px] mx-auto">
          {/* Table Header */}
          <div
            className="grid grid-cols-[1.4fr_1.1fr_1.1fr_1.1fr_1.1fr] border-b"
            style={{ borderColor: "var(--color-border)" }}
          >
            <div
              className="px-5 py-4 font-semibold text-base"
              style={{ color: "var(--color-muted)" }}
            >
              Feature
            </div>
            <div
              className="px-5 py-4 font-semibold text-base rounded-tl-xl"
              style={{
                background: "var(--wash-lavender)",
                color: "var(--color-primary)",
              }}
            >
              Swahilies
            </div>
            <div
              className="px-5 py-4 font-semibold text-base"
              style={{ color: "var(--color-muted)" }}
            >
              Traditional Banks
            </div>
            <div
              className="px-5 py-4 font-semibold text-base"
              style={{ color: "var(--color-muted)" }}
            >
              Western Union & MoneyGram
            </div>
            <div
              className="px-5 py-4 font-semibold text-base"
              style={{ color: "var(--color-muted)" }}
            >
              Bumpa, Settlo, QuickBooks
            </div>
          </div>
```

- [ ] **Step 4: Replace the desktop row render**

Find the `{features.map(...)}` block for the desktop table (around lines 165–197). Replace with:

```tsx
          {/* Table Rows */}
          {features.map((feature, index) => (
            <div
              key={index}
              className="comparison-feature grid grid-cols-[1.4fr_1.1fr_1.1fr_1.1fr_1.1fr] border-b last:border-b-0"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div className="px-5 py-5 flex flex-col gap-1">
                <span
                  className="text-[0.95rem] font-semibold leading-tight"
                  style={{ color: "var(--color-primary)" }}
                >
                  {feature.name}
                </span>
              </div>

              <div
                className="px-5 py-5 flex items-center gap-3"
                style={{ background: "var(--wash-lavender)" }}
              >
                {getIcon(feature.swahilies.status)}
                <span
                  className="text-[0.85rem] leading-snug"
                  style={{ color: "var(--color-primary)" }}
                >
                  {feature.swahilies.note}
                </span>
              </div>

              <div className="px-5 py-5 flex items-center gap-3">
                {getIcon(feature.banks.status)}
                <span
                  className="text-[0.85rem] leading-snug"
                  style={{ color: "var(--color-muted)" }}
                >
                  {feature.banks.note}
                </span>
              </div>

              <div className="px-5 py-5 flex items-center gap-3">
                {getIcon(feature.remittance.status)}
                <span
                  className="text-[0.85rem] leading-snug"
                  style={{ color: "var(--color-muted)" }}
                >
                  {feature.remittance.note}
                </span>
              </div>

              <div className="px-5 py-5 flex items-center gap-3">
                {getIcon(feature.smeTools.status)}
                <span
                  className="text-[0.85rem] leading-snug"
                  style={{ color: "var(--color-muted)" }}
                >
                  {feature.smeTools.note}
                </span>
              </div>
            </div>
          ))}
        </div>
```

- [ ] **Step 5: Rewrite the mobile stacked view (now 4 column cells per row)**

Find the mobile stacked view (around lines 201–270). Replace the entire `<div className="lg:hidden ...">` block with:

```tsx
        {/* Mobile Stacked View */}
        <div className="lg:hidden max-w-2xl mx-auto space-y-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="comparison-feature border-b pb-3"
              style={{ borderColor: "var(--color-border)" }}
            >
              <h3
                className="text-xl md:text-2xl font-semibold mb-4"
                style={{ color: "var(--color-primary)" }}
              >
                {feature.name}
              </h3>

              <div className="space-y-3">
                <div
                  className="rounded-md p-4 flex justify-between gap-3 items-start"
                  style={{ background: "var(--wash-lavender)" }}
                >
                  <div
                    className="font-semibold text-[0.85rem]"
                    style={{ color: "var(--color-primary)" }}
                  >
                    Swahilies
                  </div>
                  <div className="flex items-start gap-2">
                    {getIcon(feature.swahilies.status)}
                    <div
                      className="text-[0.8rem] leading-relaxed"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {feature.swahilies.note}
                    </div>
                  </div>
                </div>

                <div
                  className="border-t p-4 flex justify-between gap-3 items-start"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <div
                    className="font-semibold text-[0.85rem]"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Traditional Banks
                  </div>
                  <div className="flex items-start gap-2">
                    {getIcon(feature.banks.status)}
                    <div
                      className="text-[0.8rem] leading-relaxed"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {feature.banks.note}
                    </div>
                  </div>
                </div>

                <div
                  className="border-t p-4 flex justify-between gap-3 items-start"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <div
                    className="font-semibold text-[0.85rem]"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Western Union & MoneyGram
                  </div>
                  <div className="flex items-start gap-2">
                    {getIcon(feature.remittance.status)}
                    <div
                      className="text-[0.8rem] leading-relaxed"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {feature.remittance.note}
                    </div>
                  </div>
                </div>

                <div
                  className="border-t p-4 flex justify-between gap-3 items-start"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <div
                    className="font-semibold text-[0.85rem]"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Bumpa, Settlo, QuickBooks
                  </div>
                  <div className="flex items-start gap-2">
                    {getIcon(feature.smeTools.status)}
                    <div
                      className="text-[0.8rem] leading-relaxed"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {feature.smeTools.note}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
```

- [ ] **Step 6: Drop the trailing "Open account" CTA button**

Find the CTA block at the bottom of the section (around lines 273–278):

```tsx
        {/* CTA Button */}
        <div className="max-w-[1160px]  flex justify-center lg:max-w-2xl mx-auto mt-8 md:mt-10">
          <button className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#422de1] to-[#2f458b] text-white px-16 py-4 rounded-xs font-semibold text-sm uppercase tracking-wide  transition-shadow duration-300">
            Open account{" "}
            <IoArrowForwardCircleOutline className="text-lg rotate-3" />
          </button>
        </div>
```

Delete the entire `{/* CTA Button */}` block (the wrapping `<div>` + its `<button>` child). The hero already has App Store / Google Play CTAs; we don't need another CTA at the end of the comparison.

- [ ] **Step 7: Drop the unused import**

In the top imports block (around line 8), remove:

```tsx
import { IoArrowForwardCircleOutline } from "react-icons/io5";
```

The other `io5` icons (`IoCheckmark`, `IoClose`, `IoWarning`) are still used by `getIcon`.

### Task 3: Update the `getIcon` colors to brand tokens

**Files:**
- Modify: `app/components/Comparison.tsx`

The `getIcon` helper currently uses Keytom blue / grey for the filled status icons. Map them to brand tokens.

- [ ] **Step 1: Replace `getIcon`**

In `app/components/Comparison.tsx`, find the `getIcon` function (around lines 112–131). Replace with:

```tsx
  const getIcon = (status: Status) => {
    switch (status) {
      case "yes":
        return (
          <span
            className="w-5 h-5 rounded-full inline-flex items-center justify-center text-white flex-shrink-0"
            style={{ background: "var(--color-success)" }}
          >
            <IoCheckmark className="text-sm" />
          </span>
        );
      case "no":
        return (
          <span
            className="w-5 h-5 rounded-full inline-flex items-center justify-center text-white flex-shrink-0"
            style={{ background: "var(--color-danger)" }}
          >
            <IoClose className="text-sm" />
          </span>
        );
      case "limited":
        return (
          <IoWarning
            className="text-xl flex-shrink-0"
            style={{ color: "var(--color-warning)" }}
          />
        );
      default:
        return null;
    }
  };
```

### Task 4: Verify + Commit Phase A

- [ ] **Step 1: Build**

```bash
npm run build 2>&1 | tail -15
```
Expected: build completes, no errors.

- [ ] **Step 2: Smoke test**

Reload `http://localhost:3000`, scroll past the BuiltFor section to the Comparison section:
- Title: "How **Swahilies** compares" (Swahilies in gold).
- 5-column desktop layout (Feature + 4 competitors); Swahilies column highlighted with lavender wash.
- 4 rows, each ending with green checkmark for Swahilies, mostly red X for others, amber warning where the deck shows ⚠️.
- No trailing "Open account" button.

- [ ] **Step 3: Commit**

```bash
git add app/components/Comparison.tsx
git commit -m "$(cat <<'EOF'
section 5a comparison: deck competition matrix

Replace the Keytom 7-row / 3-column "Keytom vs others" comparison
(multi-currency / crypto exchange / IBAN / virtual cards / etc.)
with the deck's 4-row / 4-column Competition slide: Swahilies vs
Traditional Banks vs Western Union & MoneyGram vs Bumpa / Settlo /
QuickBooks. Rows are First-Mover in Data Monetization, Proprietary
SME Data Engine, Capital-Light Lending Model, Instant Cross-Border
Payments.

Switch palette to brand tokens (lavender wash highlights the
Swahilies column; success/warning/danger semantics drive the status
icons). Drop the trailing "Open account" gradient button - the hero
already has App Store / Google Play CTAs.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Phase B — FAQ: flat 5-question accordion

### Task 5: Full rewrite of `Faqs.tsx`

**Files:**
- Modify: `app/components/Faqs.tsx`

The simplest path is a complete file rewrite — we drop the tab state, drop the categories sidebar, drop the businesses-tab-with-no-data placeholder, and shrink to 5 questions. The accordion's open/close behavior stays.

- [ ] **Step 1: Replace the entire file**

Replace the contents of `app/components/Faqs.tsx` with:

```tsx
"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Plus } from "lucide-react";

type FAQItem = { q: string; a: string };

const faqs: FAQItem[] = [
  {
    q: "Do I need a bank account to use Swahilies?",
    a: "No. You can sign up with just your phone and a Tanzanian ID — no bank account required. Funds flow in via mobile money (M-Pesa, Airtel Money, Tigo Pesa), bank transfer, or stablecoin, depending on what you have.",
  },
  {
    q: "Which payment methods can I receive from customers?",
    a: "Customers can pay you via mobile money, direct bank transfer, or stablecoin. Whatever the rails, the balance lands in your Swahilies TZS account, ready to spend, save, or send abroad.",
  },
  {
    q: "How do cross-border payments work?",
    a: "Hold your money in TZS; pay suppliers in USD, CNY, or INR. You fund the transfer with TZS via bank or mobile money, and your supplier receives their local currency at a fair rate — typically instant, not 1–3 days.",
  },
  {
    q: "How do loans work?",
    a: "Loans are requested directly in the app. Your day-to-day Swahilies activity (sales, customer payments, supplier bills) builds a credit profile that our lending partners underwrite against. We don't lend our own balance sheet — we connect you to lenders who do.",
  },
  {
    q: "Is Swahilies available outside Tanzania?",
    a: "Right now Swahilies is built for Tanzanian SMEs, with cross-border payments out to USD, CNY, and INR. Expansion to other African markets is on the roadmap — join the waitlist if you'd like to be notified.",
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".faq-title", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      data-nav-theme="light"
      className="py-24 max-[900px]:py-16"
      style={{ background: "var(--color-primary)", color: "#fff" }}
    >
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-12 max-[900px]:mb-8">
          <h2
            className="faq-title text-[clamp(2.4rem,4vw,3.6rem)] font-semibold leading-tight"
          >
            Frequently asked questions
          </h2>
          <p className="mt-3 text-white/70 max-w-xl mx-auto">
            Short, honest answers about how Swahilies works for African SMEs.
          </p>
        </div>

        <div
          className="border-t"
          style={{ borderColor: "rgba(255, 255, 255, 0.15)" }}
        >
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border-b"
                style={{ borderColor: "rgba(255, 255, 255, 0.15)" }}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[1.1rem] max-[900px]:text-base font-semibold">
                    {item.q}
                  </span>
                  <span
                    className="relative w-9 h-9 rounded-md border flex items-center justify-center flex-shrink-0"
                    style={{ borderColor: "rgba(255, 255, 255, 0.25)" }}
                    aria-hidden="true"
                  >
                    <Plus
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    />
                  </span>
                </button>
                {isOpen && (
                  <div className="pb-5">
                    <p className="text-[0.98rem] max-[900px]:text-[0.85rem] leading-relaxed text-white/75">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

(The `id="faq"` on the section restores the anchor target that the Section-1 footer placeholder once pointed to. The `Plus` icon from `lucide-react` replaces the star image — `lucide-react` is already a dependency from Section 1, so no install needed.)

### Task 6: Verify + Commit Phase B

- [ ] **Step 1: Build**

```bash
npm run build 2>&1 | tail -15
```
Expected: build completes, no errors.

- [ ] **Step 2: Smoke test**

Reload `http://localhost:3000`. Scroll to the FAQ section (after Comparison):
- Background is Swahilies near-black (was Keytom blue).
- No tabs, no category sidebar.
- Single accordion of 5 questions, each opens on click and shows a short honest answer.

- [ ] **Step 3: Commit**

```bash
git add app/components/Faqs.tsx
git commit -m "$(cat <<'EOF'
section 5b faq: flat five-question accordion for smes

Replace the Keytom tabbed (Individuals / Businesses) + categorized
(Getting Started / Crypto & Fiat / Cards / Security & Privacy) FAQ
- which had 10+ EU-residency / FINTRAC / $100M-crypto-insurance
questions and an empty Businesses tab - with a single flat
accordion of five SME-relevant questions:

  1. Do I need a bank account?
  2. Which payment methods can I receive?
  3. How do cross-border payments work?
  4. How do loans work?
  5. Is Swahilies available outside Tanzania?

Background moves from Keytom blue to Swahilies primary; the accordion
keeps a single-open-at-a-time behavior. Section id="faq" restores
the anchor target the footer can link to.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Phase C — Footer polish (tagline + real socials)

### Task 7: Create the shared social-links module

**Files:**
- Create: `app/lib/socialLinks.ts`

- [ ] **Step 1: Create the file**

```ts
export const LINKEDIN_URL = "https://www.linkedin.com/company/swahilies/";
export const INSTAGRAM_URL = "https://www.instagram.com/swahilieshq/";
export const X_URL = "https://x.com/Swahiliestz";
```

(No Telegram — confirmed by Prosper as not yet an active channel.)

### Task 8: Add mission tagline + replace social icons + drop Telegram

**Files:**
- Modify: `app/components/Footer.jsx`

- [ ] **Step 1: Add the import**

In `app/components/Footer.jsx`, find the existing imports (top of file). After `import { APP_STORE_URL, PLAY_STORE_URL } from "../lib/storeLinks";`, add:

```jsx
import { LINKEDIN_URL, INSTAGRAM_URL, X_URL } from "../lib/socialLinks";
```

Also remove the now-unused Telegram icon import. Find:

```jsx
import { PiTelegramLogoFill } from "react-icons/pi";
```

and delete that line.

- [ ] **Step 2: Replace the four social icons with three anchor links**

In `app/components/Footer.jsx`, find the social-icon row (around lines 113–126, the `<div className="flex items-center gap-3 mb-3">` block containing the four `<span>` icons):

```jsx
            <div className="flex items-center gap-3 mb-3">
              <span className="w-9 h-9 max-[900px]:w-5 max-[900px]:h-5 rounded-xs border border-white/70 flex items-center justify-center text-[1.1rem] max-[900px]:text-[0.7rem] ">
                <FaLinkedinIn />
              </span>
              <span className="w-9 h-9 max-[900px]:w-5 max-[900px]:h-5 rounded-xs border border-white/70 flex items-center justify-center text-[1.1rem] max-[900px]:text-[0.7rem] ">
                <PiTelegramLogoFill />
              </span>
              <span className="w-9 h-9 max-[900px]:w-5 max-[900px]:h-5 rounded-xs border border-white/70 flex items-center justify-center text-[1.1rem] max-[900px]:text-[0.7rem] ">
                <FaXTwitter />
              </span>
              <span className="w-9 h-9 max-[900px]:w-5 max-[900px]:h-5 rounded-xs border border-white/70 flex items-center justify-center text-[1.1rem] max-[900px]:text-[0.7rem] ">
                <FaInstagram />
              </span>
            </div>
```

Replace with:

```jsx
            <div className="flex items-center gap-3 mb-3">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Swahilies on LinkedIn"
                className="w-9 h-9 max-[900px]:w-5 max-[900px]:h-5 rounded-xs border border-white/70 flex items-center justify-center text-[1.1rem] max-[900px]:text-[0.7rem] hover:bg-white/10 transition-colors"
              >
                <FaLinkedinIn />
              </a>
              <a
                href={X_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Swahilies on X"
                className="w-9 h-9 max-[900px]:w-5 max-[900px]:h-5 rounded-xs border border-white/70 flex items-center justify-center text-[1.1rem] max-[900px]:text-[0.7rem] hover:bg-white/10 transition-colors"
              >
                <FaXTwitter />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Swahilies on Instagram"
                className="w-9 h-9 max-[900px]:w-5 max-[900px]:h-5 rounded-xs border border-white/70 flex items-center justify-center text-[1.1rem] max-[900px]:text-[0.7rem] hover:bg-white/10 transition-colors"
              >
                <FaInstagram />
              </a>
            </div>
```

(Three anchors: LinkedIn, X, Instagram, in that visual order. Telegram is gone.)

- [ ] **Step 3: Add the mission tagline near the copyright**

In `app/components/Footer.jsx`, find the copyright block:

```jsx
          <div className="flex items-center gap-3">
            <span className="font-semibold text-[0.95rem]">
              © Swahilies Inc. 2026
            </span>
          </div>
```

Replace with:

```jsx
          <div className="flex flex-col items-end gap-1 max-[900px]:items-start">
            <span className="text-[0.85rem] text-white/70 leading-snug max-w-xs text-right max-[900px]:text-left">
              Building the operating and financial system for Africa's 100M SMEs.
            </span>
            <span className="font-semibold text-[0.95rem]">
              © Swahilies Inc. 2026
            </span>
          </div>
```

### Task 9: Verify + Commit Phase C

- [ ] **Step 1: Run the Section-5 grep**

```bash
grep -RIin "Keytom\|crypto\|IBAN\|SEPA\|FINTRAC\|residence permit\|OTC\|126+" app/components/Comparison.tsx app/components/Faqs.tsx app/components/Footer.jsx
```
Expected: no matches.

- [ ] **Step 2: Run the full Section-6 grep (informational)**

```bash
grep -RIin 'keytom\|IBAN\|SEPA\|crypto insurance\|126+ countries' app/ public/ 2>/dev/null | wc -l
```
Expect a major drop from the 48 we hit at the end of Section 4 — most of the remaining hits live in Faqs.tsx and Comparison.tsx, both of which we just gutted. Plus the `.why-keytom-*` CSS class names in `globals.css` which Section 6 will sweep.

- [ ] **Step 3: Build**

```bash
npm run build 2>&1 | tail -15
```
Expected: build completes, no errors.

- [ ] **Step 4: Smoke test**

Reload `http://localhost:3000` and scroll all the way to the footer:
- Three social icons (LinkedIn / X / Instagram) — click each, opens the right Swahilies page in a new tab.
- Mission tagline ("Building the operating and financial system for Africa's 100M SMEs.") sits above the copyright.

- [ ] **Step 5: Commit**

```bash
git add app/lib/socialLinks.ts app/components/Footer.jsx
git commit -m "$(cat <<'EOF'
section 5c footer: real socials + mission tagline

Add app/lib/socialLinks.ts as a single source of truth for the
three real Swahilies social URLs (LinkedIn / Instagram / X). Wire
the three dead <span> icons in the footer into anchor links with
real hrefs, target="_blank", aria-label, and a subtle hover. Drop
the Telegram icon (no active channel) and remove the
PiTelegramLogoFill import.

Add the mission tagline ("Building the operating and financial
system for Africa's 100M SMEs.") above the copyright so the bottom
of every page closes with the company's actual mission.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 6: Verify**

```bash
git log --oneline -4
git status
```
Expected: latest three commits are the three Section-5 commits; clean working tree.

---

## Section 5 acceptance criteria (recap)

- ✅ Comparison shows 4 rows × 4 data columns (Swahilies / Traditional Banks / Western Union & MoneyGram / Bumpa, Settlo, QuickBooks).
- ✅ Comparison title: "How Swahilies compares" (no "Keytom").
- ✅ Comparison's trailing "Open account" CTA button is gone.
- ✅ Comparison status icons use `--color-success` / `--color-warning` / `--color-danger` tokens.
- ✅ FAQ has 5 questions, no tabs, no category sidebar.
- ✅ FAQ background is `--color-primary`.
- ✅ FAQ section has `id="faq"` (so anchor links can target it).
- ✅ Footer has three working social anchor links (LinkedIn / X / Instagram); no Telegram.
- ✅ Footer has the mission tagline near the copyright.
- ✅ `grep -RIin "Keytom\|crypto\|IBAN\|SEPA\|FINTRAC\|residence permit\|OTC\|126+" app/components/Comparison.tsx app/components/Faqs.tsx app/components/Footer.jsx` returns nothing.
- ✅ `npm run build` is clean.

## Out of scope for Section 5 (explicit deferrals — these are Section 6)

- The `.why-keytom-section`, `.why-keytom-watermark`, `.why-keytom-card`, `.why-keytom-star`, `.why-keytom-stat`, etc. CSS classes in `globals.css` — none of these classes are used by any current component (Section 3's Traction uses inline `style`). Section 6 sweeps them.
- The `.footer-lower*` CSS classes in `globals.css` — also unused; Section 6.
- `Comparison.jsx` (alongside `Comparison.tsx`) and `Comparison.module.css` — possibly stale duplicates of `Comparison.tsx`; Section 6 dead-code audit.
- Unused components (`About.jsx`, `Actions.jsx`, `Cards.jsx`, `Groups.jsx`, `Video.jsx`) — Section 6 dead-code audit.
- Placeholder images (`swahi1.png`, `phone2.png`) — Section 6 final sweep.
- A proper 1200×630 OG image and `.ico` favicon — Section 6 polish.
- Responsive QA + accessibility pass — Section 6.
