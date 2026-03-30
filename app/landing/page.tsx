"use client"

import { useState, useEffect, useRef } from "react"
import {
  ArrowRight,
  CheckCircle,
  Database,
  Globe,
  MessageSquare,
  Zap,
  Users,
  Bot,
  LinkIcon,
  Calendar,
  Send,
  RefreshCw,
  Bell,
  Sparkles,
  LayoutDashboard,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"

export default function LandingPage() {
  const [email, setEmail] = useState("")
  const { isAuthenticated, user, isLoading } = useAuth()
  const [footerVisible, setFooterVisible] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setFooterVisible(true)
      },
      { threshold: 0.05 }
    )
    if (footerRef.current) observer.observe(footerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen" style={{ background: "hsl(220, 30%, 98%)", fontFamily: "var(--font-inter), 'Inter', sans-serif" }}>

      {/* Navigation */}
      {/* Floating Glassmorphism Navbar */}
      <div style={{
        position: "fixed",
        top: "18px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        width: "calc(100% - 48px)",
        maxWidth: "900px",
      }}>
        <nav style={{
          background: "rgba(255, 255, 255, 0.6)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderRadius: "100px",
          border: "1px solid rgba(255, 255, 255, 0.9)",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255,255,255,0.8)",
          padding: "0 6px 0 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "56px",
        }}>
          {/* Logo + Nav Links */}
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            <Link href="/landing#hero" style={{ textDecoration: "none" }}>
              <h1 style={{
                fontSize: "22px", fontWeight: "600",
                letterSpacing: "0.01em", color: "#0f0f0f", margin: 0,
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                lineHeight: 1,
                cursor: "pointer",
              }}>
                SKYPay
              </h1>
            </Link>
            <div style={{ display: "flex", gap: "2px", alignItems: "center" }} className="nav-links-desktop">
              {["Features", "Pricing", "Docs"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  style={{
                    color: "#555",
                    textDecoration: "none",
                    padding: "5px 12px",
                    borderRadius: "100px",
                    fontSize: "12.5px",
                    fontWeight: "500",
                    letterSpacing: "0.03em",
                    textTransform: "uppercase",
                    transition: "color 0.2s, background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = "#0f0f0f";
                    (e.target as HTMLElement).style.background = "rgba(0,0,0,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = "#555";
                    (e.target as HTMLElement).style.background = "transparent";
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Auth Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {!isLoading && (
              <>
                {isAuthenticated && user ? (
                  <>
                    <span style={{ fontSize: "12px", color: "#666", paddingRight: "8px" }}>
                      Welcome, {user.name || user.email}
                    </span>
                    <Link href="/dashboard" style={{
                      display: "flex", alignItems: "center", gap: "6px",
                      padding: "8px 16px", borderRadius: "100px",
                      background: "#0f0f0f", color: "#fff",
                      textDecoration: "none", fontSize: "12.5px", fontWeight: "600",
                      transition: "opacity 0.2s",
                    }}>
                      <LayoutDashboard size={13} />
                      Dashboard
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" style={{
                      color: "#555", textDecoration: "none",
                      padding: "8px 14px", borderRadius: "100px",
                      fontSize: "12.5px", fontWeight: "500",
                      transition: "color 0.2s, background 0.2s",
                    }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.05)";
                        (e.currentTarget as HTMLElement).style.color = "#0f0f0f";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                        (e.currentTarget as HTMLElement).style.color = "#555";
                      }}
                    >
                      Sign In
                    </Link>
                    <Link href="/auth/login" style={{
                      display: "inline-flex", alignItems: "center",
                      padding: "8px 18px", borderRadius: "100px",
                      background: "#0f0f0f", color: "#fff",
                      textDecoration: "none", fontSize: "12.5px", fontWeight: "600",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      transition: "transform 0.15s, box-shadow 0.15s",
                    }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.2)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
                      }}
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </nav>
      </div>


      {/* Hero Section */}
      <section id="hero" style={{
        position: "relative",
        overflow: "hidden",
        paddingTop: "120px",
        paddingBottom: "40px",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
      }}>
        {/* Top atmospheric gradient similar to the Sarvam-style hero */}
        <div style={{
          position: "absolute",
          inset: "0 0 auto 0",
          height: "62vh",
          background: "linear-gradient(180deg, rgba(255, 232, 204, 0.85) 0%, rgba(255, 240, 222, 0.55) 26%, rgba(242, 236, 255, 0.35) 52%, rgba(220, 239, 255, 0.22) 72%, rgba(220, 239, 255, 0) 100%)",
          pointerEvents: "none",
        }} />

        <div style={{
          position: "absolute", top: "-170px", left: "50%", transform: "translateX(-50%)",
          width: "860px", height: "460px",
          background: "radial-gradient(ellipse, rgba(251, 146, 60, 0.46) 0%, rgba(251, 146, 60, 0.24) 30%, rgba(167, 139, 250, 0.22) 55%, rgba(125, 211, 252, 0.14) 70%, transparent 84%)",
          borderRadius: "50%",
          filter: "blur(56px)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "4%", left: "4%",
          width: "450px", height: "320px",
          background: "radial-gradient(ellipse, rgba(251, 146, 60, 0.22) 0%, rgba(249, 115, 22, 0.12) 35%, transparent 72%)",
          borderRadius: "50%",
          filter: "blur(80px)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "3%", right: "4%",
          width: "430px", height: "310px",
          background: "radial-gradient(ellipse, rgba(96, 165, 250, 0.22) 0%, rgba(167, 139, 250, 0.14) 45%, transparent 74%)",
          borderRadius: "50%",
          filter: "blur(80px)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", width: "100%", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
            {/* Decorative ornament */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "28px" }}>
              <span style={{ fontSize: "20px", letterSpacing: "8px", color: "#ccc" }}>✦ ✦ ✦</span>
            </div>

            {/* Badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "24px" }}>
              <span style={{
                padding: "6px 16px",
                border: "1px solid rgba(0,0,0,0.12)",
                borderRadius: "100px",
                fontSize: "12px",
                color: "#444",
                background: "rgba(255,255,255,0.8)",
                letterSpacing: "0.02em",
              }}>
                Agentic Payment Infrastructure
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(46px, 7vw, 88px)",
              fontWeight: "600",
              letterSpacing: "-1px",
              lineHeight: 1.05,
              color: "#0f0f0f",
              margin: "0 0 24px 0",
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
            }}>
              Your AI agent handles
              <br />
              <span style={{ color: "#0f0f0f", fontStyle: "normal" }}>all crypto payments</span>
            </h1>

            <p style={{
              fontSize: "18px",
              color: "#555",
              lineHeight: 1.7,
              maxWidth: "560px",
              margin: "0 auto 40px",
            }}>
              SKYPay is the first agentic payment infrastructure. An AI agent that automatically schedules, sends,
              receives, and manages all your crypto payments. Powered by X402Pay &amp; Notion.
            </p>

            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/auth/login" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "14px 28px", borderRadius: "100px",
                background: "#0f0f0f", color: "#fff",
                textDecoration: "none", fontSize: "15px", fontWeight: "600",
                transition: "transform 0.2s, box-shadow 0.2s",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(0,0,0,0.2)" }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)" }}
              >
                Start Your Agent Free
                <ArrowRight size={16} />
              </Link>
              <button style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "14px 28px", borderRadius: "100px",
                background: "rgba(255,255,255,0.9)", color: "#333",
                border: "1px solid rgba(0,0,0,0.1)",
                fontSize: "15px", fontWeight: "500", cursor: "pointer",
                transition: "background 0.2s",
              }}>
                Watch Demo
              </button>
            </div>
            <p style={{ fontSize: "13px", color: "#888", marginTop: "20px" }}>
              Connect your Notion • Agent handles the rest • Powered by X402Pay
            </p>
          </div>

          {/* Hero Demo Card */}
          <div style={{ marginTop: "60px" }}>
            <div style={{
              background: "linear-gradient(145deg, rgba(255,255,255,0.94) 0%, rgba(250,252,255,0.92) 52%, rgba(255,248,238,0.92) 100%)",
              borderRadius: "24px",
              border: "1px solid rgba(17,24,39,0.08)",
              boxShadow: "0 24px 90px rgba(15,23,42,0.08), 0 8px 30px rgba(15,23,42,0.06)",
              overflow: "hidden",
              backdropFilter: "blur(12px)",
            }}>
              {/* Window bar */}
              <div style={{
                background: "rgba(247,249,255,0.9)",
                padding: "12px 20px",
                borderBottom: "1px solid rgba(15,23,42,0.06)",
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e" }} />
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28ca41" }} />
                  <span style={{ fontSize: "12px", color: "#7b8190", marginLeft: "8px" }}>SKYPay Agent • Live Workspace</span>
                </div>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "5px 10px",
                  borderRadius: "999px",
                  background: "rgba(34,197,94,0.1)",
                  color: "#15803d",
                  fontSize: "11px",
                  fontWeight: "600",
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                  Sync Healthy
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 0.9fr)" }}>
                {/* Notion Side */}
                <div style={{ padding: "28px", borderRight: "1px solid rgba(15,23,42,0.06)", background: "rgba(255,255,255,0.55)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                    <Database size={20} color="#333" />
                    <span style={{ fontWeight: "600", fontSize: "14px" }}>Your Notion Database</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "8px", marginBottom: "16px" }}>
                    {[
                      { label: "Open", value: "12" },
                      { label: "Paid", value: "84" },
                      { label: "Recovered", value: "91%" },
                    ].map((metric) => (
                      <div key={metric.label} style={{
                        borderRadius: "12px",
                        border: "1px solid rgba(15,23,42,0.06)",
                        background: "rgba(248,250,255,0.9)",
                        padding: "10px 12px",
                      }}>
                        <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#8d94a5", margin: "0 0 4px" }}>{metric.label}</p>
                        <p style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", margin: 0 }}>{metric.value}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {[
                      { name: "Acme Corp Invoice", sub: "Due: Tomorrow • 0.15 ETH", badge: "Pending", badgeColor: "#d97706", badgeBg: "rgba(245,158,11,0.14)" },
                      { name: "Monthly Subscription", sub: "Auto-renew: Jan 15 • 120 USDC", badge: "Scheduled", badgeColor: "#2563eb", badgeBg: "rgba(59,130,246,0.12)" },
                      { name: "Design Retainer", sub: "Reminder in 4h • 0.42 ETH", badge: "Follow-up", badgeColor: "#9333ea", badgeBg: "rgba(147,51,234,0.11)" },
                    ].map((item) => (
                      <div key={item.name} style={{
                        background: "rgba(248,249,255,0.86)",
                        borderRadius: "14px", padding: "13px 16px",
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        border: "1px solid rgba(15,23,42,0.05)",
                      }}>
                        <div>
                          <p style={{ fontWeight: "500", fontSize: "13px", margin: "0 0 2px" }}>{item.name}</p>
                          <p style={{ fontSize: "11px", color: "#888", margin: 0 }}>{item.sub}</p>
                        </div>
                        <span style={{
                          padding: "3px 10px", borderRadius: "100px",
                          fontSize: "11px", fontWeight: "600",
                          color: item.badgeColor, background: item.badgeBg,
                        }}>{item.badge}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Agent Side */}
                <div style={{ padding: "28px", background: "linear-gradient(165deg, rgba(255,255,255,0.42) 0%, rgba(240,247,255,0.62) 100%)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", marginBottom: "18px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Bot size={20} color="#6366f1" />
                    <span style={{ fontWeight: "600", fontSize: "14px" }}>SKYPay Agent</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "#22c55e" }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                      Active
                    </span>
                  </div>
                    <span style={{ fontSize: "11px", fontWeight: "600", color: "#64748b" }}>Autonomous Mode</span>
                  </div>

                  <div style={{
                    borderRadius: "14px",
                    border: "1px solid rgba(99,102,241,0.16)",
                    background: "linear-gradient(135deg, rgba(99,102,241,0.09) 0%, rgba(14,165,233,0.07) 100%)",
                    padding: "12px 14px",
                    marginBottom: "14px",
                  }}>
                    <p style={{ margin: "0 0 4px", fontSize: "11px", color: "#64748b", letterSpacing: "0.04em", textTransform: "uppercase" }}>Current instruction</p>
                    <p style={{ margin: 0, fontSize: "13px", color: "#1e293b", fontWeight: "500" }}>
                      "Collect 0.15 ETH from Acme Corp, auto-refund after 30 days, then mark paid in Notion."
                    </p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {[
                      { Icon: Send, color: "#6366f1", title: "Invoice delivered with dynamic pay-link", sub: "X402Pay + email personalization • 2 min ago" },
                      { Icon: Calendar, color: "#8b5cf6", title: "Refund and follow-up workflow armed", sub: "Auto refund on day 30 • 4 min ago" },
                      { Icon: Bell, color: "#f97316", title: "Risk monitor flagged a late payer", sub: "Reminder queued with adaptive retry • 8 min ago" },
                    ].map(({ Icon, color, title, sub }) => (
                      <div key={title} style={{
                        display: "flex", gap: "12px", alignItems: "flex-start",
                        borderRadius: "12px",
                        padding: "10px",
                        border: "1px solid rgba(15,23,42,0.05)",
                        background: "rgba(255,255,255,0.66)",
                      }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: "8px",
                          background: `${color}15`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0,
                        }}>
                          <Icon size={14} color={color} />
                        </div>
                        <div>
                          <p style={{ fontWeight: "500", fontSize: "13px", margin: "0 0 2px" }}>{title}</p>
                          <p style={{ fontSize: "11px", color: "#888", margin: 0 }}>{sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{
                    marginTop: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}>
                    <span style={{ fontSize: "11px", color: "#64748b" }}>Last sync: 12 seconds ago</span>
                    <button style={{
                      border: "1px solid rgba(15,23,42,0.1)",
                      background: "rgba(255,255,255,0.9)",
                      color: "#334155",
                      borderRadius: "999px",
                      padding: "6px 12px",
                      fontSize: "11px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}>
                      View Agent Log
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider label - inspired by Sarvam "INDIA BUILDS WITH SARVAM" */}
      <div style={{ textAlign: "center", padding: "28px 0 40px", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
        <span style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#aaa" }}>
          BUILT ON SOVEREIGN INFRASTRUCTURE • POWERED BY X402PAY
        </span>
      </div>

      {/* How It Works */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              fontWeight: "700",
              letterSpacing: "-1px",
              color: "#0f0f0f",
              margin: "0 0 16px",
              lineHeight: 1.2,
            }}>
              Set it up once,<br />agent handles everything
            </h2>
            <p style={{ fontSize: "16px", color: "#666", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
              Connect your Notion workspace and let SKYPay&apos;s AI agent automate your entire crypto payment workflow.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {[
              {
                num: "01",
                icon: Database,
                color: "#6366f1",
                bg: "rgba(99,102,241,0.08)",
                title: "Connect Notion",
                desc: "Link your existing Notion database or use our template. Your payment data stays in Notion where you already work.",
              },
              {
                num: "02",
                icon: Bot,
                color: "#8b5cf6",
                bg: "rgba(139,92,246,0.08)",
                title: "Agent Activates",
                desc: "SKYPay AI monitors your Notion database 24/7, automatically creating invoices, scheduling payments, and handling follow-ups.",
              },
              {
                num: "03",
                icon: Zap,
                color: "#f97316",
                bg: "rgba(249,115,22,0.08)",
                title: "Payments Flow",
                desc: "X402Pay processes all crypto transactions while your agent handles scheduling, reminders, refunds, and updates your Notion automatically.",
              },
            ].map(({ num, icon: Icon, color, bg, title, desc }) => (
              <div key={num} style={{
                background: "rgba(248,249,252,0.6)",
                borderRadius: "20px",
                padding: "36px 28px",
                border: "1px solid rgba(0,0,0,0.05)",
                textAlign: "center",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)" }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "none" }}
              >
                <div style={{
                  width: 60, height: 60, borderRadius: "16px",
                  background: bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 20px",
                }}>
                  <Icon size={28} color={color} />
                </div>
                <p style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", color: "#bbb", marginBottom: "8px", textTransform: "uppercase" }}>{num}</p>
                <h3 style={{ fontWeight: "700", fontSize: "18px", color: "#0f0f0f", margin: "0 0 12px" }}>{title}</h3>
                <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.7, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{
        padding: "80px 24px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background gradient blob */}
        <div style={{
          position: "absolute", bottom: "-200px", left: "50%", transform: "translateX(-50%)",
          width: "800px", height: "500px",
          background: "radial-gradient(ellipse, rgba(251, 146, 60, 0.15) 0%, rgba(196, 181, 253, 0.12) 45%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(80px)",
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              fontWeight: "700",
              letterSpacing: "-1px",
              color: "#0f0f0f",
              margin: "0 0 16px",
              lineHeight: 1.2,
            }}>
              Your AI payment agent capabilities
            </h2>
            <p style={{ fontSize: "16px", color: "#666", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
              SKYPay&apos;s agent doesn&apos;t just process payments—it manages your entire payment workflow intelligently.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
            {[
              { Icon: Calendar, color: "#6366f1", title: "Automated Scheduling", desc: "Agent automatically schedules recurring payments, subscription renewals, and invoice due dates based on your Notion data." },
              { Icon: Send, color: "#8b5cf6", title: "Smart Payment Sending", desc: "Create payment requests in Notion, agent instantly generates X402Pay links and sends them to clients with personalized messages." },
              { Icon: Bell, color: "#22c55e", title: "Intelligent Follow-ups", desc: "Agent tracks payment status and automatically sends reminders, escalations, and thank you messages at the right time." },
              { Icon: RefreshCw, color: "#ef4444", title: "Automatic Reconciliation", desc: "When payments are received, agent automatically updates your Notion database, marks invoices as paid, and triggers next actions." },
              { Icon: MessageSquare, color: "#f97316", title: "Natural Language Control", desc: "Chat with your agent using plain English: \"Send invoice to Acme Corp for 0.15 ETH\" or \"Refund John's deposit.\"" },
              { Icon: Sparkles, color: "#a855f7", title: "Workflow Automation", desc: "Agent learns your patterns and automates complex workflows like subscription management, refund processing, and client onboarding." },
            ].map(({ Icon, color, title, desc }) => (
              <div key={title} style={{
                background: "rgba(255,255,255,0.85)",
                borderRadius: "20px",
                padding: "28px",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)" }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px rgba(0,0,0,0.04)" }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: "12px",
                  background: `${color}15`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "20px",
                }}>
                  <Icon size={22} color={color} />
                </div>
                <h3 style={{ fontWeight: "700", fontSize: "16px", color: "#0f0f0f", margin: "0 0 10px" }}>{title}</h3>
                <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.7, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notion Integration Showcase */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
            <div>
              <h2 style={{
                fontSize: "clamp(28px, 3.5vw, 44px)",
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                fontWeight: "700",
                letterSpacing: "-1px",
                color: "#0f0f0f",
                margin: "0 0 20px",
                lineHeight: 1.2,
              }}>
                Works natively with your Notion workspace
              </h2>
              <p style={{ fontSize: "16px", color: "#666", lineHeight: 1.7, marginBottom: "32px" }}>
                No need to learn new tools. SKYPay&apos;s agent integrates seamlessly with your existing Notion databases,
                turning them into powerful payment management systems.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "36px" }}>
                {[
                  "Create invoices directly in Notion",
                  "Agent monitors database changes in real-time",
                  "Automatic status updates and payment tracking",
                  "Custom workflows based on your database structure",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: "50%",
                      background: "rgba(34,197,94,0.12)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <CheckCircle size={13} color="#22c55e" />
                    </div>
                    <span style={{ fontSize: "14px", color: "#444" }}>{item}</span>
                  </div>
                ))}
              </div>
              <button style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "14px 24px", borderRadius: "100px",
                background: "#0f0f0f", color: "#fff",
                border: "none", fontSize: "14px", fontWeight: "600", cursor: "pointer",
                transition: "opacity 0.2s",
              }}>
                Connect Your Notion
                <ArrowRight size={15} />
              </button>
            </div>

            <div style={{
              background: "rgba(248,249,252,0.8)",
              borderRadius: "20px",
              padding: "6px",
              border: "1px solid rgba(0,0,0,0.06)",
            }}>
              <div style={{
                background: "#fff",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(0,0,0,0.05)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              }}>
                <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Database size={16} color="#555" />
                  <span style={{ fontWeight: "600", fontSize: "14px" }}>Client Invoices Database</span>
                </div>
                <div style={{ padding: "20px" }}>
                  <div style={{
                    display: "grid", gridTemplateColumns: "1fr 80px 80px 110px",
                    gap: "12px", fontSize: "11px", fontWeight: "600",
                    color: "#999", textTransform: "uppercase", letterSpacing: "0.05em",
                    paddingBottom: "12px", borderBottom: "1px solid rgba(0,0,0,0.06)",
                    marginBottom: "12px",
                  }}>
                    <div>Client</div>
                    <div>Amount</div>
                    <div>Status</div>
                    <div>Action</div>
                  </div>
                  {[
                    { client: "Acme Corp", amount: "0.15 ETH", badge: "Pending", badgeC: "#f59e0b", badgeBg: "rgba(245,158,11,0.1)", action: "Agent: Sent reminder", actionC: "#6366f1" },
                    { client: "TechStart", amount: "0.25 ETH", badge: "Paid", badgeC: "#22c55e", badgeBg: "rgba(34,197,94,0.1)", action: "Agent: Updated", actionC: "#22c55e" },
                    { client: "DevCorp", amount: "0.08 ETH", badge: "Scheduled", badgeC: "#3b82f6", badgeBg: "rgba(59,130,246,0.1)", action: "Agent: Sending Jan 15", actionC: "#8b5cf6" },
                  ].map((row) => (
                    <div key={row.client} style={{
                      display: "grid", gridTemplateColumns: "1fr 80px 80px 110px",
                      gap: "12px", alignItems: "center",
                      padding: "10px 0",
                      borderBottom: "1px solid rgba(0,0,0,0.04)",
                    }}>
                      <div style={{ fontSize: "13px", fontWeight: "500" }}>{row.client}</div>
                      <div style={{ fontSize: "13px", color: "#444" }}>{row.amount}</div>
                      <div>
                        <span style={{
                          padding: "3px 8px", borderRadius: "100px",
                          fontSize: "11px", fontWeight: "600",
                          color: row.badgeC, background: row.badgeBg,
                        }}>{row.badge}</span>
                      </div>
                      <div style={{ fontSize: "11px", color: row.actionC, fontWeight: "500" }}>{row.action}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Inspired by Sarvam pricing UI */}
      <section id="pricing" style={{
        padding: "80px 24px",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(to bottom, hsl(220, 30%, 98%), #fff)",
      }}>
        <div style={{
          position: "absolute", top: "-100px", left: "50%", transform: "translateX(-50%)",
          width: "600px", height: "350px",
          background: "radial-gradient(ellipse, rgba(196, 181, 253, 0.2) 0%, transparent 70%)",
          borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none",
        }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Ornament */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <span style={{ fontSize: "16px", letterSpacing: "6px", color: "#ddd" }}>✦ ✦ ✦</span>
          </div>

          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              fontWeight: "700",
              letterSpacing: "-1px",
              color: "#0f0f0f",
              margin: "0 0 16px",
              lineHeight: 1.2,
            }}>
              Simple pricing for your payment agent
            </h2>
            <p style={{ fontSize: "16px", color: "#666", margin: 0 }}>
              Start free, scale as your automated payments grow
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", alignItems: "start" }}>
            {/* Starter */}
            <div style={{
              background: "#fff",
              borderRadius: "20px",
              border: "1px solid rgba(0,0,0,0.08)",
              padding: "32px 28px",
              boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
            }}>
              <p style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#999", margin: "0 0 12px" }}>STARTER</p>
              <h3 style={{ fontSize: "36px", fontWeight: "700", color: "#0f0f0f", margin: "0 0 8px", letterSpacing: "-1px" }}>Free</h3>
              <p style={{ fontSize: "14px", color: "#888", margin: "0 0 28px" }}>Perfect for getting started</p>
              <div style={{ height: "1px", background: "rgba(0,0,0,0.06)", margin: "0 0 24px" }} />
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: "12px" }}>
                {["Up to $1,000/month automated", "Basic AI agent capabilities", "Notion integration", "X402Pay processing"].map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#444" }}>
                    <CheckCircle size={15} color="#22c55e" style={{ flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
              <button style={{
                width: "100%", padding: "13px", borderRadius: "100px",
                background: "#f4f4f5", color: "#333",
                border: "none", fontSize: "14px", fontWeight: "600", cursor: "pointer",
                transition: "background 0.2s",
              }}>
                Start Free Agent
              </button>
            </div>

            {/* Pro - Most Popular */}
            <div style={{
              background: "#fff",
              borderRadius: "20px",
              border: "2px solid #6366f1",
              padding: "32px 28px",
              boxShadow: "0 8px 40px rgba(99,102,241,0.15)",
              position: "relative",
            }}>
              <div style={{
                position: "absolute",
                top: "-14px", left: "50%", transform: "translateX(-50%)",
                padding: "4px 16px", borderRadius: "100px",
                background: "#6366f1", color: "#fff",
                fontSize: "11px", fontWeight: "700", letterSpacing: "0.05em",
                textTransform: "uppercase", whiteSpace: "nowrap",
              }}>MOST POPULAR</div>
              <p style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#6366f1", margin: "0 0 12px" }}>PRO AGENT</p>
              <h3 style={{ fontSize: "36px", fontWeight: "700", color: "#0f0f0f", margin: "0 0 8px", letterSpacing: "-1px" }}>2.9%</h3>
              <p style={{ fontSize: "14px", color: "#888", margin: "0 0 28px" }}>Per automated transaction</p>
              <div style={{ height: "1px", background: "rgba(0,0,0,0.06)", margin: "0 0 24px" }} />
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: "12px" }}>
                {["Unlimited automated volume", "Advanced agent workflows", "Smart scheduling & follow-ups", "Custom Notion templates", "Priority agent support"].map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#444" }}>
                    <CheckCircle size={15} color="#6366f1" style={{ flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
              <button style={{
                width: "100%", padding: "13px", borderRadius: "100px",
                background: "#0f0f0f", color: "#fff",
                border: "none", fontSize: "14px", fontWeight: "600", cursor: "pointer",
                transition: "opacity 0.2s",
              }}>
                Activate Pro Agent
              </button>
            </div>

            {/* Enterprise */}
            <div style={{
              background: "#fff",
              borderRadius: "20px",
              border: "1px solid rgba(0,0,0,0.08)",
              padding: "32px 28px",
              boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
            }}>
              <p style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#999", margin: "0 0 12px" }}>ENTERPRISE</p>
              <h3 style={{ fontSize: "36px", fontWeight: "700", color: "#0f0f0f", margin: "0 0 8px", letterSpacing: "-1px" }}>Custom</h3>
              <p style={{ fontSize: "14px", color: "#888", margin: "0 0 28px" }}>For large-scale automation</p>
              <div style={{ height: "1px", background: "rgba(0,0,0,0.06)", margin: "0 0 24px" }} />
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: "12px" }}>
                {["Volume-based pricing", "Multi-workspace agents", "Custom agent training", "Dedicated agent manager", "White-label deployment"].map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#444" }}>
                    <CheckCircle size={15} color="#22c55e" style={{ flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
              <button style={{
                width: "100%", padding: "13px", borderRadius: "100px",
                background: "#f4f4f5", color: "#333",
                border: "none", fontSize: "14px", fontWeight: "600", cursor: "pointer",
              }}>
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - with gradient similar to footer blob */}
      <section style={{
        padding: "80px 24px",
        position: "relative",
        overflow: "hidden",
        background: "#fff",
      }}>
        <div style={{
          position: "absolute", bottom: "-100px", left: "50%", transform: "translateX(-50%)",
          width: "900px", height: "500px",
          background: "radial-gradient(ellipse, rgba(251, 146, 60, 0.25) 0%, rgba(196, 181, 253, 0.2) 40%, transparent 70%)",
          borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none",
        }} />
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 52px)",
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
            fontWeight: "700",
            letterSpacing: "-1.5px",
            color: "#0f0f0f",
            margin: "0 0 20px",
            lineHeight: 1.15,
          }}>
            Ready to automate your crypto payments?
          </h2>
          <p style={{ fontSize: "17px", color: "#666", marginBottom: "40px", lineHeight: 1.7 }}>
            Connect your Notion workspace and let SKYPay&apos;s AI agent handle all your payment operations automatically.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "32px" }}>
            <Link href="/auth/login" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "14px 28px", borderRadius: "100px",
              background: "#0f0f0f", color: "#fff",
              textDecoration: "none", fontSize: "15px", fontWeight: "600",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              transition: "transform 0.2s",
            }}>
              Start Your Agent Free
              <ArrowRight size={16} />
            </Link>
            <button style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "14px 28px", borderRadius: "100px",
              background: "transparent", color: "#333",
              border: "1px solid rgba(0,0,0,0.12)",
              fontSize: "15px", fontWeight: "500", cursor: "pointer",
            }}>
              Watch Agent Demo
            </button>
          </div>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
            <input
              type="email"
              placeholder="Enter your email for agent updates"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "12px 20px", borderRadius: "100px",
                border: "1px solid rgba(0,0,0,0.12)",
                fontSize: "14px", outline: "none",
                width: "260px", background: "rgba(255,255,255,0.9)",
              }}
            />
            <button style={{
              padding: "12px 24px", borderRadius: "100px",
              background: "#6366f1", color: "#fff",
              border: "none", fontSize: "14px", fontWeight: "600", cursor: "pointer",
            }}>
              Get Agent Updates
            </button>
          </div>
        </div>
      </section>

      {/* Footer - Sarvam-inspired with scroll-triggered animated glow */}
      <footer ref={footerRef} style={{
        position: "relative",
        overflow: "hidden",
        background: "hsl(220, 30%, 98%)",
        paddingTop: "60px",
      }}>
        {/* Animated footer glow blob — blooms in on scroll like Sarvam */}
        <div style={{
          position: "absolute",
          bottom: "-120px",
          left: "50%",
          transform: `translateX(-50%) scaleY(${footerVisible ? 1 : 0.3})`,
          width: "1100px",
          height: "500px",
          background: "radial-gradient(ellipse at 50% 80%, rgba(251, 146, 60, 0.55) 0%, rgba(196, 181, 253, 0.35) 35%, rgba(147, 197, 253, 0.15) 60%, transparent 75%)",
          borderRadius: "50%",
          filter: `blur(${footerVisible ? 55 : 20}px)`,
          opacity: footerVisible ? 1 : 0,
          transition: "opacity 1.4s cubic-bezier(0.16,1,0.3,1), transform 1.6s cubic-bezier(0.16,1,0.3,1), filter 1.4s ease",
          pointerEvents: "none",
          transformOrigin: "bottom center",
        }} />
        {/* Secondary softer bloom layer */}
        <div style={{
          position: "absolute",
          bottom: "-60px",
          left: "50%",
          transform: `translateX(-50%) scaleX(${footerVisible ? 1 : 0.4})`,
          width: "700px",
          height: "300px",
          background: "radial-gradient(ellipse at 50% 90%, rgba(251, 146, 60, 0.3) 0%, rgba(196, 181, 253, 0.2) 50%, transparent 75%)",
          borderRadius: "50%",
          filter: "blur(80px)",
          opacity: footerVisible ? 0.8 : 0,
          transition: "opacity 1.8s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 1.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
          pointerEvents: "none",
          transformOrigin: "bottom center",
        }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 60px", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px", marginBottom: "48px" }}>
            <div>
              <h3 style={{ fontSize: "22px", fontWeight: "700", letterSpacing: "-0.5px", color: "#0f0f0f", margin: "0 0 10px" }}>SKYPay</h3>
              <p style={{ fontSize: "14px", color: "#888", lineHeight: 1.7, maxWidth: "240px", margin: "0 0 20px" }}>
                Agentic payment infrastructure. Your AI handles all crypto payments automatically.
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                {[Globe, Users, LinkIcon].map((Icon, i) => (
                  <button key={i} style={{
                    width: 36, height: 36, borderRadius: "8px",
                    background: "rgba(0,0,0,0.04)",
                    border: "1px solid rgba(0,0,0,0.06)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", transition: "background 0.2s",
                  }}>
                    <Icon size={15} color="#666" />
                  </button>
                ))}
              </div>
            </div>

            {[
              {
                title: "AGENT FEATURES",
                links: ["Automated Scheduling", "Smart Follow-ups", "Notion Integration", "X402Pay Processing"],
              },
              {
                title: "DEVELOPERS",
                links: ["Agent API", "Notion Templates", "Webhooks", "Agent Status"],
              },
              {
                title: "COMPANY",
                links: ["About SKYPay", "Agent Blog", "Careers", "Contact"],
              },
            ].map(({ title, links }) => (
              <div key={title}>
                <h4 style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#bbb", margin: "0 0 16px" }}>{title}</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" style={{
                        fontSize: "14px", color: "#666",
                        textDecoration: "none", transition: "color 0.2s",
                      }}
                        onMouseEnter={(e) => (e.target as HTMLElement).style.color = "#0f0f0f"}
                        onMouseLeave={(e) => (e.target as HTMLElement).style.color = "#666"}
                      >{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{
            borderTop: "1px solid rgba(0,0,0,0.06)",
            paddingTop: "24px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: "12px",
          }}>
            <p style={{ fontSize: "13px", color: "#aaa", margin: 0 }}>Copyright SKYPay 2025</p>
            <p style={{ fontSize: "13px", color: "#aaa", margin: 0 }}>All rights reserved. Powered by X402Pay &amp; Notion.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
        }
        @media (max-width: 900px) {
          section > div > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          footer > div > div[style*="grid-template-columns: 2fr"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @keyframes footerGlowPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.75; }
        }
      `}</style>
    </div>
  )
}
