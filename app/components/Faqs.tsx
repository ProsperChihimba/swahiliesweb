"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Plus } from "lucide-react";

type FAQItem = { q: string; a: string };

const faqs: FAQItem[] = [
  {
    q: "Do I need a bank account to use Swahilies?",
    a: "No. You can sign up with just your phone and a Tanzanian ID — no bank account required. Funds flow in via mobile money (M-Pesa, Airtel Money, Tigo Pesa), bank transfer, or stablecoin, depending on what you have.",
  },
  {
    q: "Which payment methods can I receive from customers?",
    a: "Customers can pay you via mobile money, direct bank transfer, or stablecoin. Whatever the rails, the balance lands in your Swahilies TZS account, ready to spend, save, or send abroad.",
  },
  {
    q: "How do cross-border payments work?",
    a: "Hold your money in TZS; pay suppliers in USD, CNY, or INR. You fund the transfer with TZS via bank or mobile money, and your supplier receives their local currency at a fair rate — typically instant, not 1–3 days.",
  },
  {
    q: "How do loans work?",
    a: "Loans are requested directly in the app. Your day-to-day Swahilies activity (sales, customer payments, supplier bills) builds a credit profile that our lending partners underwrite against. We don't lend our own balance sheet — we connect you to lenders who do.",
  },
  {
    q: "Is Swahilies available outside Tanzania?",
    a: "Right now Swahilies is built for Tanzanian SMEs, with cross-border payments out to USD, CNY, and INR. Expansion to other African markets is on the roadmap — join the waitlist if you'd like to be notified.",
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".faq-title", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

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
      {/* Decorative wash orbs (mirroring the hero) */}
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
      <div
        className="absolute bottom-16 left-1/3 w-80 h-80 rounded-full blur-3xl max-[768px]:hidden pointer-events-none"
        style={{ background: "var(--wash-cream)", opacity: 0.6 }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <div className="text-center mb-12 max-[900px]:mb-8">
          <h2 className="faq-title text-[clamp(2.4rem,4vw,3.6rem)] font-semibold leading-tight">
            Frequently asked questions
          </h2>
          <p
            className="mt-3 max-w-xl mx-auto"
            style={{ color: "var(--color-muted)" }}
          >
            Short, honest answers about how Swahilies works for African SMEs.
          </p>
        </div>

        <div
          className="border-t"
          style={{ borderColor: "var(--color-border)" }}
        >
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border-b"
                style={{ borderColor: "var(--color-border)" }}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className="text-[1.1rem] max-[900px]:text-base font-semibold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {item.q}
                  </span>
                  <span
                    className="relative w-9 h-9 rounded-md border flex items-center justify-center flex-shrink-0"
                    style={{
                      borderColor: "var(--color-border-strong)",
                      background: "rgba(255, 255, 255, 0.6)",
                    }}
                    aria-hidden="true"
                  >
                    <Plus
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      style={{ color: "var(--color-primary)" }}
                    />
                  </span>
                </button>
                {isOpen && (
                  <div className="pb-5">
                    <p
                      className="text-[0.98rem] max-[900px]:text-[0.85rem] leading-relaxed"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
