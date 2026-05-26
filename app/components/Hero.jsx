'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { FaApple, FaGooglePlay } from 'react-icons/fa'
import { useGSAP } from '@gsap/react'
import { APP_STORE_URL, PLAY_STORE_URL } from '../lib/storeLinks'

export default function Hero() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const ctaRef = useRef(null)
  const chipsRef = useRef(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
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

      tl.from(
        chipsRef.current?.children ?? [],
        { y: 20, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
        '-=0.4',
      )
    }, heroRef)

    return () => ctx.revert()
  }, { scope: heroRef })

  return (
    <section
      ref={heroRef}
      className="hero-pin min-h-screen mesh-gradient overflow-hidden pt-20 pb-24 max-[768px]:pt-24 max-[768px]:pb-16 relative"
    >
      {/* Decorative wash orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl max-[768px]:hidden"
           style={{ background: 'var(--wash-lavender)', opacity: 0.7 }} />
      <div className="absolute bottom-24 right-10 w-[28rem] h-[28rem] rounded-full blur-3xl max-[768px]:hidden"
           style={{ background: 'var(--wash-peach)', opacity: 0.7 }} />
      <div className="absolute bottom-16 left-1/3 w-80 h-80 rounded-full blur-3xl max-[768px]:hidden"
           style={{ background: 'var(--wash-cream)', opacity: 0.7 }} />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div ref={titleRef} className="max-w-4xl">
          <h1
            className="text-[clamp(2.4rem,7vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.02em]"
            style={{ color: 'var(--color-primary)' }}
          >
            Bookkeeping and payments,
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
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-md text-white px-5 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
            style={{ background: 'var(--color-primary)' }}
          >
            <FaApple className="text-xl" />
            <span className="flex flex-col items-start leading-tight">
              <span className="text-[0.65rem] font-medium opacity-80">Download on the</span>
              <span>App Store</span>
            </span>
          </a>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-md text-white px-5 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
            style={{ background: 'var(--color-primary)' }}
          >
            <FaGooglePlay className="text-xl" />
            <span className="flex flex-col items-start leading-tight">
              <span className="text-[0.65rem] font-medium opacity-80">Get it on</span>
              <span>Google Play</span>
            </span>
          </a>
        </div>

        <div
          ref={chipsRef}
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl"
        >
          {[
            { sw: 'Malipo', en: 'Payments' },
            { sw: 'Wateja', en: 'Customers' },
            { sw: 'Invoice', en: 'Invoicing' },
            { sw: 'Loans', en: 'Credit' },
          ].map((chip) => (
            <div
              key={chip.sw}
              className="rounded-xl border px-4 py-3 backdrop-blur-sm"
              style={{
                background: 'rgba(255, 255, 255, 0.6)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div
                className="text-base font-semibold leading-tight"
                style={{ color: 'var(--color-primary)' }}
              >
                {chip.sw}
              </div>
              <div
                className="text-xs mt-0.5"
                style={{ color: 'var(--color-muted)' }}
              >
                {chip.en}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
