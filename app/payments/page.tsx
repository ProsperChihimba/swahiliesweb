"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Payments from "../components/Payments";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PaymentsPage() {
  const mainRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, { scope: mainRef });

  return (
    <main className="overflow-x-hidden">
      <div ref={mainRef}>
        <Payments />
      </div>
    </main>
  );
}
