"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import image from "../../public/assets/images/swahi1.png";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import {
  FaApple,
  FaGooglePlay,
  FaBook,
  FaUniversity,
  FaHandHoldingUsd,
} from "react-icons/fa";
import { APP_STORE_URL, PLAY_STORE_URL } from "../lib/storeLinks";

const services = [
  {
    icon: FaBook,
    title: "Business management",
    description:
      "SMEs manage sales, stock, and debts on Swahilies — improving record-keeping and reducing losses. Built around how African small businesses actually run.",
    label: "business management",
  },
  {
    icon: FaUniversity,
    title: "Collection & banking",
    description:
      "Receive digital payments from customers and pay suppliers locally and abroad at fair rates. Saves time, reduces costs, and builds the trust SMEs need to grow.",
    label: "collection & banking",
  },
  {
    icon: FaHandHoldingUsd,
    title: "Credit & lending",
    description:
      "Request loans directly from the app. Your daily transactions build a credit profile that makes you visible to our lending partners — capital-light, risk-free.",
    label: "credit & lending",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
    );
  }, { dependencies: [activeIndex], scope: cardRef });

  const activeService = services[activeIndex];
  return (
    <section
      ref={sectionRef}
      data-nav-theme="light"
      className="relative z-40 text-white py-28 max-[900px]:py-20"
      style={{ background: 'var(--color-primary)' }}
    >
      <div className="container mx-auto px-6">
        <h2
          ref={titleRef}
          className="text-center font-semibold leading-[1.1] text-5xl mb-12 max-[768px]:text-2xl"
        >
          <span className="block">Manage your business</span>
          <span className="block">— all in one app</span>
        </h2>

        <div className="flex justify-center mb-11 relative">
          <div
            ref={cardRef}
            className="relative w-full max-w-[54rem] min-w-[53rem] border border-white/20 lg:rounded-[14px] md:rounded-[14px] px-7 py-6 max-[900px]:min-w-0 max-[900px]:max-w-full max-[768px]:px-5 max-[768px]:py-5"
            style={{ background: 'rgba(255, 255, 255, 0.04)' }}
          >
            <div className="flex items-start gap-10 max-[900px]:flex-col max-[900px]:gap-0">
              {/* Left side: Badge and Text */}
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 lg:px-4 md:px-4 px-3 py-1 rounded-full border border-white/45 text-[0.9rem] lowercase">
                  <span className="w-2 h-2 rounded-full" style={{ background: 'var(--color-accent)' }} />
                  services
                </div>

                <div className="mt-24 hidden md:block lg:block">
                  <h3
                    className="text-[1.7rem] font-semibold mb-3"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    {activeService.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed text-base">
                    {activeService.description}
                  </p>
                </div>
              </div>

              {/* Right side: Image */}
              <div className="relative  lg:w-75  lg:h-75 shrink-0 max-[900px]:w-full max-[900px]:h-65 max-[900px]:my-6">
                <Image
                  src={image}
                  alt="Swahi"
                  fill
                  className="h-auto w-full"
                  priority
                />
              </div>
              <div className=" block lg:hidden  md:hidden">
                <h3
                  className="text-[1rem] font-semibold mb-3"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {activeService.title}
                </h3>
                <p className="text-white/80 leading-relaxed text-base">
                  {activeService.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-6 max-[900px]:flex-col ">
          <div className="flex items-center gap-4 flex-wrap">
            {services.map((service, index) => (
              <button
                key={service.label}
                type="button"
                className={`inline-flex items-center gap-2 uppercase text-[0.95rem] ${
                  activeIndex === index ? "text-white" : "text-white/70"
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <span
                  className={`w-8 h-8 rounded-md border flex items-center justify-center text-[0.95rem] ${
                    activeIndex === index
                      ? "border-white bg-white/20"
                      : "border-white/60 bg-transparent"
                  }`}
                >
                  {index + 1}
                </span>
                {activeIndex === index && (
                  <span className="text-[0.9rem] max-[900px]:text-[0.7rem] tracking-[0.02em]">
                    {service.label}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative border border-white/70 rounded-1 px-2 py-1 pl-6 bg-transparent text-white font-semibold text-[0.7rem] leading-[1.1] flex flex-col items-start hover:bg-white/10 transition-colors"
            >
              <span className="absolute left-[4px] top-1/2 -translate-y-1/2 text-[1.15rem] opacity-95">
                <FaApple />
              </span>
              <span className="text-[0.5rem] font-medium opacity-80">
                Download on the
              </span>
              App Store
            </a>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative border border-white/70 rounded-1 px-2 py-1 pl-6 bg-transparent text-white font-semibold text-[0.7rem] leading-[1.1] flex flex-col items-start hover:bg-white/10 transition-colors"
            >
              <span className="absolute left-[4px] top-1/2 -translate-y-1/2 text-[1.15rem] opacity-95">
                <FaGooglePlay />
              </span>
              <span className="text-[0.5rem] font-medium opacity-80">
                Get it on
              </span>
              Google Play
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
