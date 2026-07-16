"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Mail,
  Phone,
  MessageCircle,
  ArrowUpRight,
  ChevronRight,
  Check,
} from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import { LINKEDIN_URL, INSTAGRAM_URL, X_URL } from "../lib/socialLinks";

const channels = [
  {
    Icon: Mail,
    iconSrc: "/assets/icons/mail.png",
    label: "Email",
    value: "info@swahilies.com",
    href: "mailto:info@swahilies.com",
    helper: "Replies within 24 hours",
    wash: "var(--wash-cream)",
  },
  {
    Icon: Phone,
    iconSrc: "/assets/icons/telephone.png",
    label: "Phone",
    value: "+255 682 411 725",
    href: "tel:+255682411725",
    helper: "Mon–Fri, 9am–6pm EAT",
    wash: "var(--wash-peach)",
  },
  {
    Icon: MessageCircle,
    iconSrc: "/assets/icons/whatsapp.png",
    label: "WhatsApp",
    value: "Chat with our team",
    href: "https://wa.me/255682411725",
    helper: "Fastest support channel",
    wash: "var(--wash-lavender)",
  },
];

const socials = [
  { label: "LinkedIn", href: LINKEDIN_URL, Icon: FaLinkedinIn },
  { label: "X", href: X_URL, Icon: FaXTwitter },
  { label: "Instagram", href: INSTAGRAM_URL, Icon: FaInstagram },
];

const subjects = [
  "General inquiry",
  "Sales",
  "Partnerships",
  "Press",
  "Support",
];

function ContactPage() {
  const sectionRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        gsap.from(".contact-hero > *", {
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
        });

        gsap.from(".contact-card", {
          scrollTrigger: {
            trigger: ".contact-channels",
            start: "top 85%",
          },
          y: 32,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
        });

        gsap.from(".contact-form-wrap", {
          scrollTrigger: {
            trigger: ".contact-form-wrap",
            start: "top 85%",
          },
          y: 32,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
        });
      }, sectionRef);

      return () => ctx.revert();
    },
    { scope: sectionRef },
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder — wire to your real endpoint later
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    e.currentTarget.reset();
  };

  return (
    <main ref={sectionRef} style={{ background: "var(--color-bg)" }}>
      {/* Hero */}
      <section
        className="mesh-gradient relative overflow-hidden pt-32 pb-20 max-[768px]:pt-28 max-[768px]:pb-14"
        style={{ color: "var(--color-primary)" }}
      >
        <div
          className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl max-[768px]:hidden pointer-events-none"
          style={{ background: "var(--wash-lavender)", opacity: 0.6 }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-10 right-10 w-[28rem] h-[28rem] rounded-full blur-3xl max-[768px]:hidden pointer-events-none"
          style={{ background: "var(--wash-peach)", opacity: 0.55 }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="contact-hero max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-5 text-[0.7rem] uppercase tracking-[0.18em] font-medium"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-muted)",
                background: "rgba(255, 255, 255, 0.5)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--color-accent)" }}
              />
              Contact
            </div>

            <h1 className="text-[clamp(2.6rem,5vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.02em] mb-5">
              Let&apos;s talk.
            </h1>
            <p
              className="text-base sm:text-lg leading-relaxed max-w-2xl"
              style={{ color: "var(--color-muted)" }}
            >
              Whether you&apos;re an SME ready to streamline operations, a
              partner exploring collaboration, or just curious about what
              we&apos;re building, we&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact channels */}
      <section className="contact-channels py-16 max-[900px]:py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-3 gap-3 max-[900px]:grid-cols-1 max-[900px]:gap-4">
            {channels.map(({ Icon, iconSrc, label, value, href, helper, wash }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="contact-card group relative rounded-2xl p-6 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(14,14,16,0.08)]"
                style={{
                  background: "rgba(255, 255, 255, 0.7)",
                  border: "1px solid var(--color-border)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="inline-flex items-center justify-center w-11 h-11 rounded-xl transition-transform duration-300 ease-out group-hover:scale-105"
                    style={{
                      background: wash,
                      color: "var(--color-primary)",
                    }}
                  >
                    {iconSrc ? (
                      <img src={iconSrc} alt="" className="h-5 w-5 object-contain" aria-hidden="true" />
                    ) : (
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    )}
                  </div>
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    style={{ color: "var(--color-muted)" }}
                  />
                </div>
                <div
                  className="text-[0.7rem] uppercase tracking-[0.18em] font-medium mb-1"
                  style={{ color: "var(--color-muted)" }}
                >
                  {label}
                </div>
                <div
                  className="text-[1.05rem] font-semibold leading-tight mb-1"
                  style={{ color: "var(--color-primary)" }}
                >
                  {value}
                </div>
                <div
                  className="text-[0.85rem]"
                  style={{ color: "var(--color-muted)" }}
                >
                  {helper}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="pb-24 max-[900px]:pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-12 gap-12 max-[900px]:grid-cols-1 max-[900px]:gap-8">
            {/* Form */}
            <div className="col-span-7 max-[900px]:col-span-1">
              <div
                className="contact-form-wrap rounded-3xl p-8 max-[768px]:p-6"
                style={{
                  background: "rgba(255, 255, 255, 0.6)",
                  border: "1px solid var(--color-border)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <h2
                  className="text-[1.6rem] max-[768px]:text-[1.4rem] font-semibold leading-tight mb-2"
                  style={{ color: "var(--color-primary)" }}
                >
                  Send us a message
                </h2>
                <p
                  className="text-[0.95rem] mb-7"
                  style={{ color: "var(--color-muted)" }}
                >
                  We&apos;ll get back to you within one business day.
                </p>

                {submitted ? (
                  <div
                    className="rounded-xl p-5 flex items-start gap-3"
                    style={{
                      background: "rgba(47, 168, 106, 0.1)",
                      border: "1px solid rgba(47, 168, 106, 0.3)",
                    }}
                  >
                    <Check
                      className="h-5 w-5 mt-0.5 shrink-0"
                      strokeWidth={2.5}
                      style={{ color: "var(--color-success)" }}
                    />
                    <div>
                      <div
                        className="font-semibold mb-0.5"
                        style={{ color: "var(--color-primary)" }}
                      >
                        Message sent
                      </div>
                      <div
                        className="text-[0.9rem]"
                        style={{ color: "var(--color-muted)" }}
                      >
                        Thanks for reaching out. We&apos;ll be in touch
                        shortly.
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
                      <Field id="name" label="Full name" type="text" required />
                      <Field
                        id="email"
                        label="Work email"
                        type="email"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
                      <Field id="company" label="Company (optional)" type="text" />
                      <SelectField id="subject" label="Subject" options={subjects} />
                    </div>
                    <Textarea id="message" label="How can we help?" required />

                    <button
                      type="submit"
                      className="group mt-2 inline-flex items-center justify-between gap-3 pl-6 pr-1.5 py-1.5 rounded-full text-white hover:opacity-95 transition-opacity self-start"
                      style={{ background: "var(--color-primary)" }}
                    >
                      <span className="text-[0.95rem] font-semibold tracking-tight">
                        Send message
                      </span>
                      <span
                        className="inline-flex items-center justify-center w-9 h-9 rounded-full transition-transform group-hover:translate-x-0.5"
                        style={{ background: "var(--color-accent)" }}
                      >
                        <ChevronRight
                          className="h-4 w-4"
                          strokeWidth={2.5}
                          style={{ color: "var(--color-primary)" }}
                        />
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-span-5 max-[900px]:col-span-1 flex flex-col gap-6">
              {/* Office card */}
              <div
                className="rounded-2xl p-6 contact-form-wrap"
                style={{
                  background: "rgba(255, 255, 255, 0.6)",
                  border: "1px solid var(--color-border)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl"
                    style={{
                      background: "var(--wash-lavender)",
                      color: "var(--color-primary)",
                    }}
                  >
                    <img src="/assets/icons/location.png" alt="" className="h-5 w-5 object-contain" aria-hidden="true" />
                  </div>
                  <h3
                    className="text-[1.05rem] font-semibold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    Our office
                  </h3>
                </div>
                <p
                  className="text-[0.95rem] leading-relaxed mb-1"
                  style={{ color: "var(--color-primary)" }}
                >
                  Swahilies Inc.
                </p>
                <p
                  className="text-[0.9rem] leading-relaxed"
                  style={{ color: "var(--color-muted)" }}
                >
                  Dar es Salaam, Tanzania
                  <br />
                  Visits by appointment.
                </p>
              </div>

              {/* Socials card */}
              <div
                className="rounded-2xl p-6 contact-form-wrap"
                style={{
                  background: "var(--color-primary)",
                  color: "#fff",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <h3 className="text-[1.05rem] font-semibold mb-1">
                  Follow Swahilies
                </h3>
                <p className="text-[0.9rem] text-white/70 mb-5">
                  Product news, customer stories, market insights.
                </p>
                <div className="flex items-center gap-2">
                  {socials.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Swahilies on ${label}`}
                      className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-[0.95rem] text-white/80 hover:bg-white/10 hover:text-white hover:border-white/30 transition-colors"
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>

              {/* FAQ link card */}
              <a
                href="/#faq"
                className="contact-form-wrap group rounded-2xl p-6 flex items-center justify-between gap-4 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(14,14,16,0.08)]"
                style={{
                  background: "var(--wash-cream)",
                  color: "var(--color-primary)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div>
                  <div className="text-[0.7rem] uppercase tracking-[0.18em] font-medium mb-1" style={{ color: "var(--color-muted)" }}>
                    Self-serve
                  </div>
                  <div className="text-[1.05rem] font-semibold leading-tight">
                    Browse common questions
                  </div>
                </div>
                <ArrowUpRight
                  className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2}
                  style={{ color: "var(--color-primary)" }}
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({ id, label, type, required }) {
  return (
    <label htmlFor={id} className="flex flex-col gap-1.5">
      <span
        className="text-[0.78rem] font-medium tracking-tight"
        style={{ color: "var(--color-muted)" }}
      >
        {label}
        {required && <span style={{ color: "var(--color-accent)" }}> *</span>}
      </span>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="rounded-xl px-4 py-3 text-[0.95rem] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-shadow"
        style={{
          background: "rgba(255, 255, 255, 0.85)",
          border: "1px solid var(--color-border)",
          color: "var(--color-primary)",
        }}
      />
    </label>
  );
}

function SelectField({ id, label, options }) {
  return (
    <label htmlFor={id} className="flex flex-col gap-1.5">
      <span
        className="text-[0.78rem] font-medium tracking-tight"
        style={{ color: "var(--color-muted)" }}
      >
        {label}
      </span>
      <select
        id={id}
        name={id}
        defaultValue=""
        className="rounded-xl px-4 py-3 text-[0.95rem] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-shadow appearance-none bg-no-repeat bg-[length:14px_14px] bg-[position:right_1rem_center]"
        style={{
          background: `rgba(255, 255, 255, 0.85) url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%230E0E10' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") no-repeat right 1rem center`,
          backgroundSize: "14px",
          border: "1px solid var(--color-border)",
          color: "var(--color-primary)",
        }}
      >
        <option value="" disabled>
          Choose a topic
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function Textarea({ id, label, required }) {
  return (
    <label htmlFor={id} className="flex flex-col gap-1.5">
      <span
        className="text-[0.78rem] font-medium tracking-tight"
        style={{ color: "var(--color-muted)" }}
      >
        {label}
        {required && <span style={{ color: "var(--color-accent)" }}> *</span>}
      </span>
      <textarea
        id={id}
        name={id}
        required={required}
        rows={5}
        className="rounded-xl px-4 py-3 text-[0.95rem] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-shadow resize-none"
        style={{
          background: "rgba(255, 255, 255, 0.85)",
          border: "1px solid var(--color-border)",
          color: "var(--color-primary)",
        }}
      />
    </label>
  );
}

export default ContactPage;
