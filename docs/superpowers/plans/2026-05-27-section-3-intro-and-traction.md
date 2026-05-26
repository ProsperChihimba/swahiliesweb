# Section 3 — Cross-border Payments (Intro) + Traction Stats Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the homepage's Intro section into the cross-border payments story (TZS in, USD/CNY/INR out, via bank / mobile money / stablecoin) by swapping its 6 floating cards and 6-action reveal circle for Swahilies content — without touching the GSAP timeline structure. Then rename `WhyKeytom` to `Traction` and replace its 4 reason cards with the 4 traction stats from the deck (12K MAU · 1,100 Paying SMEs · $500K processed · $10K MRR) plus the 5K-waitlist callout.

**Architecture:** Content-only edits inside two existing client components. The Intro's pinned scroll-trigger timeline depends on (a) exactly 6 floating cards by ref index, (b) the reveal-circle child structure, (c) a `mainImageRef` phone image, and (d) 6 `smallImagesRef` floating thumbnails. All four are preserved; we only change the JSX *contents*. The Traction component keeps its 4-card grid + GSAP stack animation and gains a callout `<p>` sibling below the card grid. File rename `WhyKeytom.jsx` → `Traction.jsx` is done via `git mv`; the home page import is updated to match.

**Tech Stack:** React 19, Tailwind v4 with Section-1 tokens, GSAP + ScrollTrigger, `react-icons/fa` + `react-icons/tb`. No new dependencies.

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `app/components/Intro.jsx` | Modify (content swap only) | New headline; new `cardData` array (6 Swahilies cards); rewritten card-content render switch; reveal-circle 6 chips → Swahilies actions |
| `app/components/WhyKeytom.jsx` → `app/components/Traction.jsx` | Rename + rewrite | Section title "Traction to-date"; 4 stat cards (12K MAU / 1,100 Paying SMEs / $500K processed / $10K MRR); waitlist callout below; new background using cream / lavender washes |
| `app/home/page.tsx` | Modify | Update `import WhyKeytom from "../components/WhyKeytom"` → `import Traction from "../components/Traction"`; update `<WhyKeytom />` → `<Traction />` |

---

## Conventions for this section

- **GSAP code is not edited.** Both components' refs, timeline durations, and selector targets stay byte-for-byte. We only edit copy and color values inside the JSX render tree (and `cardData` in Intro).
- **Two commits.** Commit A at end of Phase A (Intro cross-border). Commit B at end of Phase B (Traction).
- **Card count must stay at 6 in Intro.** The pinned timeline indexes cards by position (`i === 3` is held at center, others fade). Reducing the count breaks the animation.
- **Section 3 acceptance:**
  - Intro headline no longer says "next-generation digital financial institution" — reads cross-border narrative.
  - Intro reveal-circle chips show 6 Swahili actions, not Send/Receive/Pay/Deposit/Top-up/Convert.
  - Intro floating cards show TSh / USD / mobile-money / supplier-payment content — no `€`, `EUR`, `GB44 IBAN`, `BTC` content.
  - `app/components/Traction.jsx` exists; `app/components/WhyKeytom.jsx` is gone.
  - Traction section shows exactly 4 stat cards + a waitlist callout.
  - `grep -RIin "next-generation digital financial institution\|126+\|crypto insurance\|GB44\|EUR" app/components/Intro.jsx app/components/Traction.jsx` returns nothing.
  - `npm run build` is clean.

---

## Phase A — Intro: cross-border payments story

### Task 1: Replace the Intro headline

**Files:**
- Modify: `app/components/Intro.jsx`

- [ ] **Step 1: Replace the headline copy**

In `app/components/Intro.jsx`, find the headline block (currently around lines 417–423):

```jsx
        <p
          ref={headlineRef}
          className="intro-headline text-center lg:max-w-2xl max-[900px]:text-6 z-20 relative"
        >
          A next-generation digital financial institution built for people and
          businesses who move fast and think global.
        </p>
```

Replace with:

```jsx
        <p
          ref={headlineRef}
          className="intro-headline text-center lg:max-w-2xl max-[900px]:text-6 z-20 relative"
        >
          Pay anywhere. Get paid anywhere. Hold TZS, send USD, CNY or INR — your
          customers, suppliers, and lenders all in one app.
        </p>
```

(The gradient styling on `.intro-headline` was rewired to Swahilies tokens in Section 1, so the new copy renders in the accent → peach → secondary gradient.)

### Task 2: Replace the reveal-circle 6 chips

**Files:**
- Modify: `app/components/Intro.jsx`

The current reveal circle (after the cards converge) shows six chips: Send / Receive / Pay / Deposit / Top-up / Convert. We replace them with six Swahilies app actions matched to icons we already import.

- [ ] **Step 1: Update the icon imports**

In `app/components/Intro.jsx`, find the existing icon import block at the top of the file (lines 7–18). Replace:

```jsx
import {
  FaCcVisa,
  FaBitcoin,
  FaEuroSign,
  FaPaperPlane,
  FaInbox,
  FaCreditCard,
  FaPiggyBank,
  FaPlusCircle,
  FaExchangeAlt,
} from "react-icons/fa";
import { TbChartInfographic } from "react-icons/tb";
```

with:

```jsx
import {
  FaMoneyBillWave,
  FaUsers,
  FaFileInvoice,
  FaHandHoldingUsd,
  FaBook,
  FaListAlt,
  FaArrowsAltH,
  FaMobileAlt,
} from "react-icons/fa";
```

(All previous Keytom-specific icons dropped — `FaCcVisa`, `FaBitcoin`, `FaEuroSign`, `FaPaperPlane`, `FaInbox`, `FaCreditCard`, `FaPiggyBank`, `FaPlusCircle`, `FaExchangeAlt`, and the unused `TbChartInfographic` from `react-icons/tb`. We add only the eight icons we actually use in the new chips + card render blocks: `FaMoneyBillWave` (Malipo), `FaUsers` (Wateja chip + wateja card), `FaFileInvoice` (Invoice), `FaHandHoldingUsd` (Mkopo), `FaBook` (Notebook), `FaListAlt` (Madeni), `FaArrowsAltH` (cross-border arrows in supplier-payment card), `FaMobileAlt` (mobile-money card).)

- [ ] **Step 2: Replace the six reveal-circle chip rows**

In `app/components/Intro.jsx`, find the `<div ref={circularRef} ...>` block containing the six chips (currently around lines 334–359). Replace the entire `<div ref={circularRef} ...>...</div>` block with:

```jsx
            <div ref={circularRef} className="circular border-3 p-5 flex flex-col gap-4 text-[clamp(1.4rem,3.2vw,2.6rem)] font-semibold">
              <div className="flex items-center gap-3 pb-2">
                <FaMoneyBillWave className="circle-text-icon text-[1.3em] lg:text-[0.7em] p-1.5 lg:p-1 md:p-3" />
                <span className="text-xl">Malipo</span>
              </div>
              <div className="flex items-center gap-3 pb-2">
                <FaListAlt className="circle-text-icon text-[1.3em] lg:text-[0.7em] p-1.5 lg:p-1 md:p-3" />
                <span className="text-xl">Madeni</span>
              </div>
              <div className="flex items-center gap-3 pb-2">
                <FaBook className="circle-text-icon text-[1.3em] lg:text-[0.7em] p-1.5 lg:p-1 md:p-3" />
                <span className="text-xl">Notebook</span>
              </div>
              <div className="flex items-center gap-3 pb-2">
                <FaUsers className="circle-text-icon text-[1.3em] lg:text-[0.7em] p-1.5 lg:p-1 md:p-3" />
                <span className="text-xl">Wateja</span>
              </div>
              <div className="flex items-center gap-3 pb-2">
                <FaHandHoldingUsd className="circle-text-icon text-[1.3em] lg:text-[0.7em] p-1.5 lg:p-1 md:p-3" />
                <span className="text-xl">Mkopo</span>
              </div>
              <div className="flex items-center gap-3">
                <FaFileInvoice className="circle-text-icon text-[1.3em] lg:text-[0.7em] p-1.5 lg:p-1 md:p-3" />
                <span className="text-xl">Invoice</span>
              </div>
            </div>
```

(Six children, same `.circle-text-icon` class so the GSAP icon-bg-color transition still hits them.)

### Task 3: Replace the 6 floating cards (data + content)

**Files:**
- Modify: `app/components/Intro.jsx`

The 6-card array drives both initial positions and per-card render content. We keep the array length at 6 and the `type` field as the discriminator. We rewrite both the array and the conditional render blocks.

- [ ] **Step 1: Replace the `cardData` array**

In `app/components/Intro.jsx`, find the `cardData` array (currently around lines 436–461). Replace with:

```jsx
          const cardData = [
            {
              type: "tsh-balance",
              bg: "linear-gradient(135deg, var(--color-primary) 0%, #1a1a24 100%)",
            },
            {
              type: "tanzania-account",
              bg: "linear-gradient(135deg, #2a2546 0%, #1a1530 100%)",
            },
            {
              type: "mobile-money",
              bg: "linear-gradient(135deg, var(--wash-cream) 0%, #f0e0a8 100%)",
            },
            {
              type: "supplier-payment",
              bg: "linear-gradient(135deg, var(--wash-lavender) 0%, #d8cef0 100%)",
            },
            {
              type: "madeni",
              bg: "linear-gradient(135deg, var(--wash-peach) 0%, #f4c5a8 100%)",
            },
            {
              type: "wateja",
              bg: "linear-gradient(135deg, #3a2f1a 0%, #2a2010 100%)",
            },
          ];
```

(Mix of dark and light card gradients so the converged scene reads at center.)

- [ ] **Step 2: Replace all six per-card render blocks**

In `app/components/Intro.jsx`, find the entire chain of conditional render blocks for the 6 card types (currently around lines 477–586 — the six `{cardData[i].type === "..." && (...)}` blocks). Replace the entire chain with:

```jsx
              {cardData[i].type === "tsh-balance" && (
                <div className="relative w-full h-full p-5 flex flex-col justify-between text-white">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'var(--color-accent)' }}>
                      <span className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>T</span>
                    </div>
                    <span className="text-2xl font-semibold">TZS</span>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-1">TSh 2,450,000</div>
                    <p className="text-sm opacity-80">Balance</p>
                  </div>
                </div>
              )}

              {cardData[i].type === "tanzania-account" && (
                <div className="relative w-full h-full p-5 flex flex-col justify-between text-white">
                  <div>
                    <h3 className="text-base font-medium mb-8">Tanzania account</h3>
                    <div className="space-y-1.5">
                      <p className="text-xs opacity-80">
                        Receive in TZS, pay anywhere
                      </p>
                      <p className="text-xs opacity-80">Balance: TSh 2,450,000</p>
                    </div>
                  </div>
                </div>
              )}

              {cardData[i].type === "mobile-money" && (
                <div className="relative w-full h-full p-6 flex flex-col justify-between" style={{ color: 'var(--color-primary)' }}>
                  <div className="flex items-center gap-2">
                    <FaMobileAlt className="text-xl" />
                    <span className="text-sm font-semibold">Mobile money</span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold mb-1">M-Pesa</div>
                    <p className="text-sm opacity-80">Airtel Money · Tigo Pesa</p>
                  </div>
                </div>
              )}

              {cardData[i].type === "supplier-payment" && (
                <div className="relative w-full h-full p-5 flex flex-col justify-between" style={{ color: 'var(--color-primary)' }}>
                  <div className="flex items-center gap-2">
                    <FaArrowsAltH className="text-xl" />
                    <span className="text-sm font-semibold">Cross-border</span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold mb-1">$ 12,580</div>
                    <p className="text-xs opacity-80">Supplier paid in USD / CNY / INR</p>
                  </div>
                </div>
              )}

              {cardData[i].type === "madeni" && (
                <div className="relative w-full h-full p-6 flex flex-col justify-end" style={{ color: 'var(--color-primary)' }}>
                  <div className="mb-4">
                    <div className="text-3xl font-bold mb-1">TSh 425,000</div>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold mb-0.5">Madeni</h3>
                    <p className="text-sm opacity-80">Outstanding debts</p>
                  </div>
                </div>
              )}

              {cardData[i].type === "wateja" && (
                <div className="relative w-full h-full p-6 flex flex-col justify-between text-white">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'var(--color-accent)' }}>
                      <FaUsers className="text-base" style={{ color: 'var(--color-primary)' }} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">247 Wateja</h3>
                    <p className="text-sm opacity-80">Active customers tracked</p>
                  </div>
                </div>
              )}
```

(Six render blocks, in the same `type` order as the `cardData` array, so `cardData[i].type === "..."` still selects the right block at every index.)

### Task 4: Verify Intro builds

- [ ] **Step 1: Build**

```bash
npm run build 2>&1 | tail -15
```
Expected: build completes, no errors. TypeScript will check the JSX for unresolved imports — if you see a "FaXyz is not exported from react-icons/fa" error, the icon name is wrong and needs fixing in the imports of Task 2.

- [ ] **Step 2: Smoke test**

If dev server isn't running, start it:

```bash
npm run dev
```

Open `http://localhost:3000` and scroll past the hero into the Intro section. The pinned scroll animation still runs: cards converge to center; the reveal circle expands; the new six chips (Malipo / Madeni / Notebook / Wateja / Mkopo / Invoice) appear; the phone illustration fades in. Check that no card shows `€`, `EUR`, `GB44`, or `BTC` text.

### Task 5: Commit Phase A

- [ ] **Step 1: Stage and commit**

```bash
git add app/components/Intro.jsx
git commit -m "$(cat <<'EOF'
section 3 intro: cross-border payments story

Replace the Keytom Intro narrative ("next-generation digital financial
institution") with the Swahilies cross-border payments story: TZS in,
USD/CNY/INR out, via bank, mobile money, or stablecoin.

Swap all six floating cards from Euro/IBAN/BTC mockups to TSh balance,
Tanzania account, mobile money methods, supplier payment in USD,
madeni summary, and wateja count. Swap the reveal-circle six chips
from Send/Receive/Pay/Deposit/Top-up/Convert to Malipo/Madeni/
Notebook/Wateja/Mkopo/Invoice.

GSAP pinned scroll-trigger timeline and the 6-card / 6-chip /
phone-image ref topology stay untouched — only JSX content changes.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 2: Verify**

```bash
git status
git log --oneline -2
```
Expected: clean working tree; latest commit is the Intro rewrite.

---

## Phase B — Traction rename + content

### Task 6: Rename `WhyKeytom.jsx` to `Traction.jsx`

**Files:**
- Rename via git: `app/components/WhyKeytom.jsx` → `app/components/Traction.jsx`

- [ ] **Step 1: Rename**

```bash
git mv app/components/WhyKeytom.jsx app/components/Traction.jsx
```

- [ ] **Step 2: Verify**

```bash
git status
```
Expected: shows `renamed: app/components/WhyKeytom.jsx -> app/components/Traction.jsx` (possibly with a percentage similarity).

### Task 7: Rewrite Traction component contents

**Files:**
- Modify: `app/components/Traction.jsx`

- [ ] **Step 1: Rename the export and component**

In `app/components/Traction.jsx`, find:

```jsx
export default function WhyKeytom() {
```

and change to:

```jsx
export default function Traction() {
```

- [ ] **Step 2: Replace the section background and title text**

Find the opening `<section>` (around line 166):

```jsx
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 lg:min-h-[110vh] bg-[linear-gradient(100deg,#f3e6c9_0%,#efd7c7_45%,#d6a6bf_100%)] max-[767px]:min-h-[100vh] max-[767px]:pt-36 max-[767px]:pb-0"
    >
```

Replace with:

```jsx
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 lg:min-h-[110vh] max-[767px]:min-h-[100vh] max-[767px]:pt-36 max-[767px]:pb-0"
      style={{
        background:
          "linear-gradient(135deg, var(--wash-cream) 0%, var(--wash-lavender) 100%)",
      }}
    >
```

- [ ] **Step 3: Replace the watermark title**

Find the watermark title (around line 185):

```jsx
      <div
        ref={titleRef}
        className="text-center text-[clamp(3rem,11vw,10rem)] font-semibold tracking-[-0.02em] text-white/35 max-[900px]:text-white/60 max-[900px]:text-4xl pointer-events-none select-none"
      >
        Why Keytom?
      </div>
```

Replace with:

```jsx
      <div
        ref={titleRef}
        className="text-center text-[clamp(3rem,11vw,10rem)] font-semibold tracking-[-0.02em] pointer-events-none select-none"
        style={{ color: "rgba(14, 14, 16, 0.18)" }}
      >
        Traction to-date
      </div>
```

- [ ] **Step 4: Replace card one (12,000 MAU)**

Find the cardOne content (around lines 200–217):

```jsx
                <div
                  ref={cardOneRef}
                  className="reason-card md:absolute md:left-0  lg:left-4  bg-[rgba(253,249,242,0.9)] border border-white/70 rounded-[3px] p-6 min-h-[320px]  max-h-[400px] flex flex-col gap-4 shadow-[0_20px_50px_rgba(159,118,129,0.2)] max-[767px]:flex-none max-[767px]:w-[76vw] sm:max-[767px]:w-[60vw] md:w-[260px] lg:w-[280px]"
                >
                  <div>
                    <h3 className="text-[30px] font-bold text-[#b07f8d] leading-none mb-1">
                      126+
                    </h3>
                    <p className="text-[1.1rem] font-semibold text-[#b07f8d]">
                      countries supported
                    </p>
                  </div>

                  <p className="text-[0.9rem] leading-[1.5] text-[rgba(176,127,141,0.85)] mt-auto">
                    We onboard users from 126+ countries, whether you hold a
                    passport or a residence permit we've got you covered.
                  </p>
                </div>
```

Replace with:

```jsx
                <div
                  ref={cardOneRef}
                  className="reason-card md:absolute md:left-0 lg:left-4 border rounded-[14px] p-6 min-h-[320px] max-h-[400px] flex flex-col gap-4 shadow-[0_20px_50px_rgba(14,14,16,0.10)] max-[767px]:flex-none max-[767px]:w-[76vw] sm:max-[767px]:w-[60vw] md:w-[260px] lg:w-[280px]"
                  style={{
                    background: "var(--wash-cream)",
                    borderColor: "rgba(14,14,16,0.10)",
                  }}
                >
                  <div>
                    <h3
                      className="text-[44px] font-bold leading-none mb-1"
                      style={{ color: "var(--color-primary)" }}
                    >
                      12,000
                    </h3>
                    <p
                      className="text-[1.1rem] font-semibold"
                      style={{ color: "var(--color-primary)" }}
                    >
                      Monthly Active Users
                    </p>
                  </div>

                  <p
                    className="text-[0.9rem] leading-[1.5] mt-auto"
                    style={{ color: "var(--color-muted)" }}
                  >
                    SMEs across Tanzania use Swahilies daily for sales, stock,
                    and customer tracking.
                  </p>
                </div>
```

- [ ] **Step 5: Replace card two (1,100 Paying SMEs)**

Find the cardTwo content (around lines 219–251). Replace with:

```jsx
                <div
                  ref={cardTwoRef}
                  className="reason-card md:absolute md:left-[25%] lg:left-[26%] border rounded-[14px] p-6 min-h-[320px] max-h-[400px] flex flex-col gap-4 shadow-[0_20px_50px_rgba(14,14,16,0.10)] max-[767px]:flex-none max-[767px]:w-[76vw] sm:max-[767px]:w-[60vw] md:w-[260px] lg:w-[280px]"
                  style={{
                    background: "#E4F5EC",
                    borderColor: "rgba(14,14,16,0.10)",
                  }}
                >
                  <div>
                    <h3
                      className="text-[44px] font-bold leading-none mb-1"
                      style={{ color: "var(--color-primary)" }}
                    >
                      1,100
                    </h3>
                    <p
                      className="text-[1.1rem] font-semibold"
                      style={{ color: "var(--color-primary)" }}
                    >
                      Paying SMEs
                    </p>
                  </div>

                  <p
                    className="text-[0.9rem] leading-[1.5] mt-auto"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Businesses that pay every month for bookkeeping, sales,
                    and payment features.
                  </p>
                </div>
```

(The `Fees for individuals / Fees for businesses` underlined links are dropped — both pointed at `#` dead anchors.)

- [ ] **Step 6: Replace card three ($500K processed)**

Find the cardThree content (around lines 253–271). Replace with:

```jsx
                <div
                  ref={cardThreeRef}
                  className="reason-card md:absolute md:right-[25%] lg:right-[26%] border rounded-[14px] p-6 min-h-[320px] max-h-[400px] flex flex-col gap-4 shadow-[0_20px_50px_rgba(14,14,16,0.10)] max-[767px]:flex-none max-[767px]:w-[76vw] sm:max-[767px]:w-[60vw] md:w-[260px] lg:w-[280px]"
                  style={{
                    background: "var(--wash-lavender)",
                    borderColor: "rgba(14,14,16,0.10)",
                  }}
                >
                  <div>
                    <h3
                      className="text-[44px] font-bold leading-none mb-1"
                      style={{ color: "var(--color-primary)" }}
                    >
                      $500K
                    </h3>
                    <p
                      className="text-[1.1rem] font-semibold"
                      style={{ color: "var(--color-primary)" }}
                    >
                      Processed (last 4 months)
                    </p>
                  </div>

                  <p
                    className="text-[0.9rem] leading-[1.5] mt-auto"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Real money moving through Swahilies — customer payments,
                    supplier bills, and cross-border transfers.
                  </p>
                </div>
```

- [ ] **Step 7: Replace card four ($10K MRR)**

Find the cardFour content (around lines 273–298). Replace with:

```jsx
                <div
                  ref={cardFourRef}
                  className="reason-card md:absolute md:right-0 lg:right-4 border rounded-[14px] p-6 min-h-[320px] max-h-[400px] flex flex-col gap-4 shadow-[0_20px_50px_rgba(14,14,16,0.10)] max-[767px]:flex-none max-[767px]:w-[76vw] sm:max-[767px]:w-[60vw] md:w-[260px] lg:w-[280px]"
                  style={{
                    background: "var(--wash-lavender)",
                    borderColor: "rgba(14,14,16,0.10)",
                  }}
                >
                  <div>
                    <h3
                      className="text-[44px] font-bold leading-none mb-1"
                      style={{ color: "var(--color-primary)" }}
                    >
                      $10K
                    </h3>
                    <p
                      className="text-[1.1rem] font-semibold"
                      style={{ color: "var(--color-primary)" }}
                    >
                      Monthly revenue
                    </p>
                  </div>

                  <p
                    className="text-[0.9rem] leading-[1.5] mt-auto"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Recurring revenue from SaaS plans, FX margin, and
                    transaction fees — sustainable operations, not a runway
                    burn.
                  </p>
                </div>
```

(The "Learn more?" `<a href="#">` dead link is dropped.)

- [ ] **Step 8: Add the waitlist callout below the card grid**

In `app/components/Traction.jsx`, find the closing of the cards-grid block. The structure is:

```jsx
              <div ref={trackRef} className="...">
                {/* four cards */}
              </div>
            </div>
          </div>
        </div>
      </div>
```

After that final closing `</div>` (the one closing the outermost container `<div className="mx-auto w-full z-50">`), and *before* the closing `</section>`, add a new sibling block for the callout:

```jsx
      <div className="relative z-30 mt-12 max-[767px]:mt-8 px-6 max-w-3xl mx-auto text-center">
        <p
          className="text-base sm:text-lg font-medium"
          style={{ color: "var(--color-primary)" }}
        >
          <span
            className="inline-flex items-center justify-center w-7 h-7 rounded-full mr-3 align-middle"
            style={{ background: "var(--color-accent)", color: "var(--color-primary)" }}
          >
            →
          </span>
          5,000+ SMEs on the waitlist for cross-border payments &amp; lending.
        </p>
      </div>
```

- [ ] **Step 9: Drop the decorative star imgs (they referenced Keytom's pink/peach palette)**

In `app/components/Traction.jsx`, find the two `<img src="/assets/images/star1.svg" ... />` decorative spans (around lines 170–183). Delete the whole `<div className="absolute inset-0 pointer-events-none">...</div>` wrapper containing both star images.

### Task 8: Update the homepage import

**Files:**
- Modify: `app/home/page.tsx`

- [ ] **Step 1: Update the import statement**

In `app/home/page.tsx`, find line 10:

```tsx
import WhyKeytom from "../components/WhyKeytom";
```

Replace with:

```tsx
import Traction from "../components/Traction";
```

- [ ] **Step 2: Update the JSX render**

In the same file, find:

```tsx
      <WhyKeytom />
```

Replace with:

```tsx
      <Traction />
```

### Task 9: Verify + Commit Phase B

- [ ] **Step 1: Run the Section-3 grep**

```bash
grep -RIin "next-generation digital financial institution\|126+\|crypto insurance\|GB44\|EUR " app/components/Intro.jsx app/components/Traction.jsx
```
Expected: no matches.

- [ ] **Step 2: Run the full Section-6 grep (informational)**

```bash
grep -RIin 'keytom\|IBAN\|SEPA\|crypto insurance\|126+ countries' app/ public/ 2>/dev/null | wc -l
```
Expect a meaningful drop from the 85 we ended Section 2 with.

- [ ] **Step 3: Build**

```bash
npm run build 2>&1 | tail -15
```
Expected: build completes, no errors. Routes still include `/`, `/business`, `/cards`, `/contact`.

- [ ] **Step 4: Smoke test**

Reload `http://localhost:3000`. Scroll past Hero → Intro → Services → into the new Traction section:
- Background: cream-to-lavender wash gradient (was pink/peach Keytom gradient).
- Watermark title reads "Traction to-date" (was "Why Keytom?").
- Four stat cards stack into view as you scroll (desktop) or scroll horizontally (mobile): 12,000 MAU / 1,100 Paying SMEs / $500K Processed / $10K Monthly revenue.
- Waitlist callout below the cards reads "5,000+ SMEs on the waitlist for cross-border payments & lending."

- [ ] **Step 5: Commit**

```bash
git add app/components/Traction.jsx app/components/WhyKeytom.jsx app/home/page.tsx
git commit -m "$(cat <<'EOF'
section 3 traction: rename WhyKeytom -> Traction with deck stats

Replace the Keytom "Why Keytom?" reason cards (126+ countries, low
fees, online onboarding, $100M crypto insurance) with the four
traction stats from the deck: 12,000 monthly active users, 1,100
paying SMEs, $500K processed in the last 4 months, $10K monthly
revenue. Add the "5,000+ on the waitlist" callout below the grid.

Move the section background from Keytom pink/peach to a cream ->
lavender wash using Section-1 tokens. Swap card backgrounds to
cream / mint / lavender / lavender matching the deck slide.

git mv WhyKeytom.jsx -> Traction.jsx; update the home page import
and JSX use site. GSAP stack-on-scroll timeline kept byte-identical.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 6: Verify**

```bash
git log --oneline -3
git status
```
Expected: latest two commits are the Intro rewrite and the WhyKeytom→Traction rename; clean working tree.

---

## Section 3 acceptance criteria (recap)

- ✅ Intro headline reads the cross-border narrative ("Pay anywhere. Get paid anywhere. Hold TZS, send USD…").
- ✅ Intro reveal-circle shows 6 Swahili actions (Malipo / Madeni / Notebook / Wateja / Mkopo / Invoice).
- ✅ Intro 6 floating cards show Swahilies/TZS/USD content; no `€`, `EUR`, `GB44`, or `BTC` strings remain.
- ✅ `app/components/WhyKeytom.jsx` is gone; `app/components/Traction.jsx` exists.
- ✅ Traction section title is "Traction to-date".
- ✅ Traction shows 4 stat cards: 12,000 MAU / 1,100 Paying SMEs / $500K processed (last 4 months) / $10K monthly revenue.
- ✅ Waitlist callout appears below the card grid.
- ✅ Traction background is cream-to-lavender wash (not pink/peach Keytom gradient).
- ✅ `app/home/page.tsx` imports and renders `Traction`, not `WhyKeytom`.
- ✅ `grep -RIin "next-generation digital financial institution\|126+\|crypto insurance\|GB44\|EUR " app/components/Intro.jsx app/components/Traction.jsx` returns nothing.
- ✅ `npm run build` is clean.

## Out of scope for Section 3 (explicit deferrals)

- The cards page (`/cards`) + `VirtualCard.tsx` repurpose — Section 4 (HowItWorks walkthrough).
- `BuiltFor` rewrite — Section 4.
- Comparison + FAQ + Footer content — Section 5.
- Replacing `phone2.png` / `swahi1.png` placeholder images — Section 4 (real app screenshots from `data/`) and Section 6 (final sweep).
- CSS class renames `.why-keytom-*` in `globals.css` — the classes aren't used (the new Traction component uses inline `style={{...}}`); a Section 6 cleanup will delete them.
