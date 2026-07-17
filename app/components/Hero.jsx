'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'

// useLayoutEffect warns during SSR; this falls back to useEffect there and
// only takes the layout-effect (pre-paint) timing on the client, where it
// actually matters for skipping the video before Safari ever paints it.
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import {
  ChevronRight,
  Smartphone,
  Globe2,
  CreditCard,
  Store,
} from 'lucide-react'

const CURRENCIES = [
  { code: 'TZS', country: 'tz', name: 'Tanzania' },
  { code: 'KES', country: 'ke', name: 'Kenya' },
  { code: 'UGX', country: 'ug', name: 'Uganda' },
  { code: 'RWF', country: 'rw', name: 'Rwanda' },
  { code: 'NGN', country: 'ng', name: 'Nigeria' },
  { code: 'ZAR', country: 'za', name: 'South Africa' },
  { code: 'GHS', country: 'gh', name: 'Ghana' },
  { code: 'USD', country: 'us', name: 'United States' },
  { code: 'EUR', country: 'eu', name: 'Eurozone' },
  { code: 'GBP', country: 'gb', name: 'United Kingdom' },
  { code: 'CNY', country: 'cn', name: 'China' },
]

export default function Hero() {
  const heroRef = useRef(null)
  const eyebrowRef = useRef(null)
  const rule1Ref = useRef(null)
  const line1Ref = useRef(null)
  const descRef = useRef(null)
  const ctaRef = useRef(null)
  const chipsRef = useRef(null)
  const stripRef = useRef(null)
  const visualRef = useRef(null)
  const videoRef = useRef(null)
  const mobileVisualRef = useRef(null)
  const [videoSrc, setVideoSrc] = useState('/assets/graphics/No-BG.webm')

  // Respect reduced-motion for the looping video.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReducedMotion) {
      video.pause()
    }
  }, [])

  // No-BG.webm relies on the WebM alpha-channel extension (transparent
  // background baked in via the container's alpha_mode flag, not a plain
  // alpha pixel format). Chrome and Firefox have supported that extension
  // since ~2013; Safari's WebM support is newer and doesn't include it, so
  // Safari plays the raw un-composited color track instead of transparency
  // — showing the source footage that was meant to be masked out as solid,
  // visible noise. bg-clean.mov is an HEVC-with-alpha export of the same
  // clip, which Safari does support natively, so Safari gets that source
  // instead of the WebM.
  useIsomorphicLayoutEffect(() => {
    const ua = navigator.userAgent
    const isSafari = /^((?!chrome|android|crios|fxios|edgios).)*safari/i.test(ua)
    if (isSafari) setVideoSrc('/assets/graphics/bg-clean.mov')
  }, [])

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      const tl = gsap.timeline({ delay: 0.15 })

      tl.from(eyebrowRef.current, {
        y: -14,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
      })
        .from(
          rule1Ref.current,
          { scaleX: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.15',
        )
        .from(
          line1Ref.current,
          {
            yPercent: 100,
            duration: 0.9,
            ease: 'power4.out',
            onComplete: () => {
              if (line1Ref.current) line1Ref.current.parentElement.style.overflow = 'visible'
            },
          },
          '-=0.3',
        )
        .from(
          descRef.current,
          { y: 16, opacity: 0, duration: 0.55, ease: 'power2.out' },
          '-=0.4',
        )
        .from(
          ctaRef.current,
          { y: 16, opacity: 0, duration: 0.55, ease: 'power2.out' },
          '-=0.35',
        )
        .from(
          visualRef.current,
          { y: 30, opacity: 0, scale: 0.94, duration: 1, ease: 'power3.out' },
          '-=0.9',
        )
        .from(
          mobileVisualRef.current,
          { y: 24, opacity: 0, scale: 0.94, duration: 0.8, ease: 'power3.out' },
          '-=0.9',
        )

      // Subtle pointer-driven tilt on the video panel — desktop only.
      if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
        const wrap = visualRef.current
        if (wrap) {
          const xTo = gsap.quickTo(wrap, 'rotationY', { duration: 0.6, ease: 'power3.out' })
          const yTo = gsap.quickTo(wrap, 'rotationX', { duration: 0.6, ease: 'power3.out' })

          const handleMove = (e) => {
            const rect = wrap.getBoundingClientRect()
            const px = (e.clientX - rect.left) / rect.width - 0.5
            const py = (e.clientY - rect.top) / rect.height - 0.5
            xTo(px * 10)
            yTo(py * -10)
          }
          const handleLeave = () => {
            xTo(0)
            yTo(0)
          }

          wrap.style.transformPerspective = '900px'
          wrap.addEventListener('mousemove', handleMove)
          wrap.addEventListener('mouseleave', handleLeave)

          return () => {
            wrap.removeEventListener('mousemove', handleMove)
            wrap.removeEventListener('mouseleave', handleLeave)
          }
        }
      }
    },
    { scope: heroRef },
  )

  return (
    <section
      ref={heroRef}
      className="hero-pin min-h-screen mesh-gradient overflow-hidden flex flex-col justify-between pt-32 sm:pt-36 max-[768px]:pt-28 relative"
    >
      {/* Decorative wash orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl max-[768px]:hidden"
           style={{ background: 'var(--wash-lavender)', opacity: 0.7 }} />
      <div className="absolute top-1/2 right-10 w-[28rem] h-[28rem] rounded-full blur-3xl max-[768px]:hidden"
           style={{ background: 'var(--wash-peach)', opacity: 0.7 }} />
      <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full blur-3xl max-[768px]:hidden"
           style={{ background: 'var(--wash-cream)', opacity: 0.7 }} />

      {/* Video — full-bleed layer spanning the full hero height, docked to
          the right edge of the viewport, independent of the copy column's
          max-w-7xl container so it can actually fill the space. Source
          swaps to bg-clean.mov on Safari — see the videoSrc effect above. */}
      <div className="absolute inset-y-0 -right-4 lg:-right-6 xl:-right-8 z-0 w-[50%] max-[1300px]:hidden flex items-center justify-end">
        <div
          ref={visualRef}
          className="hero-video-float relative h-[78%] w-full flex items-center justify-end"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <video
            ref={videoRef}
            className="h-full w-full max-w-none object-contain object-right select-none drop-shadow-[0_30px_70px_rgba(14,14,16,0.16)]"
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-label="Swahilies connects mobile money, cards, banks, and global payouts."
          />
        </div>
      </div>

      <div className="relative z-10 w-full px-3 sm:px-4 lg:px-6 py-10">
        <div className="flex flex-cols gap-8 lg:gap-8 items-center max-[900px]:grid-cols-1 max-[900px]:gap-10 w-full">
          {/* Copy column — widened now that the video is smaller, so the
              longer headline has room to extend further right */}
          <div className="w-full lg:max-w-2xl xl:max-w-3xl max-[1200px]:max-w-none ml-2 sm:ml-4 lg:ml-8 xl:ml-10">
            <div
              ref={eyebrowRef}
              className="flex items-center gap-2.5 mb-5 sm:mb-6"
            >
              <span className="h-px w-8" style={{ background: 'var(--color-accent)' }} aria-hidden="true" />
              <span
                className="text-[0.68rem] sm:text-[0.72rem] uppercase tracking-[0.28em] font-semibold"
                style={{ color: 'var(--color-muted)' }}
              >
                Pan-African payments infrastructure
              </span>
            </div>

            <h1 className="max-w-md xl:max-w-lg">
              <span className="hero-word-mask">
                <span
                  ref={line1Ref}
                  className="hero-display hero-display-bold text-[clamp(2.1rem,4vw,3.4rem)] leading-[1.15]"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Collect payments, <span className="sm:whitespace-nowrap">pay suppliers across borders,</span> and automate your books.
                </span>
              </span>
              <span ref={rule1Ref} className="hero-word-rule mt-3" />
            </h1>

            <p
              ref={descRef}
              className="mt-5 sm:mt-6 max-w-xl text-[0.95rem] sm:text-base leading-relaxed"
              style={{ color: 'var(--color-muted)' }}
            >
              Licensed by the Bank of Tanzania as Payments Service Provider,
              and integrated with licensed financial institutions.
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
        </div>

        {/* Mobile/tablet video preview — the desktop version is a large
            full-bleed layer hidden below 1300px (no room to spare beside
            the copy there). Rather than a small centered clip, this docks
            to the right and bleeds off the true screen edge (canceling
            out the section's own px padding), echoing the desktop
            treatment at mobile scale instead of just shrinking it down.
            Source swaps to bg-clean.mov on Safari/iOS — see the videoSrc
            effect above; this is exactly the block that was showing
            corrupted on iOS before. */}
        <div
          ref={mobileVisualRef}
          className="hidden max-[1300px]:flex justify-end mt-10 sm:mt-12 -mr-3 sm:-mr-4"
        >
          <video
            className="w-[98%] sm:w-[88%] max-w-xl h-auto select-none drop-shadow-[0_20px_50px_rgba(14,14,16,0.18)]"
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-label="Swahilies connects mobile money, cards, banks, and global payouts."
          />
        </div>

        {/* Payment-product chips */}
        {/* <div
          ref={chipsRef}
          className="mt-16 sm:mt-18 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-4 max-w-6xl"
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
        </div> */}
      </div>

      {/* Bridge strip — fades the hero into the next section and carries the
          settlement-currency marquee across the seam. */}
      <div ref={stripRef} className="relative z-10">
        {/* Fade the mesh-gradient hero bg into the page bg before the strip starts. */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 -top-28"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--color-bg) 90%)' }}
          aria-hidden="true"
        />

        <div
          className="relative backdrop-blur-md py-3 sm:py-3.5 max-[768px]:py-2.5"
          style={{ background: 'rgba(255, 255, 255, 0.55)' }}
        >
          <div
            className="mx-auto max-w-7xl px-6 mb-1.5 flex items-center gap-3 text-[0.6rem] uppercase tracking-[0.16em] font-medium opacity-80"
            style={{ color: 'var(--color-muted)' }}
          >
            <span>Settle in</span>
          </div>

          <div className="marquee-mask overflow-hidden">
            <div className="marquee-track">
              {[...CURRENCIES, ...CURRENCIES].map((c, i) => (
                <div
                  key={`${c.code}-${i}`}
                  className="flex items-center gap-1.5 px-4 py-1 mx-1 whitespace-nowrap"
                  style={{ color: 'var(--color-primary)' }}
                  aria-hidden={i >= CURRENCIES.length}
                >
                  <span
                    className={`fi fi-${c.country} rounded-[2px] shadow-[0_0_0_1px_rgba(14,14,16,0.08)]`}
                    style={{ width: '1.15em', height: '0.86em' }}
                    aria-hidden="true"
                  />
                  <span className="text-xs font-semibold tracking-wide">{c.code}</span>
                  <span className="text-[0.68rem]" style={{ color: 'var(--color-muted)' }}>
                    {c.name}
                  </span>
                  <span
                    className="ml-2 h-1 w-1 rounded-full"
                    style={{ background: 'var(--color-border-strong)' }}
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
