"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Smartphone,
  CreditCard,
  Building2,
  Code2,
  Webhook,
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
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  description: string;
  wash: string;
  // 12-col grid placement
  span: string;
  rowSpan: string;
  // visual flavor
  tone?: "light" | "dark";
  accentOrb?: boolean;
  // soft tint for the card background (light tiles only)
  cardTint?: string;
  // optional nested mini-cards rendered inside the tile
  nested?: Array<{
    Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
    title: string;
    description: string;
  }>;
};

const tiles: BentoTile[] = [
  {
    Icon: Smartphone,
    title: "Mobile money Collection",
    description:
      "M-Pesa, Tigo Pesa, Airtel Money, HaloPesa. One integration, every wallet.",
    wash: "rgba(240, 160, 32, 0.18)",
    cardTint: "rgba(250, 241, 208, 0.7)",
    span: "col-span-7",
    rowSpan: "row-span-2",
    tone: "light",
    nested: [
      {
        Icon: Building2,
        title: "Bank transfers",
        description: "Direct debit & A2A across regional banking partners.",
      },
      {
        Icon: Webhook,
        title: "Webhooks",
        description: "Real-time events. Signed payloads, automatic retries.",
      },
    ],
  },
  {
    Icon: Globe2,
    title: "Cross-border payments",
    description:
      "Pay suppliers in USD, CNY, INR, EUR, GBP — funded from local currency, real mid-market FX, settles in hours.",
    wash: "rgba(255, 255, 255, 0.12)",
    span: "col-span-5",
    rowSpan: "row-span-2",
    tone: "dark",
    accentOrb: true,
  },
  {
    Icon: CreditCard,
    title: "Cards",
    description: "Visa, Mastercard, local networks. 3D Secure included.",
    wash: "rgba(124, 92, 224, 0.18)",
    cardTint: "rgba(230, 224, 245, 0.7)",
    span: "col-span-6",
    rowSpan: "row-span-1",
    tone: "light",
  },
  {
    Icon: Send,
    title: "Disbursements",
    description:
      "Bulk payouts to bank accounts and mobile wallets in a single API call.",
    wash: "rgba(244, 162, 140, 0.22)",
    cardTint: "rgba(250, 224, 212, 0.7)",
    span: "col-span-6",
    rowSpan: "row-span-1",
    tone: "light",
  },
  {
    Icon: Code2,
    title: "Payment API",
    description:
      "REST endpoints, sandbox keys, idempotent operations. Live in an afternoon.",
    wash: "rgba(47, 168, 106, 0.18)",
    cardTint: "rgba(217, 240, 226, 0.7)",
    span: "col-span-4",
    rowSpan: "row-span-2",
    tone: "light",
  },
  {
    Icon: ShoppingCart,
    title: "Checkout SDK",
    description:
      "Drop-in checkout for web and mobile. Or build fully custom on the API.",
    wash: "rgba(240, 160, 32, 0.18)",
    cardTint: "rgba(250, 241, 208, 0.7)",
    span: "col-span-4",
    rowSpan: "row-span-1",
    tone: "light",
  },
  {
    Icon: Link2,
    title: "Payment links",
    description:
      "Get paid without writing code. Share a link, accept any rail.",
    wash: "rgba(244, 162, 140, 0.22)",
    cardTint: "rgba(250, 224, 212, 0.7)",
    span: "col-span-4",
    rowSpan: "row-span-1",
    tone: "light",
  },
  {
    Icon: FileText,
    title: "Invoices",
    description:
      "Branded invoices customers can pay in one tap. Auto reminders.",
    wash: "rgba(124, 92, 224, 0.18)",
    cardTint: "rgba(230, 224, 245, 0.7)",
    span: "col-span-4",
    rowSpan: "row-span-1",
    tone: "light",
  },
  {
    Icon: RefreshCw,
    title: "Subscriptions",
    description:
      "Recurring billing in local currencies. Smart retries, dunning.",
    wash: "rgba(47, 168, 106, 0.18)",
    cardTint: "rgba(217, 240, 226, 0.7)",
    span: "col-span-4",
    rowSpan: "row-span-1",
    tone: "light",
  },
  {
    Icon: Banknote,
    title: "Settlement",
    description:
      "Same-day settlement to your bank or wallet, in your local currency.",
    wash: "rgba(255, 255, 255, 0.12)",
    span: "col-span-12",
    rowSpan: "row-span-1",
    tone: "dark",
  },
];

const trustPoints = [
  { Icon: Zap, label: "99.95% uptime SLA" },
  { Icon: Globe2, label: "Pan-African coverage" },
];

export default function Payments() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
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

        // Bento tiles — different animation per breakpoint
        const mm = gsap.matchMedia();

        mm.add("(min-width: 901px)", () => {
          const tiles = gsap.utils.toArray<HTMLElement>(".payments-tile");
          if (!tiles.length) return;

          const positions = [
            { x: -240, y: -180, r: -8 },
            { x: 260, y: -200, r: 10 },
            { x: -300, y: 0, r: -6 },
            { x: 280, y: 40, r: 6 },
            { x: -260, y: 220, r: -10 },
            { x: 240, y: -120, r: 8 },
            { x: -180, y: 260, r: -4 },
            { x: 220, y: 240, r: 7 },
            { x: -300, y: -80, r: -12 },
            { x: 320, y: 180, r: 9 },
          ];

          tiles.forEach((tile, i) => {
            const pos = positions[i % positions.length];
            gsap.fromTo(
              tile,
              { x: pos.x, y: pos.y, rotation: pos.r, scale: 0.7, opacity: 0 },
              {
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
                ease: "power2.out",
                immediateRender: false,
                scrollTrigger: {
                  trigger: ".payments-grid",
                  start: "top 80%",
                  end: "top 20%",
                  scrub: 1,
                  invalidateOnRefresh: true,
                },
              },
            );
          });

          const nested = gsap.utils.toArray<HTMLElement>(".payments-nested");
          nested.forEach((el, i) => {
            gsap.fromTo(
              el,
              {
                x: i % 2 === 0 ? -60 : 60,
                y: 30,
                opacity: 0,
                scale: 0.85,
              },
              {
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
                ease: "power2.out",
                immediateRender: false,
                scrollTrigger: {
                  trigger: ".payments-grid",
                  start: "top 50%",
                  end: "top 10%",
                  scrub: 1,
                  invalidateOnRefresh: true,
                },
              },
            );
          });
        });

        mm.add("(max-width: 900px)", () => {
          // Mobile: simple fade-up, no fly-in to keep things contained on small viewports
          gsap.fromTo(
            ".payments-tile",
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.08,
              ease: "power2.out",
              immediateRender: false,
              scrollTrigger: {
                trigger: ".payments-grid",
                start: "top 88%",
                toggleActions: "play none none none",
              },
            },
          );

          gsap.fromTo(
            ".payments-nested",
            { y: 16, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.06,
              ease: "power2.out",
              immediateRender: false,
              scrollTrigger: {
                trigger: ".payments-grid",
                start: "top 70%",
                toggleActions: "play none none none",
              },
            },
          );
        });

        return () => mm.revert();
      }, sectionRef);

      return () => ctx.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="payments"
      ref={sectionRef}
      className="py-24 max-[900px]:py-16 relative overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="payments-head max-w-3xl mb-12 max-[900px]:mb-8">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-5 text-[0.7rem] uppercase tracking-[0.18em] font-medium"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-muted)",
              background: "rgba(255, 255, 255, 0.7)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--color-accent)" }}
            />
            Payments
          </div>
          <h2
            className="text-[clamp(2.2rem,4.6vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.02em] mb-5"
            style={{ color: "var(--color-primary)" }}
          >
            Every rail. Every market.
            <br />
            One platform.
          </h2>
          <p
            className="text-base sm:text-lg leading-relaxed max-w-2xl"
            style={{ color: "var(--color-muted)" }}
          >
            Collect from any African payment method, move money across borders,
            disburse to thousands of recipients, and reconcile from a single
            dashboard.
          </p>
        </div>

        {/* Bento grid */}
        <div className="payments-grid grid grid-cols-12 gap-4 auto-rows-[150px] max-[1100px]:auto-rows-[140px] max-[900px]:hidden">
          {tiles.map((tile, i) => {
            const isDark = tile.tone === "dark";
            const Icon = tile.Icon;

            return (
              <div
                key={i}
                className={`payments-tile group relative overflow-hidden rounded-2xl p-5 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(14,14,16,0.08)] ${tile.span} ${tile.rowSpan}`}
                style={{
                  background: isDark
                    ? "linear-gradient(160deg, var(--color-primary) 0%, #1a1a24 100%)"
                    : tile.cardTint ?? "rgba(255, 255, 255, 0.7)",
                  border: isDark
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "1px solid var(--color-border)",
                  color: isDark ? "#fff" : "var(--color-primary)",
                  backdropFilter: !isDark ? "blur(8px)" : undefined,
                }}
              >
                {tile.accentOrb && (
                  <div
                    className="absolute -top-12 -right-12 w-[200px] h-[200px] rounded-full blur-3xl pointer-events-none"
                    style={{
                      background: "var(--color-accent)",
                      opacity: 0.32,
                    }}
                    aria-hidden="true"
                  />
                )}

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="inline-flex items-center justify-center w-10 h-10 rounded-xl shrink-0 transition-transform duration-300 ease-out group-hover:scale-105"
                      style={{
                        background: tile.wash,
                        color: isDark ? "#fff" : "var(--color-primary)",
                      }}
                    >
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <h3 className="text-[1rem] font-semibold leading-tight">
                      {tile.title}
                    </h3>
                  </div>
                  <p
                    className="text-[0.88rem] leading-[1.55]"
                    style={{
                      color: isDark
                        ? "rgba(255,255,255,0.78)"
                        : "var(--color-muted)",
                    }}
                  >
                    {tile.description}
                  </p>

                  {/* Nested mini-cards */}
                  {tile.nested && tile.nested.length > 0 && (
                    <div className="mt-auto pt-5 grid grid-cols-2 gap-2.5 max-[600px]:grid-cols-1">
                      {tile.nested.map((sub) => {
                        const SubIcon = sub.Icon;
                        return (
                          <div
                            key={sub.title}
                            className="payments-nested rounded-xl p-3 transition-colors hover:bg-white/95"
                            style={{
                              background: "rgba(255, 255, 255, 0.55)",
                              border: "1px solid var(--color-border)",
                            }}
                          >
                            <div className="flex items-center gap-2.5 mb-1.5">
                              <div
                                className="inline-flex items-center justify-center w-8 h-8 rounded-md shrink-0"
                                style={{
                                  background: "rgba(14, 14, 16, 0.06)",
                                  color: "var(--color-primary)",
                                }}
                              >
                                <SubIcon className="h-4 w-4" strokeWidth={2} />
                              </div>
                              <span
                                className="text-[0.9rem] font-semibold leading-tight"
                                style={{ color: "var(--color-primary)" }}
                              >
                                {sub.title}
                              </span>
                            </div>
                            <p
                              className="text-[0.8rem] leading-snug"
                              style={{ color: "var(--color-muted)" }}
                            >
                              {sub.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile horizontal scroll — replaces the bento on small viewports */}
        <div className="hidden max-[900px]:block payments-grid">
          <div
            className="-mx-6 px-6 overflow-x-auto pb-2 marquee-mask"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <div className="flex gap-3 w-max">
              {tiles.map((tile, i) => {
                const isDark = tile.tone === "dark";
                const Icon = tile.Icon;

                return (
                  <div
                    key={i}
                    className="payments-tile relative overflow-hidden rounded-2xl p-5 shrink-0 w-[280px] sm:w-[320px]"
                    style={{
                      scrollSnapAlign: "start",
                      background: isDark
                        ? "linear-gradient(160deg, var(--color-primary) 0%, #1a1a24 100%)"
                        : tile.cardTint ?? "rgba(255, 255, 255, 0.7)",
                      border: isDark
                        ? "1px solid rgba(255,255,255,0.08)"
                        : "1px solid var(--color-border)",
                      color: isDark ? "#fff" : "var(--color-primary)",
                      backdropFilter: !isDark ? "blur(8px)" : undefined,
                      minHeight: 180,
                    }}
                  >
                    {tile.accentOrb && (
                      <div
                        className="absolute -top-12 -right-12 w-[180px] h-[180px] rounded-full blur-3xl pointer-events-none"
                        style={{
                          background: "var(--color-accent)",
                          opacity: 0.32,
                        }}
                        aria-hidden="true"
                      />
                    )}

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="inline-flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                          style={{
                            background: tile.wash,
                            color: isDark ? "#fff" : "var(--color-primary)",
                          }}
                        >
                          <Icon className="h-5 w-5" strokeWidth={2} />
                        </div>
                        <h3 className="text-[1rem] font-semibold leading-tight">
                          {tile.title}
                        </h3>
                      </div>
                      <p
                        className="text-[0.88rem] leading-[1.55]"
                        style={{
                          color: isDark
                            ? "rgba(255,255,255,0.78)"
                            : "var(--color-muted)",
                        }}
                      >
                        {tile.description}
                      </p>

                      {/* Nested mini-cards on mobile */}
                      {tile.nested && tile.nested.length > 0 && (
                        <div className="mt-auto pt-4 flex flex-col gap-2">
                          {tile.nested.map((sub) => {
                            const SubIcon = sub.Icon;
                            return (
                              <div
                                key={sub.title}
                                className="rounded-lg p-2.5"
                                style={{
                                  background: "rgba(255, 255, 255, 0.55)",
                                  border: "1px solid var(--color-border)",
                                }}
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <div
                                    className="inline-flex items-center justify-center w-7 h-7 rounded-md shrink-0"
                                    style={{
                                      background: "rgba(14, 14, 16, 0.06)",
                                      color: "var(--color-primary)",
                                    }}
                                  >
                                    <SubIcon className="h-3.5 w-3.5" strokeWidth={2} />
                                  </div>
                                  <span
                                    className="text-[0.82rem] font-semibold leading-tight"
                                    style={{ color: "var(--color-primary)" }}
                                  >
                                    {sub.title}
                                  </span>
                                </div>
                                <p
                                  className="text-[0.72rem] leading-snug"
                                  style={{ color: "var(--color-muted)" }}
                                >
                                  {sub.description}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hint */}
          <p
            className="text-[0.7rem] mt-3 px-1"
            style={{ color: "var(--color-muted)" }}
          >
            Swipe to explore →
          </p>
        </div>

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
