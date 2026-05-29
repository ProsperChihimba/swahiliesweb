'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { FiArrowUpRight, FiArrowDownLeft, FiSend, FiTrendingUp, FiZap } from 'react-icons/fi'

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

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 })

    tl.from(titleRef.current, {
      y: -60,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
    })

    tl.from(
      descRef.current,
      { y: -30, opacity: 0, duration: 0.7, ease: 'power2.out' },
      '-=0.5',
    )

    tl.from(
      ctaRef.current,
      { y: 30, opacity: 0, duration: 0.7, ease: 'back.out(1.5)' },
      '-=0.3',
    )
  }, { scope: heroRef })

  return (
    <section
      ref={heroRef}
      className="hero-pin min-h-screen mesh-gradient overflow-hidden flex flex-col justify-center pt-32 pb-12 max-[768px]:pt-28 max-[768px]:pb-10 relative"
    >
      {/* Decorative wash orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl max-[768px]:hidden"
           style={{ background: 'var(--wash-lavender)', opacity: 0.7 }} />
      <div className="absolute bottom-24 right-10 w-[28rem] h-[28rem] rounded-full blur-3xl max-[768px]:hidden"
           style={{ background: 'var(--wash-peach)', opacity: 0.7 }} />
      <div className="absolute bottom-16 left-1/3 w-80 h-80 rounded-full blur-3xl max-[768px]:hidden"
           style={{ background: 'var(--wash-cream)', opacity: 0.7 }} />

      <div className="relative z-10 w-full max-w-6xl pl-6 pr-6 sm:pl-10 lg:pl-16">
        <div ref={titleRef} className="max-w-4xl">
          <h1
            className="text-[clamp(2rem,6vw,4.4rem)] font-semibold leading-[1.02] tracking-[-0.02em]"
            style={{ color: 'var(--color-primary)' }}
          >
            <span className="whitespace-nowrap">Bookkeeping and payments,</span>
            <br />
            built for African SMEs.
          </h1>
        </div>

        <p
          ref={descRef}
          className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed"
          style={{ color: 'var(--color-muted)' }}
        >
          One app for business management, cross-border payments, and credit
          access. Track sales, stock, and debts; pay suppliers locally and
          abroad at fair rates; and unlock loans powered by your transaction
          history.
        </p>

        <div
          ref={ctaRef}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-md text-white px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
            style={{ background: 'var(--color-primary)' }}
          >
            Contact us
            <FiArrowUpRight className="text-base" />
          </a>
        </div>

        <div
          ref={chipsRef}
          className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl"
        >
          {[
            {
              title: 'Get paid',
              sub: 'From customers, anywhere',
              Icon: FiArrowDownLeft,
              tint: 'var(--color-accent)',
              wash: 'rgba(240, 160, 32, 0.12)',
            },
            {
              title: 'Pay anyone',
              sub: '30+ countries, fair rates',
              Icon: FiSend,
              tint: 'var(--color-secondary)',
              wash: 'rgba(124, 92, 224, 0.12)',
            },
            {
              title: 'Track cash',
              sub: 'Sales, stock, debts',
              Icon: FiTrendingUp,
              tint: 'var(--color-success)',
              wash: 'rgba(47, 168, 106, 0.12)',
            },
            {
              title: 'Borrow more',
              sub: 'Credit from your data',
              Icon: FiZap,
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
              {/* Tint wash on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(circle at 0% 0%, ${chip.wash}, transparent 70%)` }}
                aria-hidden="true"
              />

              <div
                className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                style={{ background: chip.wash, color: chip.tint }}
              >
                <chip.Icon className="text-base" />
              </div>

              <div className="relative min-w-0">
                <div
                  className="text-sm font-semibold leading-tight"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {chip.title}
                </div>
                <div
                  className="text-[0.7rem] mt-0.5 leading-snug truncate"
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
          className="mx-auto max-w-6xl px-6 mb-3 flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.18em] font-medium"
          style={{ color: 'var(--color-muted)' }}
        >
          <span
            className="h-px flex-1"
            style={{ background: 'var(--color-border)' }}
          />
          <span>Send and receive in</span>
          <span
            className="h-px flex-1"
            style={{ background: 'var(--color-border)' }}
          />
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
                <span
                  className="text-xs"
                  style={{ color: 'var(--color-muted)' }}
                >
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
