"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import { HiOutlineBars2 } from "react-icons/hi2";
import { MdOutlineLogout } from "react-icons/md";
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

export default function NavBar() {
  const headerRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState(languageOptions[0].value);
  const [isLogoLight, setIsLogoLight] = useState(false);

  useEffect(() => {
    const updateLogoTone = () => {
      const headerHeight =
        headerRef.current?.getBoundingClientRect().height ?? 0;
      const probeY = Math.min(window.innerHeight - 1, headerHeight + 1);
      const probeX = Math.min(window.innerWidth - 1, 40);
      const el = document.elementFromPoint(probeX, probeY);
      const section = el?.closest?.("[data-nav-theme]");
      setIsLogoLight(section?.getAttribute("data-nav-theme") === "light");
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      updateLogoTone();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateLogoTone);
    updateLogoTone();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateLogoTone);
    };
  }, []);

  useGSAP(() => {
    const headerEl = headerRef.current;
    let tween;

    if (headerEl) {
      // Keep header visible even if GSAP doesn't run
      gsap.set(headerEl, { opacity: 1 });

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!prefersReducedMotion) {
        tween = gsap.from(headerEl, {
          y: -60,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.1,
          clearProps: "transform",
        });
      }
    }

    return () => {
      if (tween) {
        tween.kill();
      }
    };
  }, { scope: headerRef });

  const navItems = ["BUSINESS", "CARDS", "CONTACT"];

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 `}
    >
      <nav className=" mx-auto px-6 max-[768px]:px-2 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className={`text-lg font-semibold ${
            isLogoLight ? "text-white" : "text-[#374992]"
          } 
  rounded-xs max-[768px]:px-3 px-7 py-1 tracking-tight
  bg-white/5 backdrop-blur-md
 `}
        >
          <Image src={logo} alt="Swahilies" priority className="h-5 w-auto" />
        </div>

        {/* Desktop Navigation */}
        <div
          className="hidden rounded-full px-7 py-3 tracking-tight 
   md:flex items-center space-x-2 dg"
        >
          {navItems.map((item, index) => (
            <a
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-sm hover:text-gray-700 bg-white/10 rounded-xs px-4 py-1 backdrop-blur-md   text-[#ffffff] transition-colors duration-200 font-light "
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="md:flex hidden items-center space-x-4">
          <Select
            value={language}
            onChange={setLanguage}
            aria-label="Language"
            className="glass-select md:flex"
            style={{ width: 70, background: "transparent", marginRight: 8 }}
            options={languageOptions}
          />
          <MdOutlineLogout className="text-black" size={20} />

          <button className="px-6 navtext py-2 bg-[#474747] text-white rounded-xs  text-sm hover:bg-opacity-90 transition-all duration-200 hover:scale-105">
            OPEN ACCOUNT
          </button>
          <div className="px-3 py-2 bg-[#474747] rounded-xs">
            <HiOutlineBars2 className="text-white" />
          </div>
        </div>

        <div className="flex items-center gap-2 lg:hidden md:hidden">
          {/* Mobile Menu Button */}
          {/* <MdOutlineLogout className="text-black" size={20} /> */}

          <button className="px-4 navtext py-2 bg-[#38488B] text-white rounded-xs  text-xs hover:bg-opacity-90 transition-all duration-200 hover:scale-105">
            OPEN ACCOUNT
          </button>
          <div
            className="px-3 py-2 bg-[#47474784] rounded-xs"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <HiOutlineBars2 className="text-white" />
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
      >
        <div
          className="absolute inset-0 bg-[#0b1020]/70 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute inset-x-0 top-0 h-screen bg-white text-[#38488B] transform transition-transform duration-500 ${
            isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="px-6 pt-6 pb-10 h-full flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Image
                  src={logo}
                  alt="Swahilies"
                  priority
                  className="h-7 w-auto"
                />
              </div>
              <button
                className="w-10 h-10 rounded-full border border-[#d7dcf5] flex items-center justify-center"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-10 flex-1">
              <div className="text-xs uppercase tracking-[0.3em] text-[#9aa3d8] mb-4">
                Menu
              </div>
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`${item.toLowerCase()}`}
                    className="text-[1.3rem] max-[900px]:text-[1rem] font-semibold tracking-tight hover:text-[#2f3f8f] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#e4e8ff]">
              <button className="w-full px-6 py-3 bg-[#38488B] text-white rounded-xs font-semibold text-sm tracking-[0.2em] ">
                Open account
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
