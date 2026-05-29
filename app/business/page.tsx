"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import {
  ChevronRight,
  Receipt,
  Boxes,
  Users,
  Wallet,
  TrendingUp,
  BellRing,
  Smartphone,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  HandCoins,
  UserCog,
  Building,
  Truck,
} from "lucide-react";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { APP_STORE_URL, PLAY_STORE_URL } from "../lib/storeLinks";
import iPhoneMockup from "../../public/assets/images/iPhone_gray.svg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Feature = {
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  description: string;
  wash: string;
  span: string;
  rowSpan: string;
  tone?: "light" | "dark";
  accentOrb?: boolean;
  cardTint?: string;
  nested?: Array<{
    Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
    title: string;
    description: string;
  }>;
};

const features: Feature[] = [
  {
    Icon: Receipt,
    title: "Sales tracking",
    description:
      "Every sale captured automatically — by channel, customer, and product. Daily, weekly, monthly views.",
    wash: "rgba(240, 160, 32, 0.18)",
    cardTint: "rgba(250, 241, 208, 0.7)",
    span: "col-span-7",
    rowSpan: "row-span-2",
    tone: "light",
    nested: [
      {
        Icon: HandCoins,
        title: "Debts tracking",
        description: "Customer balances and due dates in one ledger.",
      },
      {
        Icon: UserCog,
        title: "Employee management",
        description: "Roles, shifts, and per-staff sales.",
      },
    ],
  },
  {
    Icon: Boxes,
    title: "Stock management",
    description:
      "Real-time inventory levels with low-stock alerts. Restock based on what's actually selling.",
    wash: "rgba(255, 255, 255, 0.12)",
    span: "col-span-5",
    rowSpan: "row-span-2",
    tone: "dark",
    accentOrb: true,
  },
  {
    Icon: Users,
    title: "Customer ledger",
    description:
      "Customer balances, debts, and payment history in one place. One-tap reminders.",
    wash: "rgba(124, 92, 224, 0.18)",
    cardTint: "rgba(230, 224, 245, 0.7)",
    span: "col-span-4",
    rowSpan: "row-span-1",
    tone: "light",
  },
  {
    Icon: Wallet,
    title: "Expenses & cash flow",
    description: "Log every shilling out. See cash flow at a glance.",
    wash: "rgba(244, 162, 140, 0.22)",
    cardTint: "rgba(250, 224, 212, 0.7)",
    span: "col-span-4",
    rowSpan: "row-span-1",
    tone: "light",
  },
  {
    Icon: TrendingUp,
    title: "Insights",
    description:
      "Best sellers, profit margins, slow movers. Data that helps you grow.",
    wash: "rgba(47, 168, 106, 0.18)",
    cardTint: "rgba(217, 240, 226, 0.7)",
    span: "col-span-4",
    rowSpan: "row-span-1",
    tone: "light",
  },
  {
    Icon: Building,
    title: "Branches & store management",
    description:
      "Run multiple shops or warehouses from one app. Per-branch sales, stock, and staff.",
    wash: "rgba(124, 92, 224, 0.18)",
    cardTint: "rgba(230, 224, 245, 0.7)",
    span: "col-span-6",
    rowSpan: "row-span-1",
    tone: "light",
  },
  {
    Icon: Truck,
    title: "Supplier payments",
    description:
      "Track supplier invoices, schedule payments, and settle from your Swahilies balance.",
    wash: "rgba(244, 162, 140, 0.22)",
    cardTint: "rgba(250, 224, 212, 0.7)",
    span: "col-span-6",
    rowSpan: "row-span-1",
    tone: "light",
  },
  {
    Icon: BellRing,
    title: "Smart reminders",
    description:
      "Auto reminders for customer debts, supplier bills, and stock to reorder.",
    wash: "rgba(255, 255, 255, 0.12)",
    span: "col-span-12",
    rowSpan: "row-span-1",
    tone: "dark",
  },
];

const builtFor = [
  {
    title: "Dukas & retail shops",
    description: "Track stock, customers, and daily takings.",
  },
  {
    title: "Wholesalers & distributors",
    description: "Manage supplier bills and customer credit.",
  },
  {
    title: "Service businesses",
    description: "Salons, pharmacies, food vendors — keep every figure visible.",
  },
];

export function BusinessContent() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".kuza-hero",
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            immediateRender: false,
          },
        );

        // Bento tiles — desktop scrub fly-in / mobile gentle fade
        const mm = gsap.matchMedia();

        mm.add("(min-width: 901px)", () => {
          const tiles = gsap.utils.toArray<HTMLElement>(".kuza-feature");
          if (!tiles.length) return;

          const positions = [
            { x: -240, y: -180, r: -8 },
            { x: 260, y: -200, r: 10 },
            { x: -300, y: 0, r: -6 },
            { x: 280, y: 40, r: 6 },
            { x: -260, y: 220, r: -10 },
            { x: 240, y: -120, r: 8 },
            { x: -300, y: 100, r: -12 },
            { x: 320, y: 160, r: 9 },
          ];

          tiles.forEach((tile, i) => {
            const pos = positions[i % positions.length];
            gsap.fromTo(
              tile,
              {
                x: pos.x,
                y: pos.y,
                rotation: pos.r,
                scale: 0.7,
                opacity: 0,
              },
              {
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
                ease: "power2.out",
                immediateRender: false,
                scrollTrigger: {
                  trigger: ".kuza-features-grid",
                  start: "top 80%",
                  end: "top 20%",
                  scrub: 1,
                  invalidateOnRefresh: true,
                },
              },
            );
          });
        });

        mm.add("(max-width: 900px)", () => {
          gsap.fromTo(
            ".kuza-feature",
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.08,
              ease: "power2.out",
              immediateRender: false,
              scrollTrigger: {
                trigger: ".kuza-features-grid",
                start: "top 88%",
                toggleActions: "play none none none",
              },
            },
          );
        });

        gsap.fromTo(
          ".kuza-built > *",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: ".kuza-built",
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );

        gsap.fromTo(
          ".kuza-cta",
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: ".kuza-cta",
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }, sectionRef);

      return () => ctx.revert();
    },
    { scope: sectionRef },
  );

  return (
    <main ref={sectionRef} style={{ background: "var(--color-bg)" }}>
      {/* Hero */}
      <section
        className="mesh-gradient relative overflow-hidden pt-3 pb-0 max-[768px]:pt-32 max-[768px]:pb-0"
        style={{ color: "var(--color-primary)" }}
      >
        <div
          className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl max-[768px]:hidden pointer-events-none"
          style={{ background: "var(--wash-lavender)", opacity: 0.6 }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-10 right-10 w-[28rem] h-[28rem] rounded-full blur-3xl max-[768px]:hidden pointer-events-none"
          style={{ background: "var(--wash-peach)", opacity: 0.55 }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="kuza-hero grid grid-cols-12 gap-10 items-end max-[900px]:grid-cols-1 max-[900px]:gap-6">
            {/* Copy column */}
            <div className="col-span-7 max-[900px]:col-span-1 pb-20 max-[768px]:pb-14">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-5 text-[0.7rem] uppercase tracking-[0.18em] font-medium"
                style={{
                  borderColor: "var(--color-border)",
                  color: "var(--color-muted)",
                  background: "rgba(255, 255, 255, 0.5)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--color-accent)" }}
                />
                Kuza Business
              </div>

              <h1 className="text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.04] tracking-[-0.025em] mb-5">
                <span className="block">Business tools,</span>
                <span className="block">all in one.</span>
              </h1>
              <p
                className="text-[0.95rem] sm:text-base lg:text-lg leading-relaxed max-w-xl mb-7"
                style={{ color: "var(--color-muted)" }}
              >
                Manage sales, stock, expenses, and customer balances from a
                single app. Built for African SMEs, powered by Swahilies
                payments.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 pl-6 pr-1.5 py-1.5 rounded-full text-white hover:opacity-95 transition-opacity"
                  style={{ background: "var(--color-primary)" }}
                >
                  <span className="text-[0.95rem] font-semibold tracking-tight">
                    Download the app
                  </span>
                  <span
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full transition-transform group-hover:translate-x-0.5"
                    style={{ background: "var(--color-accent)" }}
                    aria-hidden="true"
                  >
                    <ChevronRight
                      className="h-4 w-4"
                      strokeWidth={2.5}
                      style={{ color: "var(--color-primary)" }}
                    />
                  </span>
                </a>

                <div className="flex items-center gap-2">
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative border rounded-md px-3 py-2 pl-7 font-semibold text-[0.75rem] leading-[1.1] flex flex-col items-start hover:bg-white/40 transition-colors"
                    style={{
                      borderColor: "var(--color-border-strong)",
                      color: "var(--color-primary)",
                      background: "rgba(255, 255, 255, 0.55)",
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
                    className="relative border rounded-md px-3 py-2 pl-7 font-semibold text-[0.75rem] leading-[1.1] flex flex-col items-start hover:bg-white/40 transition-colors"
                    style={{
                      borderColor: "var(--color-border-strong)",
                      color: "var(--color-primary)",
                      background: "rgba(255, 255, 255, 0.55)",
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

            {/* iPhone mockup column — half-cut, bleeds past the bottom of the section */}
            <div className="col-span-5 max-[900px]:col-span-1 flex justify-center self-end relative">
              <div className="relative w-full max-w-[270px] lg:max-w-[300px] xl:max-w-[330px] max-[900px]:max-w-[240px] translate-y-[35%] max-[900px]:translate-y-[25%]">
                <Image
                  src={iPhoneMockup}
                  alt="Kuza Business app on iPhone"
                  priority
                  sizes="(max-width: 900px) 60vw, 300px"
                  className="w-full h-auto select-none drop-shadow-[0_30px_70px_rgba(14,14,16,0.22)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="kuza-features py-20 max-[900px]:py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl mb-12 max-[900px]:mb-8">
            <div
              className="text-[0.7rem] uppercase tracking-[0.22em] font-medium mb-3"
              style={{ color: "var(--color-muted)" }}
            >
              Everything you need
            </div>
            <h2
              className="text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.02em] mb-4"
              style={{ color: "var(--color-primary)" }}
            >
              Run your business, not your spreadsheets.
            </h2>
            <p
              className="text-base sm:text-lg leading-relaxed max-w-2xl"
              style={{ color: "var(--color-muted)" }}
            >
              Sales, stock, customers, expenses — captured automatically as you
              go. Numbers that match reality.
            </p>
          </div>

          <div className="kuza-features-grid grid grid-cols-12 gap-4 auto-rows-[150px] max-[900px]:grid-cols-1 max-[900px]:auto-rows-auto max-[900px]:gap-4">
            {features.map((feature) => {
              const isDark = feature.tone === "dark";
              const Icon = feature.Icon;

              return (
                <div
                  key={feature.title}
                  className={`kuza-feature group relative overflow-hidden rounded-2xl p-5 max-[900px]:p-5 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(14,14,16,0.08)] ${feature.span} ${feature.rowSpan} max-[900px]:col-span-1 max-[900px]:row-span-1`}
                  style={{
                    background: isDark
                      ? "linear-gradient(160deg, var(--color-primary) 0%, #1a1a24 100%)"
                      : feature.cardTint ?? "rgba(255, 255, 255, 0.7)",
                    border: isDark
                      ? "1px solid rgba(255,255,255,0.08)"
                      : "1px solid var(--color-border)",
                    color: isDark ? "#fff" : "var(--color-primary)",
                    backdropFilter: !isDark ? "blur(8px)" : undefined,
                  }}
                >
                  {feature.accentOrb && (
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
                          background: feature.wash,
                          color: isDark ? "#fff" : "var(--color-primary)",
                        }}
                      >
                        <Icon className="h-5 w-5" strokeWidth={2} />
                      </div>
                      <h3 className="text-[1rem] font-semibold leading-tight">
                        {feature.title}
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
                      {feature.description}
                    </p>

                    {feature.nested && feature.nested.length > 0 && (
                      <div className="mt-auto pt-5 grid grid-cols-2 gap-2.5 max-[600px]:grid-cols-1">
                        {feature.nested.map((sub) => {
                          const SubIcon = sub.Icon;
                          return (
                            <div
                              key={sub.title}
                              className="rounded-xl p-4 transition-colors hover:bg-white/95"
                              style={{
                                background: "rgba(255, 255, 255, 0.55)",
                                border: "1px solid var(--color-border)",
                              }}
                            >
                              <div className="flex items-center gap-2.5 mb-2">
                                <div
                                  className="inline-flex items-center justify-center w-9 h-9 rounded-md shrink-0"
                                  style={{
                                    background: "rgba(14, 14, 16, 0.06)",
                                    color: "var(--color-primary)",
                                  }}
                                >
                                  <SubIcon className="h-4 w-4" strokeWidth={2} />
                                </div>
                                <span
                                  className="text-[0.95rem] font-semibold leading-tight"
                                  style={{ color: "var(--color-primary)" }}
                                >
                                  {sub.title}
                                </span>
                              </div>
                              <p
                                className="text-[0.82rem] leading-relaxed"
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
      </section>

      {/* Built for */}
      <section className="kuza-built py-20 max-[900px]:py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-12 gap-12 items-start max-[900px]:grid-cols-1 max-[900px]:gap-8">
            <div className="col-span-5 max-[900px]:col-span-1">
              <div
                className="text-[0.7rem] uppercase tracking-[0.22em] font-medium mb-3"
                style={{ color: "var(--color-muted)" }}
              >
                Built for
              </div>
              <h2
                className="text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[1.08] tracking-[-0.02em] mb-4"
                style={{ color: "var(--color-primary)" }}
              >
                The shops, suppliers, and service businesses powering Africa.
              </h2>
              <p
                className="text-base leading-relaxed mb-6"
                style={{ color: "var(--color-muted)" }}
              >
                Whether you sell from a kiosk or a warehouse, Kuza Business
                fits how you actually run things.
              </p>

              <div className="flex flex-col gap-2.5">
                {[
                  "Sign up from your phone in minutes",
                  "Works on basic Android and iOS",
                  "Connects to Swahilies payments out of the box",
                ].map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-2.5 text-[0.92rem]"
                    style={{ color: "var(--color-primary)" }}
                  >
                    <CheckCircle2
                      className="h-4 w-4 mt-0.5 shrink-0"
                      strokeWidth={2}
                      style={{ color: "var(--color-success)" }}
                    />
                    {point}
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-7 max-[900px]:col-span-1 flex flex-col gap-3">
              {builtFor.map((item, i) => (
                <div
                  key={item.title}
                  className="rounded-2xl p-5 max-[768px]:p-4 flex items-start gap-4"
                  style={{
                    background: i === 0 ? "var(--color-primary)" : "rgba(255, 255, 255, 0.7)",
                    color: i === 0 ? "#fff" : "var(--color-primary)",
                    border:
                      i === 0
                        ? "1px solid rgba(255,255,255,0.08)"
                        : "1px solid var(--color-border)",
                    backdropFilter: i !== 0 ? "blur(8px)" : undefined,
                  }}
                >
                  <div
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                    style={{
                      background:
                        i === 0
                          ? "rgba(255, 255, 255, 0.12)"
                          : "rgba(14, 14, 16, 0.06)",
                    }}
                  >
                    <span className="text-[0.85rem] font-semibold tabular">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[1.05rem] font-semibold leading-tight mb-1">
                      {item.title}
                    </h3>
                    <p
                      className="text-[0.92rem] leading-snug"
                      style={{
                        color:
                          i === 0
                            ? "rgba(255,255,255,0.78)"
                            : "var(--color-muted)",
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Swahilies */}
      <section className="py-16 max-[900px]:py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div
            className="pt-12 max-[900px]:pt-10 border-t"
            style={{ borderColor: "var(--color-border)" }}
          >
            <div className="max-w-2xl mb-10 max-[900px]:mb-8">
              <div
                className="text-[0.7rem] uppercase tracking-[0.22em] font-medium mb-3"
                style={{ color: "var(--color-muted)" }}
              >
                Why Kuza Business
              </div>
              <h2
                className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.02em]"
                style={{ color: "var(--color-primary)" }}
              >
                Built for how African SMEs actually work.
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-3 max-[900px]:grid-cols-1">
              {[
                {
                  Icon: Smartphone,
                  title: "Mobile-first",
                  description: "Optimized for the phones African SMEs actually use.",
                },
                {
                  Icon: Sparkles,
                  title: "Built for the local market",
                  description: "Mobile money, local currencies, real workflows.",
                },
                {
                  Icon: ShieldCheck,
                  title: "Bank-grade security",
                  description: "Encrypted data, regulated partners, your data stays yours.",
                },
              ].map(({ Icon, title, description }) => (
                <div
                  key={title}
                  className="flex items-start gap-3 p-4 rounded-2xl"
                  style={{
                    background: "rgba(255, 255, 255, 0.55)",
                    border: "1px solid var(--color-border)",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  <div
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                    style={{
                      background: "rgba(14, 14, 16, 0.04)",
                      color: "var(--color-primary)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <div>
                    <h3
                      className="text-[1rem] font-semibold leading-tight mb-1"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {title}
                    </h3>
                    <p
                      className="text-[0.88rem] leading-[1.55]"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="kuza-cta py-20 max-[900px]:py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div
            className="relative overflow-hidden rounded-3xl px-8 py-12 max-[768px]:p-7 text-center max-[900px]:text-left"
            style={{
              background:
                "linear-gradient(160deg, var(--color-primary) 0%, #1a1a24 100%)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              className="absolute -top-20 -right-20 w-[320px] h-[320px] rounded-full blur-3xl pointer-events-none"
              style={{ background: "var(--color-accent)", opacity: 0.28 }}
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-24 -left-16 w-[260px] h-[260px] rounded-full blur-3xl pointer-events-none"
              style={{ background: "var(--color-tertiary)", opacity: 0.2 }}
              aria-hidden="true"
            />

            <div className="relative z-10 max-w-2xl mx-auto max-[900px]:mx-0">
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.06] tracking-[-0.02em] mb-4">
                Get Kuza Business on your phone.
              </h2>
              <p className="text-[1rem] sm:text-lg leading-relaxed text-white/75 mb-7">
                Free to download. No setup fees. Live in minutes.
              </p>

              <div className="flex flex-wrap items-center justify-center max-[900px]:justify-start gap-2">
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative border border-white/30 rounded-md px-3 py-2 pl-7 font-semibold text-[0.78rem] leading-[1.1] flex flex-col items-start hover:bg-white/10 transition-colors"
                >
                  <span className="absolute left-[6px] top-1/2 -translate-y-1/2 text-[1.25rem] opacity-95">
                    <FaApple />
                  </span>
                  <span className="text-[0.6rem] font-medium opacity-80">
                    Download on the
                  </span>
                  App Store
                </a>
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative border border-white/30 rounded-md px-3 py-2 pl-7 font-semibold text-[0.78rem] leading-[1.1] flex flex-col items-start hover:bg-white/10 transition-colors"
                >
                  <span className="absolute left-[6px] top-1/2 -translate-y-1/2 text-[1.25rem] opacity-95">
                    <FaGooglePlay />
                  </span>
                  <span className="text-[0.6rem] font-medium opacity-80">
                    Get it on
                  </span>
                  Google Play
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function BusinessPage() {
  return (
    <main className="overflow-x-hidden">
      <BusinessContent />
    </main>
  );
}
