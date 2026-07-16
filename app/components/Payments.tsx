"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Smartphone,
  CreditCard,
  Code2,
  ShoppingCart,
  Link2,
  FileText,
  Banknote,
  Globe2,
  Send,
  RefreshCw,
  Zap,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type BentoTile = {
  Icon: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
    style?: React.CSSProperties;
  }>;
  // When set, this custom icon image renders instead of the lucide Icon
  // above — used where a matching hand-picked icon exists.
  iconSrc?: string;
  title: string;
  description: string;
  // small uppercase category tag, bottom-left — mirrors the meta caption
  // ("4 VIDEOS", "ZIP DOWNLOAD") in the references
  category: string;
  // accent used only for the icon color / photo-block tint
  accent: string;
  // photo-style tiles get a full-bleed background (real photo if `image`
  // is set, otherwise an accent-gradient block with the icon) — the rest
  // stay flat, numbered, text-only
  photo?: boolean;
  image?: string;
  // grid width, out of 4 columns — varies the sizing instead of one
  // uniform cell for every tile
  span: 1 | 2;
};

// Nine tiles on a 4-column grid — sizes vary (span 1 or 2) instead of one
// uniform cell, and a few cells are deliberately left empty (see the
// layout array below) for real negative space. Settlement sits as its
// own closing banner outside the numbered grid.
const tiles: BentoTile[] = [
  {
    Icon: Smartphone,
    iconSrc: "/assets/icons/mobile-banking.png",
    title: "Mobile money Collection",
    description:
      "M-Pesa, Tigo Pesa, Airtel Money, HaloPesa. One integration, every wallet.",
    category: "Collect",
    accent: "var(--color-accent)",
    photo: true,
    image: "/assets/images/mobile-operators.svg",
    span: 2,
  },
  {
    Icon: Globe2,
    iconSrc: "/assets/icons/cross-border.png",
    title: "Cross-border payments",
    description:
      "Pay suppliers in USD, CNY, INR, EUR, GBP, funded from local currency, real mid-market FX, settles in hours.",
    category: "Cross-border",
    accent: "var(--color-secondary)",
    photo: true,
    image: "/assets/images/cross-cards.jpg",
    span: 1,
  },
  {
    Icon: CreditCard,
    iconSrc: "/assets/icons/cards.png",
    title: "Cards",
    description: "Visa, Mastercard, local networks. 3D Secure included.",
    category: "Collect",
    accent: "var(--color-secondary)",
    photo: true,
    image: "/assets/images/card3.png",
    span: 2,
  },
  {
    Icon: Send,
    iconSrc: "/assets/icons/disbursements.png",
    title: "Disbursements",
    description:
      "Bulk payouts to bank accounts and mobile wallets in a single API call.",
    category: "Payouts",
    accent: "var(--color-tertiary)",
    span: 1,
  },
  {
    Icon: Code2,
    iconSrc: "/assets/icons/api.png",
    title: "Payment API",
    description:
      "REST endpoints, sandbox keys, idempotent operations. Live in an afternoon.",
    category: "Developers",
    accent: "var(--color-success)",
    span: 2,
  },
  {
    Icon: ShoppingCart,
    iconSrc: "/assets/icons/checkout.png",
    title: "Checkout SDK",
    description:
      "Drop-in checkout for web and mobile. Or build fully custom on the API.",
    category: "Developers",
    accent: "var(--color-accent)",
    span: 1,
  },
  {
    Icon: Link2,
    iconSrc: "/assets/icons/collection.png",
    title: "Payment links",
    description:
      "Get paid without writing code. Share a link, accept any rail.",
    category: "Collect",
    accent: "var(--color-tertiary)",
    span: 1,
  },
  {
    Icon: FileText,
    iconSrc: "/assets/icons/invoice.png",
    title: "Invoices",
    description:
      "Branded invoices customers can pay in one tap. Auto reminders.",
    category: "Billing",
    accent: "var(--color-secondary)",
    span: 2,
  },
  {
    Icon: RefreshCw,
    title: "Subscriptions",
    description:
      "Recurring billing in local currencies. Smart retries, dunning.",
    category: "Billing",
    accent: "var(--color-success)",
    span: 1,
  },
  {
    Icon: Banknote,
    iconSrc: "/assets/icons/collection_2.png",
    title: "Settlement",
    description:
      "Same-day settlement to your bank or wallet, in your local currency.",
    category: "Settlement",
    accent: "var(--color-accent)",
    span: 1,
  },
];

// Three main groups the nine features fall into. On desktop each one is a
// full-viewport pinned panel in a scrollytelling sequence; on mobile they
// fall back to a plain stacked, alternating image/checklist row.
// `wash` is a literal rgba (not the CSS var) since it's blended into a
// gradient string, which can't resolve a var() reference at that point.
const GROUPS = [
  {
    label: "Collect",
    description:
      "Every way a customer can pay you: mobile money, cards, links, invoices, and recurring billing, funneled into one dashboard.",
    image: "/assets/images/card3.png",
    accent: "var(--color-accent)",
    wash: "rgba(240, 160, 32, 0.12)",
    indices: [0, 2, 7],
  },
  {
    label: "Move money",
    description:
      "Send payouts, settle across borders, and get funds where they need to be, fast, and in the right currency.",
    image: "/assets/images/cross-cards.jpg",
    accent: "var(--color-secondary)",
    wash: "rgba(124, 92, 224, 0.12)",
    indices: [1, 3, 9],
  },
  {
    label: "Build",
    description:
      "Drop straight into the API or ship a checkout in minutes with the SDK, sandbox keys included.",
    image: "/assets/images/api-code.svg",
    accent: "var(--color-success)",
    wash: "rgba(47, 168, 106, 0.12)",
    indices: [4, 5],
  },
];

const trustPoints = [
  { Icon: Zap, label: "99.95% uptime SLA" },
  { Icon: Globe2, label: "Pan-African coverage" },
];

// Which grid column (1/2/3) each block sits in per group — the image
// isn't pinned to the middle every time, so each state reads differently.
const COLUMN_ORDERS = [
  { text: 1, image: 2, points: 3 }, // Collect — image centered
  { text: 1, points: 2, image: 3 }, // Move money — image on the right
  { image: 1, text: 2, points: 3, imageEdge: "left" as const }, // Build — image pulled to the screen edge
];

// A slight, alternating tilt per group's photo frame — lives on an inner
// wrapper, never on .panel-reveal-image itself (GSAP writes its own
// scale/opacity transform there, which would otherwise wipe out a rotate
// class living on the same element).
const ROTATIONS = ["-rotate-2", "rotate-2", "-rotate-3"];

// Small viewfinder-style corner marks framing each photo — purely
// decorative, rotates along with the photo since it shares the same
// (non-GSAP-targeted) wrapper.
function CornerBrackets({ color }: { color: string }) {
  const corners = [
    "-top-2.5 -left-2.5 border-t-2 border-l-2 rounded-tl-sm",
    "-top-2.5 -right-2.5 border-t-2 border-r-2 rounded-tr-sm",
    "-bottom-2.5 -left-2.5 border-b-2 border-l-2 rounded-bl-sm",
    "-bottom-2.5 -right-2.5 border-b-2 border-r-2 rounded-br-sm",
  ];
  return (
    <>
      {corners.map((pos) => (
        <span
          key={pos}
          className={`pointer-events-none absolute h-4 w-4 ${pos}`}
          style={{ borderColor: color }}
          aria-hidden="true"
        />
      ))}
    </>
  );
}

export default function Payments() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // matchMedia lives outside the context (mirrors the working pinned
      // sequence in KuzaBusiness.tsx) — nesting it inside gsap.context was
      // the likely cause of the panels never animating: if anything in the
      // callback chain threw or skipped, the panels were left in their
      // default stacked CSS position with no visible pin/scroll at all.
      const mm = gsap.matchMedia();

      const ctx = gsap.context(() => {
        // Header — plays once
        gsap.from(".payments-head > *", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
        });

        // Desktop: a single pinned panel that morphs through all three
        // groups — the image, the left copy, and the accent wash crossfade
        // from one group's state to the next as you scroll, rather than
        // handing off between separate pinned sections.
        mm.add("(min-width: 901px)", () => {
          const panel = gsap.utils.toArray<HTMLElement>(".group-panel")[0];
          if (!panel) return;

          const states = GROUPS.map((_, i) => ({
            wash: panel.querySelector<HTMLElement>(`[data-state="${i}"] .panel-state-wash`),
            image: panel.querySelector<HTMLElement>(`[data-state="${i}"] .panel-reveal-image`),
            left: panel.querySelectorAll<HTMLElement>(`[data-state="${i}"] .panel-reveal-left`),
            rule: panel.querySelector<HTMLElement>(`[data-state="${i}"] .panel-reveal-rule`),
            points: panel.querySelectorAll<HTMLElement>(`[data-state="${i}"] .panel-reveal-point`),
          }));

          const dots = gsap.utils.toArray<HTMLElement>(".payments-dot", panel);

          states.forEach((s, i) => {
            if (s.wash) gsap.set(s.wash, { opacity: i === 0 ? 1 : 0 });
            if (s.image) gsap.set(s.image, { opacity: 0, scale: i === 0 ? 0.92 : 0.96 });
            gsap.set(s.left, { opacity: 0, x: i === 0 ? -24 : 16 });
            if (s.rule) gsap.set(s.rule, { scaleX: 0, transformOrigin: "left center" });
            gsap.set(s.points, { opacity: 0, y: 20 });
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: panel,
              start: "top top",
              end: `+=${700 + 900 * (states.length - 1)}`,
              pin: true,
              pinSpacing: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // Entrance of the first group.
          if (states[0].image) {
            tl.to(states[0].image, { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" });
          }
          tl.to(states[0].left, { opacity: 1, x: 0, stagger: 0.1, duration: 0.5, ease: "power2.out" });
          if (states[0].rule) {
            tl.to(states[0].rule, { scaleX: 1, duration: 0.5, ease: "power2.out" }, "<0.1");
          }
          tl.to(states[0].points, { opacity: 1, y: 0, stagger: 0.2, duration: 0.4, ease: "power2.out" });
          tl.to({}, { duration: 0.5 }); // hold so the first state has room to breathe

          // Crossfade into each following group — image, copy, colors and
          // points all transition together for a single smooth morph.
          for (let i = 1; i < states.length; i++) {
            const prev = states[i - 1];
            const next = states[i];

            if (prev.wash) tl.to(prev.wash, { opacity: 0, duration: 0.9, ease: "power2.inOut" }, "<");
            if (next.wash) tl.to(next.wash, { opacity: 1, duration: 0.9, ease: "power2.inOut" }, "<");

            if (prev.image) tl.to(prev.image, { opacity: 0, scale: 1.06, duration: 0.7, ease: "power2.inOut" }, "<");
            if (next.image) tl.fromTo(next.image, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.7, ease: "power2.out" }, "<0.15");

            tl.to(prev.left, { opacity: 0, x: -16, duration: 0.5, ease: "power2.inOut" }, "<0.1");
            tl.fromTo(next.left, { opacity: 0, x: 16 }, { opacity: 1, x: 0, stagger: 0.08, duration: 0.5, ease: "power2.out" }, "<0.2");

            if (prev.rule) tl.to(prev.rule, { scaleX: 0, duration: 0.4, ease: "power2.inOut" }, "<0.1");
            if (next.rule) tl.fromTo(next.rule, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "power2.out" }, "<0.25");

            tl.to(prev.points, { opacity: 0, y: -12, duration: 0.4, ease: "power2.inOut" }, "<0.1");
            tl.fromTo(next.points, { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.4, ease: "power2.out" }, "<0.3");

            if (dots[i - 1] && dots[i]) {
              tl.to(dots[i - 1], { width: "6px", backgroundColor: "var(--color-border-strong)", duration: 0.4, ease: "power2.inOut" }, "<0.1");
              tl.to(dots[i], { width: "22px", backgroundColor: GROUPS[i].accent, duration: 0.4, ease: "power2.inOut" }, "<0.1");
            }

            tl.to({}, { duration: 0.5 }); // hold on this state before the next transition
          }

          return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
          };
        });

        // Mobile: no pinning — plain stacked rows, each sliding in from
        // its own side as it's scrolled to.
        mm.add("(max-width: 900px)", () => {
          const sideBlocks = gsap.utils.toArray<HTMLElement>("[data-side]");
          sideBlocks.forEach((el) => {
            const fromLeft = el.dataset.side === "left";
            gsap.from(el, {
              x: fromLeft ? -50 : 50,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            });
          });
        });
      }, sectionRef);

      return () => {
        ctx.revert();
        mm.revert();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="payments"
      ref={sectionRef}
      className="mesh-gradient pb-24 max-[900px]:py-16 relative overflow-hidden"
    >
      <div className="min-h-screen flex items-center justify-center max-[900px]:min-h-0 mx-auto max-w-7xl px-6">
        {/* Section header — acts as this page's own hero, so it's centered
            in the viewport on first load rather than pinned to the top.
            Centered horizontally too, since there's nothing balancing it
            on the right the way Hero's copy/video split has. */}
        <div className="payments-head max-w-4xl mx-auto mb-12 max-[900px]:mb-8 text-center">
          <div className="flex items-center justify-center gap-2.5 mb-5">
            <span className="h-px w-8" style={{ background: "var(--color-accent)" }} aria-hidden="true" />
            <span
              className="text-[0.72rem] uppercase tracking-[0.28em] font-semibold"
              style={{ color: "var(--color-muted)" }}
            >
              Payments
            </span>
            <span className="h-px w-8" style={{ background: "var(--color-accent)" }} aria-hidden="true" />
          </div>
          <h2 className="mb-5 leading-[1.05]">
            <span
              className="block text-[clamp(1.5rem,2.8vw,2.2rem)] font-medium tracking-[-0.01em] mb-1"
              style={{ color: "var(--color-muted)" }}
            >
              Every rail. Every market.
            </span>
            <span
              className="block uppercase text-[clamp(3.4rem,7.4vw,6.4rem)] font-bold tracking-[-0.03em]"
              style={{ color: "var(--color-primary)" }}
            >
              One platform.
            </span>
          </h2>
          <p
            className="text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto"
            style={{ color: "var(--color-muted)" }}
          >
            Collect from any African payment method, move money across borders,
            disburse to thousands of recipients, and reconcile from a single
            dashboard.
          </p>
        </div>

      </div>

      {/* Desktop — a single pinned panel. All three groups live inside it
          as stacked, absolutely-positioned states; scrolling morphs the
          image, copy, points, and accent wash from one group's state
          straight into the next rather than handing off between separate
          pinned sections. */}
      <div className="payments-panels max-[900px]:hidden">
        <div className="group-panel relative h-screen w-full overflow-hidden" style={{ backgroundColor: "var(--color-bg)" }}>
          {GROUPS.map((group, gi) => {
            const points = group.indices.slice(0, 3);
            // Which of the three grid columns each block sits in — varies
            // per group so the image isn't always dead center.
            const order = COLUMN_ORDERS[gi % COLUMN_ORDERS.length];

            return (
              <div key={group.label} data-state={gi} className="absolute inset-0 flex items-center">
                <div
                  className="panel-state-wash absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, ${group.wash}, transparent 65%)`,
                  }}
                  aria-hidden="true"
                />

                {/* Image pulled to the true screen edge (not the centered
                    max-w-6xl column) with a small gap from the border. */}
                {order.imageEdge === "left" && (
                  <div className="absolute left-12 sm:left-20 lg:left-28 top-1/2 -translate-y-1/2 z-10">
                    {/* GSAP writes its own inline transform (scale) onto
                        .panel-reveal-image, which would otherwise clobber
                        the -translate-y-1/2 centering above — so that lives
                        on this untouched wrapper instead. */}
                    <div className="panel-reveal-image relative">
                      <div className={`relative ${ROTATIONS[gi % ROTATIONS.length]}`}>
                        <div className="relative w-[min(70vw,17rem)] aspect-[4/5] rounded-2xl overflow-hidden">
                          <img
                            src={group.image}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover"
                            aria-hidden="true"
                          />
                        </div>
                        <CornerBrackets color={group.accent} />
                      </div>
                    </div>
                  </div>
                )}

                <div
                  className={`relative z-10 mx-auto max-w-6xl w-full px-8 sm:px-12 lg:px-16 grid gap-12 items-center ${
                    order.imageEdge === "left" ? "grid-cols-[1.1fr_0.9fr]" : "grid-cols-[0.9fr_1fr_0.9fr]"
                  }`}
                  style={
                    order.imageEdge === "left"
                      ? { paddingLeft: "clamp(21rem, 29vw, 26rem)" }
                      : undefined
                  }
                >
                  {/* Heading + description — the group name is the whole
                      attention-grabber now, no small kicker above it. A
                      hairline draws in beneath it (echoing the hero's
                      word-reveal rule) and the description reads as a
                      pull-quote off an accent-colored spine. */}
                  <div style={{ order: order.text }}>
                    <h3
                      className="panel-reveal-left text-[clamp(4.4rem,8.2vw,7.4rem)] font-extrabold leading-[0.92] tracking-[-0.035em] mb-5"
                    >
                      <span style={{ color: "var(--color-primary)" }}>{group.label}</span>
                      <span style={{ color: group.accent }}>.</span>
                    </h3>
                    <span
                      className="panel-reveal-rule block h-[4px] w-24 rounded-full mb-7"
                      style={{ background: `linear-gradient(90deg, ${group.accent}, transparent)` }}
                      aria-hidden="true"
                    />
                    <p
                      className="panel-reveal-left text-[1.2rem] leading-relaxed max-w-md pl-4"
                      style={{ color: "var(--color-muted)", borderLeft: `2px solid ${group.accent}` }}
                    >
                      {group.description}
                    </p>
                  </div>

                  {/* A single image — skipped here when pulled to the edge above */}
                  {order.imageEdge !== "left" && (
                    <div className="panel-reveal-image flex items-center justify-center" style={{ order: order.image }}>
                      <div className={`relative w-full max-w-[17rem] ${ROTATIONS[gi % ROTATIONS.length]}`}>
                        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden">
                          <img
                            src={group.image}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover"
                            aria-hidden="true"
                          />
                        </div>
                        <CornerBrackets color={group.accent} />
                      </div>
                    </div>
                  )}

                  {/* Three points, revealed one at a time */}
                  <div className="flex flex-col gap-8" style={{ order: order.points }}>
                    {points.map((idx) => {
                      const tile = tiles[idx];
                      const Icon = tile.Icon;
                      return (
                        <div key={idx} className="panel-reveal-point flex items-start gap-3">
                          {tile.iconSrc ? (
                            <img
                              src={tile.iconSrc}
                              alt=""
                              className="h-7 w-7 mt-0.5 shrink-0 object-contain"
                              aria-hidden="true"
                            />
                          ) : (
                            <Icon
                              className="h-5 w-5 mt-1 shrink-0"
                              strokeWidth={2}
                              style={{ color: group.accent }}
                            />
                          )}
                          <div>
                            <div
                              className="text-[1.08rem] font-semibold leading-tight"
                              style={{ color: "var(--color-primary)" }}
                            >
                              {tile.title}
                            </div>
                            <div
                              className="text-[0.92rem] mt-1.5 leading-snug"
                              style={{ color: "var(--color-muted)" }}
                            >
                              {tile.description}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Progress indicator — which of the three groups is active,
              synced to the same crossfade timeline. */}
          <div className="payments-dots absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {GROUPS.map((group, gi) => (
              <span
                key={group.label}
                className="payments-dot h-1.5 rounded-full transition-none"
                style={{
                  width: gi === 0 ? "22px" : "6px",
                  background: gi === 0 ? group.accent : "var(--color-border-strong)",
                }}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile — no pinning, plain stacked rows sliding in from the side. */}
      <div className="hidden max-[900px]:flex max-[900px]:flex-col gap-14 max-w-7xl mx-auto px-6">
        {GROUPS.map((group, gi) => {
          const imageFirst = gi % 2 === 0;
          const numeral = String(gi + 1).padStart(2, "0");

          return (
            <div
              key={group.label}
              className="payments-row relative grid grid-cols-1 gap-6 rounded-3xl -mx-2 px-2 py-6 overflow-hidden"
              style={{
                backgroundImage: `radial-gradient(circle at 15% 10%, ${group.wash}, transparent 60%)`,
              }}
            >
              <span
                aria-hidden="true"
                className="absolute -top-6 right-0 select-none pointer-events-none font-black leading-none"
                style={{
                  fontSize: "8rem",
                  color: "transparent",
                  WebkitTextStroke: `1px ${group.accent}`,
                  opacity: 0.08,
                }}
              >
                {numeral}
              </span>

              {group.image && (
                <div className="relative" data-side={imageFirst ? "left" : "right"}>
                  <div className="relative flex items-center justify-center">
                    <div
                      className="absolute w-56 h-56 rounded-full blur-3xl"
                      style={{ background: group.accent, opacity: 0.16 }}
                      aria-hidden="true"
                    />
                    <img
                      src={group.image}
                      alt=""
                      className="relative w-full max-w-xs object-contain"
                      style={{
                        WebkitMaskImage:
                          "radial-gradient(circle at 50% 50%, black 55%, transparent 82%)",
                        maskImage:
                          "radial-gradient(circle at 50% 50%, black 55%, transparent 82%)",
                      }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              )}

              <div
                className={group.image ? "relative" : "relative max-w-xl mx-auto"}
                data-side={imageFirst ? "right" : "left"}
              >
                <h3
                  className="text-[clamp(1.8rem,5vw,2.6rem)] font-extrabold leading-[1.04] tracking-[-0.02em] mb-3"
                  style={{
                    backgroundImage: `linear-gradient(120deg, var(--color-primary) 20%, ${group.accent} 100%)`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: group.accent,
                  }}
                >
                  {group.label}
                </h3>
                <p
                  className="text-[0.98rem] leading-relaxed mb-6 max-w-md"
                  style={{ color: "var(--color-muted)" }}
                >
                  {group.description}
                </p>
                <ul className="space-y-3">
                  {group.indices.map((idx) => {
                    const tile = tiles[idx];
                    const Icon = tile.Icon;
                    return (
                      <li key={idx} className="flex items-center gap-3">
                        <span
                          className="inline-flex items-center justify-center w-9 h-9 rounded-full shrink-0"
                          style={{ background: group.wash, color: group.accent }}
                        >
                          {tile.iconSrc ? (
                            <img src={tile.iconSrc} alt="" className="h-5 w-5 object-contain" aria-hidden="true" />
                          ) : (
                            <Icon className="h-4 w-4" strokeWidth={2.2} />
                          )}
                        </span>
                        <span className="text-[0.92rem] font-medium" style={{ color: "var(--color-primary)" }}>
                          {tile.title}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* Trust strip */}
        <div
          className="mt-12 max-[900px]:mt-8 flex flex-wrap items-center justify-between gap-6 py-5 border-y"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {trustPoints.map(({ Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-[0.85rem] font-medium"
                style={{ color: "var(--color-primary)" }}
              >
                <Icon
                  className="h-4 w-4"
                  strokeWidth={2}
                  style={{ color: "var(--color-accent)" }}
                />
                {label}
              </div>
            ))}
          </div>
          <a
            href="/contact"
            className="text-[0.85rem] font-semibold inline-flex items-center gap-1.5 hover:opacity-70 transition-opacity"
            style={{ color: "var(--color-primary)" }}
          >
            See pricing →
          </a>
        </div>
      </div>
    </section>
  );
}
