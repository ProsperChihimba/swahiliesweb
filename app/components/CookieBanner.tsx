"use client";

import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "swahilies-cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Defer one tick so the slide-in feels intentional
        const id = window.setTimeout(() => setVisible(true), 600);
        return () => window.clearTimeout(id);
      }
    } catch {
      // localStorage unavailable (e.g. private browsing) — show banner anyway
      setVisible(true);
    }
  }, []);

  const persist = (value: "accepted" | "dismissed") => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 z-[60] flex justify-center pointer-events-none animate-cookie-in"
    >
      <div
        className="pointer-events-auto w-full max-w-6xl rounded-full pl-6 pr-2 py-2 max-[768px]:px-4 max-[768px]:py-4 max-[768px]:rounded-2xl flex items-center gap-4 max-[768px]:flex-col max-[768px]:items-stretch"
        style={{
          background: "var(--color-primary)",
          color: "#fff",
          boxShadow: "0 18px 40px rgba(14, 14, 16, 0.18)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        {/* Icon */}
        <div
          className="inline-flex items-center justify-center w-10 h-10 rounded-xl shrink-0 max-[768px]:hidden"
          style={{ background: "rgba(255, 255, 255, 0.12)" }}
          aria-hidden="true"
        >
          <Cookie className="h-5 w-5" strokeWidth={2} />
        </div>

        {/* Copy */}
        <div className="flex-1 min-w-0">
          <p className="text-[0.9rem] leading-relaxed text-white/85 max-[768px]:text-[0.85rem]">
            We use cookies to improve and customize your experience on our
            site. If you accept, we&apos;ll also use marketing cookies to show
            you personalized ads.{" "}
            <a
              href="/contact"
              className="underline underline-offset-2 hover:text-white transition-colors"
            >
              Manage your cookies
            </a>
            .
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0 max-[768px]:w-full max-[768px]:gap-3">
          <button
            type="button"
            onClick={() => persist("accepted")}
            className="inline-flex items-center px-5 py-2.5 text-[0.78rem] font-semibold tracking-[0.14em] uppercase rounded-full hover:opacity-90 transition-opacity max-[768px]:flex-1 max-[768px]:justify-center"
            style={{
              background: "var(--color-accent)",
              color: "var(--color-primary)",
            }}
          >
            Yes, I accept
          </button>
          <button
            type="button"
            onClick={() => persist("dismissed")}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors hover:bg-white/10 shrink-0"
            style={{ border: "1px solid rgba(255, 255, 255, 0.15)" }}
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
