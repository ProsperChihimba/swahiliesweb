"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { X } from "lucide-react";
import { HiOutlineBars2 } from "react-icons/hi2";
import Image from "next/image";
import logo from "../../public/assets/images/logo.png";
import { useGSAP } from "@gsap/react";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("antd").then((mod) => mod.Select), {
  ssr: false,
});

const languageOptions = [
  { label: "EN", value: "en" },
  { label: "FR", value: "fr" },
  { label: "ES", value: "es" },
];

const navItems = [
  { label: "Business", href: "/business" },
  { label: "Cards", href: "/cards" },
  { label: "Contact", href: "/contact" },
];

export default function NavBar() {
  const headerRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState(languageOptions[0].value);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useGSAP(
    () => {
      const headerEl = headerRef.current;
      if (!headerEl) return;

      gsap.set(headerEl, { opacity: 1 });

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) return;

      const tween = gsap.from(headerEl, {
        y: -30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.15,
      });

      return () => tween.kill();
    },
    { scope: headerRef },
  );

  return (
    <header
      ref={headerRef}
      className="fixed top-3 left-0 right-0 z-50 px-3 sm:px-6 max-[768px]:top-2"
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full pl-5 pr-2 py-2 transition-all duration-300 max-[768px]:pl-3 ${
          isScrolled ? "shadow-[0_8px_30px_rgba(14,14,16,0.08)]" : "shadow-sm"
        }`}
        style={{
          background: isScrolled
            ? "rgba(255, 255, 255, 0.92)"
            : "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(18px) saturate(180%)",
          WebkitBackdropFilter: "blur(18px) saturate(180%)",
          border: "1px solid var(--color-border)",
        }}
      >
        {/* Logo */}
        <a
          href="/"
          className="flex items-center shrink-0 pl-1"
          aria-label="Swahilies home"
        >
          <Image src={logo} alt="Swahilies" priority className="h-6 w-auto" />
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="px-4 py-2 text-[0.78rem] font-medium tracking-[0.16em] uppercase rounded-full transition-colors hover:bg-black/5"
                style={{ color: "var(--color-primary)" }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-2">
          <Select
            value={language}
            onChange={setLanguage}
            aria-label="Language"
            variant="borderless"
            className="glass-select"
            style={{ width: 64, background: "transparent" }}
            options={languageOptions}
          />
          <a
            href="/contact"
            className="inline-flex items-center px-5 py-2.5 text-[0.78rem] font-semibold tracking-[0.14em] uppercase rounded-full text-white hover:opacity-90 transition-opacity"
            style={{ background: "var(--color-primary)" }}
          >
            Open account
          </a>
        </div>

        {/* Mobile right side */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href="/contact"
            className="px-3.5 py-2 text-[0.65rem] font-semibold tracking-[0.14em] uppercase rounded-full text-white"
            style={{ background: "var(--color-primary)" }}
          >
            Open account
          </a>
          <button
            type="button"
            className="h-9 w-9 flex items-center justify-center rounded-full transition-colors"
            style={{ background: "rgba(14, 14, 16, 0.06)" }}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
          >
            <HiOutlineBars2 style={{ color: "var(--color-primary)" }} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div
          className="absolute inset-0"
          style={{ background: "rgba(14, 14, 16, 0.6)", backdropFilter: "blur(6px)" }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute inset-x-3 top-3 rounded-3xl overflow-hidden transform transition-transform duration-500 ${
            isMobileMenuOpen ? "translate-y-0" : "-translate-y-[110%]"
          }`}
          style={{
            background: "var(--color-bg)",
            color: "var(--color-primary)",
            border: "1px solid var(--color-border)",
          }}
        >
          <div className="px-6 pt-6 pb-8 flex flex-col">
            <div className="flex items-center justify-between">
              <Image
                src={logo}
                alt="Swahilies"
                priority
                className="h-6 w-auto"
              />
              <button
                type="button"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-black/5"
                style={{ border: "1px solid var(--color-border)" }}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-8">
              <div
                className="text-[0.65rem] uppercase tracking-[0.3em] mb-4"
                style={{ color: "var(--color-muted)" }}
              >
                Menu
              </div>
              <nav className="flex flex-col">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="py-3 text-[1.4rem] font-semibold tracking-tight border-b transition-colors hover:opacity-70"
                    style={{ borderColor: "var(--color-border)" }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            <a
              href="/contact"
              className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-full text-white font-semibold text-sm tracking-[0.16em] uppercase hover:opacity-90 transition-opacity"
              style={{ background: "var(--color-primary)" }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Open account
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
