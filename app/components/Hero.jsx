'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import {
  ChevronRight,
  Smartphone,
  Globe2,
  CreditCard,
  Store,
} from 'lucide-react'
import heroIllustration from '../../public/assets/images/hero-illustration.png'

const CURRENCIES = [
  { code: 'TZS', flag: '🇹🇿', name: 'Tanzania' },
  { code: 'KES', flag: '🇰🇪', name: 'Kenya' },
  { code: 'UGX', flag: '🇺🇬', name: 'Uganda' },
  { code: 'RWF', flag: '🇷🇼', name: 'Rwanda' },
  { code: 'NGN', flag: '🇳🇬', name: 'Nigeria' },
  { code: 'ZAR', flag: '🇿🇦', name: 'South Africa' },
  { code: 'GHS', flag: '🇬🇭', name: 'Ghana' },
  { code: 'USD', flag: '🇺🇸', name: 'United States' },
  { code: 'EUR', flag: '🇪🇺', name: 'Eurozone' },
  { code: 'GBP', flag: '🇬🇧', name: 'United Kingdom' },
  { code: 'CNY', flag: '🇨🇳', name: 'China' },
]

export default function Hero() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const ctaRef = useRef(null)
  const chipsRef = useRef(null)
  const stripRef = useRef(null)
  const visualRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.15 })

    tl.from(titleRef.current, {
      y: -30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    })
      .from(
        descRef.current,
        { y: -20, opacity: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4',
      )
      .from(
        ctaRef.current,
        { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3',
      )
      .from(
        visualRef.current,
        { y: 24, opacity: 0, duration: 0.9, ease: 'power3.out' },
        '-=0.7',
      )
  }, { scope: heroRef })

  return (
    <section
      ref={heroRef}
      className="hero-pin min-h-[88vh] mesh-gradient overflow-hidden flex flex-col justify-center pt-28 pb-10 sm:pt-32 sm:pb-12 max-[768px]:pt-36 max-[768px]:pb-10 relative"
    >
      {/* Decorative wash orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl max-[768px]:hidden"
           style={{ background: 'var(--wash-lavender)', opacity: 0.7 }} />
      <div className="absolute bottom-24 right-10 w-[28rem] h-[28rem] rounded-full blur-3xl max-[768px]:hidden"
           style={{ background: 'var(--wash-peach)', opacity: 0.7 }} />
      <div className="absolute bottom-16 left-1/3 w-80 h-80 rounded-full blur-3xl max-[768px]:hidden"
           style={{ background: 'var(--wash-cream)', opacity: 0.7 }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-12 gap-8 lg:gap-10 items-center max-[900px]:grid-cols-1 max-[900px]:gap-6">
          {/* Copy column */}
          <div className="col-span-7 max-[900px]:col-span-12">
            <div ref={titleRef} className="max-w-2xl">
              <h1
                className="text-[clamp(1.9rem,5vw,4rem)] font-semibold leading-[1.04] tracking-[-0.025em]"
                style={{ color: 'var(--color-primary)' }}
              >
                <span className="block">Powering payments</span>
                <span className="block whitespace-nowrap">for African businesses.</span>
              </h1>
            </div>

            <p
              ref={descRef}
              className="mt-5 sm:mt-6 max-w-xl text-[0.95rem] sm:text-base lg:text-lg leading-relaxed"
              style={{ color: 'var(--color-muted)' }}
            >
              Accept, send, and reconcile payments across mobile money, cards,
              and bank rails — with pan-African settlement and tools that fit
              every business.
            </p>

            <div
              ref={ctaRef}
              className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="/contact"
                className="group inline-flex items-center gap-3 pl-6 pr-1.5 py-1.5 rounded-full text-white hover:opacity-95 transition-opacity"
                style={{ background: 'var(--color-primary)' }}
              >
                <span className="text-[0.95rem] font-semibold tracking-tight">
                  Talk to us
                </span>
                <span
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full transition-transform group-hover:translate-x-0.5"
                  style={{ background: 'var(--color-accent)' }}
                  aria-hidden="true"
                >
                  <ChevronRight className="h-4 w-4" strokeWidth={2.5} style={{ color: 'var(--color-primary)' }} />
                </span>
              </a>
            </div>
          </div>

          {/* Illustration column */}
          <div className="col-span-5 max-[900px]:hidden flex items-center justify-end">
            <div ref={visualRef} className="relative w-full max-w-[420px] lg:max-w-[480px] xl:max-w-[520px]">
              <Image
                src={heroIllustration}
                alt="Swahilies connects mobile money, cards, banks, and global payouts."
                priority
                sizes="(max-width: 900px) 80vw, (max-width: 1200px) 420px, 520px"
                className="w-full h-auto select-none drop-shadow-[0_24px_60px_rgba(14,14,16,0.12)]"
              />
            </div>
          </div>
        </div>

        {/* Payment-product chips */}
        <div
          ref={chipsRef}
          className="mt-10 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-4 max-w-5xl"
        >
          {[
            {
              title: 'Collect',
              sub: 'Mobile money + cards',
              Icon: Smartphone,
              tint: 'var(--color-accent)',
              wash: 'rgba(240, 160, 32, 0.12)',
            },
            {
              title: 'Cross-border',
              sub: '30+ countries, fair FX',
              Icon: Globe2,
              tint: 'var(--color-secondary)',
              wash: 'rgba(124, 92, 224, 0.12)',
            },
            {
              title: 'Disburse',
              sub: 'Same-day payouts',
              Icon: CreditCard,
              tint: 'var(--color-success)',
              wash: 'rgba(47, 168, 106, 0.12)',
            },
            {
              title: 'Kuza Business',
              sub: 'Business tools, all in one',
              Icon: Store,
              tint: 'var(--color-tertiary)',
              wash: 'rgba(244, 162, 140, 0.18)',
            },
          ].map((chip) => (
            <div
              key={chip.title}
              className="group relative flex items-center gap-3 rounded-xl border px-3.5 py-3 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md cursor-default overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(circle at 0% 0%, ${chip.wash}, transparent 70%)` }}
                aria-hidden="true"
              />
              <div
                className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{ background: chip.wash, color: chip.tint }}
              >
                <chip.Icon className="h-4 w-4" strokeWidth={2} />
              </div>
              <div className="relative min-w-0">
                <div
                  className="text-sm font-semibold leading-tight"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {chip.title}
                </div>
                <div
                  className="text-[0.72rem] mt-0.5 leading-snug truncate"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {chip.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cross-border currency strip */}
      <div
        ref={stripRef}
        className="relative z-10 mt-16 max-[768px]:mt-12"
      >
        <div
          className="mx-auto max-w-7xl px-6 mb-3 flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.18em] font-medium"
          style={{ color: 'var(--color-muted)' }}
        >
          <span className="h-px flex-1" style={{ background: 'var(--color-border)' }} />
          <span>Settle in</span>
          <span className="h-px flex-1" style={{ background: 'var(--color-border)' }} />
        </div>

        <div className="marquee-mask overflow-hidden">
          <div className="marquee-track">
            {[...CURRENCIES, ...CURRENCIES].map((c, i) => (
              <div
                key={`${c.code}-${i}`}
                className="flex items-center gap-2 px-6 py-2 mx-1 whitespace-nowrap"
                style={{ color: 'var(--color-primary)' }}
                aria-hidden={i >= CURRENCIES.length}
              >
                <span className="text-lg leading-none" aria-hidden="true">{c.flag}</span>
                <span className="text-sm font-semibold tracking-wide">{c.code}</span>
                <span className="text-xs" style={{ color: 'var(--color-muted)' }}>
                  {c.name}
                </span>
                <span
                  className="ml-3 h-1 w-1 rounded-full"
                  style={{ background: 'var(--color-border-strong)' }}
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
