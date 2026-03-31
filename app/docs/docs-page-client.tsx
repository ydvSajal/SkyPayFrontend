"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import {
  Book,
  Zap,
  Database,
  Bot,
  CreditCard,
  Wallet,
  MessageSquare,
  Calendar,
  Bell,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Shield,
  Globe,
  RefreshCw,
  Send,
  TrendingUp,
  Users,
} from "lucide-react"

export default function DocsPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const [activeSection, setActiveSection] = useState("getting-started")

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "getting-started",
        "what-is-skypay",
        "how-it-works",
        "key-features",
        "services",
        "security",
      ]
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const navItems = [
    { id: "getting-started", label: "Getting Started", icon: Zap },
    { id: "what-is-skypay", label: "What is SKYPay?", icon: Sparkles },
    { id: "how-it-works", label: "How it Works", icon: ArrowRight },
    { id: "key-features", label: "Key Features", icon: Bot },
    { id: "services", label: "Services", icon: CreditCard },
    { id: "security", label: "Security", icon: Shield },
  ]

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "hsl(220, 30%, 98%)",
      fontFamily: "var(--font-inter), 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>
      {/* Navigation Bar */}
      <div style={{
        position: "fixed",
        top: "18px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        width: "calc(100% - 48px)",
        maxWidth: "1200px",
      }}>
        <nav style={{
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderRadius: "100px",
          border: "1px solid rgba(255, 255, 255, 0.9)",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
          padding: "0 6px 0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "56px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            <Link href="/landing#hero" style={{ textDecoration: "none" }}>
              <h1 style={{
                fontSize: "22px",
                fontWeight: "600",
                letterSpacing: "0.01em",
                color: "#0f0f0f",
                margin: 0,
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                lineHeight: 1,
              }}>
                SKYPay
              </h1>
            </Link>
            <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
              {["Features", "Pricing", "Docs"].map((item) => (
                <a
                  key={item}
                  href={item === "Docs" ? "#getting-started" : `#${item.toLowerCase()}`}
                  style={{
                    color: item === "Docs" ? "#0f0f0f" : "#555",
                    textDecoration: "none",
                    padding: "5px 12px",
                    borderRadius: "100px",
                    fontSize: "12.5px",
                    fontWeight: "500",
                    letterSpacing: "0.03em",
                    textTransform: "uppercase",
                    background: item === "Docs" ? "rgba(0,0,0,0.05)" : "transparent",
                    transition: "color 0.2s, background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = "#0f0f0f"
                    ;(e.target as HTMLElement).style.background = "rgba(0,0,0,0.05)"
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = item === "Docs" ? "#0f0f0f" : "#555"
                    ;(e.target as HTMLElement).style.background = item === "Docs" ? "rgba(0,0,0,0.05)" : "transparent"
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <Link
                    href="/dashboard"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 16px",
                      borderRadius: "100px",
                      background: "#0f0f0f",
                      color: "#fff",
                      textDecoration: "none",
                      fontSize: "12.5px",
                      fontWeight: "600",
                    }}
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      style={{
                        color: "#555",
                        textDecoration: "none",
                        padding: "8px 14px",
                        borderRadius: "100px",
                        fontSize: "12.5px",
                        fontWeight: "500",
                        transition: "color 0.2s, background 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        ;(e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.05)"
                        ;(e.currentTarget as HTMLElement).style.color = "#0f0f0f"
                      }}
                      onMouseLeave={(e) => {
                        ;(e.currentTarget as HTMLElement).style.background = "transparent"
                        ;(e.currentTarget as HTMLElement).style.color = "#555"
                      }}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/login"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "8px 18px",
                        borderRadius: "100px",
                        background: "#0f0f0f",
                        color: "#fff",
                        textDecoration: "none",
                        fontSize: "12.5px",
                        fontWeight: "600",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
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
      <div style={{
        paddingTop: "140px",
        paddingBottom: "60px",
        textAlign: "center",
        background: "linear-gradient(180deg, rgba(255, 232, 204, 0.85) 0%, rgba(255, 240, 222, 0.55) 26%, rgba(242, 236, 255, 0.35) 52%, rgba(220, 239, 255, 0.22) 72%, rgba(220, 239, 255, 0) 100%)",
        position: "relative",
      }}>
        <div style={{
          position: "absolute",
          top: "60px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "860px",
          height: "460px",
          background: "radial-gradient(ellipse, rgba(251, 146, 60, 0.46) 0%, rgba(251, 146, 60, 0.24) 30%, rgba(167, 139, 250, 0.22) 55%, rgba(125, 211, 252, 0.14) 70%, transparent 84%)",
          borderRadius: "50%",
          filter: "blur(56px)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 20px",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: "100px",
            fontSize: "13px",
            color: "#444",
            background: "rgba(255,255,255,0.8)",
            marginBottom: "24px",
          }}>
            <Book size={16} />
            Documentation
          </div>

          <h1 style={{
            fontSize: "clamp(42px, 6vw, 72px)",
            fontWeight: "600",
            letterSpacing: "-1px",
            lineHeight: 1.1,
            color: "#0f0f0f",
            margin: "0 0 24px 0",
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
            fontStyle: "italic",
          }}>
            SKYPay Documentation
          </h1>

          <p style={{
            fontSize: "18px",
            color: "#555",
            lineHeight: 1.7,
            maxWidth: "560px",
            margin: "0 auto 32px",
          }}>
            Everything you need to understand, set up, and master agentic crypto payments powered by AI.
          </p>

          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 24px",
            borderRadius: "100px",
            background: "rgba(255,255,255,0.9)",
            border: "1px solid rgba(0,0,0,0.08)",
            fontSize: "14px",
            color: "#666",
          }}>
            <Bot size={18} color="#6366f1" />
            <span>AI agent handles the complexity</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px 80px", display: "grid", gridTemplateColumns: "260px 1fr", gap: "48px" }}>
        {/* Sidebar Navigation */}
        <div style={{ position: "sticky", top: "100px", height: "fit-content" }}>
          <nav style={{
            background: "rgba(255,255,255,0.8)",
            borderRadius: "20px",
            padding: "24px",
            border: "1px solid rgba(0,0,0,0.06)",
          }}>
            <h3 style={{
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#aaa",
              marginBottom: "16px",
            }}>
              On this page
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {navItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 12px",
                    borderRadius: "12px",
                    border: "none",
                    background: activeSection === id ? "rgba(99,102,241,0.1)" : "transparent",
                    color: activeSection === id ? "#6366f1" : "#555",
                    fontSize: "14px",
                    fontWeight: "500",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (activeSection !== id) {
                      ;(e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.04)"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeSection !== id) {
                      ;(e.currentTarget as HTMLElement).style.background = "transparent"
                    }
                  }}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </div>

            <div style={{
              marginTop: "24px",
              paddingTop: "24px",
              borderTop: "1px solid rgba(0,0,0,0.06)",
            }}>
              <Link
                href="/auth/login"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "12px",
                  borderRadius: "12px",
                  background: "#0f0f0f",
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "600",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.transform = "scale(1.02)"
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.transform = "scale(1)"
                }}
              >
                Get Started Free
                <ArrowRight size={16} />
              </Link>
            </div>
          </nav>
        </div>

        {/* Documentation Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
          {/* Getting Started */}
          <section id="getting-started" style={{
            background: "rgba(255,255,255,0.9)",
            borderRadius: "24px",
            padding: "48px",
            border: "1px solid rgba(0,0,0,0.06)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: "14px",
                background: "rgba(251, 146, 60, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Zap size={24} color="#f97316" />
              </div>
              <h2 style={{
                fontSize: "32px",
                fontWeight: "700",
                color: "#0f0f0f",
                margin: 0,
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              }}>
                Getting Started
              </h2>
            </div>

            <div style={{
              padding: "24px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.08) 100%)",
              border: "1px solid rgba(99,102,241,0.12)",
              marginBottom: "32px",
            }}>
              <p style={{
                fontSize: "16px",
                color: "#333",
                lineHeight: 1.7,
                margin: 0,
              }}>
                <strong>Ready to automate your crypto payments?</strong> Jump straight to the Quick Start guide and have your first agentic payment running in under 5 minutes.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
              {[
                {
                  title: "Quick Start",
                  desc: "Set up your first agentic payment workflow",
                  icon: Rocket,
                  color: "#f97316",
                },
                {
                  title: "Connect Notion",
                  desc: "Link your workspace in minutes",
                  icon: Database,
                  color: "#6366f1",
                },
                {
                  title: "Dashboard Tour",
                  desc: "Explore your agent control center",
                  icon: Bot,
                  color: "#8b5cf6",
                },
              ].map(({ title, desc, icon: Icon, color }) => (
                <div
                  key={title}
                  style={{
                    padding: "24px",
                    borderRadius: "16px",
                    border: "1px solid rgba(0,0,0,0.06)",
                    background: "rgba(248,249,252,0.5)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"
                    ;(e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.transform = "translateY(0)"
                    ;(e.currentTarget as HTMLElement).style.boxShadow = "none"
                  }}
                >
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: "12px",
                    background: `${color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                  }}>
                    <Icon size={20} color={color} />
                  </div>
                  <h4 style={{ fontSize: "16px", fontWeight: "600", color: "#0f0f0f", marginBottom: "8px" }}>
                    {title}
                  </h4>
                  <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.6, margin: 0 }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* What is SKYPay */}
          <section id="what-is-skypay" style={{
            background: "rgba(255,255,255,0.9)",
            borderRadius: "24px",
            padding: "48px",
            border: "1px solid rgba(0,0,0,0.06)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: "14px",
                background: "rgba(99,102,241,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Sparkles size={24} color="#6366f1" />
              </div>
              <h2 style={{
                fontSize: "32px",
                fontWeight: "700",
                color: "#0f0f0f",
                margin: 0,
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              }}>
                What is SKYPay?
              </h2>
            </div>

            <p style={{
              fontSize: "17px",
              color: "#333",
              lineHeight: 1.8,
              marginBottom: "32px",
            }}>
              If you&apos;ve ever wanted to automate your crypto payment workflows but couldn&apos;t find anything as simple and intelligent as what Stripe or PayPal offer for fiat, SKYPay is built exactly for you.
            </p>

            <p style={{
              fontSize: "17px",
              color: "#333",
              lineHeight: 1.8,
              marginBottom: "32px",
            }}>
              SKYPay is the first <strong>agentic payment infrastructure</strong> that gives you everything you need to accept, manage, and automate cryptocurrency payments. We&apos;ve worked hard to make it feel as familiar and effortless as traditional payment systems, with all the power that comes from building on blockchain: instant cross-border settlement, low fees, and full transparency.
            </p>

            <p style={{
              fontSize: "17px",
              color: "#333",
              lineHeight: 1.8,
              marginBottom: "32px",
            }}>
              No complicated wallet integrations. No manually tracking transactions. You connect your Notion workspace, and your AI agent handles the rest: creating invoices, scheduling payments, sending reminders, processing refunds, and updating your database automatically.
            </p>

            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "20px 24px",
              borderRadius: "16px",
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.16)",
            }}>
              <CheckCircle size={24} color="#15803d" />
              <div>
                <p style={{ fontSize: "15px", fontWeight: "600", color: "#15803d", margin: "0 0 4px" }}>
                  Powered by X402Pay
                </p>
                <p style={{ fontSize: "14px", color: "#166534", margin: 0 }}>
                  Built on sovereign infrastructure for seamless crypto transactions
                </p>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section id="how-it-works" style={{
            background: "rgba(255,255,255,0.9)",
            borderRadius: "24px",
            padding: "48px",
            border: "1px solid rgba(0,0,0,0.06)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: "14px",
                background: "rgba(139,92,246,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <ArrowRight size={24} color="#8b5cf6" />
              </div>
              <h2 style={{
                fontSize: "32px",
                fontWeight: "700",
                color: "#0f0f0f",
                margin: 0,
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              }}>
                How It Works
              </h2>
            </div>

            <p style={{
              fontSize: "17px",
              color: "#555",
              lineHeight: 1.7,
              marginBottom: "40px",
            }}>
              Set it up once, and your AI agent handles everything thereafter. Here&apos;s the simple three-step process:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              {[
                {
                  num: "01",
                  icon: Database,
                  color: "#6366f1",
                  title: "Connect Your Notion Workspace",
                  desc: "Link your existing Notion database or use our template. Your payment data stays in Notion where you already work. The agent gains read/write access to track all payment activities.",
                },
                {
                  num: "02",
                  icon: Bot,
                  color: "#8b5cf6",
                  title: "Agent Activates",
                  desc: "SKYPay AI monitors your Notion database 24/7, automatically creating invoices, scheduling payments, and handling follow-ups. It learns your preferences and optimizes over time.",
                },
                {
                  num: "03",
                  icon: Zap,
                  color: "#f97316",
                  title: "Payments Flow Automatically",
                  desc: "X402Pay processes all crypto transactions while your agent handles scheduling, reminders, refunds, and updates your Notion automatically. No manual intervention needed.",
                },
              ].map(({ num, icon: Icon, color, title, desc }) => (
                <div
                  key={num}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "60px 1fr",
                    gap: "24px",
                    padding: "32px",
                    borderRadius: "20px",
                    border: "1px solid rgba(0,0,0,0.06)",
                    background: "rgba(248,249,252,0.5)",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.transform = "translateX(8px)"
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.transform = "translateX(0)"
                  }}
                >
                  <div style={{
                    width: 60,
                    height: 60,
                    borderRadius: "16px",
                    background: `${color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}>
                    <Icon size={28} color={color} />
                    <span style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: color,
                      color: "#fff",
                      fontSize: "11px",
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      {num}
                    </span>
                  </div>
                  <div>
                    <h4 style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#0f0f0f",
                      marginBottom: "12px",
                    }}>
                      {title}
                    </h4>
                    <p style={{
                      fontSize: "15px",
                      color: "#555",
                      lineHeight: 1.7,
                      margin: 0,
                    }}>
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Key Features */}
          <section id="key-features" style={{
            background: "rgba(255,255,255,0.9)",
            borderRadius: "24px",
            padding: "48px",
            border: "1px solid rgba(0,0,0,0.06)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: "14px",
                background: "rgba(249,115,22,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Bot size={24} color="#f97316" />
              </div>
              <h2 style={{
                fontSize: "32px",
                fontWeight: "700",
                color: "#0f0f0f",
                margin: 0,
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              }}>
                Key Features
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
              {[
                {
                  icon: Bot,
                  color: "#6366f1",
                  title: "AI Agent Autonomy",
                  desc: "An intelligent agent that learns your payment preferences, automatically creates invoices, schedules recurring payments, and handles follow-ups without manual intervention.",
                },
                {
                  icon: Database,
                  color: "#8b5cf6",
                  title: "Notion Integration",
                  desc: "Your payment data lives in Notion where you already work. The agent syncs bidirectionally—reading payment status and writing updates automatically.",
                },
                {
                  icon: CreditCard,
                  color: "#f97316",
                  title: "Multi-Chain Payments",
                  desc: "Accept crypto payments across multiple blockchains. Your customers pick their preferred chain and token, you receive funds in your wallet of choice.",
                },
                {
                  icon: Calendar,
                  color: "#3b82f6",
                  title: "Automated Scheduling",
                  desc: "Set up recurring payments, subscription billing, and scheduled invoices. The agent ensures timely execution and automatic renewals.",
                },
                {
                  icon: Bell,
                  color: "#22c55e",
                  title: "Smart Reminders",
                  desc: "Automatic payment reminders with intelligent retry logic. The agent adapts follow-up timing based on customer response patterns.",
                },
                {
                  icon: RefreshCw,
                  color: "#ec4899",
                  title: "Auto Refunds",
                  desc: "Configure automatic refund policies. The agent monitors payment windows and processes refunds when conditions are met.",
                },
                {
                  icon: Shield,
                  color: "#f59e0b",
                  title: "Risk Monitoring",
                  desc: "Real-time risk assessment for late payers and high-risk transactions. The agent flags concerns and suggests mitigation strategies.",
                },
                {
                  icon: MessageSquare,
                  color: "#06b6d4",
                  title: "Natural Language Interface",
                  desc: "Chat with your agent using natural language. Instruct it to collect payments, schedule reminders, or generate reports conversationally.",
                },
              ].map(({ icon: Icon, color, title, desc }) => (
                <div
                  key={title}
                  style={{
                    padding: "28px",
                    borderRadius: "18px",
                    border: "1px solid rgba(0,0,0,0.06)",
                    background: "rgba(248,249,252,0.5)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"
                    ;(e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.08)"
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.transform = "translateY(0)"
                    ;(e.currentTarget as HTMLElement).style.boxShadow = "none"
                  }}
                >
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: "12px",
                    background: `${color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                  }}>
                    <Icon size={22} color={color} />
                  </div>
                  <h4 style={{
                    fontSize: "17px",
                    fontWeight: "700",
                    color: "#0f0f0f",
                    marginBottom: "12px",
                  }}>
                    {title}
                  </h4>
                  <p style={{
                    fontSize: "14px",
                    color: "#666",
                    lineHeight: 1.7,
                    margin: 0,
                  }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Services */}
          <section id="services" style={{
            background: "rgba(255,255,255,0.9)",
            borderRadius: "24px",
            padding: "48px",
            border: "1px solid rgba(0,0,0,0.06)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: "14px",
                background: "rgba(34,197,94,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Wallet size={24} color="#22c55e" />
              </div>
              <h2 style={{
                fontSize: "32px",
                fontWeight: "700",
                color: "#0f0f0f",
                margin: 0,
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              }}>
                Services We Offer
              </h2>
            </div>

            <p style={{
              fontSize: "17px",
              color: "#555",
              lineHeight: 1.7,
              marginBottom: "40px",
            }}>
              SKYPay provides comprehensive payment services. Here&apos;s a quick overview of what&apos;s available:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {[
                {
                  icon: Send,
                  color: "#6366f1",
                  title: "One-Time Payments",
                  desc: "Send and receive single crypto payments instantly. The agent creates dynamic payment links, tracks completion, and updates your Notion database automatically.",
                },
                {
                  icon: Calendar,
                  color: "#8b5cf6",
                  title: "Recurring Payments & Subscriptions",
                  desc: "Set up subscription plans with automatic renewal. Perfect for SaaS products, memberships, or any service with regular billing cycles. The agent handles renewals.",
                },
                {
                  icon: Database,
                  color: "#3b82f6",
                  title: "Invoice Generation",
                  desc: "Create professional invoices with line items and tax calculations. The agent sends them via email and tracks payment status with automatic follow-ups.",
                },
                {
                  icon: TrendingUp,
                  color: "#f97316",
                  title: "Payment Analytics",
                  desc: "Monitor transaction history, success rates, and payment trends. The agent provides insights and identifies optimization opportunities.",
                },
                {
                  icon: Users,
                  color: "#22c55e",
                  title: "Customer Management",
                  desc: "Track customer payment histories, preferences, and risk profiles. The agent builds intelligence to improve collection rates over time.",
                },
                {
                  icon: Globe,
                  color: "#06b6d4",
                  title: "Multi-Currency Support",
                  desc: "Accept payments in various cryptocurrencies across different chains. Automatic conversion and settlement to your preferred currency.",
                },
              ].map(({ icon: Icon, color, title, desc }) => (
                <div
                  key={title}
                  style={{
                    display: "flex",
                    gap: "20px",
                    padding: "28px",
                    borderRadius: "18px",
                    border: "1px solid rgba(0,0,0,0.06)",
                    background: "rgba(248,249,252,0.5)",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.transform = "translateX(4px)"
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.transform = "translateX(0)"
                  }}
                >
                  <div style={{
                    width: 52,
                    height: 52,
                    borderRadius: "14px",
                    background: `${color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <Icon size={24} color={color} />
                  </div>
                  <div>
                    <h4 style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "#0f0f0f",
                      marginBottom: "10px",
                    }}>
                      {title}
                    </h4>
                    <p style={{
                      fontSize: "14px",
                      color: "#666",
                      lineHeight: 1.7,
                      margin: 0,
                    }}>
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Security */}
          <section id="security" style={{
            background: "rgba(255,255,255,0.9)",
            borderRadius: "24px",
            padding: "48px",
            border: "1px solid rgba(0,0,0,0.06)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: "14px",
                background: "rgba(245,158,11,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Shield size={24} color="#f59e0b" />
              </div>
              <h2 style={{
                fontSize: "32px",
                fontWeight: "700",
                color: "#0f0f0f",
                margin: 0,
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              }}>
                Security & Trust
              </h2>
            </div>

            <div style={{
              padding: "28px",
              borderRadius: "18px",
              background: "linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(139,92,246,0.06) 100%)",
              border: "1px solid rgba(99,102,241,0.12)",
              marginBottom: "32px",
            }}>
              <h4 style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "#0f0f0f",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}>
                <Shield size={20} color="#6366f1" />
                Your Funds Are Always Protected
              </h4>
              <p style={{
                fontSize: "15px",
                color: "#555",
                lineHeight: 1.8,
                margin: 0,
              }}>
                One of the biggest concerns with crypto payments is the fear that if something goes wrong, you can&apos;t get your money back. SKYPay solves this with secure escrow mechanisms and transparent on-chain settlement. Funds are protected at every stage—from authorization to capture to settlement.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
              {[
                {
                  title: "Secure Escrow",
                  desc: "Funds are held securely during the payment window, protected by smart contracts",
                  color: "#6366f1",
                },
                {
                  title: "Encrypted Storage",
                  desc: "All sensitive data is encrypted at rest and in transit using industry standards",
                  color: "#8b5cf6",
                },
                {
                  title: "Notion Permissions",
                  desc: "Granular access control ensures the agent only accesses what you authorize",
                  color: "#3b82f6",
                },
                {
                  title: "Audit Trail",
                  desc: "Complete transaction history with timestamps and blockchain verification",
                  color: "#f97316",
                },
              ].map(({ title, desc, color }) => (
                <div
                  key={title}
                  style={{
                    padding: "24px",
                    borderRadius: "16px",
                    border: "1px solid rgba(0,0,0,0.06)",
                    background: "rgba(248,249,252,0.5)",
                  }}
                >
                  <div style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: color,
                    marginBottom: "16px",
                  }} />
                  <h5 style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "#0f0f0f",
                    marginBottom: "8px",
                  }}>
                    {title}
                  </h5>
                  <p style={{
                    fontSize: "13px",
                    color: "#666",
                    lineHeight: 1.6,
                    margin: 0,
                  }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <div style={{
            textAlign: "center",
            padding: "60px 40px",
            borderRadius: "24px",
            background: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.08) 50%, rgba(249,115,22,0.06) 100%)",
            border: "1px solid rgba(99,102,241,0.12)",
          }}>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              fontWeight: "700",
              color: "#0f0f0f",
              marginBottom: "20px",
              lineHeight: 1.2,
            }}>
              Ready to Automate Your Payments?
            </h2>
            <p style={{
              fontSize: "17px",
              color: "#555",
              lineHeight: 1.7,
              maxWidth: "500px",
              margin: "0 auto 32px",
            }}>
              Join the future of agentic payment infrastructure. Your AI agent is ready to handle the complexity.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/auth/login"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 28px",
                  borderRadius: "100px",
                  background: "#0f0f0f",
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "15px",
                  fontWeight: "600",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"
                  ;(e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(0,0,0,0.2)"
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.transform = "translateY(0)"
                  ;(e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)"
                }}
              >
                Start Your Agent Free
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/landing"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 28px",
                  borderRadius: "100px",
                  background: "rgba(255,255,255,0.9)",
                  color: "#333",
                  border: "1px solid rgba(0,0,0,0.1)",
                  textDecoration: "none",
                  fontSize: "15px",
                  fontWeight: "500",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,1)"
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.9)"
                }}
              >
                Learn More
              </Link>
            </div>
            <p style={{
              fontSize: "13px",
              color: "#888",
              marginTop: "20px",
            }}>
              Connect your Notion • Agent handles the rest • Powered by X402Pay
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid rgba(0,0,0,0.06)",
        padding: "40px 24px",
        textAlign: "center",
      }}>
        <p style={{
          fontSize: "13px",
          color: "#888",
          marginBottom: "12px",
        }}>
          © 2025 SKYPay. Agentic Payment Infrastructure.
        </p>
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "24px",
          fontSize: "12px",
        }}>
          <a href="#" style={{ color: "#666", textDecoration: "none" }}>Privacy</a>
          <a href="#" style={{ color: "#666", textDecoration: "none" }}>Terms</a>
          <a href="#" style={{ color: "#666", textDecoration: "none" }}>Support</a>
        </div>
      </footer>
    </div>
  )
}

function Rocket(props: React.SVGProps<SVGSVGElement> & { size?: number; color?: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  )
}
