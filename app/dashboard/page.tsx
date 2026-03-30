"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { authService } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Send,
  CreditCard,
  RefreshCw,
  CheckCircle,
  Clock,
  AlertCircle,
  LogOut,
  Wallet,
  TrendingUp,
  TrendingDown,
  Activity,
  Plus,
  Play,
  Square,
} from "lucide-react"

interface DashboardData {
  user: {
    id: string
    email: string
    name: string
    hasNotionIntegration: boolean
    hasWallet: boolean
  }
  wallet?: {
    address: string
    balance: {
      ETH: string
      USD: string
    }
  }
  agent: {
    isRunning: boolean
    totalProcessed: number
    lastActivity?: string
    threadId?: string
  }
  transactions: Array<{
    id: string
    type: string
    amount: string
    currency: string
    status: string
    createdAt: string
    description?: string
  }>
  analytics: {
    totalSent: number
    totalReceived: number
    totalTransactions: number
    successRate: number
  }
}

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [chatHistory, setChatHistory] = useState<Array<{
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
  }>>([])
  const [chatThreadId, setChatThreadId] = useState<string | undefined>(undefined)

  // Load dashboard data
  const loadDashboardData = async () => {
    try {
      setIsLoading(true)
      const response = await authService.getDashboard()
      
      if (response.success && response.data) {
        setDashboardData(response.data as DashboardData)
      } else {
        setError(response.error || "Failed to load dashboard data")
      }
    } catch (err) {
      setError("Failed to load dashboard data")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // Load initial data
  useEffect(() => {
    loadDashboardData()
  }, [])

  // Handle message processing
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || isProcessing) return

    setIsProcessing(true)
    setError("")

    const userMessage = message.trim()
    setMessage("")

    // Add user message to history
    setChatHistory(prev => [...prev, {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }])

    try {
      const response = await authService.processPayment(
        userMessage, 
        chatThreadId || dashboardData?.agent.threadId
      )

      if (response.success && response.data) {
        const data = response.data as { response: string; threadId?: string }
        
        // Store threadId for conversation continuity
        if (data.threadId) {
          setChatThreadId(data.threadId)
          console.log('💬 Updated chat threadId:', data.threadId)
        }
        
        // Add AI response to history
        setChatHistory(prev => [...prev, {
          role: 'assistant',
          content: data.response,
          timestamp: new Date()
        }])

        // No need to refresh dashboard for chat - it's just a conversation!
      } else {
        setError(response.error || "Failed to process message")
      }
    } catch (err) {
      setError("Failed to process message")
      console.error(err)
    } finally {
      setIsProcessing(false)
    }
  }

  // Handle agent start/stop
  const handleAgentToggle = async () => {
    try {
      if (dashboardData?.agent.isRunning) {
        await authService.stopAgent()
      } else {
        await authService.startAgent(10) // 10 minute intervals
      }
      await loadDashboardData()
    } catch (err) {
      setError("Failed to toggle agent")
      console.error(err)
    }
  }

  // Handle wallet creation
  const handleCreateWallet = async () => {
    try {
      const response = await authService.createWallet()
      if (response.success) {
        await authService.requestFaucet() // Get some testnet tokens
        await loadDashboardData()
      } else {
        setError(response.error || "Failed to create wallet")
      }
    } catch (err) {
      setError("Failed to create wallet")
      console.error(err)
    }
  }

  // Handle faucet request
  const handleRequestFaucet = async () => {
    try {
      const response = await authService.requestFaucet()
      if (response.success) {
        await loadDashboardData()
      } else {
        setError(response.error || "Faucet request failed")
      }
    } catch (err) {
      setError("Faucet request failed")
      console.error(err)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "success":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "failed":
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Failed to load dashboard</p>
              <Button onClick={loadDashboardData}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_12%_0%,#ffe8d6_0%,#f6f8ff_35%,#eef4ff_100%)] p-3 sm:p-4">
      <div className="mx-auto grid min-h-[calc(100vh-1.5rem)] w-full max-w-[1500px] gap-4 lg:grid-cols-[360px_1fr]">
        <aside className="flex min-h-[420px] flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white/85 shadow-xl backdrop-blur">
          <div className="border-b border-slate-100 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Admin Console</p>
                <h2 className="mt-1 text-xl font-semibold text-slate-900">{user?.name}</h2>
                <p className="text-sm text-slate-600">{user?.email}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={logout} className="rounded-xl">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2">
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2 text-sm">
                <span className="text-slate-600">Notion</span>
                {dashboardData.user.hasNotionIntegration ? (
                  <Badge className="bg-emerald-100 text-emerald-800">Connected</Badge>
                ) : (
                  <Badge className="bg-rose-100 text-rose-800">Not Connected</Badge>
                )}
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2 text-sm">
                <span className="text-slate-600">Wallet</span>
                {dashboardData.user.hasWallet ? (
                  <Badge className="bg-emerald-100 text-emerald-800">Created</Badge>
                ) : (
                  <Badge className="bg-amber-100 text-amber-800">Not Created</Badge>
                )}
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2 text-sm">
                <span className="text-slate-600">Agent</span>
                {dashboardData.agent.isRunning ? (
                  <Badge className="bg-sky-100 text-sky-800">Running</Badge>
                ) : (
                  <Badge className="bg-slate-100 text-slate-700">Stopped</Badge>
                )}
              </div>
            </div>
          </div>

          {dashboardData.wallet ? (
            <div className="border-b border-slate-100 p-5">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-800">Wallet</h3>
                <Button variant="outline" size="sm" onClick={handleRequestFaucet} className="rounded-lg border-slate-300">
                  <Plus className="mr-1 h-4 w-4" />
                  Faucet
                </Button>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">ETH</span>
                  <span className="font-mono font-semibold text-slate-900">{dashboardData.wallet.balance.ETH}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-slate-600">USD</span>
                  <span className="font-mono font-semibold text-slate-900">${dashboardData.wallet.balance.USD}</span>
                </div>
                <div className="mt-3 truncate rounded-lg bg-white px-2 py-1 text-[11px] text-slate-500">
                  {dashboardData.wallet.address}
                </div>
              </div>
            </div>
          ) : (
            <div className="border-b border-slate-100 p-5">
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 p-4 text-center">
                <Wallet className="mx-auto mb-2 h-8 w-8 text-slate-400" />
                <p className="mb-3 text-sm text-slate-600">No wallet created</p>
                <Button onClick={handleCreateWallet} size="sm" className="w-full rounded-lg bg-slate-900 hover:bg-slate-800">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Wallet
                </Button>
              </div>
            </div>
          )}

          <div className="border-b border-slate-100 p-5">
            <h3 className="mb-3 text-sm font-semibold text-slate-800">Snapshot</h3>
            <div className="grid grid-cols-2 gap-3">
              <Card className="rounded-xl border-slate-200 bg-white p-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.08em] text-slate-500">Sent</div>
                    <div className="text-sm font-semibold text-slate-900">${dashboardData.analytics.totalSent}</div>
                  </div>
                </div>
              </Card>
              <Card className="rounded-xl border-slate-200 bg-white p-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-sky-500" />
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.08em] text-slate-500">Received</div>
                    <div className="text-sm font-semibold text-slate-900">${dashboardData.analytics.totalReceived}</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-5">
              <h3 className="mb-3 text-sm font-semibold text-slate-800">Recent Transactions</h3>
              <div className="space-y-2.5">
                {dashboardData.transactions.length > 0 ? (
                  dashboardData.transactions.slice(0, 6).map((tx) => (
                    <Card key={tx.id} className="rounded-xl border-slate-200 bg-white p-3 shadow-sm">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-semibold capitalize text-slate-800">{tx.type}</span>
                        {getStatusIcon(tx.status)}
                      </div>
                      <div className="flex items-center justify-between gap-2 text-sm">
                        <span className="text-slate-600">{tx.amount} {tx.currency}</span>
                        <Badge variant="secondary" className={getStatusColor(tx.status)}>
                          {tx.status}
                        </Badge>
                      </div>
                      {tx.description && (
                        <div className="mt-1 truncate text-xs text-slate-500">{tx.description}</div>
                      )}
                      <div className="mt-1 text-xs text-slate-500">
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 py-8 text-center">
                    <Activity className="mx-auto mb-2 h-8 w-8 text-slate-400" />
                    <p className="text-sm text-slate-500">No transactions yet</p>
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>
        </aside>

        <section className="flex min-h-[420px] flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white/85 shadow-xl backdrop-blur">
          <div className="border-b border-slate-100 bg-white/90 p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Operations</p>
                <Link href="/landing#hero" className="text-2xl font-semibold text-slate-900 transition hover:text-slate-700">
                  SKYPay Admin Dashboard
                </Link>
                <p className="text-sm text-slate-600">AI-powered command center for Web3 payments and automation.</p>
              </div>
              <div className="flex items-center gap-2">
                <Link href="/landing#hero">
                  <Button variant="outline" size="sm" className="rounded-xl border-slate-300">
                    Home
                  </Button>
                </Link>
                <Button
                  variant={dashboardData.agent.isRunning ? "destructive" : "default"}
                  size="sm"
                  onClick={handleAgentToggle}
                  className={dashboardData.agent.isRunning ? "rounded-xl" : "rounded-xl bg-slate-900 hover:bg-slate-800"}
                >
                  {dashboardData.agent.isRunning ? (
                    <>
                      <Square className="mr-2 h-4 w-4" />
                      Stop Agent
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Start Agent
                    </>
                  )}
                </Button>
                <Button variant="outline" size="sm" onClick={loadDashboardData} className="rounded-xl border-slate-300">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
              </div>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4 sm:p-6">
            <div className="mx-auto max-w-5xl space-y-5">
              {chatHistory.length === 0 && (
                <div className="rounded-2xl border border-slate-200 bg-[linear-gradient(135deg,#f8faff_0%,#ffffff_48%,#fff4e8_100%)] p-8 text-center shadow-sm">
                  <CreditCard className="mx-auto mb-4 h-12 w-12 text-slate-400" />
                  <h3 className="text-xl font-semibold text-slate-900">Welcome to SKYPay Agent</h3>
                  <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-600">Use plain English to drive payment ops across your workspace.</p>
                  <div className="mt-6 space-y-2 text-sm text-slate-500">
                    <div>&quot;Create an invoice for Acme Corp for 0.15 ETH&quot;</div>
                    <div>&quot;Send 0.1 ETH to 0x1234...&quot;</div>
                    <div>&quot;Show my payment analytics&quot;</div>
                    <div>&quot;Check my Notion database&quot;</div>
                  </div>
                </div>
              )}

              {chatHistory.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-3xl rounded-2xl px-4 py-3 text-sm shadow-sm ${
                      msg.role === "user"
                        ? "bg-slate-900 text-white"
                        : "border border-slate-200 bg-white text-slate-800"
                    }`}
                  >
                    <div className="whitespace-pre-wrap leading-7">{msg.content}</div>
                    <div className={`mt-2 text-xs ${msg.role === "user" ? "text-slate-300" : "text-slate-500"}`}>
                      {msg.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}

              {isProcessing && (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm">
                    <div className="flex items-center space-x-2 text-slate-700">
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>SKYPay AI is processing your request...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {error && (
            <div className="px-4 pb-3 sm:px-6">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </div>
          )}

          <div className="border-t border-slate-100 bg-white/90 p-4 sm:p-6">
            <form onSubmit={handleSendMessage} className="mx-auto max-w-5xl">
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your command... (e.g., 'Create an invoice for Acme Corp for 0.15 ETH')"
                  className="h-12 flex-1 rounded-xl border-slate-300"
                  disabled={isProcessing}
                />
                <Button type="submit" disabled={isProcessing || !message.trim()} className="h-12 rounded-xl bg-slate-900 px-5 hover:bg-slate-800">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}
