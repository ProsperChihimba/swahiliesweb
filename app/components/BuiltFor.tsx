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
