"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { IoCheckmark, IoClose, IoWarning } from "react-icons/io5";

type Status = "yes" | "no" | "limited";

type Cell = { status: Status; note: string };

type Feature = {
  name: string;
  swahilies: Cell;
  banks: Cell;
  remittance: Cell;
  smeTools: Cell;
};

const features: Feature[] = [
  {
    name: "First-mover in data monetization",
    swahilies: { status: "yes", note: "Infrastructure to power future SME finance" },
    banks: { status: "no", note: "Not designed for SME data" },
    remittance: { status: "no", note: "Only transaction-level data" },
    smeTools: { status: "no", note: "Limited business activity data" },
  },
  {
    name: "Proprietary SME data engine",
    swahilies: { status: "yes", note: "Operational and financial data" },
    banks: { status: "no", note: "Only transactions" },
    remittance: { status: "no", note: "Only transaction-level data" },
    smeTools: { status: "limited", note: "Good data, but not localized" },
  },
  {
    name: "Capital-light, risk-free lending model",
    swahilies: { status: "yes", note: "Off-balance sheet loans" },
    banks: { status: "no", note: "Only transactions" },
    remittance: { status: "no", note: "No lending role" },
    smeTools: { status: "no", note: "No lending role" },
  },
  {
    name: "Instant cross-border payments",
    swahilies: { status: "yes", note: "Instant payment" },
    banks: { status: "no", note: "Takes 1–3 days" },
    remittance: { status: "limited", note: "Same day to 3 days" },
    smeTools: { status: "no", note: "No cross-border payments" },
  },
];

export default function Comparison() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const tableRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".comparison-feature", {
        scrollTrigger: {
          trigger: tableRef.current,
          start: "top 70%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  const getIcon = (status: Status) => {
    switch (status) {
      case "yes":
        return (
          <span
            className="w-5 h-5 rounded-full inline-flex items-center justify-center text-white flex-shrink-0"
            style={{ background: "var(--color-success)" }}
          >
            <IoCheckmark className="text-sm" />
          </span>
        );
      case "no":
        return (
          <span
            className="w-5 h-5 rounded-full inline-flex items-center justify-center text-white flex-shrink-0"
            style={{ background: "var(--color-danger)" }}
          >
            <IoClose className="text-sm" />
          </span>
        );
      case "limited":
        return (
          <IoWarning
            className="text-xl flex-shrink-0"
            style={{ color: "var(--color-warning)" }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28"
      style={{ background: "var(--color-bg)", color: "var(--color-text)" }}
    >
      <div className=" mx-auto px-4 md:px-6">
        <h2
          ref={titleRef}
          className="text-center font-semibold text-3xl md:text-5xl lg:text-6xl mb-8 md:mb-12"
          style={{ color: "var(--color-primary)" }}
        >
          How <span style={{ color: "var(--color-accent)" }}>Swahilies</span> compares
        </h2>

        {/* Desktop Table View */}
        <div ref={tableRef} className="hidden lg:block max-w-[1240px] mx-auto">
          {/* Table Header */}
          <div
            className="grid grid-cols-[1.4fr_1.1fr_1.1fr_1.1fr_1.1fr] border-b"
            style={{ borderColor: "var(--color-border)" }}
          >
            <div
              className="px-5 py-4 font-semibold text-base"
              style={{ color: "var(--color-muted)" }}
            >
              Feature
            </div>
            <div
              className="px-5 py-4 font-semibold text-base rounded-tl-xl"
              style={{
                background: "var(--wash-lavender)",
                color: "var(--color-primary)",
              }}
            >
              Swahilies
            </div>
            <div
              className="px-5 py-4 font-semibold text-base"
              style={{ color: "var(--color-muted)" }}
            >
              Traditional Banks
            </div>
            <div
              className="px-5 py-4 font-semibold text-base"
              style={{ color: "var(--color-muted)" }}
            >
              Western Union & MoneyGram
            </div>
            <div
              className="px-5 py-4 font-semibold text-base"
              style={{ color: "var(--color-muted)" }}
            >
              Bumpa, Settlo, QuickBooks
            </div>
          </div>

          {/* Table Rows */}
          {features.map((feature, index) => (
            <div
              key={index}
              className="comparison-feature grid grid-cols-[1.4fr_1.1fr_1.1fr_1.1fr_1.1fr] border-b last:border-b-0"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div className="px-5 py-5 flex flex-col gap-1">
                <span
                  className="text-[0.95rem] font-semibold leading-tight"
                  style={{ color: "var(--color-primary)" }}
                >
                  {feature.name}
                </span>
              </div>

              <div
                className="px-5 py-5 flex items-center gap-3"
                style={{ background: "var(--wash-lavender)" }}
              >
                {getIcon(feature.swahilies.status)}
                <span
                  className="text-[0.85rem] leading-snug"
                  style={{ color: "var(--color-primary)" }}
                >
                  {feature.swahilies.note}
                </span>
              </div>

              <div className="px-5 py-5 flex items-center gap-3">
                {getIcon(feature.banks.status)}
                <span
                  className="text-[0.85rem] leading-snug"
                  style={{ color: "var(--color-muted)" }}
                >
                  {feature.banks.note}
                </span>
              </div>

              <div className="px-5 py-5 flex items-center gap-3">
                {getIcon(feature.remittance.status)}
                <span
                  className="text-[0.85rem] leading-snug"
                  style={{ color: "var(--color-muted)" }}
                >
                  {feature.remittance.note}
                </span>
              </div>

              <div className="px-5 py-5 flex items-center gap-3">
                {getIcon(feature.smeTools.status)}
                <span
                  className="text-[0.85rem] leading-snug"
                  style={{ color: "var(--color-muted)" }}
                >
                  {feature.smeTools.note}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Stacked View */}
        <div className="lg:hidden max-w-2xl mx-auto space-y-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="comparison-feature border-b pb-3"
              style={{ borderColor: "var(--color-border)" }}
            >
              <h3
                className="text-xl md:text-2xl font-semibold mb-4"
                style={{ color: "var(--color-primary)" }}
              >
                {feature.name}
              </h3>

              <div className="space-y-3">
                <div
                  className="rounded-md p-4 flex justify-between gap-3 items-start"
                  style={{ background: "var(--wash-lavender)" }}
                >
                  <div
                    className="font-semibold text-[0.85rem]"
                    style={{ color: "var(--color-primary)" }}
                  >
                    Swahilies
                  </div>
                  <div className="flex items-start gap-2">
                    {getIcon(feature.swahilies.status)}
                    <div
                      className="text-[0.8rem] leading-relaxed"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {feature.swahilies.note}
                    </div>
                  </div>
                </div>

                <div
                  className="border-t p-4 flex justify-between gap-3 items-start"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <div
                    className="font-semibold text-[0.85rem]"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Traditional Banks
                  </div>
                  <div className="flex items-start gap-2">
                    {getIcon(feature.banks.status)}
                    <div
                      className="text-[0.8rem] leading-relaxed"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {feature.banks.note}
                    </div>
                  </div>
                </div>

                <div
                  className="border-t p-4 flex justify-between gap-3 items-start"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <div
                    className="font-semibold text-[0.85rem]"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Western Union & MoneyGram
                  </div>
                  <div className="flex items-start gap-2">
                    {getIcon(feature.remittance.status)}
                    <div
                      className="text-[0.8rem] leading-relaxed"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {feature.remittance.note}
                    </div>
                  </div>
                </div>

                <div
                  className="border-t p-4 flex justify-between gap-3 items-start"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <div
                    className="font-semibold text-[0.85rem]"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Bumpa, Settlo, QuickBooks
                  </div>
                  <div className="flex items-start gap-2">
                    {getIcon(feature.smeTools.status)}
                    <div
                      className="text-[0.8rem] leading-relaxed"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {feature.smeTools.note}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
