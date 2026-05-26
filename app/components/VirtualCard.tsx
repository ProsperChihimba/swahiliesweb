"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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

export default function VirtualCard() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const cardStackRef = useRef<HTMLDivElement | null>(null);
  const cardFlipRef = useRef<HTMLDivElement | null>(null);
  const featuresRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      if (!sectionRef.current || !featuresRef.current) return;

      // Title animation
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
          x: -100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      }

      // Card stack initial animation
      if (cardStackRef.current) {
        gsap.from(cardStackRef.current, {
          scrollTrigger: {
            trigger: cardStackRef.current,
            start: "top 70%",
          },
          scale: 0.9,
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

        gsap.set(items, { opacity: 0, y: 300 });

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
                marginTop: 8,
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
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className=" py-28 min-h-screen max-[900px]:py-20">
      <div className="container mx-auto px-6">
        <h2
          ref={titleRef}
          className="relative z-50 font-semibold max-[900px]:text-[clamp(2rem,4vw,2rem)] text-[clamp(2.6rem,4.6vw,4.8rem)] mb-8"
          style={{ color: "var(--color-primary)" }}
        >
          How it works
        </h2>

        <div className="grid grid-cols-[1.05fr_1fr] gap-12 items-start max-[900px]:grid-cols-1 max-[900px]:gap-0">
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

          <div
            ref={featuresRef}
            className="overflow-hidden relative max-[900px]:overflow-visible"
          >
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
          </div>
        </div>
      </div>
    </section>
  );
}
