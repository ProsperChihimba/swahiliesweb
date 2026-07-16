"use client";

import { FaApple, FaGooglePlay } from "react-icons/fa";
import VirtualCard from "../components/VirtualCard";
import { APP_STORE_URL, PLAY_STORE_URL } from "../lib/storeLinks";

export default function CardsPage() {
  return (
    <main className="overflow-x-hidden">
      <section
        className="relative pt-32 pb-12 px-6 max-w-6xl mx-auto"
        style={{ color: "var(--color-primary)" }}
      >
        <div className="max-w-3xl">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] mb-6"
            style={{
              background: "var(--wash-lavender)",
              color: "var(--color-primary)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "var(--color-accent)" }}
            />
            How it works
          </div>
          <h1 className="text-[clamp(2.4rem,6vw,4rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
            One app. Three jobs. Built for African SMEs.
          </h1>
          <p
            className="mt-5 text-base sm:text-lg leading-relaxed max-w-2xl"
            style={{ color: "var(--color-muted)" }}
          >
            Swahilies is a single tool for the three jobs every African SME
            does every day: running the business, moving money in and out,
            and getting access to credit. Here's how each piece works.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-md text-white px-5 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
              style={{ background: "var(--color-primary)" }}
            >
              <FaApple className="text-xl" />
              <span className="flex flex-col items-start leading-tight">
                <span className="text-[0.65rem] font-medium opacity-80">
                  Download on the
                </span>
                <span>App Store</span>
              </span>
            </a>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-md text-white px-5 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
              style={{ background: "var(--color-primary)" }}
            >
              <FaGooglePlay className="text-xl" />
              <span className="flex flex-col items-start leading-tight">
                <span className="text-[0.65rem] font-medium opacity-80">
                  Get it on
                </span>
                <span>Google Play</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      <VirtualCard />
    </main>
  );
}
