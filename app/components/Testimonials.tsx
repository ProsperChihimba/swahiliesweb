"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Testimonial = {
  name: string;
  role: string;
  location: string;
  initials: string;
  accent: string;
  quote: string;
  label: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Asha Mwangi",
    role: "Owner, Asha General Store",
    location: "Dar es Salaam, Tanzania",
    initials: "AM",
    accent: "var(--color-accent)",
    quote:
      "Before Swahilies I tracked sales in a notebook. Now I see exactly what I sold, who owes me, and what I need to restock, all from my phone. My margins jumped because I finally know where the money goes.",
    label: "asha mwangi",
  },
  {
    name: "Kwame Boateng",
    role: "Wholesaler, Boateng Imports",
    location: "Accra, Ghana",
    initials: "KB",
    accent: "var(--color-secondary)",
    quote:
      "I pay suppliers in China and Dubai every week. Swahilies got me fair rates and the money lands in hours, not days. The cross-border piece alone has saved my business thousands of cedis.",
    label: "kwame boateng",
  },
  {
    name: "Chioma Okeke",
    role: "Founder, Chioma Kitchen",
    location: "Lagos, Nigeria",
    initials: "CO",
    accent: "var(--color-tertiary)",
    quote:
      "I needed working capital to open a second branch and the bank wouldn't talk to me. Swahilies looked at my actual sales and approved a loan in three days. We're growing because someone finally listened.",
    label: "chioma okeke",
  },
];

type SlideProps = {
  testimonial: Testimonial;
  variant: "desktop" | "mobile";
};

function TestimonialContent({ testimonial, variant }: SlideProps) {
  if (variant === "desktop") {
    return (
      <div className="flex items-center gap-8 h-full">
        {/* Quote */}
        <div className="flex-1">
          <FaQuoteLeft
            className="text-lg mb-2 opacity-70"
            style={{ color: testimonial.accent }}
          />
          <p className="text-white/90 leading-relaxed text-[0.95rem] mb-4">
            {testimonial.quote}
          </p>
          <div>
            <h3
              className="text-[1rem] font-semibold"
              style={{ color: "var(--color-accent)" }}
            >
              {testimonial.name}
            </h3>
            <p className="text-white/70 text-xs mt-0.5">
              {testimonial.role} · {testimonial.location}
            </p>
          </div>
        </div>

        {/* Avatar */}
        <div className="relative shrink-0 flex items-center justify-center">
          <div
            className="relative w-56 h-56 rounded-md flex items-center justify-center overflow-hidden"
            style={{
              background: `linear-gradient(160deg, ${testimonial.accent}, rgba(255,255,255,0.04) 80%)`,
              border: `1px solid ${testimonial.accent}`,
            }}
          >
            <span className="text-5xl font-semibold tracking-tight text-white">
              {testimonial.initials}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-4">
      <div className="relative shrink-0 flex items-center justify-center w-full my-2">
        <div
          className="relative w-48 h-56 rounded-md flex items-center justify-center overflow-hidden"
          style={{
            background: `linear-gradient(160deg, ${testimonial.accent}, rgba(255,255,255,0.04) 80%)`,
            border: `1px solid ${testimonial.accent}`,
          }}
        >
          <span className="text-5xl font-semibold tracking-tight text-white">
            {testimonial.initials}
          </span>
        </div>
      </div>
      <div>
        <FaQuoteLeft
          className="text-base mb-2 opacity-70"
          style={{ color: testimonial.accent }}
        />
        <p className="text-white/90 leading-relaxed text-[0.9rem] mb-3">
          {testimonial.quote}
        </p>
        <div>
          <h3
            className="text-[0.95rem] font-semibold"
            style={{ color: "var(--color-accent)" }}
          >
            {testimonial.name}
          </h3>
          <p className="text-white/70 text-[0.7rem] mt-0.5">
            {testimonial.role} · {testimonial.location}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const desktopSlideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileSlideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Initial state: only first slide visible, others hidden
      desktopSlideRefs.current.forEach((el, i) => {
        if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0 });
      });
      mobileSlideRefs.current.forEach((el, i) => {
        if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0 });
      });
    },
    { scope: sectionRef },
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // True crossfade: animate every slide's opacity simultaneously
  useGSAP(
    () => {
      const fade = (els: (HTMLDivElement | null)[]) => {
        els.forEach((el, i) => {
          if (!el) return;
          gsap.to(el, {
            opacity: i === activeIndex ? 1 : 0,
            duration: 0.6,
            ease: "power2.inOut",
            overwrite: "auto",
          });
        });
      };

      fade(desktopSlideRefs.current);
      fade(mobileSlideRefs.current);
    },
    { dependencies: [activeIndex], scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      data-nav-theme="light"
      className="relative z-40 text-white py-20 max-[900px]:py-14"
      style={{ background: "var(--color-primary)" }}
    >
      <div className="container mx-auto px-6">
        <h2
          ref={titleRef}
          className="text-center font-semibold leading-[1.1] text-5xl mb-12 max-[768px]:text-2xl"
        >
          <span className="block">Loved by businesses</span>
          <span className="block">— across Africa</span>
        </h2>

        <div className="mb-8 relative">
          <div
            className="relative w-full border border-white/20 lg:rounded-[14px] md:rounded-[14px] px-7 py-6 max-[768px]:px-5 max-[768px]:py-5"
            style={{ background: "rgba(255, 255, 255, 0.04)" }}
          >
            {/* Static badge anchored top-left */}
            <div
              className="absolute top-5 left-7 max-[768px]:top-4 max-[768px]:left-5 inline-flex items-center gap-2 lg:px-4 md:px-4 px-3 py-1 rounded-full border border-white/45 text-[0.85rem] lowercase z-10 backdrop-blur-sm"
              style={{ background: "rgba(255, 255, 255, 0.04)" }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "var(--color-accent)" }}
              />
              testimonials
            </div>

            {/* Desktop slides — stacked, crossfaded */}
            <div className="relative hidden md:block lg:block min-h-[15rem]">
              {testimonials.map((t, i) => (
                <div
                  key={t.label}
                  ref={(el) => {
                    desktopSlideRefs.current[i] = el;
                  }}
                  className="absolute inset-0 will-change-[opacity]"
                  aria-hidden={i !== activeIndex}
                >
                  <TestimonialContent testimonial={t} variant="desktop" />
                </div>
              ))}
            </div>

            {/* Mobile slides — stacked, crossfaded */}
            <div className="relative block lg:hidden md:hidden min-h-[22rem] pt-8">
              {testimonials.map((t, i) => (
                <div
                  key={t.label}
                  ref={(el) => {
                    mobileSlideRefs.current[i] = el;
                  }}
                  className="absolute inset-0 will-change-[opacity] pt-10"
                  aria-hidden={i !== activeIndex}
                >
                  <TestimonialContent testimonial={t} variant="mobile" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-6 max-[900px]:flex-col">
          <div className="flex items-center gap-4 flex-wrap">
            {testimonials.map((t, index) => (
              <button
                key={t.label}
                type="button"
                className={`inline-flex items-center gap-2 uppercase text-[0.9rem] transition-colors ${
                  activeIndex === index ? "text-white" : "text-white/70"
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <span
                  className={`w-7 h-7 rounded-md border flex items-center justify-center text-[0.85rem] transition-colors ${
                    activeIndex === index
                      ? "border-white bg-white/20"
                      : "border-white/60 bg-transparent"
                  }`}
                >
                  {index + 1}
                </span>
                {activeIndex === index && (
                  <span className="text-[0.85rem] max-[900px]:text-[0.7rem] tracking-[0.02em]">
                    {t.label}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className="text-xs"
                  style={{ color: "var(--color-accent)" }}
                />
              ))}
            </div>
            <span className="text-xs text-white/80">
              <span className="font-semibold text-white">4.8</span> from 1,200+
              businesses
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
