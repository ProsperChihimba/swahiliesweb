"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Store,
  ChevronRight,
  Boxes,
  Receipt,
  TrendingUp,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Feature = {
  number: string;
  title: string;
  tagline: string;
  details: string[];
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  iconSrc?: string;
  wash: string;
};

const features: Feature[] = [
  {
    number: "01",
    title: "Sales tracking",
    tagline: "Every sale, every channel, captured automatically",
    details: [
      "Sales recorded as customers pay",
      "Daily, weekly, monthly summaries",
      "Profit margins surfaced in real time",
    ],
    Icon: Receipt,
    iconSrc: "/assets/icons/sales.png",
    wash: "var(--wash-cream)",
  },
  {
    number: "02",
    title: "Stock management",
    tagline: "Know what's selling, know what's running out",
    details: [
      "Real-time inventory levels",
      "Low-stock alerts before you run out",
      "Purchase suggestions from sales velocity",
    ],
    Icon: Boxes,
    iconSrc: "/assets/icons/stock.png",
    wash: "var(--wash-lavender)",
  },
  {
    number: "03",
    title: "Insights",
    tagline: "Clear numbers for better decisions",
    details: [
      "Cash flow visibility at a glance",
      "Best-sellers and slow movers",
      "Customer balances and outstanding debts",
    ],
    Icon: TrendingUp,
    iconSrc: "/assets/icons/insights.png",
    wash: "var(--wash-peach)",
  },
];

export default function KuzaBusiness() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const cardStackRef = useRef<HTMLDivElement | null>(null);
  const featuresRef = useRef<HTMLDivElement | null>(null);
  const mobileFeaturesRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      const ctx = gsap.context(() => {
        if (!sectionRef.current || !featuresRef.current) return;

        if (titleRef.current) {
          gsap.from(titleRef.current.children, {
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
            },
            y: 24,
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
          });
        }

        if (cardStackRef.current) {
          gsap.fromTo(
            cardStackRef.current,
            { scale: 0.94, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              immediateRender: false,
              scrollTrigger: {
                trigger: cardStackRef.current,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            },
          );
        }

        const items = gsap.utils.toArray<HTMLElement>(
          ".kuza-item",
          featuresRef.current,
        );

        // Desktop — pin section, reveal each step vertically
        mm.add("(min-width: 901px)", () => {
          const itemStep = 1;
          const itemInDuration = 0.6;
          const descInDuration = 0.4;
          const totalDuration = (items.length - 1) * itemStep + itemInDuration;
          const scrollDistance = totalDuration * 420;

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: `+=${scrollDistance}`,
              pin: true,
              pinSpacing: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          gsap.set(items, { opacity: 0, y: 200 });

          items.forEach((item, index) => {
            const desc = item.querySelector<HTMLElement>(".kuza-desc");
            const startAt = index * itemStep;

            timeline.to(
              item,
              {
                opacity: 1,
                y: 0,
                duration: itemInDuration,
                ease: "power3.out",
              },
              startAt,
            );

            if (desc) {
              const descHeight = desc.scrollHeight;
              gsap.set(desc, {
                height: 0,
                opacity: 0,
                marginTop: 0,
                overflow: "hidden",
              });

              timeline.to(
                desc,
                {
                  height: descHeight,
                  opacity: 1,
                  marginTop: 12,
                  duration: descInDuration,
                  ease: "power2.out",
                },
                startAt + 0.1,
              );

              if (index > 0) {
                const prevDesc =
                  items[index - 1]?.querySelector<HTMLElement>(".kuza-desc");
                if (prevDesc) {
                  timeline.to(
                    prevDesc,
                    {
                      height: 0,
                      opacity: 0,
                      marginTop: 0,
                      duration: 0.3,
                      ease: "power2.out",
                    },
                    startAt,
                  );
                }
              }
            }
          });

          return () => {
            timeline.scrollTrigger?.kill();
            timeline.kill();
          };
        });

        // Mobile — horizontal pinned carousel: vertical scroll → horizontal slide
        mm.add("(max-width: 900px)", () => {
          const wrap = mobileFeaturesRef.current;
          if (!wrap) return;
          const track = wrap.querySelector(".kuza-track") as HTMLElement | null;
          const dots = wrap.querySelectorAll<HTMLElement>(".kuza-dot");
          if (!track) return;

          const panelCount = features.length;
          // Slide by (n-1)/n fraction so the last panel ends fully in view
          const slideAmount = -100 * ((panelCount - 1) / panelCount);

          const tween = gsap.to(track, {
            xPercent: slideAmount,
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top top",
              end: () => "+=" + (wrap.offsetHeight) * (panelCount - 1),
              pin: true,
              pinSpacing: true,
              scrub: 0.5,
              invalidateOnRefresh: true,
              anticipatePin: 1,
              onUpdate: (self) => {
                if (!dots.length) return;
                const progress = self.progress;
                const activeIndex = Math.min(
                  panelCount - 1,
                  Math.floor(progress * panelCount + 0.0001),
                );
                dots.forEach((dot, i) => {
                  dot.style.width = i === activeIndex ? "20px" : "6px";
                  dot.style.background =
                    i === activeIndex
                      ? "var(--color-primary)"
                      : "var(--color-border-strong)";
                });
              },
            },
          });

          return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
          };
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
      ref={sectionRef}
      className="pt-10 pb-24 min-h-screen max-[900px]:pt-10 max-[900px]:pb-0 max-[900px]:min-h-0"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div ref={titleRef} className="max-w-3xl mb-8 max-[900px]:mb-4">
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
            Also from Swahilies
          </div>
          <h2
            className="text-[clamp(2.2rem,4.6vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.02em] mb-5"
            style={{ color: "var(--color-primary)" }}
          >
            Kuza Business, built on
            <br />
            top of our payments rails.
          </h2>
          <p
            className="text-base sm:text-lg leading-relaxed max-w-2xl"
            style={{ color: "var(--color-muted)" }}
          >
            A simple business tool for managing sales, stock, and expenses,
            for the SMEs growing on top of Swahilies.
          </p>
        </div>

        <div className="grid grid-cols-[1.05fr_1fr] gap-12 items-start max-[900px]:grid-cols-1 max-[900px]:gap-0">
          {/* Sticky illustration card */}
          <div className="lg:flex lg:items-center lg:justify-center lg:min-h-[26rem] lg:sticky lg:top-6 max-[900px]:block max-[900px]:min-h-0">
            <div
              ref={cardStackRef}
              className="relative w-[min(92%,500px)] max-[900px]:w-full"
            >
              <div
                className="relative w-full rounded-[24px] p-8 max-[900px]:p-6 overflow-hidden"
                style={{
                  background:
                    "linear-gradient(160deg, var(--color-primary) 0%, #1a1a24 100%)",
                  color: "#fff",
                  minHeight: 380,
                }}
              >
                <div
                  className="absolute -top-20 -right-20 w-[280px] h-[280px] rounded-full blur-3xl"
                  style={{ background: "var(--color-accent)", opacity: 0.32 }}
                  aria-hidden="true"
                />
                <div
                  className="absolute -bottom-24 -left-16 w-[240px] h-[240px] rounded-full blur-3xl"
                  style={{
                    background: "var(--color-tertiary)",
                    opacity: 0.22,
                  }}
                  aria-hidden="true"
                />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="inline-flex items-center justify-center w-12 h-12 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.12)" }}
                    >
                      <Store className="h-6 w-6" strokeWidth={2} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.7rem] uppercase tracking-[0.22em] opacity-70">
                        Kuza Business
                      </span>
                      <span className="text-[0.95rem] font-semibold">
                        For African SMEs
                      </span>
                    </div>
                  </div>

                  <div className="text-[clamp(1.6rem,2.6vw,2rem)] font-semibold leading-tight mb-5 whitespace-nowrap">
                    Run your shop, smarter.
                  </div>

                  <div className="flex flex-col gap-2.5">
                    {features.map((f) => {
                      const Icon = f.Icon;
                      return (
                        <div
                          key={f.number}
                          className="flex items-center gap-3 rounded-xl px-3.5 py-3"
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          <span
                            className="inline-flex items-center justify-center w-9 h-9 rounded-lg shrink-0"
                            style={{
                              background: f.wash,
                              color: "var(--color-primary)",
                            }}
                          >
                            {f.iconSrc ? (
                              <img src={f.iconSrc} alt="" className="h-5 w-5 object-contain" aria-hidden="true" />
                            ) : (
                              <Icon className="h-4 w-4" strokeWidth={2.2} />
                            )}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold leading-tight">
                              {f.title}
                            </div>
                            <div className="text-[0.7rem] opacity-65 mt-0.5 truncate">
                              {f.tagline}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <a
                    href="/business"
                    className="group mt-6 inline-flex items-center gap-3 pl-5 pr-1.5 py-1.5 rounded-full self-start hover:opacity-95 transition-opacity"
                    style={{ background: "var(--color-accent)", color: "var(--color-primary)" }}
                  >
                    <span className="text-[0.85rem] font-semibold tracking-tight">
                      Learn more
                    </span>
                    <span
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/40 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    >
                      <ChevronRight
                        className="h-4 w-4"
                        strokeWidth={2.5}
                        style={{ color: "var(--color-primary)" }}
                      />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop list — pinned scrub-revealed, vertical */}
          <div
            ref={featuresRef}
            className="overflow-hidden relative max-[900px]:hidden"
          >
            {features.map((feature, index) => {
              const Icon = feature.Icon;
              return (
                <div
                  key={index}
                  className="kuza-item py-5 border-b last:border-b-0"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="inline-flex items-center justify-center w-12 h-12 rounded-xl shrink-0"
                      style={{
                        background: feature.wash,
                        color: "var(--color-primary)",
                      }}
                    >
                      {feature.iconSrc ? (
                        <img src={feature.iconSrc} alt="" className="h-6 w-6 object-contain" aria-hidden="true" />
                      ) : (
                        <Icon className="h-5 w-5" strokeWidth={2.2} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-[0.7rem] uppercase tracking-[0.18em] font-medium mb-1"
                        style={{ color: "var(--color-muted)" }}
                      >
                        Step {feature.number}
                      </div>
                      <h3
                        className="text-[1.35rem] font-semibold leading-tight"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className="text-[0.95rem] mt-1 leading-snug"
                        style={{ color: "var(--color-muted)" }}
                      >
                        {feature.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="kuza-desc lg:ml-16 ml-[3.25rem]">
                    <ul className="flex flex-col gap-1.5">
                      {feature.details.map((d) => (
                        <li
                          key={d}
                          className="flex items-start gap-2 text-[0.88rem]"
                          style={{ color: "var(--color-muted)" }}
                        >
                          <span
                            className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                            style={{ background: "var(--color-accent)" }}
                          />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile horizontal pinned carousel — full-screen panels */}
        <div
          ref={mobileFeaturesRef}
          className="hidden max-[900px]:block relative w-screen -mx-6 overflow-hidden"
        >
          <div
            className="kuza-track flex"
            style={{ width: "300%" }}
          >
            {features.map((feature) => {
              const Icon = feature.Icon;
              return (
                <div
                  key={`mobile-${feature.number}`}
                  className="kuza-item shrink-0 flex flex-col justify-center px-6 py-6"
                  style={{ width: `${100 / 3}%` }}
                >
                  <div
                    className="rounded-2xl p-6 flex flex-col gap-4 max-w-[420px] mx-auto w-full"
                    style={{
                      background: "rgba(255, 255, 255, 0.85)",
                      border: "1px solid var(--color-border)",
                      backdropFilter: "blur(10px)",
                      boxShadow: "0 18px 40px rgba(14, 14, 16, 0.08)",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="inline-flex items-center justify-center w-12 h-12 rounded-xl shrink-0"
                        style={{
                          background: feature.wash,
                          color: "var(--color-primary)",
                        }}
                      >
                        {feature.iconSrc ? (
                          <img src={feature.iconSrc} alt="" className="h-6 w-6 object-contain" aria-hidden="true" />
                        ) : (
                          <Icon className="h-6 w-6" strokeWidth={2.2} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className="text-[0.7rem] uppercase tracking-[0.18em] font-medium mb-1"
                          style={{ color: "var(--color-muted)" }}
                        >
                          Step {feature.number}
                        </div>
                        <h3
                          className="text-[1.3rem] font-semibold leading-tight"
                          style={{ color: "var(--color-primary)" }}
                        >
                          {feature.title}
                        </h3>
                      </div>
                    </div>

                    <p
                      className="text-[0.95rem] leading-relaxed"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {feature.tagline}
                    </p>

                    <ul className="flex flex-col gap-2 pt-2 border-t" style={{ borderColor: "var(--color-border)" }}>
                      {feature.details.map((d) => (
                        <li
                          key={d}
                          className="flex items-start gap-2.5 text-[0.88rem]"
                          style={{ color: "var(--color-primary)" }}
                        >
                          <span
                            className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                            style={{ background: "var(--color-accent)" }}
                          />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile progress dots — fixed within the pinned area */}
          <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-2">
            {features.map((f) => (
              <span
                key={f.number}
                className="kuza-dot rounded-full transition-all duration-300"
                style={{
                  width: "6px",
                  height: "6px",
                  background: "var(--color-border-strong)",
                }}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
