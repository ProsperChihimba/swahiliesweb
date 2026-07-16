"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Traction() {
  const titleRef = useRef(null);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardOneRef = useRef(null);
  const cardTwoRef = useRef(null);
  const cardThreeRef = useRef(null);
  const cardFourRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.set(titleRef.current, { opacity: "1" });
        gsap.set(
          [
            cardOneRef.current,
            cardTwoRef.current,
            cardThreeRef.current,
            cardFourRef.current,
          ],
          { bottom: "-120px", top: "auto" },
        );

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=1000",
            scrub: true,
            pin: true,
            anticipatePin: 1,
          },
        });

        timeline.to(
          cardOneRef.current,
          {
            top: "-80px",
            duration: 2,
          },
          "-=1",
        );

        timeline.to(
          titleRef.current,
          {
            opacity: "0",
            duration: 7,
          },
          "-=1",
        );
        timeline.to(
          cardTwoRef.current,
          {
            top: "-80px",
            duration: 2,
          },
          "-=7",
        );

        timeline.to(
          cardThreeRef.current,
          {
            top: "-80px",
            duration: 2,
          },
          "-=6",
        );

        timeline.to(
          cardFourRef.current,
          {
            top: "-80px",
            duration: 2,
          },
          "-=5",
        );

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      });

      mm.add("(max-width: 767px)", () => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        gsap.set(titleRef.current, { opacity: "1" });
        gsap.set(
          [
            cardOneRef.current,
            cardTwoRef.current,
            cardThreeRef.current,
            cardFourRef.current,
          ],
          { clearProps: "top,bottom" },
        );

        const slider = track.parentElement;
        if (!slider) return;

        const getScrollAmount = () => {
          const amount = track.scrollWidth - slider.clientWidth +20;
          return Math.max(0, amount);
        };

        if (getScrollAmount() <= 0) return;

        const moveTween = gsap.to(track, {
          x: () => `-${getScrollAmount()}px`,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getScrollAmount()}px`,
            scrub: true,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        const handleLoad = () => ScrollTrigger.refresh();

        const resizeObserver = new ResizeObserver(() => {
          ScrollTrigger.refresh();
        });

        resizeObserver.observe(track);
        resizeObserver.observe(slider);

        if (document.readyState === "complete") {
          handleLoad();
        } else {
          window.addEventListener("load", handleLoad);
        }

        return () => {
          window.removeEventListener("load", handleLoad);
          resizeObserver.disconnect();
          moveTween.scrollTrigger?.kill();
          moveTween.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 lg:min-h-[110vh] max-[767px]:min-h-[100vh] max-[767px]:pt-36 max-[767px]:pb-0"
      style={{
        background:
          "linear-gradient(135deg, var(--wash-cream) 0%, var(--wash-lavender) 100%)",
      }}
    >
      <div
        ref={titleRef}
        className="text-center text-[clamp(3rem,11vw,10rem)] font-semibold tracking-[-0.02em] pointer-events-none select-none"
        style={{ color: "rgba(14, 14, 16, 0.18)" }}
      >
        Traction to-date
      </div>

      <div className="mx-auto w-full z-50">
        <div className="max-[767px]:overflow-hidden">
          <div className="left-1/2 -translate-x-1/2 w-full md:absolute max-w-[1200px] mx-auto max-[767px]:static max-[767px]:translate-x-0 max-[767px]:mt-8">
            <div className="max-[767px]:overflow-hidden md:block">
              <div
                ref={trackRef}
                className="relative max-[767px]:flex max-[767px]:flex-row max-[767px]:flex-nowrap max-[767px]:gap-4 max-[767px]:pr-3 max-[767px]:pl-3 md:min-h-[520px] lg:min-h-[560px]"
              >
                <div
                  ref={cardOneRef}
                  className="reason-card md:absolute md:left-0 lg:left-4 border rounded-[14px] p-6 min-h-[320px] max-h-[400px] flex flex-col gap-4 shadow-[0_20px_50px_rgba(14,14,16,0.10)] max-[767px]:flex-none max-[767px]:w-[76vw] sm:max-[767px]:w-[60vw] md:w-[260px] lg:w-[280px]"
                  style={{
                    background: "var(--wash-cream)",
                    borderColor: "rgba(14,14,16,0.10)",
                  }}
                >
                  <div>
                    <h3
                      className="text-[44px] font-bold leading-none mb-1"
                      style={{ color: "var(--color-primary)" }}
                    >
                      12,000
                    </h3>
                    <p
                      className="text-[1.1rem] font-semibold"
                      style={{ color: "var(--color-primary)" }}
                    >
                      Monthly Active Users
                    </p>
                  </div>

                  <p
                    className="text-[0.9rem] leading-[1.5] mt-auto"
                    style={{ color: "var(--color-muted)" }}
                  >
                    SMEs across Tanzania use Swahilies daily for sales, stock,
                    and customer tracking.
                  </p>
                </div>

                <div
                  ref={cardTwoRef}
                  className="reason-card md:absolute md:left-[25%] lg:left-[26%] border rounded-[14px] p-6 min-h-[320px] max-h-[400px] flex flex-col gap-4 shadow-[0_20px_50px_rgba(14,14,16,0.10)] max-[767px]:flex-none max-[767px]:w-[76vw] sm:max-[767px]:w-[60vw] md:w-[260px] lg:w-[280px]"
                  style={{
                    background: "#E4F5EC",
                    borderColor: "rgba(14,14,16,0.10)",
                  }}
                >
                  <div>
                    <h3
                      className="text-[44px] font-bold leading-none mb-1"
                      style={{ color: "var(--color-primary)" }}
                    >
                      1,100
                    </h3>
                    <p
                      className="text-[1.1rem] font-semibold"
                      style={{ color: "var(--color-primary)" }}
                    >
                      Paying SMEs
                    </p>
                  </div>

                  <p
                    className="text-[0.9rem] leading-[1.5] mt-auto"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Businesses that pay every month for bookkeeping, sales,
                    and payment features.
                  </p>
                </div>

                <div
                  ref={cardThreeRef}
                  className="reason-card md:absolute md:right-[25%] lg:right-[26%] border rounded-[14px] p-6 min-h-[320px] max-h-[400px] flex flex-col gap-4 shadow-[0_20px_50px_rgba(14,14,16,0.10)] max-[767px]:flex-none max-[767px]:w-[76vw] sm:max-[767px]:w-[60vw] md:w-[260px] lg:w-[280px]"
                  style={{
                    background: "var(--wash-lavender)",
                    borderColor: "rgba(14,14,16,0.10)",
                  }}
                >
                  <div>
                    <h3
                      className="text-[44px] font-bold leading-none mb-1"
                      style={{ color: "var(--color-primary)" }}
                    >
                      $500K
                    </h3>
                    <p
                      className="text-[1.1rem] font-semibold"
                      style={{ color: "var(--color-primary)" }}
                    >
                      Processed (last 4 months)
                    </p>
                  </div>

                  <p
                    className="text-[0.9rem] leading-[1.5] mt-auto"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Real money moving through Swahilies: customer payments,
                    supplier bills, and cross-border transfers.
                  </p>
                </div>

                <div
                  ref={cardFourRef}
                  className="reason-card md:absolute md:right-0 lg:right-4 border rounded-[14px] p-6 min-h-[320px] max-h-[400px] flex flex-col gap-4 shadow-[0_20px_50px_rgba(14,14,16,0.10)] max-[767px]:flex-none max-[767px]:w-[76vw] sm:max-[767px]:w-[60vw] md:w-[260px] lg:w-[280px]"
                  style={{
                    background: "var(--wash-lavender)",
                    borderColor: "rgba(14,14,16,0.10)",
                  }}
                >
                  <div>
                    <h3
                      className="text-[44px] font-bold leading-none mb-1"
                      style={{ color: "var(--color-primary)" }}
                    >
                      $10K
                    </h3>
                    <p
                      className="text-[1.1rem] font-semibold"
                      style={{ color: "var(--color-primary)" }}
                    >
                      Monthly revenue
                    </p>
                  </div>

                  <p
                    className="text-[0.9rem] leading-[1.5] mt-auto"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Recurring revenue from SaaS plans, FX margin, and
                    transaction fees. Sustainable operations, not a runway
                    burn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-30 mt-12 max-[767px]:mt-8 px-6 max-w-3xl mx-auto text-center">
        <p
          className="text-base sm:text-lg font-medium"
          style={{ color: "var(--color-primary)" }}
        >
          <span
            className="inline-flex items-center justify-center w-7 h-7 rounded-full mr-3 align-middle"
            style={{ background: "var(--color-accent)", color: "var(--color-primary)" }}
          >
            →
          </span>
          5,000+ SMEs on the waitlist for cross-border payments &amp; lending.
        </p>
      </div>
    </section>
  );
}
