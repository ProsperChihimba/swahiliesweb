"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Plus, ChevronRight } from "lucide-react";

type FAQItem = { q: string; a: string };

const faqs: FAQItem[] = [
  {
    q: "Which payment methods can I accept?",
    a: "Mobile money (M-Pesa, Tigo Pesa, Airtel Money, MTN MoMo), Visa and Mastercard, and direct bank transfers — all through one integration.",
  },
  {
    q: "How fast can I go live?",
    a: "Most teams ship a working integration in an afternoon. Sandbox keys, drop-in checkout, and clear documentation mean you can build and test before applying for production access.",
  },
  {
    q: "How do payouts and settlement work?",
    a: "We settle to your bank account or mobile wallet in local currency, typically same-day. Configure auto-payouts on a schedule, or trigger them via API.",
  },
  {
    q: "Do you support cross-border payments?",
    a: "Yes. Hold funds in your local currency and pay out in USD, CNY, INR, EUR, GBP, and more — at fair mid-market FX rates, with settlement in hours rather than days.",
  },
  {
    q: "Which countries does Swahilies support?",
    a: "We're rolling out across Africa, starting in East Africa and expanding to West and Southern markets. If you don't see your country yet, get in touch — we'll let you know when we launch.",
  },
  {
    q: "Is Swahilies secure and compliant?",
    a: "PCI DSS Level 1, end-to-end encryption, signed webhooks, and regulated banking partners. Your transactions, customer data, and funds are protected by infrastructure built to bank-grade standards.",
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        const introTargets = sectionRef.current?.querySelectorAll(
          ".faq-fade",
        );
        if (introTargets && introTargets.length) {
          gsap.fromTo(
            introTargets,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.08,
              ease: "power2.out",
              immediateRender: false,
              scrollTrigger: {
                trigger: titleRef.current,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            },
          );
        }

        const items = itemsRef.current.filter(Boolean) as HTMLElement[];
        if (items.length) {
          gsap.fromTo(
            items,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.06,
              ease: "power2.out",
              immediateRender: false,
              scrollTrigger: {
                trigger: items[0],
                start: "top 95%",
                toggleActions: "play none none none",
              },
            },
          );
        }
      }, sectionRef);

      return () => ctx.revert();
    },
    { scope: sectionRef },
  );

  // Animate answer height on toggle
  useGSAP(
    () => {
      answerRefs.current.forEach((el, i) => {
        if (!el) return;
        const isOpen = i === openIndex;
        gsap.to(el, {
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    },
    { dependencies: [openIndex], scope: sectionRef },
  );

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="mesh-gradient relative overflow-hidden py-24 max-[900px]:py-16"
      style={{ color: "var(--color-primary)" }}
    >
      {/* Decorative wash orbs */}
      <div
        className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl max-[768px]:hidden pointer-events-none"
        style={{ background: "var(--wash-lavender)", opacity: 0.6 }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-24 right-10 w-[28rem] h-[28rem] rounded-full blur-3xl max-[768px]:hidden pointer-events-none"
        style={{ background: "var(--wash-peach)", opacity: 0.6 }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-12 gap-12 max-[900px]:grid-cols-1 max-[900px]:gap-8">
          {/* Left — sticky title block */}
          <div className="col-span-5 max-[900px]:col-span-1">
            <div ref={titleRef} className="sticky top-12 max-[900px]:static">
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
                FAQs
              </div>

              <h2 className="faq-fade text-[clamp(2.4rem,4.4vw,4rem)] font-semibold leading-[1.05] tracking-[-0.02em] mb-5">
                <span className="block">Questions?</span>
                <span className="block">We&apos;ve got answers.</span>
              </h2>

              <p
                className="faq-fade text-base sm:text-lg leading-relaxed max-w-md"
                style={{ color: "var(--color-muted)" }}
              >
                Everything you need to know about how Swahilies works. Can&apos;t
                find what you&apos;re looking for? Reach out.
              </p>

              <a
                href="/contact"
                className="group mt-7 inline-flex items-center gap-3 pl-6 pr-1.5 py-1.5 rounded-full text-white hover:opacity-95 transition-opacity"
                style={{ background: "var(--color-primary)" }}
              >
                <span className="text-[0.95rem] font-semibold tracking-tight">
                  Talk to us.
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
            </div>
          </div>

          {/* Right — accordion */}
          <div className="col-span-7 max-[900px]:col-span-1">
            <div className="flex flex-col gap-3">
              {faqs.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    ref={(el) => {
                      itemsRef.current[index] = el;
                    }}
                    className="rounded-2xl overflow-hidden transition-all duration-300"
                    style={{
                      background: isOpen
                        ? "rgba(255, 255, 255, 0.85)"
                        : "rgba(255, 255, 255, 0.55)",
                      border: `1px solid ${isOpen ? "var(--color-border-strong)" : "var(--color-border)"}`,
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => toggle(index)}
                      className="w-full flex items-center justify-between gap-6 px-6 py-5 max-[768px]:px-5 max-[768px]:py-4 text-left"
                      aria-expanded={isOpen}
                    >
                      <span
                        className="text-[1.05rem] max-[900px]:text-[0.95rem] font-semibold leading-snug"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {item.q}
                      </span>
                      <span
                        className="relative w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
                        style={{
                          background: isOpen
                            ? "var(--color-primary)"
                            : "rgba(255, 255, 255, 0.7)",
                          border: `1px solid ${isOpen ? "var(--color-primary)" : "var(--color-border-strong)"}`,
                        }}
                        aria-hidden="true"
                      >
                        <Plus
                          className={`h-4 w-4 transition-transform duration-300 ${
                            isOpen ? "rotate-45" : ""
                          }`}
                          style={{ color: isOpen ? "#fff" : "var(--color-primary)" }}
                          strokeWidth={2.2}
                        />
                      </span>
                    </button>
                    <div
                      ref={(el) => {
                        answerRefs.current[index] = el;
                      }}
                      className="overflow-hidden"
                      style={{
                        height: 0,
                        opacity: 0,
                      }}
                    >
                      <p
                        className="px-6 pb-5 max-[768px]:px-5 max-[768px]:pb-4 pr-12 text-[0.95rem] max-[900px]:text-[0.88rem] leading-relaxed"
                        style={{ color: "var(--color-muted)" }}
                      >
                        {item.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
