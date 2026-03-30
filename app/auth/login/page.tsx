"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { authService } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  CreditCard,
  Database,
  Wallet,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react"

export default function AuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, register, isAuthenticated, user } = useAuth()

  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [step, setStep] = useState<"auth" | "notion" | "wallet">("auth")

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  })

  useEffect(() => {
    const urlStep = searchParams.get("step")
    if (urlStep && ["auth", "notion", "wallet"].includes(urlStep)) {
      setStep(urlStep as "auth" | "notion" | "wallet")
    }
  }, [searchParams])

  useEffect(() => {
    if (isAuthenticated && user) {
      const hasNotionIntegration = (user as { hasNotionIntegration?: boolean }).hasNotionIntegration
      const hasWallet = (user as { hasWallet?: boolean }).hasWallet

      if (hasNotionIntegration && hasWallet) {
        router.push("/dashboard")
      } else if (!hasNotionIntegration && step === "auth") {
        setStep("notion")
      } else if (hasNotionIntegration && !hasWallet && step === "auth") {
        setStep("wallet")
      }
    }
  }, [isAuthenticated, user, router, step])

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await login(formData.email, formData.password)
      if (!result.success) {
        setError(result.error || "Login failed")
      }
    } catch {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      setIsLoading(false)
      return
    }

    try {
      const result = await register(formData.email, formData.password, formData.name)
      if (result.success) {
        setStep("notion")
      } else {
        setError(result.error || "Registration failed")
      }
    } catch {
      setError("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleNotionConnect = async () => {
    setIsLoading(true)
    setError("")

    try {
      const response = await authService.getNotionAuthUrl()
      if (response.success && response.authUrl) {
        window.location.href = response.authUrl
      } else {
        setError(response.error || "Failed to get Notion auth URL")
        setIsLoading(false)
      }
    } catch {
      setError("Failed to initiate Notion authentication")
      setIsLoading(false)
    }
  }

  const handleWalletCreation = async () => {
    setIsLoading(true)
    setError("")

    try {
      const response = await authService.createWallet()
      if (response.success) {
        await authService.requestFaucet()
        router.push("/dashboard")
      } else {
        setError(response.error || "Wallet creation failed")
      }
    } catch {
      setError("Failed to create wallet")
    } finally {
      setIsLoading(false)
    }
  }

  const topNav = (
    <div className="absolute left-1/2 top-4 z-20 w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2">
      <nav className="flex h-14 items-center justify-between rounded-full border border-white/80 bg-white/70 px-5 shadow-md backdrop-blur">
        <div className="flex items-center gap-8">
          <Link href="/landing#hero" className="text-[22px] italic leading-none text-slate-900 [font-family:var(--font-cormorant),'Cormorant_Garamond',Georgia,serif]">
            SKYPay
          </Link>
          <div className="hidden items-center gap-1 md:flex">
            {[
              { label: "Features", href: "/landing#features" },
              { label: "Pricing", href: "/landing#pricing" },
              { label: "Docs", href: "/landing#docs" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/landing#hero" className="rounded-full px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
            Home
          </Link>
          <Link href="/auth/login" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
            Sign In
          </Link>
        </div>
      </nav>
    </div>
  )

  if (step === "auth") {
    return (
      <div className="relative min-h-screen bg-[radial-gradient(circle_at_10%_0%,#ffe9d5_0%,#f7f9ff_45%,#eef4ff_100%)] px-4 py-24 sm:px-6 sm:py-8 lg:px-12 lg:py-10 flex items-center justify-center">
        {topNav}
        <div className="mx-auto grid w-full max-w-6xl items-stretch gap-6 lg:grid-cols-2">
          <div className="relative hidden overflow-hidden rounded-3xl border border-slate-200/70 bg-white/75 p-10 shadow-xl backdrop-blur md:block">
            <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-orange-200/60 blur-3xl" />
            <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-sky-200/60 blur-3xl" />
            <div className="relative z-10">
              <p className="mb-4 inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                SKYPay Control Center
              </p>
              <h1 className="text-4xl font-semibold leading-tight text-slate-900">
                Payments, ops, and automation in one place.
              </h1>
              <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
                Sign in to run your AI payment operations. Connect Notion, create a wallet, and manage invoicing flows from one modern workspace.
              </p>
              <div className="mt-8 space-y-4">
                {["Secure email authentication", "Notion-first workflow setup", "Instant wallet provisioning"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl border border-slate-200/70 bg-white/70 px-4 py-3 text-sm text-slate-700">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Card className="w-full overflow-hidden rounded-3xl border border-slate-200/80 bg-white/85 shadow-2xl backdrop-blur">
            <CardHeader className="space-y-4 border-b border-slate-100 bg-white/70 text-center sm:text-left">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 sm:mx-0">
                <CreditCard className="h-8 w-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-3xl font-semibold tracking-tight text-slate-900">Welcome back</CardTitle>
                <CardDescription className="mt-1 text-slate-600">Continue to your SKYPay agent workspace</CardDescription>
              </div>
            </CardHeader>

            <CardContent className="p-6 sm:p-8">
              <Tabs defaultValue="login" className="space-y-5">
                <TabsList className="grid h-11 w-full grid-cols-2 rounded-xl bg-slate-100/80 p-1">
                  <TabsTrigger value="login" className="rounded-lg text-sm font-semibold data-[state=active]:bg-white">Login</TabsTrigger>
                  <TabsTrigger value="register" className="rounded-lg text-sm font-semibold data-[state=active]:bg-white">Register</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        required
                        className="h-11 rounded-xl border-slate-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={(e) => updateFormData("password", e.target.value)}
                          required
                          className="h-11 rounded-xl border-slate-200 pr-11"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button type="submit" className="h-11 w-full rounded-xl bg-slate-900 text-white hover:bg-slate-800" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => updateFormData("name", e.target.value)}
                        required
                        className="h-11 rounded-xl border-slate-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        required
                        className="h-11 rounded-xl border-slate-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={(e) => updateFormData("password", e.target.value)}
                          required
                          className="h-11 rounded-xl border-slate-200 pr-11"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      <p className="text-xs text-slate-500">Minimum 6 characters</p>
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button type="submit" className="h-11 w-full rounded-xl bg-slate-900 text-white hover:bg-slate-800" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (step === "notion") {
    return (
      <div className="relative min-h-screen bg-[radial-gradient(circle_at_0%_0%,#e9ecff_0%,#f8faff_40%,#fff4e8_100%)] px-4 py-24 sm:py-8 lg:py-10 flex items-center justify-center">
        {topNav}
        <div className="mx-auto w-full max-w-3xl">
          <Card className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 shadow-2xl">
            <CardHeader className="border-b border-slate-100 bg-white/80">
              <div className="mb-4 flex items-center gap-2">
                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">Step 2 of 3</span>
              </div>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600">
                <Database className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-center text-3xl font-semibold text-slate-900">Connect Notion Workspace</CardTitle>
              <CardDescription className="text-center text-slate-600">
                Power your admin dashboard with live payment records and automations.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5 p-8">
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-5">
                <h3 className="mb-3 text-sm font-semibold text-indigo-950">What SKYPay sets up instantly</h3>
                <ul className="space-y-2 text-sm text-indigo-900">
                  <li>Payments database for outgoing and incoming requests</li>
                  <li>Transactions ledger for on-chain settlement tracking</li>
                  <li>Invoice lifecycle workflow with statuses and reminders</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 text-sm text-slate-600">
                OAuth-secured connection. You will be redirected to Notion to choose and authorize your workspace.
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleNotionConnect}
                className="h-11 w-full rounded-xl bg-slate-900 text-white hover:bg-slate-800"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Redirecting to Notion...
                  </>
                ) : (
                  <>
                    <Database className="mr-2 h-4 w-4" />
                    Connect with Notion
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (step === "wallet") {
    return (
      <div className="relative min-h-screen bg-[radial-gradient(circle_at_0%_0%,#e8f7ff_0%,#f8fbff_40%,#eef6ff_100%)] px-4 py-24 sm:py-8 lg:py-10 flex items-center justify-center">
        {topNav}
        <div className="mx-auto w-full max-w-3xl">
          <Card className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 shadow-2xl">
            <CardHeader className="border-b border-slate-100 bg-white/80">
              <div className="mb-4 flex items-center gap-2">
                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">Step 3 of 3</span>
              </div>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-sky-600 to-cyan-600">
                <Wallet className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-center text-3xl font-semibold text-slate-900">Create Your Wallet</CardTitle>
              <CardDescription className="text-center text-slate-600">
                Final setup to activate transfers, collections, and automated refunds.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5 p-8">
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5">
                <h3 className="mb-3 text-sm font-semibold text-emerald-950">Wallet includes</h3>
                <ul className="space-y-2 text-sm text-emerald-900">
                  <li>Secure key management and custody controls</li>
                  <li>Multi-asset support for ETH, stablecoins, and more</li>
                  <li>Development faucet support for rapid testing</li>
                  <li>Mainnet-ready payment operations</li>
                </ul>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-3">
                <Button
                  onClick={handleWalletCreation}
                  className="h-11 w-full rounded-xl bg-slate-900 text-white hover:bg-slate-800"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating wallet...
                    </>
                  ) : (
                    <>
                      <Wallet className="mr-2 h-4 w-4" />
                      Create Wallet
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => router.push("/dashboard")}
                  className="h-11 w-full rounded-xl border-slate-300"
                  disabled={isLoading}
                >
                  Skip for now
                </Button>
              </div>

              <p className="text-center text-xs text-slate-500">You can create a wallet later from your dashboard.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return null
}
