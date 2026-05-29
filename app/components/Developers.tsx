"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowUpRight,
  Terminal,
  Briefcase,
  Layers,
  Globe,
  ChevronRight,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const useCases = [
  {
    Icon: Briefcase,
    title: "B2B",
    description: "Invoicing, vendor payouts, and reconciliation for businesses.",
  },
  {
    Icon: Layers,
    title: "Marketplaces",
    description: "Split payments and payouts to thousands of sellers.",
  },
  {
    Icon: Globe,
    title: "SaaS",
    description: "Recurring subscriptions in local currencies.",
  },
];

const codeLines = [
  { tone: "comment", text: "// Create a charge — accept any African rail" },
  { tone: "k", text: "const " },
  { tone: "v", text: "charge" },
  { tone: "p", text: " = " },
  { tone: "k", text: "await " },
  { tone: "v", text: "swahilies" },
  { tone: "p", text: ".charges." },
  { tone: "fn", text: "create" },
  { tone: "p", text: "({" },
];

export default function Developers() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.from(".dev-fade", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
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
      id="developers"
      className="py-24 max-[900px]:py-16 relative overflow-hidden"
      style={{ background: "var(--color-primary)", color: "#fff" }}
    >
      <div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "var(--color-accent)", opacity: 0.16 }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -left-40 w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "var(--color-secondary)", opacity: 0.18 }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-12 gap-12 max-[900px]:grid-cols-1 max-[900px]:gap-10 items-center">
          {/* Copy */}
          <div className="col-span-6 max-[900px]:col-span-1">
            <div
              className="dev-fade inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-5 text-[0.7rem] uppercase tracking-[0.18em] font-medium"
              style={{
                borderColor: "rgba(255,255,255,0.18)",
                color: "rgba(255,255,255,0.7)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--color-accent)" }}
              />
              Developers
            </div>
            <h2 className="dev-fade text-[clamp(2.2rem,4.6vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.02em] mb-5">
              Built for builders.
            </h2>
            <p className="dev-fade text-[1.02rem] max-[768px]:text-[0.95rem] leading-relaxed text-white/75 max-w-md mb-7">
              An API-first platform with sandbox keys, predictable errors, and
              clear documentation. Ship payments in days, not months.
            </p>

            <div className="dev-fade flex flex-wrap items-center gap-3 mb-10">
              <a
                href="/contact"
                className="group inline-flex items-center gap-3 pl-6 pr-1.5 py-1.5 rounded-full hover:opacity-95 transition-opacity"
                style={{ background: "var(--color-accent)", color: "var(--color-primary)" }}
              >
                <span className="text-[0.95rem] font-semibold tracking-tight">
                  Read the docs
                </span>
                <span
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/40 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  <ChevronRight className="h-4 w-4" strokeWidth={2.5} style={{ color: "var(--color-primary)" }} />
                </span>
              </a>

              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-[0.95rem] font-semibold rounded-full transition-colors hover:bg-white/10"
                style={{
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                Get API keys
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
              </a>
            </div>

            {/* Use cases */}
            <div className="dev-fade">
              <div className="text-[0.7rem] uppercase tracking-[0.22em] font-medium mb-3 text-white/55">
                Built for
              </div>
              <div className="flex flex-col gap-2">
                {useCases.map(({ Icon, title, description }) => (
                  <div
                    key={title}
                    className="flex items-center gap-3 rounded-xl px-3.5 py-3 transition-colors hover:bg-white/5"
                    style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <span
                      className="inline-flex items-center justify-center w-9 h-9 rounded-lg shrink-0 bg-white/10"
                    >
                      <Icon className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold leading-tight">
                        {title}
                      </div>
                      <div className="text-[0.78rem] text-white/60 mt-0.5 truncate">
                        {description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Code block */}
          <div className="col-span-6 max-[900px]:col-span-1 dev-fade">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
              }}
            >
              {/* Window header */}
              <div
                className="flex items-center justify-between px-4 py-3 border-b"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                </div>
                <div className="flex items-center gap-1.5 text-[0.7rem] text-white/45">
                  <Terminal className="h-3 w-3" strokeWidth={2} />
                  charges.create.ts
                </div>
              </div>

              {/* Code body */}
              <div className="px-4 sm:px-5 py-4 sm:py-5 font-mono text-[0.72rem] sm:text-[0.78rem] md:text-[0.82rem] leading-[1.7] overflow-x-auto">
                <pre className="text-white/85 whitespace-pre">
{`// Create a charge — accept any African rail
const charge = await swahilies.charges.create({
  amount: 25000,
  currency: 'TZS',
  customer: {
    phone: '+255700123456'
  },
  payment_method: 'mpesa',
  metadata: { order_id: 'ord_8f3' }
});

// → charge.status === 'succeeded'`}
                </pre>
              </div>

              {/* Window footer */}
              <div
                className="flex items-center justify-between px-4 py-3 text-[0.72rem] border-t"
                style={{
                  borderColor: "rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                <span>200 OK · 142ms</span>
                <span className="flex items-center gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "var(--color-success)" }}
                  />
                  Sandbox ready
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
