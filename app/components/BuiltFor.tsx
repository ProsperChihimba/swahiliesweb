"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import {
  BookOpen,
  Sparkles,
  Zap,
  Heart,
  TrendingUp,
  Download,
} from "lucide-react";
import { APP_STORE_URL, PLAY_STORE_URL } from "../lib/storeLinks";

export default function BuiltFor() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Title + subline — replays on enter/leave
        gsap.from(".builtfor-title, .builtfor-sub", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse",
          },
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
        });

        // Cards — replays on enter/leave with stagger
        gsap.from(".builtfor-card", {
          scrollTrigger: {
            trigger: ".builtfor-grid",
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse",
          },
          y: 32,
          opacity: 0,
          duration: 0.6,
          stagger: 0.07,
          ease: "power2.out",
        });
      }, sectionRef);

      return () => ctx.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="py-[120px] max-[900px]:py-16"
      style={{ background: "var(--color-bg)", color: "var(--color-text)" }}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 max-[900px]:mb-8">
          <h2
            className="builtfor-title text-[clamp(2.4rem,4vw,4.2rem)] font-semibold mb-3 leading-[1.05] tracking-[-0.02em]"
            style={{ color: "var(--color-primary)" }}
          >
            Built for African Businesses
          </h2>
          <p
            className="builtfor-sub text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--color-muted)" }}
          >
            Swahilies brings together everything African businesses need to run
            and grow: payments, bookkeeping, business insights, and access to
            credit, all in one place.
          </p>
        </div>

        <div className="builtfor-grid grid grid-cols-12 gap-3 max-w-[1200px] mx-auto auto-rows-[130px] max-[900px]:grid-cols-1 max-[900px]:auto-rows-auto max-[900px]:gap-4">
          {/* 1. Business records — large hero card, dark with gold orb */}
          <div
            className="builtfor-card group relative overflow-hidden rounded-2xl transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(14,14,16,0.08)] p-4 max-[900px]:p-5 col-span-7 row-span-2 max-[900px]:col-span-1 flex flex-col"
            style={{
              background: "var(--color-primary)",
              color: "#fff",
            }}
          >
            <div
              className="absolute -top-16 -right-16 w-[260px] h-[260px] rounded-full blur-3xl pointer-events-none"
              style={{ background: "var(--color-accent)", opacity: 0.32 }}
              aria-hidden="true"
            />
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="inline-flex items-center justify-center w-11 h-11 rounded-xl shrink-0 transition-transform duration-300 ease-out group-hover:scale-105"
                  style={{ background: "rgba(255, 255, 255, 0.12)" }}
                >
                  <BookOpen className="h-5 w-5" strokeWidth={2} />
                </div>
                <h3 className="text-[1.25rem] font-semibold leading-tight">
                  Business records without the paperwork
                </h3>
              </div>
              <p className="text-[0.95rem] leading-[1.55] text-white/85 max-w-md">
                Every sale, expense, stock movement, and customer balance is
                captured automatically. No more notebooks, scattered
                spreadsheets, or missing records. Stay organized and know
                exactly how your business is performing.
              </p>
            </div>
          </div>

          {/* 2. Smarter credit — short tile, cream */}
          <div
            className="builtfor-card group relative overflow-hidden rounded-2xl transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(14,14,16,0.08)] p-4 max-[900px]:p-5 col-span-5 row-span-1 max-[900px]:col-span-1 flex flex-col"
            style={{
              background: "var(--wash-cream)",
              color: "var(--color-primary)",
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl shrink-0 transition-transform duration-300 ease-out group-hover:scale-105"
                style={{ background: "rgba(14, 14, 16, 0.08)" }}
              >
                <Sparkles className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="text-[1.05rem] font-semibold leading-tight">
                Smarter access to business credit
              </h3>
            </div>
            <p
              className="text-[0.88rem] leading-[1.5]"
              style={{ color: "var(--color-muted)" }}
            >
              Daily activity builds your financial profile so eligible
              businesses can access working capital, no traditional collateral
              required.
            </p>
          </div>

          {/* 3. Start in minutes — short tile, peach */}
          <div
            className="builtfor-card group relative overflow-hidden rounded-2xl transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(14,14,16,0.08)] p-4 max-[900px]:p-5 col-span-5 row-span-1 max-[900px]:col-span-1 flex flex-col"
            style={{
              background: "var(--wash-peach)",
              color: "var(--color-primary)",
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl shrink-0 transition-transform duration-300 ease-out group-hover:scale-105"
                style={{ background: "rgba(14, 14, 16, 0.08)" }}
              >
                <Zap className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="text-[1.05rem] font-semibold leading-tight">
                Start in minutes
              </h3>
            </div>
            <p
              className="text-[0.88rem] leading-[1.5]"
              style={{ color: "var(--color-muted)" }}
            >
              Create an account from your phone and begin managing your
              business the same day. Fast, simple, built for busy entrepreneurs.
            </p>
          </div>

          {/* 4. Grow with confidence — tall tile, lavender */}
          <div
            className="builtfor-card group relative overflow-hidden rounded-2xl transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(14,14,16,0.08)] p-4 max-[900px]:p-5 col-span-4 row-span-2 max-[900px]:col-span-1 max-[900px]:row-span-1 flex flex-col"
            style={{
              background: "var(--wash-lavender)",
              color: "var(--color-primary)",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl shrink-0 transition-transform duration-300 ease-out group-hover:scale-105"
                style={{ background: "rgba(14, 14, 16, 0.08)" }}
              >
                <TrendingUp className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="text-[1.05rem] font-semibold leading-tight">
                Grow with confidence
              </h3>
            </div>
            <p
              className="text-[0.9rem] leading-[1.55]"
              style={{ color: "var(--color-muted)" }}
            >
              See what's selling, track profit trends, understand cash flow,
              and make better business decisions with clear insights that help
              you grow sustainably.
            </p>
          </div>

          {/* 5. Designed for African commerce — wide tile, peach */}
          <div
            className="builtfor-card group relative overflow-hidden rounded-2xl transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(14,14,16,0.08)] p-4 max-[900px]:p-5 col-span-8 row-span-1 max-[900px]:col-span-1 flex flex-col"
            style={{
              background: "var(--wash-peach)",
              color: "var(--color-primary)",
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl shrink-0 transition-transform duration-300 ease-out group-hover:scale-105"
                style={{ background: "rgba(14, 14, 16, 0.08)" }}
              >
                <Heart className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="text-[1.05rem] font-semibold leading-tight">
                Designed for African commerce
              </h3>
            </div>
            <p
              className="text-[0.9rem] leading-[1.55]"
              style={{ color: "var(--color-muted)" }}
            >
              Mobile-money first. Manage stock, customer debts, expenses, and
              cash flow in one place, built around the realities of kiosks,
              shops, and growing enterprises.
            </p>
          </div>

          {/* 6. Download CTA — wide dark tile, sits below African commerce */}
          <div
            className="builtfor-card group relative overflow-hidden rounded-2xl transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(14,14,16,0.08)] p-4 max-[900px]:p-5 col-span-8 row-span-1 max-[900px]:col-span-1 flex flex-row max-[900px]:flex-col items-center justify-between gap-4"
            style={{
              background:
                "linear-gradient(160deg, var(--color-primary) 0%, #1a1a24 100%)",
              color: "#fff",
            }}
          >
            <div
              className="absolute -bottom-16 -left-16 w-[240px] h-[240px] rounded-full blur-3xl pointer-events-none"
              style={{ background: "var(--color-secondary)", opacity: 0.28 }}
              aria-hidden="true"
            />
            <div className="absolute -top-16 -right-10 w-[200px] h-[200px] rounded-full blur-3xl pointer-events-none"
              style={{ background: "var(--color-accent)", opacity: 0.18 }}
              aria-hidden="true"
            />
            <div className="relative z-10 flex items-center gap-4 max-[900px]:flex-col max-[900px]:items-start max-[900px]:gap-3">
              <div
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl shrink-0 transition-transform duration-300 ease-out group-hover:scale-105"
                style={{ background: "rgba(255, 255, 255, 0.12)" }}
              >
                <Download className="h-5 w-5" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-[1.1rem] font-semibold leading-tight mb-1">
                  Available on iOS and Android
                </h3>
                <p className="text-[0.9rem] leading-[1.4] text-white/75">
                  Download Swahilies and start managing your business smarter.
                </p>
              </div>
            </div>
            <div className="relative z-10 flex flex-wrap gap-2 shrink-0">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative border border-white/30 rounded-md px-3 py-2 pl-7 font-semibold text-[0.75rem] leading-[1.1] flex flex-col items-start hover:bg-white/10 transition-colors"
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
                className="relative border border-white/30 rounded-md px-3 py-2 pl-7 font-semibold text-[0.75rem] leading-[1.1] flex flex-col items-start hover:bg-white/10 transition-colors"
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
    </section>
  );
}
