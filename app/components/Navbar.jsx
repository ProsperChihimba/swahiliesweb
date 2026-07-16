"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { X, ChevronRight, Wallet, BarChart2 } from "lucide-react";
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
  { label: "Home", href: "/" },
  {
    label: "Products",
    href: "/payments",
    children: [
      {
        label: "Payments",
        href: "/payments",
        description: "Collect, move, and settle money across every African rail.",
        Icon: Wallet,
      },
      {
        label: "Kuza Business",
        href: "/business",
        description: "Track sales, stock, and debts for your shop in one app.",
        Icon: BarChart2,
        iconSrc: "/assets/icons/kuza-business.png",
      },
    ],
  },
  { label: "Developers", href: "/#developers" },
  { label: "About us", href: "/about" },
  { label: "Contact us", href: "/contact" },
];

// Mobile menu stays a flat list — a hover dropdown doesn't translate to
// touch, so Payments/Kuza Business are just their own rows there.
const mobileNavItems = [
  { label: "Home", href: "/" },
  { label: "Payments", href: "/payments" },
  { label: "Kuza Business", href: "/business" },
  { label: "Developers", href: "/#developers" },
  { label: "About us", href: "/about" },
  { label: "Contact us", href: "/contact" },
];

export default function NavBar() {
  const headerRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState(languageOptions[0].value);

  useEffect(() => {
    let lastY = window.scrollY;
    const SCROLL_THRESHOLD = 8; // ignore tiny scroll jitters
    const IDLE_HIDE_DELAY = 1500; // hide after this long with no scroll activity
    const PROBE_Y = 48; // point just under the header where we sample the bg tone
    let idleTimer;

    const scheduleIdleHide = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setIsHidden(true), IDLE_HIDE_DELAY);
    };

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;

      setIsScrolled(currentY > 16);

      // Sections that opt into a dark background carry data-nav-tone="dark"
      // so the header can flip to a light-on-dark look while over them.
      const darkSections = document.querySelectorAll('[data-nav-tone="dark"]');
      let overDark = false;
      darkSections.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= PROBE_Y && rect.bottom >= PROBE_Y) {
          overDark = true;
        }
      });
      setIsDarkSection(overDark);

      // At/near the top — always show, and never idle-hide from here; the
      // hide behavior only kicks in once you've actually scrolled down.
      if (currentY <= SCROLL_THRESHOLD) {
        clearTimeout(idleTimer);
        setIsHidden(false);
        lastY = currentY;
        return;
      }

      if (Math.abs(delta) > SCROLL_THRESHOLD) {
        if (delta > 0) {
          // Scrolling down — hide immediately
          setIsHidden(true);
        } else if (delta < 0) {
          // Scrolling up — pop back
          setIsHidden(false);
        }
        lastY = currentY;
      }

      // Scrolling has stopped away from the top — hide after a beat.
      scheduleIdleHide();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearTimeout(idleTimer);
    };
  }, []);

  // The pill inverts against whatever section it's floating over: a dark
  // section gets a white pill, a light section gets a dark pill (once
  // scrolled). Foreground colors follow from the pill's own tone.
  const pillIsDark = !isDarkSection && isScrolled;
  const navFg = pillIsDark ? "#FFFFFF" : "var(--color-primary)";

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
        y: -24,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.15,
      });

      return () => tween.kill();
    },
    { scope: headerRef },
  );

  // The hide/show behavior below owns the header's transform directly
  // through GSAP (instead of toggling a Tailwind translate class) so there
  // is only ever one thing writing to this element's transform, ever —
  // the entrance tween above and this both go through GSAP, so neither
  // can silently clobber the other the way an inline style vs. a CSS
  // class would.
  const skipFirstHideRun = useRef(true);
  useEffect(() => {
    // Skip the very first run — the header is already visible on mount and
    // the separate entrance tween above is handling that reveal; running
    // this too would just fight it over the same transform for no reason.
    if (skipFirstHideRun.current) {
      skipFirstHideRun.current = false;
      return;
    }

    const headerEl = headerRef.current;
    if (!headerEl) return;

    gsap.to(headerEl, {
      yPercent: isHidden && !isMobileMenuOpen ? -100 : 0,
      duration: 0.4,
      ease: "power3.out",
      overwrite: "auto",
    });
  }, [isHidden, isMobileMenuOpen]);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <nav
        className="w-full transition-colors duration-300"
        style={{
          background: isDarkSection
            ? "radial-gradient(circle at 12% 0%, var(--wash-lavender), transparent 55%), radial-gradient(circle at 88% 100%, var(--wash-peach), transparent 50%), rgba(255, 255, 255, 0.72)"
            : pillIsDark
              ? "radial-gradient(circle at 12% 0%, rgba(124, 92, 224, 0.28), transparent 55%), radial-gradient(circle at 88% 100%, rgba(240, 160, 32, 0.22), transparent 50%), rgba(14, 14, 16, 0.7)"
              : "transparent",
          backdropFilter: isScrolled || isDarkSection ? "blur(20px) saturate(180%)" : "none",
          WebkitBackdropFilter: isScrolled || isDarkSection ? "blur(20px) saturate(180%)" : "none",
          borderBottom: isDarkSection
            ? "1px solid rgba(14, 14, 16, 0.10)"
            : pillIsDark
              ? "1px solid rgba(255, 255, 255, 0.14)"
              : "1px solid transparent",
        }}
      >
        <div className="relative w-full px-3 sm:px-4 lg:px-6 flex items-center justify-between gap-4 py-[1.4rem]">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2.5 shrink-0"
          aria-label="Swahilies home"
        >
          <Image
            src={logo}
            alt=""
            priority
            className={`h-8 w-8 rounded-[0.6rem] transition-shadow duration-300 ${
              pillIsDark ? "ring-1 ring-white/25" : ""
            }`}
          />
          <span
            className="text-[0.95rem] font-semibold tracking-tight max-[420px]:hidden transition-colors duration-300"
            style={{ color: navFg }}
          >
            Swahilies
          </span>
        </a>

        {/* Desktop Navigation — absolutely centered on the row so it lines
            up with centered page content (e.g. the Payments hero), instead
            of just sitting wherever justify-between's math lands it (which
            skews off-center now that the right-side controls are empty). */}
        <ul className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) =>
            item.children ? (
              <li key={item.label} className="group relative">
                <a
                  href={item.href}
                  className="relative inline-block px-3.5 py-2 text-[0.82rem] font-medium tracking-[-0.005em] transition-colors duration-300"
                  style={{ color: navFg }}
                >
                  {item.label}
                  <span
                    className="absolute left-3.5 right-3.5 bottom-1 h-px scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
                    style={{ background: navFg }}
                    aria-hidden="true"
                  />
                </a>

                {/* Hover dropdown */}
                <div
                  className="absolute left-0 top-full pt-2 opacity-0 pointer-events-none -translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0"
                >
                  <div
                    className="w-80 rounded-2xl overflow-hidden p-2"
                    style={{
                      background:
                        "radial-gradient(circle at 15% 15%, var(--wash-lavender), transparent 55%), radial-gradient(circle at 85% 25%, var(--wash-peach), transparent 50%), rgba(255, 255, 255, 0.75)",
                      border: "1px solid var(--color-border)",
                      boxShadow: "0 20px 40px rgba(14, 14, 16, 0.12)",
                      backdropFilter: "blur(20px) saturate(180%)",
                      WebkitBackdropFilter: "blur(20px) saturate(180%)",
                    }}
                  >
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="group/child flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-black/5"
                      >
                        <span
                          className="inline-flex items-center justify-center w-10 h-10 rounded-lg shrink-0"
                          style={{ background: "var(--color-bg)", color: "var(--color-primary)" }}
                        >
                          {child.iconSrc ? (
                            <img src={child.iconSrc} alt="" className="h-5 w-5 object-contain" aria-hidden="true" />
                          ) : (
                            <child.Icon className="h-5 w-5" strokeWidth={2} />
                          )}
                        </span>
                        <span className="min-w-0">
                          <span
                            className="block text-[0.9rem] font-semibold tracking-tight"
                            style={{ color: "var(--color-primary)" }}
                          >
                            {child.label}
                          </span>
                          <span
                            className="block text-[0.78rem] leading-snug mt-0.5"
                            style={{ color: "var(--color-muted)" }}
                          >
                            {child.description}
                          </span>
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </li>
            ) : (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="group relative inline-block px-3.5 py-2 text-[0.82rem] font-medium tracking-[-0.005em] transition-colors duration-300"
                  style={{ color: navFg }}
                >
                  {item.label}
                  <span
                    className="absolute left-3.5 right-3.5 bottom-1 h-px scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
                    style={{ background: navFg }}
                    aria-hidden="true"
                  />
                </a>
              </li>
            ),
          )}
        </ul>

        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-1">

        {/* <div>
            <img src="/assets/icons/translate.png" alt="Translate" className="h-4 w-4" />
          </div>

          <div style={{ color: navFg }} className="transition-colors duration-300">
            <Select
              value={language}
              onChange={setLanguage}
              aria-label="Language"
              variant="borderless"
              className="glass-select"
              style={{ width: 64, background: "transparent" }}
              options={languageOptions}
            />
          </div> */}


          {/* <a
            href="/contact"
            className="group inline-flex items-center gap-2.5 pl-5 pr-1 py-1 rounded-full text-white hover:opacity-95 transition-opacity"
            style={{ background: "var(--color-primary)" }}
          >
            <span className="text-[0.85rem] font-semibold tracking-tight">
              Talk to us
            </span>
            <span
              className="inline-flex items-center justify-center w-7 h-7 rounded-full transition-transform group-hover:translate-x-0.5"
              style={{ background: "var(--color-accent)" }}
              aria-hidden="true"
            >
              <ChevronRight
                className="h-3.5 w-3.5"
                strokeWidth={2.5}
                style={{ color: "var(--color-primary)" }}
              />
            </span>
          </a> */}
        </div>

        {/* Mobile right side */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href="/contact"
            className="group inline-flex items-center gap-2 pl-3.5 pr-1 py-1 rounded-full transition-colors duration-300"
            style={{
              background: pillIsDark ? "#FFFFFF" : "var(--color-primary)",
              color: pillIsDark ? "var(--color-primary)" : "#FFFFFF",
            }}
          >
            <span className="text-[0.7rem] font-semibold tracking-tight">
              Talk to us
            </span>
            <span
              className="inline-flex items-center justify-center w-6 h-6 rounded-full"
              style={{ background: "var(--color-accent)" }}
              aria-hidden="true"
            >
              <ChevronRight
                className="h-3 w-3"
                strokeWidth={2.5}
                style={{ color: "var(--color-primary)" }}
              />
            </span>
          </a>
          <button
            type="button"
            className="h-9 w-9 flex items-center justify-center rounded-full transition-colors duration-300"
            style={{ background: pillIsDark ? "rgba(255, 255, 255, 0.12)" : "rgba(14, 14, 16, 0.06)" }}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
          >
            <HiOutlineBars2 style={{ color: navFg }} className="transition-colors duration-300" />
          </button>
        </div>
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
              <div className="flex items-center gap-2.5">
                <Image src={logo} alt="" priority className="h-7 w-7 rounded-[0.5rem]" />
                <span
                  className="text-[0.95rem] font-semibold tracking-tight"
                  style={{ color: "var(--color-primary)" }}
                >
                  Swahilies
                </span>
              </div>
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
                {mobileNavItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="py-3 text-[1.4rem] font-bold tracking-tight border-b transition-colors hover:opacity-70"
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
              className="group mt-6 inline-flex items-center justify-between gap-3 pl-6 pr-1.5 py-1.5 rounded-full text-white hover:opacity-95 transition-opacity self-start"
              style={{ background: "var(--color-primary)" }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="text-[0.95rem] font-semibold tracking-tight">
                Talk to us
              </span>
              <span
                className="inline-flex items-center justify-center w-9 h-9 rounded-full transition-transform group-hover:translate-x-0.5"
                style={{ background: "var(--color-accent)" }}
                aria-hidden="true"
              >
                <ChevronRight
                  className="h-4 w-4"
                  strokeWidth={2.5}
                  style={{ color: "var(--color-primary)" }}
                />
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
