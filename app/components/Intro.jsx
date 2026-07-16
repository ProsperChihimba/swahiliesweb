"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  FaMoneyBillWave,
  FaUsers,
  FaFileInvoice,
  FaHandHoldingUsd,
  FaBook,
  FaListAlt,
  FaBoxes,
  FaChartLine,
  FaGlobe,
  FaCoins,
} from "react-icons/fa";
import phone from "../../public/assets/images/phone2.png";
import card from "../../public/assets/images/swahi1.png";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const circleRef = useRef(null);
  const circleTextRef = useRef(null);
  const circleGradientRef = useRef(null);
  const mainImageRef = useRef(null);
  const smallImagesRef = useRef([]);
  const circularRef = useRef(null);
  const illustrationRef = useRef(null);

  useGSAP(() => {
    const cards = cardsRef.current;
    const headline = headlineRef.current;
    const section = sectionRef.current;

    if (!section || !cards.length) return;

    const mm = gsap.matchMedia();

    const buildTimeline = (endValue, isDesktop) => {
      // Start with cards visible at their initial positions
      gsap.set(cards, { autoAlpha: 1 });
      gsap.set(circleRef.current, { width: 0, height: 0, opacity: 0 });
      gsap.set(circleTextRef.current, { opacity: 0, y: 20 });
      gsap.set(circleGradientRef.current, { opacity: 0 });
      
      // Set initial state for illustration elements
      gsap.set(mainImageRef.current, { opacity: 0 });
      gsap.set(smallImagesRef.current, { opacity: 0 });
      gsap.set(circularRef.current, { opacity: 1 });
      gsap.set(illustrationRef.current, { opacity: 0 });

      const iconEls = circleTextRef.current
        ? gsap.utils.toArray(
            circleTextRef.current.querySelectorAll(".circle-text-icon"),
          )
        : [];

      const iconBgInitial = "#00000028";
      const iconBgFinal = "#ffffff";

      if (iconEls.length) {
        gsap.set(iconEls, { backgroundColor: iconBgInitial, color: "#ffffff" });
      }

      if (circularRef.current) {
        gsap.set(circularRef.current, { borderColor: iconBgInitial });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: endValue,
          scrub: 1,
          pin: true,
        },
      });

      // Get the center of the intro-section
      const sectionRect = section.getBoundingClientRect();
      const sectionCenterX = sectionRect.left + sectionRect.width / 2;
      const sectionCenterY = sectionRect.top + sectionRect.height / 2;

      // Move all cards to the exact center of the section
      cards.forEach((card, i) => {
        const cardRect = card.getBoundingClientRect();

        // Calculate the center of the card
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;

        // Calculate how much to move the card center to align with section center
        const translateX = sectionCenterX - cardCenterX;
        const translateY = sectionCenterY - cardCenterY;

        const zIndexValue = i === 3 ? 100 : 1;

        tl.to(
          card,
          {
            x: translateX,
            y: translateY,
            scale: 1,
            zIndex: zIndexValue,
            duration: 2,
            ease: "power2.inOut",
          },
          0,
        );
      });

      // Fade out headline as cards move to center
      tl.to(
        headline,
        {
          autoAlpha: 0,
          duration: 0.5,
        },
        1,
      );

      // Fade out all cards EXCEPT Card 4 as they reach center
      cards.forEach((card, i) => {
        if (i !== 3) {
          // Skip Card 4
          tl.to(
            card,
            {
              autoAlpha: 1,
              duration: 1,
            },
            1,
          );
        }
      });

      // Hold Card 4 at center for a moment
      tl.to({}, { duration: 0.6 });

      // Grow reveal circle from center to full screen
      if (circleRef.current) {
        tl.to(
          circleRef.current,
          {
            width: "200vmax",
            height: "200vmax",
            opacity: 1,
            duration: 1.2,
            ease: "power2.inOut",
          },
          "+=0.1",
        );
      }

      // Fade out Card 4 as the circle expands
      if (cards[3]) {
        tl.to(
          cards[3],
          {
            autoAlpha: 0,
            duration: 0.3,
          },
          "<",
        );
      }

      // Reveal text inside the circle
      if (circleTextRef.current) {
        tl.to(
          circleTextRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3",
        );
      }

      if (circleGradientRef.current) {
        tl.to(
          circleGradientRef.current,
          {
            opacity: 1,
            duration: 1.4,
            ease: "power2.out",
          },
          "+=0.2",
        );
      }

      if (iconEls.length) {
        tl.to(
          iconEls,
          {
            backgroundColor: iconBgFinal,
            color: "#9d7ba3",
            duration: 0.6,
            ease: "power2.out",
          },
          "<",
        );
        if (circularRef.current) {
          tl.to(
            circularRef.current,
            {
              borderColor: iconBgFinal,
              duration: 0.6,
              ease: "power2.out",
            },
            "<",
          );
        }
      }

      // Fade out circular class after gradient color change
      if (circularRef.current) {
        tl.to(
          circularRef.current,
          {
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "+=0.3",
        );
      }

      // Fade in illustration at the same time circular fades out
      if (illustrationRef.current) {
        tl.to(
          illustrationRef.current,
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "<",
        );
      }

      // Animate main image (phone) first
      if (mainImageRef.current) {
        tl.to(
          mainImageRef.current,
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "+=0.2",
        );
      }

      // Animate all small images at the same time to their final positions (after main image)
      if (smallImagesRef.current.length === 6) {
        // Define final positions for desktop and mobile
        const finalPositions = isDesktop
          ? [
              { top: "50%", left: "-8rem" },      // First image
              { top: "20%", left: "-15rem" },     // Second image
              { top: "80%", left: "-15rem" }, // Third image
              { top: "80%", right: "-15rem" },  // Fourth image
              { top: "20%", right: "-15rem" },    // Fifth image
              { bottom: "-1rem", right: "-8rem" }, // Sixth image
            ]
          : [
              { top: "33.33%", left: "-4rem" },   // First image
              { top: "68%", left: "-4rem" },      // Second image
              { top: "55%", left: "-1rem" },      // Third image
              { top: "33.33%", right: "-4rem" },  // Fourth image
              { top: "68%", right: "-4rem" },     // Fifth image
              { top: "45%", right: "-1rem" },     // Sixth image
            ];

        // Animate all small images simultaneously
        smallImagesRef.current.forEach((img, index) => {
          if (img) {
            tl.to(
              img,
              {
                ...finalPositions[index],
                opacity: 1,
                duration: 1,
                ease: "power2.out",
              },
              index === 0 ? "+=0.2" : "<", // First small image starts after a delay, rest start at same time
            );
          }
        });
      }

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    };

    mm.add("(min-width: 901px)", () => buildTimeline("+=4500", true));
    mm.add("(max-width: 900px)", () => buildTimeline("+=3000", false));

    return () => {
      mm.revert();
    };
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="intro-section relative min-h-screen overflow-hidden"
    >
      <div className="intro-glow intro-glow-primary" />
      <div className="intro-glow intro-glow-secondary" />
      <div className="intro-noise" />
      <div
        ref={circleRef}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e6c28b] z-20 flex items-center justify-center text-white overflow-hidden pointer-events-none w-0 h-0 opacity-0"
      >
        <div
          ref={circleGradientRef}
          className="absolute inset-0 bg-[linear-gradient(180deg,#9d7ba3_0%,#b58cab_45%,#d4a9a1_100%)] opacity-0"
        />
        <div ref={circleTextRef} className="px-6 opacity-0">
          <div className="w-62.5 h-[70vh] mt-24 flex items-center justify-center relative">
            <div ref={circularRef} className="circular border-3 p-5 flex flex-col gap-4 text-[clamp(1.4rem,3.2vw,2.6rem)] font-semibold">
              <div className="flex items-center gap-3 pb-2">
                <FaMoneyBillWave className="circle-text-icon text-[1.3em] lg:text-[0.7em] p-1.5 lg:p-1 md:p-3" />
                <span className="text-xl">Malipo</span>
              </div>
              <div className="flex items-center gap-3 pb-2">
                <FaListAlt className="circle-text-icon text-[1.3em] lg:text-[0.7em] p-1.5 lg:p-1 md:p-3" />
                <span className="text-xl">Madeni</span>
              </div>
              <div className="flex items-center gap-3 pb-2">
                <FaBook className="circle-text-icon text-[1.3em] lg:text-[0.7em] p-1.5 lg:p-1 md:p-3" />
                <span className="text-xl">Notebook</span>
              </div>
              <div className="flex items-center gap-3 pb-2">
                <FaUsers className="circle-text-icon text-[1.3em] lg:text-[0.7em] p-1.5 lg:p-1 md:p-3" />
                <span className="text-xl">Wateja</span>
              </div>
              <div className="flex items-center gap-3 pb-2">
                <FaHandHoldingUsd className="circle-text-icon text-[1.3em] lg:text-[0.7em] p-1.5 lg:p-1 md:p-3" />
                <span className="text-xl">Mkopo</span>
              </div>
              <div className="flex items-center gap-3">
                <FaFileInvoice className="circle-text-icon text-[1.3em] lg:text-[0.7em] p-1.5 lg:p-1 md:p-3" />
                <span className="text-xl">Invoice</span>
              </div>
            </div>
            <div ref={illustrationRef} className="absolute inset-0 flex items-center justify-center illustration opacity-0">
              <div
                ref={(el) => (smallImagesRef.current[0] = el)}
                className="absolute z-30 top-1/5 -left-46 lg:top-1/2 md:top-1/2 lg:w-36 lg:h-36 md:w-36 md:h-36 h-24 w-28 px-2 -translate-y-1/2 lg:left-6 md:left-6"
              >
                <Image src={card} alt="Card" />
              </div>

              <div
                ref={(el) => (smallImagesRef.current[1] = el)}
                className="absolute z-30 lg:top-1/2 top-[80%] md:top-1/2 -left-46 lg:w-36 lg:h-36 md:w-36 md:h-36 h-24 w-28 px-2 -translate-y-1/2 lg:left-6 md:left-6"
              >
                <Image src={card} alt="Card" />
              </div>

              <div
                ref={(el) => (smallImagesRef.current[2] = el)}
                className="absolute z-30 top-1/2 lg:bottom-10 md:bottom-10 lg:w-36 lg:h-36 md:w-36 md:h-36 h-24 w-28 px-2 -translate-y-1/2 lg:left-6 md:left-6 -left-46"
              >
                <Image src={card} alt="Card" />
              </div>

              <div
                ref={(el) => (smallImagesRef.current[3] = el)}
                className="absolute z-30 lg:top-1/2 md:top-1/2 top-1/4 lg:w-36 lg:h-36 md:w-36 md:h-36 h-24 w-28 px-2 -translate-y-1/2 lg:right-6 md:right-6 -right-46"
              >
                <Image src={card} alt="Card" />
              </div>

              <div
                ref={(el) => (smallImagesRef.current[4] = el)}
                className="absolute z-30 lg:top-1/2 md:top-1/2 top-[80%] lg:w-36 lg:h-36 md:w-36 md:h-36 h-24 w-28 px-2 -translate-y-1/2 lg:right-6 md:right-6 -right-46"
              >
                <Image src={card} alt="Card" />
              </div>

              <div
                ref={(el) => (smallImagesRef.current[5] = el)}
                className="absolute z-30 lg:bottom-4 md:bottom-4 top-1/2 lg:w-36 lg:h-36 md:w-36 md:h-36 h-24 w-28 px-2 -translate-y-1/2 lg:right-6 md:right-6 -right-46"
              >
                <Image src={card} alt="Card" />
              </div>

              <div
                ref={mainImageRef}
                className="main-image lg:relative md:relative max-[900px]:h-[60vh] lg:z-40 md:z-40"
              >
                <Image src={phone} className="h-full w-auto" alt="Phone" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={containerRef}
        className="container mx-auto px-6 max-[900px]:px-1  min-h-screen flex items-center justify-center py-28"
      >
        <div
          ref={headlineRef}
          className="text-center lg:max-w-4xl z-20 relative px-2"
        >
          <h2 className="intro-headline">
            <span className="whitespace-nowrap">
              All that you need to stay organised
            </span>
            <br />
            and on-top of your game
          </h2>
          <p className="intro-subline">
            We understand the unique challenges that SMEs face, which is why
            we&apos;ve developed a suite of tools to help you manage your
            business.
          </p>
        </div>

        {/* Cards */}
        {(() => {
          const initialPositions = [
            { top: "260px", left: "-240px" },
            { top: "-280px", right: "-10px" },
            { bottom: "-260px", left: "5px" },
            { top: "-280px", left: "70px" },
            { bottom: "-270px", right: "-100px" },
            { top: "300px", right: "-240px" },
          ];

          const features = [
            {
              icon: FaBoxes,
              title: "Stock inventory",
              description:
                "Keep track of your stock levels and see what's selling fast and slow with our real-time inventory management system.",
              bg: "linear-gradient(135deg, var(--wash-cream) 0%, #f0e0a8 100%)",
              tone: "light",
            },
            {
              icon: FaChartLine,
              title: "Sales and Expenses",
              description:
                "Our platform makes it easy to track your sales and expenses, so you can see exactly how your business is performing at any given time.",
              bg: "linear-gradient(135deg, var(--color-primary) 0%, #1a1a24 100%)",
              tone: "dark",
            },
            {
              icon: FaHandHoldingUsd,
              title: "Debt collection",
              description:
                "We've built powerful tools to help you collect outstanding debts from your customers, so you can keep your cash flow healthy and your business growing.",
              bg: "linear-gradient(135deg, var(--wash-peach) 0%, #f4c5a8 100%)",
              tone: "light",
            },
            {
              icon: FaUsers,
              title: "Customer management",
              description:
                "Keep all your customer information in one place, so you can easily communicate with them and build long-lasting relationships.",
              bg: "linear-gradient(135deg, #3a2f1a 0%, #2a2010 100%)",
              tone: "dark",
            },
            {
              icon: FaGlobe,
              title: "Cross-border payments",
              description:
                "Send and receive money in 30+ countries at fair rates. Hold TZS, pay suppliers in USD, CNY, or INR, all from one app.",
              bg: "linear-gradient(135deg, var(--wash-lavender) 0%, #d8cef0 100%)",
              tone: "light",
            },
            {
              icon: FaCoins,
              title: "Smart loans",
              description:
                "Your daily transactions build a credit profile that unlocks working-capital loans from our lending partners: fast, fair, and tailored to your business.",
              bg: "linear-gradient(135deg, #2a2546 0%, #1a1530 100%)",
              tone: "dark",
            },
          ];

          return features.map((feature, i) => {
            const Icon = feature.icon;
            const isDark = feature.tone === "dark";
            const zIndex = i === 3 ? 100 : 90;

            return (
              <div
                key={feature.title}
                ref={(el) => (cardsRef.current[i] = el)}
                className={`intro-card absolute max-[900px]:w-44 max-[900px]:h-44 w-64 h-64 rounded-2xl overflow-hidden shadow-sm ${i === 1 ? "max-[768px]:hidden" : ""}`}
                style={{
                  ...initialPositions[i],
                  zIndex,
                  background: feature.bg,
                  color: isDark ? "#fff" : "var(--color-primary)",
                }}
              >
                <div className="relative w-full h-full p-5 max-[900px]:p-4 flex flex-col justify-between">
                  <div
                    className="w-10 h-10 max-[900px]:w-8 max-[900px]:h-8 rounded-lg flex items-center justify-center"
                    style={{
                      background: isDark
                        ? "rgba(255,255,255,0.12)"
                        : "rgba(14,14,16,0.08)",
                    }}
                  >
                    <Icon className="text-base max-[900px]:text-sm" />
                  </div>
                  <div>
                    <h3 className="text-[1rem] max-[900px]:text-[0.85rem] font-semibold mb-1.5 leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-[0.78rem] max-[900px]:text-[0.7rem] leading-snug opacity-80">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          });
        })()}
      </div>
    </section>
  );
}
