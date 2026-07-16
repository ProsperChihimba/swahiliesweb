"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Hero from "../components/Hero";
import Developers from "../components/Developers";
import KuzaBusiness from "../components/KuzaBusiness";

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
      <Hero />
      <Developers />
      <KuzaBusiness />
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
