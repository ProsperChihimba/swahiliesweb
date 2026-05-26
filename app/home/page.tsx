"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Hero from "../components/Hero";
import Services from "../components/Services";
import VirtualCard from "../components/VirtualCard";
import Traction from "../components/Traction";
import BuiltFor from "../components/BuiltFor";
import Comparison from "../components/Comparison";
import Intro from "../components/Intro";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HomeContent() {
  const mainRef = useRef<HTMLDivElement>(null);
  const heroPinRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const heroPinEl = heroPinRef.current;
    const introEl = introRef.current;

    const mm = gsap.matchMedia();

    if (heroPinEl && introEl) {
      const createHeroPin = () =>
        ScrollTrigger.create({
          trigger: heroPinEl,
          start: "top top",
          endTrigger: introEl,
          end: "bottom top",
          pin: heroPinEl,
          pinSpacing: false,
          anticipatePin: 1,
        });

      mm.add("(min-width: 901px)", () => createHeroPin());
      mm.add("(max-width: 900px)", () => createHeroPin());
    }

    ScrollTrigger.refresh();

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, { scope: mainRef });

  return (
    <div ref={mainRef}>
      <div className="hero-intro-wrap">
        <div ref={heroPinRef}>
          <Hero />
        </div>
        <div ref={introRef}>
          <Intro />
        </div>
      </div>
      <Services />
      <Traction />
      <VirtualCard />
      <BuiltFor />
      <Comparison />
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <HomeContent />
    </main>
  );
}
