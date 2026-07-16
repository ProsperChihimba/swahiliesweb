"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ShieldCheck, ChevronRight, Store, Boxes, Ship, Container } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const NARRATIVE = [
  {
    eyebrow: "What we do",
    body: "We help businesses collect payments, pay suppliers across borders, and automate accounting and bookkeeping from a single platform. By combining financial infrastructure with business management tools, we make it easier for businesses to move money, stay financially organized, and grow.",
  },
  {
    eyebrow: "Why it matters",
    body: "Our products are designed for the realities of doing business in Africa, where businesses often rely on multiple providers to accept payments, make international transfers, manage records, and reconcile transactions. Swahilies brings these capabilities together in one seamless experience, reducing complexity and giving businesses greater visibility and control over their finances.",
  },
  {
    eyebrow: "Who we serve",
    body: "From retailers and wholesalers to importers and exporters, businesses use Swahilies to manage their financial operations with confidence. As they grow, our platform grows with them by providing the infrastructure needed to operate both locally and globally.",
  },
];

const SEGMENTS = [
  { Icon: Store, iconSrc: "/assets/icons/retailers.png", label: "Retailers" },
  { Icon: Boxes, iconSrc: "/assets/icons/wholesellers.png", label: "Wholesalers" },
  { Icon: Ship, iconSrc: "/assets/icons/fright.png", label: "Importers" },
  { Icon: Container, iconSrc: "/assets/icons/exporters.png", label: "Exporters" },
];

// One accent per row, echoing the tri-color wash used across the
// Payments crossfade panels, so each row reads as its own beat.
const ROW_ACCENTS = ["var(--color-accent)", "var(--color-secondary)", "var(--color-success)"];

export default function AboutPage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".about-hero-fade > *", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.15,
      });

      gsap.utils.toArray<HTMLElement>(".about-fade-group").forEach((group) => {
        gsap.from(group.querySelectorAll(".about-fade"), {
          scrollTrigger: { trigger: group, start: "top 78%" },
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
        });
      });

      // Narrative rows: pin the whole section on desktop and reveal the
      // three rows one at a time as you scroll through the pin — row 1's
      // hairline draws in, its title slides in, then its paragraph opens;
      // the timeline holds, then moves on to row 2, then row 3. Mobile
      // skips the pin (no room to spare) and just reveals each row as it
      // scrolls into view, in the same order, unpinned.
      const mm = gsap.matchMedia();

      mm.add("(min-width: 901px)", () => {
        const section = narrativeRef.current;
        const rows = gsap.utils.toArray<HTMLElement>(".about-row", section ?? undefined);
        if (!rows.length) return;

        rows.forEach((row) => {
          const rule = row.querySelector<HTMLElement>(".about-row-rule");
          const title = row.querySelector<HTMLElement>(".about-row-title");
          const desc = row.querySelector<HTMLElement>(".about-row-desc");
          if (rule) gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });
          if (title) gsap.set(title, { x: -30, opacity: 0 });
          if (desc) gsap.set(desc, { height: 0, opacity: 0 });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${820 * rows.length}`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        rows.forEach((row) => {
          const rule = row.querySelector<HTMLElement>(".about-row-rule");
          const title = row.querySelector<HTMLElement>(".about-row-title");
          const desc = row.querySelector<HTMLElement>(".about-row-desc");

          if (rule) tl.to(rule, { scaleX: 1, duration: 0.5, ease: "power2.out" });
          if (title) tl.to(title, { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "<0.1");
          if (desc) {
            tl.to(
              desc,
              { height: desc.scrollHeight, opacity: 1, duration: 0.6, ease: "power2.out" },
              "<0.2",
            );
          }
          tl.to({}, { duration: 0.45 }); // hold on this row before moving to the next
        });

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      mm.add("(max-width: 900px)", () => {
        const section = narrativeRef.current;
        const rows = gsap.utils.toArray<HTMLElement>(".about-row", section ?? undefined);

        rows.forEach((row) => {
          const rule = row.querySelector<HTMLElement>(".about-row-rule");
          const title = row.querySelector<HTMLElement>(".about-row-title");
          const desc = row.querySelector<HTMLElement>(".about-row-desc");
          if (rule) gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });
          if (title) gsap.set(title, { x: -20, opacity: 0 });
          if (!desc) return;
          gsap.set(desc, { height: 0, opacity: 0 });

          ScrollTrigger.create({
            trigger: row,
            start: "top 75%",
            onEnter: () => {
              if (rule) gsap.to(rule, { scaleX: 1, duration: 0.5, ease: "power2.out" });
              if (title) gsap.to(title, { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
              gsap.to(desc, {
                height: desc.scrollHeight,
                opacity: 1,
                duration: 0.6,
                ease: "power2.out",
              });
            },
          });
        });
      });

      ScrollTrigger.refresh();

      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
        mm.revert();
      };
    },
    { scope: mainRef },
  );

  return (
    <main className="overflow-x-hidden" ref={mainRef}>
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center mesh-gradient relative overflow-hidden px-3 sm:px-4 lg:px-6 pt-32 pb-20">
        <div className="about-hero-fade relative z-10 max-w-4xl mx-auto text-center">
          <span
            className="inline-flex items-center gap-2.5 mb-6 text-[0.72rem] uppercase tracking-[0.28em] font-semibold"
            style={{ color: "var(--color-muted)" }}
          >
            <span className="h-px w-8" style={{ background: "var(--color-accent)" }} aria-hidden="true" />
            About Swahilies
            <span className="h-px w-8" style={{ background: "var(--color-accent)" }} aria-hidden="true" />
          </span>
          <h1
            className="hero-display hero-display-bold text-[clamp(2.8rem,6.5vw,5.4rem)] leading-[1.05] tracking-[-0.02em] mb-6"
            style={{ color: "var(--color-primary)" }}
          >
            We're building Africa's financial operating system.
          </h1>
          <p
            className="text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: "var(--color-muted)" }}
          >
            We combine financial infrastructure with business management
            tools, so businesses can move money, stay organized, and grow
            from one platform.
          </p>
        </div>
      </section>

      {/* Narrative — narrow title column (forced to wrap onto two lines)
          on the left, paragraph detail on the right. Pinned on desktop:
          scrolling through this section reveals row 1, then row 2, then
          row 3, each with its own accent-colored hairline drawing in
          before the title slides in and the paragraph opens. */}
      <section
        ref={narrativeRef}
        className="min-h-screen flex items-center py-16 max-[900px]:py-6 max-[900px]:min-h-0"
        style={{ background: "var(--color-bg)" }}
      >
        <div className="mx-auto max-w-5xl w-full px-6">
          {NARRATIVE.map((section, i) => (
            <div
              key={section.eyebrow}
              className="about-row border-b"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div className="py-10 max-[900px]:py-7 grid grid-cols-[18rem_1fr] gap-16 items-start max-[900px]:grid-cols-1 max-[900px]:gap-6">
                <div>
                  <span
                    className="about-row-rule block h-[3px] w-16 rounded-full mb-4"
                    style={{ background: ROW_ACCENTS[i % ROW_ACCENTS.length] }}
                    aria-hidden="true"
                  />
                  <h3
                    className="about-row-title text-[clamp(2.6rem,5.2vw,4.2rem)] font-black uppercase tracking-tight leading-[1.02]"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {section.eyebrow}
                  </h3>
                </div>

                <div className="about-row-desc overflow-hidden">
                  <p
                    className="pb-2 max-w-lg text-[0.92rem] sm:text-[0.98rem] leading-relaxed"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {section.body}
                  </p>

                  {/* Segment chips — only on the "Who we serve" row */}
                  {section.eyebrow === "Who we serve" && (
                    <div className="pb-2 pt-2 flex flex-wrap gap-3">
                      {SEGMENTS.map(({ Icon, iconSrc, label }) => (
                        <div
                          key={label}
                          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.8rem] font-medium"
                          style={{ borderColor: "var(--color-border)", color: "var(--color-primary)" }}
                        >
                          {iconSrc ? (
                            <img src={iconSrc} alt="" className="h-4 w-4 object-contain" aria-hidden="true" />
                          ) : (
                            <Icon className="h-4 w-4" strokeWidth={2} style={{ color: "var(--color-accent)" }} />
                          )}
                          {label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Compliance / trust callout */}
      <section className="about-fade-group py-16 max-[900px]:py-12" style={{ background: "var(--color-bg)" }}>
        <div className="mx-auto max-w-4xl px-6">
          <div
            className="about-fade flex items-start gap-4 rounded-2xl p-7 max-[600px]:flex-col"
            style={{
              background: "rgba(255, 255, 255, 0.7)",
              border: "1px solid var(--color-border)",
            }}
          >
            <span
              className="inline-flex items-center justify-center w-12 h-12 rounded-xl shrink-0"
              style={{ background: "var(--wash-lavender)", color: "var(--color-primary)" }}
            >
              <ShieldCheck className="h-6 w-6" strokeWidth={2} />
            </span>
            <p className="text-[1.02rem] leading-relaxed" style={{ color: "var(--color-primary)" }}>
              Swahilies is licensed by the Bank of Tanzania and works with
              licensed financial institutions to deliver secure, compliant,
              and reliable financial services.
            </p>
          </div>
        </div>
      </section>

      {/* Mission close — dark, manifesto-style, matches the Developers section's dark treatment */}
      <section
        className="about-fade-group relative overflow-hidden py-24 max-[900px]:py-16"
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

        {/* Oversized watermark of the mission icon, bleeding off the
            right edge — pure background texture, inverted to white since
            the source art is black line-work. */}
        <img
          src="/assets/icons/mission.png"
          alt=""
          aria-hidden="true"
          className="absolute -right-16 -bottom-16 w-[26rem] h-[26rem] max-[900px]:w-72 max-[900px]:h-72 pointer-events-none select-none"
          style={{ filter: "invert(1) brightness(1.6)", opacity: 0.1 }}
        />

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <span
            className="about-fade inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}
          >
            <img
              src="/assets/icons/mission.png"
              alt=""
              aria-hidden="true"
              className="h-7 w-7"
              style={{ filter: "invert(1) brightness(1.8)" }}
            />
          </span>
          <span
            className="about-fade block mb-6 text-[0.72rem] uppercase tracking-[0.28em] font-semibold text-white/60"
          >
            Our mission
          </span>
          <p className="about-fade text-[clamp(1.5rem,3.2vw,2.4rem)] font-semibold leading-[1.2] tracking-[-0.01em] mb-10">
            To build financial infrastructure that enables African
            businesses to participate in the global economy. Every
            business, regardless of its size or location, should have
            access to world class financial tools.
          </p>

          <a
            href="/contact"
            className="about-fade group inline-flex items-center gap-3 pl-6 pr-1.5 py-1.5 rounded-full hover:opacity-95 transition-opacity"
            style={{ background: "var(--color-accent)", color: "var(--color-primary)" }}
          >
            <span className="text-[0.95rem] font-semibold tracking-tight">Talk to us</span>
            <span
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/40 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={2.5} style={{ color: "var(--color-primary)" }} />
            </span>
          </a>
        </div>
      </section>
    </main>
  );
}
