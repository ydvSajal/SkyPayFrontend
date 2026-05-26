"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  Calendar,
  Check,
  ChevronDown,
  Clock3,
  Code2,
  CreditCard,
  Globe,
  Github,
  LayoutDashboard,
  Lock,
  Menu,
  Repeat,
  Route,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Twitter,
  Users,
  Linkedin,
  X,
  Zap,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"

type Feature = {
  title: string
  description: string
  icon: typeof Globe
}

type Step = {
  title: string
  description: string
  icon: typeof Route
}

type PricingPlan = {
  name: string
  price: string
  description: string
  features: string[]
  featured?: boolean
}

const features: Feature[] = [
  { title: "Global Payments", description: "Accept money from 150+ countries with smart routing and local payment options.", icon: Globe },
  { title: "Bank-Grade Security", description: "Encryption, fraud controls, and account protections designed for finance teams.", icon: ShieldCheck },
  { title: "Instant Transfers", description: "Move funds in seconds, track every event, and keep your treasury moving.", icon: Zap },
  { title: "Developer-First API", description: "Ship quickly with clean endpoints, webhooks, and docs that stay out of your way.", icon: Code2 },
  { title: "Smart Analytics", description: "See volume, conversion, and settlement trends in one calm dashboard.", icon: BarChart3 },
  { title: "Recurring Billing", description: "Automate subscription flows, retries, and reminders without manual overhead.", icon: Repeat },
]

const steps: Step[] = [
  { title: "Create Account", description: "Sign up in minutes and verify your business with guided onboarding.", icon: Users },
  { title: "Connect & Configure", description: "Link your bank, set payment rules, and choose how money should move.", icon: Route },
  { title: "Start Transacting", description: "Launch with confidence and monitor activity from a single place.", icon: ArrowRight },
]

const pricingPlans: PricingPlan[] = [
  { name: "Starter", price: "$0", description: "For testing and small projects.", features: ["Up to 100 transactions/month", "5 payment methods", "Basic analytics", "Email support"] },
  { name: "Pro", price: "$49", description: "For growing businesses that need more.", featured: true, features: ["Unlimited transactions", "All payment methods", "Advanced analytics", "Priority support", "Custom branding"] },
  { name: "Enterprise", price: "Custom", description: "For large organizations with custom needs.", features: ["Volume discounts", "Dedicated manager", "Custom integrations", "SLA guarantees", "24/7 phone support"] },
]

const testimonials = [
  { name: "Sarah Chen", role: "CFO, TechFlow Inc", quote: "SkyPay transformed our international payments. What used to take days now settles quickly, and our cash flow is easier to manage." },
  { name: "Marcus Rivera", role: "CTO, Quantum SaaS", quote: "The API experience is excellent. We integrated the flow in an afternoon and the documentation made the entire build feel lighter." },
  { name: "Emily Watson", role: "VP Finance, Orbitex", quote: "Transparent pricing removed a lot of friction. We know exactly what we pay and where every cost comes from." },
]

const trustedLogos = ["TechFlow", "NovaPay", "Quantum", "Orbitex", "NeoBank", "Fusion", "Helix"]

export default function LandingPage() {
  const { isAuthenticated, user, isLoading } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [mobileMenuOpen])

  useEffect(() => {
    const counters = document.querySelectorAll("[data-count]")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          const target = entry.target as HTMLElement
          const value = Number(target.dataset.count || "0")
          const start = performance.now()
          const duration = 1800

          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            target.textContent = String(Math.round(value * eased))

            if (progress < 1) {
              requestAnimationFrame(tick)
            }
          }

          requestAnimationFrame(tick)
          observer.unobserve(target)
        })
      },
      { threshold: 0.5 }
    )

    counters.forEach((counter) => observer.observe(counter))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const nav = document.getElementById("navbar")
    if (!nav) return

    const onScroll = () => {
      nav.dataset.scrolled = window.scrollY > 30 ? "true" : "false"
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Testimonials", href: "#testimonials" },
  ]

  const ctaHref = isAuthenticated ? "/dashboard" : "/auth/login"
  const ctaLabel = isAuthenticated ? "Open Dashboard" : "Get Started"

  return (
    <main style={{ color: 'var(--foreground)' }} className="min-h-screen overflow-x-hidden">
      <nav id="navbar" className="fixed left-0 right-0 top-0 z-50 transition-all duration-300" data-scrolled="false">
        <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 sm:pt-5 lg:px-8">
          <div className="flex h-16 items-center justify-between rounded-full border border-white/60 dark:border-white/10 bg-white/40 dark:bg-black/40 px-4 shadow-[0_12px_40px_rgba(99,102,241,0.05)] backdrop-blur-xl sm:px-5">
            <Link href="/landing#hero" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-[var(--brand-strong)] via-[var(--brand)] to-[var(--brand-dark)] text-white shadow-[0_12px_30px_rgba(99,102,241,0.2)]">
                <Zap className="h-5 w-5" />
              </div>
              <span className="text-lg font-semibold tracking-tight sm:text-xl">
                SKY<span className="font-cormorant italic text-[var(--brand)]">Pay</span>
              </span>
            </Link>

            <div className="hidden items-center gap-2 lg:flex">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="rounded-full px-4 py-2 text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:bg-black/5 hover:text-[var(--foreground)]">
                  {link.label}
                </a>
              ))}
              <Link href="/docs" className="rounded-full px-4 py-2 text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:bg-black/5 hover:text-[var(--foreground)]">
                Docs
              </Link>
            </div>

            <div className="hidden items-center gap-3 md:flex">
              {!isLoading && isAuthenticated && user ? (
                <>
                  <span className="hidden text-sm text-[var(--muted-foreground)] xl:inline">Welcome, {user.name || user.email}</span>
                  <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-[var(--primary-foreground)] shadow-[0_10px_24px_rgba(15,23,42,0.15)] transition-transform hover:-translate-y-0.5">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="rounded-full px-4 py-2 text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:bg-black/5 hover:text-[var(--foreground)]">
                    Sign In
                  </Link>
                  <Link href={ctaHref} className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[var(--primary)] to-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-[var(--primary-foreground)] shadow-[0_10px_24px_rgba(15,23,42,0.15)] transition-transform hover:-translate-y-0.5">
                    {ctaLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </>
              )}
            </div>

              <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/50 text-[var(--primary)] transition-colors hover:bg-black/5 lg:hidden"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

            <div id="mobile-menu" className={`lg:hidden fixed inset-0 z-40 bg-[color:var(--primary)]/95 px-4 pt-24 transition-all duration-300 ${mobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}>
            <div className="mx-auto flex max-w-md flex-col gap-3 rounded-4xl border border-white/10 bg-white/5 p-5 backdrop-blur-2xl">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setMobileMenuOpen(false)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-lg font-semibold text-[var(--surface-light)] transition-colors hover:bg-white/10">
                {link.label}
              </a>
            ))}
            <Link href="/docs" onClick={() => setMobileMenuOpen(false)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-lg font-semibold text-[var(--surface-light)] transition-colors hover:bg-white/10">
              Docs
            </Link>
            <Link href={ctaHref} onClick={() => setMobileMenuOpen(false)} className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-[var(--brand-strong)] to-[var(--brand)] px-4 py-4 text-base font-semibold text-white">
              {ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </nav>

      <section id="hero" className="relative flex min-h-screen items-center overflow-hidden pt-28 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.15),transparent_30%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.15),transparent_28%)]" />
        <div className="pointer-events-none absolute -left-28 top-0 h-104 w-104 rounded-full bg-indigo-500/12 blur-3xl animate-[float_10s_ease-in-out_infinite]" />
        <div className="pointer-events-none absolute -right-24 top-24 h-88 w-88 rounded-full bg-sky-400/10 blur-3xl animate-[float_12s_ease-in-out_infinite]" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-purple-500/8 blur-3xl animate-[float_14s_ease-in-out_infinite]" />

        <div className="mx-auto grid w-full max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="text-center lg:text-left">
            {/* Scroll ornament flourish */}
            <div className="mb-6 hidden lg:flex justify-start">
              <svg className="w-24 h-6 text-slate-300 dark:text-slate-700" viewBox="0 0 100 20" fill="currentColor">
                <path d="M50,15 C40,15 35,5 20,5 C10,5 5,12 5,15 C5,18 8,18 10,18 C15,18 18,12 25,12 C35,12 40,18 50,18 C60,18 65,12 75,12 C82,12 85,18 90,18 C92,18 95,18 95,15 C95,12 90,5 80,5 C65,5 60,15 50,15 Z" />
                <circle cx="50" cy="10" r="1.5" />
              </svg>
            </div>

            <div data-reveal className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/20 px-4 py-1.5 text-xs font-semibold tracking-wide text-slate-700 dark:text-slate-300 opacity-0 transition-all duration-700 lg:mx-0">
              Global Agentic Payment Infrastructure
            </div>

            <h1 data-reveal className="font-cormorant text-5xl font-semibold leading-[1.05] tracking-[-0.02em] opacity-0 transition-all duration-700 sm:text-6xl lg:text-7xl xl:text-8xl text-slate-900 dark:text-white">
              Payments<br />
              <span className="italic font-normal">Without Borders</span>
            </h1>

            <p data-reveal className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-400 opacity-0 transition-all duration-700 sm:text-xl lg:mx-0">
              Built on agentic infrastructure. Powered by Notion databases. Delivering population-scale payment orchestration for modern global teams.
            </p>

            <div data-reveal className="mt-10 flex flex-col justify-center gap-4 opacity-0 transition-all duration-700 sm:flex-row lg:justify-start">
              <Link href={ctaHref} className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3.5 text-sm font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-md">
                {isAuthenticated ? "Open Dashboard" : "Start for Free"}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#how-it-works" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 dark:border-slate-700 bg-white/40 dark:bg-black/40 text-slate-700 dark:text-slate-300 px-8 py-3.5 text-sm font-semibold hover:bg-white/60 dark:hover:bg-black/60 transition-colors backdrop-blur-md">
                Watch Agent Demo
              </a>
            </div>

            <div data-reveal className="mt-12 flex flex-wrap items-center justify-center gap-8 opacity-0 transition-all duration-700 lg:justify-start">
              <div>
                <div className="text-3xl font-semibold tracking-tight">$2B+</div>
                <div className="text-sm text-[var(--muted-2)]">Processed Monthly</div>
              </div>
              <div className="hidden h-10 w-px bg-black/10 sm:block" />
              <div>
                <div className="text-3xl font-semibold tracking-tight">150+</div>
                <div className="text-sm text-[var(--muted-2)]">Currencies</div>
              </div>
              <div className="hidden h-10 w-px bg-black/10 sm:block" />
              <div>
                <div className="text-3xl font-semibold tracking-tight">99.9%</div>
                <div className="text-sm text-[var(--muted-2)]">Uptime</div>
              </div>
            </div>
          </div>

          <div className="hidden items-center justify-center lg:flex">
            <div className="relative w-full max-w-[520px]">
              <div className="absolute -left-6 top-16 rounded-3xl border border-white/60 dark:border-white/10 bg-white/40 dark:bg-black/40 p-4 shadow-[0_18px_40px_rgba(99,102,241,0.05)] backdrop-blur-xl animate-[float_9s_ease-in-out_infinite]">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[var(--muted-2)]">Received</div>
                    <div className="text-sm font-semibold">+$4,250.00</div>
                  </div>
                </div>
                <div className="mt-2 text-[11px] text-[var(--muted-3)]">2 minutes ago</div>
              </div>

              <div className="rounded-4xl border border-white/20 bg-linear-to-br from-slate-900 to-indigo-950 p-8 text-[var(--on-dark)] shadow-[0_24px_80px_rgba(15,23,42,0.25)] backdrop-blur-lg">
                <div className="mb-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-[var(--brand-strong)] to-[var(--brand-dark)] text-white">
                      <Zap className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-semibold">SkyPay</span>
                  </div>
                  <Lock className="h-5 w-5 text-[var(--muted-light)]" />
                </div>

                <div className="mb-8 font-mono text-xl tracking-[0.25em] text-[var(--on-dark)]">•••• •••• •••• 4289</div>

                <div className="flex items-end justify-between gap-6">
                  <div>
                    <div className="mb-1 text-[10px] uppercase tracking-[0.3em] text-[var(--muted-3)]">Card Holder</div>
                    <div className="text-sm font-medium">Alex Morgan</div>
                  </div>
                  <div className="text-right">
                    <div className="mb-1 text-[10px] uppercase tracking-[0.3em] text-[var(--muted-3)]">Expires</div>
                    <div className="text-sm font-medium">09/28</div>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="h-8 w-8 rounded-full bg-indigo-500/80" />
                    <div className="-ml-4 h-8 w-8 rounded-full bg-purple-500/80" />
                  </div>
                </div>
              </div>

              <div className="absolute -right-8 top-14 rounded-3xl border border-white/60 dark:border-white/10 bg-white/40 dark:bg-black/40 p-4 shadow-[0_18px_40px_rgba(99,102,241,0.05)] backdrop-blur-xl animate-[float_11s_ease-in-out_infinite]">
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--brand)]/10 text-[var(--brand)]">
                    <Clock3 className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[var(--muted-2)]">Pending</div>
                    <div className="text-sm font-semibold">Invoice due tomorrow</div>
                  </div>
                </div>
                <div className="text-[11px] text-[var(--muted-3)]">Workflow sync is healthy</div>
              </div>
            </div>
          </div>
        </div>

                <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[var(--muted-2)] lg:flex">
          <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </div>
      </section>

      <section className="border-y border-black/5 bg-white/45 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-8 text-center text-xs uppercase tracking-[0.35em] text-[var(--muted-2)]">Trusted by industry leaders</p>
          <div className="overflow-hidden">
            <div className="flex w-max items-center gap-14 whitespace-nowrap text-2xl font-semibold text-[var(--muted-2)] animate-[marquee_28s_linear_infinite]">
                {trustedLogos.concat(trustedLogos).map((logo, index) => (
                <span key={`${logo}-${index}`} className="flex items-center gap-3">
                  <Sparkles className="h-6 w-6 text-[var(--brand)]" />
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-reveal className="mx-auto mb-16 max-w-3xl text-center opacity-0 transition-all duration-700">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--primary)]/10 bg-white/70 px-4 py-2 text-sm text-[var(--muted-2)]">
              <Sparkles className="h-4 w-4 text-[var(--brand)]" />
              Powerful Features
            </div>
            <h2 className="font-cormorant text-4xl font-semibold tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              Everything you need to <span className="italic text-[var(--brand)]">scale globally</span>
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--muted-foreground)]">Built for modern businesses that need speed, security, and clarity in every transaction.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div key={feature.title} data-reveal className="rounded-4xl border border-white/60 dark:border-white/10 bg-white/40 dark:bg-black/40 p-8 shadow-[0_18px_50px_rgba(99,102,241,0.04)] backdrop-blur-xl opacity-0 transition-all duration-700 hover:-translate-y-2">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[color:var(--brand)]/15 bg-linear-to-br from-[var(--brand-strong)]/10 to-[var(--brand-light)]/10 text-[var(--brand)]">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                  <p className="leading-7 text-[var(--muted-foreground)]">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="relative py-24 lg:py-32">
        <div className="absolute inset-x-0 h-128 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.10),transparent_56%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-reveal className="mx-auto mb-16 max-w-3xl text-center opacity-0 transition-all duration-700">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--primary)]/10 bg-white/70 px-4 py-2 text-sm text-[var(--muted-foreground)]">
              <Route className="h-4 w-4 text-[var(--brand)]" />
              Simple Process
            </div>
            <h2 className="font-cormorant text-4xl font-semibold tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              Get started in <span className="italic text-[var(--brand)]">3 easy steps</span>
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--muted-foreground)]">From sign-up to your first payment, everything is designed to feel effortless.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={step.title} data-reveal className="group relative text-center opacity-0 transition-all duration-700">
                  <div className="relative z-10 mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/60 dark:border-white/10 bg-linear-to-br from-white dark:from-zinc-900 to-slate-100/50 dark:to-slate-950/50 shadow-[0_16px_36px_rgba(15,23,42,0.03)] transition-transform duration-300 group-hover:-translate-y-1">
                      <span className="text-3xl font-semibold text-[var(--brand)]">0{index + 1}</span>
                  </div>
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--brand)]/10 text-[var(--brand)]">
                    <Icon className="h-5 w-5" />
                  </div>
                    <h3 className="mb-4 text-2xl font-semibold">{step.title}</h3>
                    <p className="mx-auto max-w-sm leading-7 text-[var(--muted-foreground)]">{step.description}</p>
                    {index < steps.length - 1 ? <div className="absolute right-[-12%] top-10 hidden h-px w-[24%] bg-linear-to-r from-[var(--brand)]/40 to-transparent md:block" /> : null}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-reveal className="rounded-4xl border border-white/60 dark:border-white/10 bg-white/40 dark:bg-black/40 p-8 shadow-[0_18px_50px_rgba(99,102,241,0.04)] backdrop-blur-xl opacity-0 transition-all duration-700 md:p-12 lg:p-16">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
              <div className="text-center">
                <div className="mb-2 text-4xl font-semibold tracking-tight text-[var(--brand)]" data-count="50">0</div>
                <div className="text-xs uppercase tracking-[0.25em] text-[var(--muted-3)]">K+ Active Users</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-4xl font-semibold tracking-tight text-[var(--brand)]" data-count="2">0</div>
                <div className="text-xs uppercase tracking-[0.25em] text-[var(--muted-3)]">B+ Processed</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-4xl font-semibold tracking-tight text-[var(--brand)]" data-count="150">0</div>
                <div className="text-xs uppercase tracking-[0.25em] text-[var(--muted-3)]">+ Currencies</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-4xl font-semibold tracking-tight text-[var(--brand)]" data-count="99">0</div>
                <div className="text-xs uppercase tracking-[0.25em] text-[var(--muted-3)]">.9% Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-reveal className="mx-auto mb-16 max-w-3xl text-center opacity-0 transition-all duration-700">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--primary)]/10 bg-white/70 px-4 py-2 text-sm text-[var(--muted-foreground)]">
              <CreditCard className="h-4 w-4 text-[var(--brand)]" />
              Simple Pricing
            </div>
            <h2 className="font-cormorant text-4xl font-semibold tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              Transparent <span className="italic text-[var(--brand)]">pricing</span>, no surprises
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--muted-foreground)]">Only pay for what you use. No hidden fees, no long-term contracts.</p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            {pricingPlans.map((plan) => (
                <div key={plan.name} data-reveal className={`relative rounded-4xl border p-8 shadow-[0_18px_50px_rgba(15,23,42,0.03)] backdrop-blur-xl opacity-0 transition-all duration-700 hover:-translate-y-2 ${plan.featured ? "border-slate-300 dark:border-slate-700 bg-linear-to-br from-white dark:from-zinc-900 to-slate-50/50 dark:to-slate-950/50 ring-1 ring-slate-200 dark:ring-slate-800" : "border-white/60 dark:border-white/10 bg-white/40 dark:bg-black/40"}`}>
                {plan.featured ? <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-r from-[var(--brand-strong)] to-[var(--brand)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white font-sans">Most Popular</div> : null}
                  <div className="mb-4 text-sm uppercase tracking-[0.25em] text-[var(--muted-3)]">{plan.name}</div>
                <div className="mb-2 flex items-baseline gap-1">
                  <span className="text-5xl font-semibold tracking-tight">{plan.price}</span>
                    {plan.price !== "Custom" ? <span className="text-[var(--muted-3)]">/mo</span> : null}
                </div>
                  <p className="mb-8 text-[var(--muted-foreground)]">{plan.description}</p>
                <ul className="mb-10 space-y-4">
                  {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-[var(--foreground)]">
                        <Check className="h-5 w-5 shrink-0 text-[var(--brand)]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                  <Link href={plan.name === "Enterprise" ? "/auth/login" : ctaHref} className={`block rounded-2xl px-4 py-3.5 text-center font-semibold transition-transform hover:-translate-y-0.5 ${plan.featured ? "bg-linear-to-r from-[var(--primary)] to-indigo-950 text-[var(--primary-foreground)]" : "border border-[color:var(--primary)]/10 dark:border-white/10 bg-white/80 dark:bg-zinc-900/80 text-[var(--foreground)]"}`}>
                  {plan.name === "Enterprise" ? "Contact Sales" : plan.featured ? "Start Free Trial" : "Get Started"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-reveal className="mx-auto mb-16 max-w-3xl text-center opacity-0 transition-all duration-700">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--primary)]/10 bg-white/70 px-4 py-2 text-sm text-[var(--muted-foreground)]">
              <Star className="h-4 w-4 text-[var(--brand)]" />
              Loved by Teams
            </div>
            <h2 className="font-cormorant text-4xl font-semibold tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              What our <span className="italic text-[var(--brand)]">customers say</span>
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--muted-foreground)]">Hear from the teams that trust SkyPay for everyday payments.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} data-reveal className="rounded-4xl border border-white/60 dark:border-white/10 bg-white/40 dark:bg-black/40 p-8 shadow-[0_18px_50px_rgba(99,102,241,0.04)] backdrop-blur-xl opacity-0 transition-all duration-700">
                <div className="mb-6 flex gap-1 text-[var(--brand-light)]">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <p className="mb-8 leading-8 text-[var(--muted-foreground)]">{testimonial.quote}</p>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-[var(--brand-strong)]/20 to-[var(--brand-light)]/20 text-[var(--brand)]">
                    {testimonial.name.split(" ").map((part) => part[0]).join("")}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-[var(--muted-3)]">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/20 bg-linear-to-b from-[#1E293B] to-[#0F172A] px-8 py-16 text-center text-white shadow-2xl sm:px-12 lg:px-20 lg:py-20">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom_center,rgba(99,102,241,0.5),transparent_60%)]" />
            <div className="relative z-10 mx-auto max-w-3xl flex flex-col items-center">
              <h2 className="font-cormorant text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl mb-6">
                Build the Future of Payments <span className="italic font-normal">with SKYPay</span>
              </h2>
              <p className="mx-auto max-w-xl text-md leading-8 text-slate-300 mb-8">
                Join the businesses that trust SKYPay to automate, secure, and settle global payments on Notion.
              </p>
              
              {/* Star ornament flourish */}
              <div className="mb-8 text-white">
                <svg className="w-8 h-8 animate-pulse text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M5.636 5.636l12.728 12.728M5.636 19.364L18.764 6.236" />
                </svg>
              </div>

              <Link href={ctaHref} className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-slate-900 px-8 py-3.5 text-sm font-semibold hover:bg-slate-100 transition-colors shadow-lg">
                {ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative border-t border-white/60 dark:border-white/10 bg-white/20 dark:bg-black/30 backdrop-blur-xl py-16 shadow-[0_-12px_40px_rgba(99,102,241,0.03)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-6">
            <div className="md:col-span-3 lg:col-span-1">
              <Link href="/landing#hero" className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-[var(--brand-strong)] to-[var(--brand-dark)] text-white">
                  <Zap className="h-5 w-5" />
                </div>
                <span className="text-xl font-semibold">
                  SKY<span className="font-cormorant italic text-[var(--brand)]">Pay</span>
                </span>
              </Link>
              <p className="max-w-sm text-xs leading-7 text-slate-500">Payments without borders. Built for teams that want global money movement to feel simple.</p>
              
              {/* Credentials Badges like Sarvam */}
              <div className="mt-6 flex gap-2">
                <div className="flex flex-col items-center justify-center rounded-lg border border-slate-200 bg-white/80 p-2 text-[9px] font-semibold text-slate-500 shadow-sm w-16">
                  <span>ISO</span>
                  <span className="text-[8px]">27001</span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border border-slate-200 bg-white/80 p-2 text-[9px] font-semibold text-slate-500 shadow-sm w-16">
                  <span>SOC 2</span>
                  <span className="text-[8px]">TYPE I</span>
                </div>
              </div>
            </div>

            {[
              { title: "Products", items: ["SKYPay Invoice", "SKYPay Links", "Agent Automation", "Treasury Ops"] },
              { title: "APIs", items: ["Payment API", "Webhooks API", "Developer Sandbox", "Integrations"] },
              { title: "Developers", items: ["Documentation", "API Pricing", "System Status", "Changelog"] },
              { title: "Company", items: ["About SKYPay", "Agent Blog", "Careers", "Contact"] },
              { title: "Socials", items: ["Twitter", "GitHub", "LinkedIn", "Discord"] },
            ].map((column) => (
              <div key={column.title}>
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">{column.title}</h4>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                  {column.items.map((item) => (
                    <li key={item}>
                      <a href="#" className="transition-colors hover:text-slate-950 dark:hover:text-white">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t border-black/5 pt-8 text-sm text-[var(--muted-2)] md:flex-row md:items-center md:justify-between">
            <p>© 2026 SkyPay. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              All systems operational
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        [data-reveal] {
          transform: translateY(24px);
        }

        [data-reveal].is-visible {
          opacity: 1 !important;
          transform: translateY(0);
        }

        #navbar[data-scrolled='true'] .mx-auto > .flex {
          background: rgba(255, 255, 255, 0.75);
          box-shadow: 0 18px 40px rgba(15, 23, 42, 0.05);
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-16px);
          }
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </main>
  )
}
