"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import logo from "../../public/assets/images/logo.png";
import { LINKEDIN_URL, INSTAGRAM_URL, X_URL } from "../lib/socialLinks";

const linkColumns = [
  {
    title: "Payments",
    links: [
      { label: "Mobile money", href: "/#payments" },
      { label: "Cards", href: "/#payments" },
      { label: "Bank transfers", href: "/#payments" },
      { label: "Payment links", href: "/#payments" },
      { label: "Pricing", href: "/contact" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "API reference", href: "/#developers" },
      { label: "Documentation", href: "/contact" },
    ],
  },
  {
    title: "Kuza Business",
    links: [
      { label: "Overview", href: "/business" },
      { label: "Download app", href: "/business" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/contact" },
      { label: "Contact", href: "/contact" },
      { label: "Press", href: "/contact" },
      { label: "Careers", href: "/contact" },
    ],
  },
];

const socials = [
  { label: "LinkedIn", href: LINKEDIN_URL, Icon: FaLinkedinIn },
  { label: "X", href: X_URL, Icon: FaXTwitter },
  { label: "Instagram", href: INSTAGRAM_URL, Icon: FaInstagram },
];

export default function Footer() {
  const footerRef = useRef(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.from(".footer-fade", {
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
        });
      }, footerRef);

      return () => ctx.revert();
    },
    { scope: footerRef },
  );

  const year = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      className="relative pt-20 pb-10 max-[900px]:pt-14 max-[900px]:pb-8"
      style={{ background: "var(--color-primary)", color: "#fff" }}
    >
      {/* Decorative orb */}
      <div
        className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none max-[768px]:hidden"
        style={{ background: "var(--color-accent)", opacity: 0.18 }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Top row — brand + columns */}
        <div className="grid grid-cols-12 gap-10 max-[900px]:grid-cols-1 max-[900px]:gap-8">
          {/* Brand block */}
          <div className="col-span-4 max-[900px]:col-span-1 footer-fade">
            <a
              href="/"
              className="inline-flex items-center justify-center mb-5 w-14 h-14 rounded-full bg-white/95 hover:bg-white transition-colors shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
              aria-label="Swahilies home"
            >
              <Image src={logo} alt="Swahilies" priority className="h-8 w-auto" />
            </a>
            <p className="text-white/70 text-[0.95rem] leading-relaxed max-w-sm">
              Payments infrastructure for African businesses. One API, every
              rail, pan-African settlement.
            </p>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-2">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Swahilies on ${label}`}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-[0.95rem] text-white/80 hover:bg-white/10 hover:text-white hover:border-white/30 transition-colors"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="col-span-8 grid grid-cols-4 gap-8 max-[900px]:col-span-1 max-[600px]:grid-cols-2">
            {linkColumns.map((col) => (
              <div key={col.title} className="footer-fade">
                <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/50 mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[0.92rem] text-white/80 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact strip */}
        <div className="mt-14 max-[900px]:mt-10 footer-fade">
          <div
            className="flex items-center justify-between gap-6 py-5 max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-4 border-y"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-[0.92rem]">
              <a
                href="mailto:contact@swahilies.com"
                className="text-white/80 hover:text-white transition-colors"
              >
                contact@swahilies.com
              </a>
              <a
                href="tel:+255682411725"
                className="text-white/80 hover:text-white transition-colors"
              >
                +255 682 411 725
              </a>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center px-5 py-2.5 text-[0.78rem] font-semibold tracking-[0.14em] uppercase rounded-full hover:opacity-90 transition-opacity"
              style={{
                background: "var(--color-accent)",
                color: "var(--color-primary)",
              }}
            >
              Start integrating
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-8 flex items-center justify-between gap-4 max-[768px]:flex-col max-[768px]:items-start footer-fade">
          <div className="text-[0.82rem] text-white/55">
            © {year} Swahilies Inc. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.82rem]">
            <a
              href="/contact"
              className="text-white/55 hover:text-white/85 transition-colors"
            >
              Privacy
            </a>
            <a
              href="/contact"
              className="text-white/55 hover:text-white/85 transition-colors"
            >
              Terms
            </a>
            <a
              href="/contact"
              className="text-white/55 hover:text-white/85 transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
