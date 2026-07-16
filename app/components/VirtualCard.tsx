"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Wallet,
  CreditCard,
  Globe2,
  ShieldCheck,
  Check,
} from "lucide-react";
import { TbApi } from "react-icons/tb";

type Method = {
  number: string;
  title: string;
  tagline: string;
  details: string[];
  badge: string;
  wash: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number; size?: number }>;
};

const methods: Method[] = [
  {
    number: "01",
    title: "Accept Payments",
    tagline: "Local mobile and international card payments",
    details: [
      "M-Pesa, Airtel, Tigo Pesa + Visa/Mastercard",
      "Funds settle in TZS instantly",
      "No setup fees",
    ],
    badge: "Cards · Mobile money",
    wash: "var(--wash-cream)",
    icon: Wallet,
  },
  {
    number: "02",
    title: "Cross-border Payments",
    tagline: "Pay suppliers in 30+ countries at fair rates",
    details: [
      "Send USD, CNY, INR, EUR, funded from TZS",
      "Real mid-market FX, no hidden spread",
      "Settles in hours, not 1–3 days",
    ],
    badge: "30+ corridors",
    wash: "var(--wash-lavender)",
    icon: Globe2,
  },
  {
    number: "03",
    title: "Payment API",
    tagline: "Drop-in checkout or build your own flow",
    details: [
      "REST API with sandbox + production keys",
      "Real-time webhooks for every event",
      "Live in an afternoon",
    ],
    badge: "Developer-ready",
    wash: "var(--wash-peach)",
    icon: TbApi,
  },
];

export default function VirtualCard() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const cardStackRef = useRef<HTMLDivElement | null>(null);
  const featuresRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();

      const ctx = gsap.context(() => {
        if (!sectionRef.current || !featuresRef.current) return;

        // Title reveal
        if (titleRef.current) {
          gsap.from(titleRef.current, {
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
            },
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
          });
        }

        if (cardStackRef.current) {
          gsap.from(cardStackRef.current, {
            scrollTrigger: {
              trigger: cardStackRef.current,
              start: "top 70%",
            },
            scale: 0.92,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          });
        }

        const items = gsap.utils.toArray<HTMLElement>(
          ".vc-item",
          featuresRef.current,
        );

        const buildTimeline = (stepPx: number) => {
          const itemStep = 1;
          const itemInDuration = 0.6;
          const descInDuration = 0.4;
          const totalDuration = (items.length - 1) * itemStep + itemInDuration;
          const scrollDistance = totalDuration * stepPx;

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: `+=${scrollDistance}`,
              pin: true,
              pinSpacing: true,
              scrub: 1,
            },
          });

          gsap.set(items, { opacity: 0, y: 240 });

          items.forEach((item, index) => {
            const desc = item.querySelector<HTMLElement>(".vc-desc");
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
                  items[index - 1]?.querySelector<HTMLElement>(".vc-desc");
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
        };

        mm.add("(min-width: 901px)", () => buildTimeline(420));
        mm.add("(max-width: 900px)", () => buildTimeline(360));
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
      className="py-28 min-h-screen max-[900px]:py-20"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-12 max-[900px]:mb-8">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-4 text-[0.75rem] uppercase tracking-[0.18em] font-medium"
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
            Payments
          </div>
          <h2
            ref={titleRef}
            className="relative z-10 font-semibold leading-[1.05] tracking-[-0.02em] max-[900px]:text-[clamp(1.8rem,5vw,2.2rem)] text-[clamp(2.2rem,4vw,3.8rem)]"
            style={{ color: "var(--color-primary)" }}
          >
            <span className="block whitespace-nowrap">We have you covered</span>
            <span className="block whitespace-nowrap">when it comes to payments</span>
          </h2>
        </div>

        <div className="grid grid-cols-[1.05fr_1fr] gap-12 items-start max-[900px]:grid-cols-1 max-[900px]:gap-0">
          {/* Sticky illustration card */}
          <div className="flex items-center justify-center min-h-[28rem] sticky top-24 max-[900px]:static max-[900px]:min-h-[280px] max-[900px]:mb-6">
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
                {/* Decorative wash */}
                <div
                  className="absolute -top-20 -right-20 w-[280px] h-[280px] rounded-full blur-3xl"
                  style={{ background: "var(--color-accent)", opacity: 0.32 }}
                  aria-hidden="true"
                />
                <div
                  className="absolute -bottom-24 -left-16 w-[240px] h-[240px] rounded-full blur-3xl"
                  style={{
                    background: "var(--color-secondary)",
                    opacity: 0.22,
                  }}
                  aria-hidden="true"
                />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-[0.7rem] uppercase tracking-[0.22em] opacity-70">
                      Payments suite
                    </div>
                    <div
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.65rem] font-medium"
                      style={{ background: "rgba(255,255,255,0.12)" }}
                    >
                      <ShieldCheck className="h-3 w-3" />
                      PCI DSS
                    </div>
                  </div>

                  <div className="text-[clamp(1.6rem,2.6vw,2rem)] font-semibold leading-tight mb-6 whitespace-nowrap">
                    Three ways to get paid.
                  </div>

                  {/* Method tiles */}
                  <div className="flex flex-col gap-2.5">
                    {methods.map((m) => {
                      const Icon = m.icon;
                      return (
                        <div
                          key={m.number}
                          className="flex items-center gap-3 rounded-xl px-3.5 py-3 transition-colors"
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          <span
                            className="inline-flex items-center justify-center w-9 h-9 rounded-lg shrink-0"
                            style={{
                              background: m.wash,
                              color: "var(--color-primary)",
                            }}
                          >
                            <Icon className="h-4 w-4" strokeWidth={2.2} />
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold leading-tight">
                              {m.title}
                            </div>
                            <div className="text-[0.7rem] opacity-65 mt-0.5 truncate">
                              {m.badge}
                            </div>
                          </div>
                          <CreditCard className="h-3.5 w-3.5 opacity-40 shrink-0" />
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer trust line */}
                  <div
                    className="mt-6 pt-4 flex items-center justify-between text-[0.7rem] opacity-70"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <span className="flex items-center gap-1.5">
                      <Check
                        className="h-3 w-3"
                        strokeWidth={3}
                        style={{ color: "var(--color-accent)" }}
                      />
                      Settled in TZS
                    </span>
                    <span>Powered by Swahilies</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pinned method list */}
          <div
            ref={featuresRef}
            className="overflow-hidden relative max-[900px]:overflow-visible"
          >
            {methods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div
                  key={index}
                  className="vc-item py-5 border-b last:border-b-0"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <div className="vc-header flex items-start lg:gap-4 md:gap-4 gap-3">
                    <div
                      className="inline-flex items-center justify-center w-12 h-12 max-[900px]:w-10 max-[900px]:h-10 rounded-xl shrink-0"
                      style={{
                        background: method.wash,
                        color: "var(--color-primary)",
                      }}
                    >
                      <Icon className="h-5 w-5 max-[900px]:h-4 max-[900px]:w-4" strokeWidth={2.2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-[0.7rem] uppercase tracking-[0.18em] font-medium mb-1"
                        style={{ color: "var(--color-muted)" }}
                      >
                        Method {method.number}
                      </div>
                      <h3
                        className="text-[1.35rem] max-[900px]:text-[1.05rem] font-semibold leading-tight"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {method.title}
                      </h3>
                      <p
                        className="text-[0.95rem] max-[900px]:text-[0.85rem] mt-1 leading-snug"
                        style={{ color: "var(--color-muted)" }}
                      >
                        {method.tagline}
                      </p>
                    </div>
                  </div>

                  <div
                    className="vc-desc lg:ml-16 ml-[3.25rem] max-[900px]:ml-[3rem]"
                  >
                    <ul className="flex flex-col gap-1.5">
                      {method.details.map((d) => (
                        <li
                          key={d}
                          className="flex items-start gap-2 text-[0.85rem] max-[900px]:text-[0.78rem]"
                          style={{ color: "var(--color-muted)" }}
                        >
                          <Check
                            className="mt-0.5 h-3.5 w-3.5 shrink-0"
                            strokeWidth={3}
                            style={{ color: "var(--color-accent)" }}
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
      </div>
    </section>
  );
}
