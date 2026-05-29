"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Hero from "../components/Hero";
import VirtualCard from "../components/VirtualCard";
import BuiltFor from "../components/BuiltFor";
import Intro from "../components/Intro";
import Testimonials from "../components/Testimonials";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HomeContent() {
  const mainRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, { scope: mainRef });

  return (
    <div ref={mainRef}>
      <div className="hero-intro-wrap">
        <Hero />
        <Intro />
      </div>
      <VirtualCard />
      <BuiltFor />
      <Testimonials />
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
