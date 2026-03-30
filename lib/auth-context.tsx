"use client"

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { User, authService } from './auth'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  const isTokenInvalidError = useCallback((message?: string) => {
    if (!message) return false
    const normalized = message.toLowerCase()
    return (
      normalized.includes('unauthorized') ||
      normalized.includes('invalid token') ||
      normalized.includes('jwt')
    )
  }, [])

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    // Only run auth check on client side
    if (!isClient) return

    const checkAuth = async () => {
      try {
        console.log('🔍 Checking authentication status...')
        console.log('Token exists:', authService.isAuthenticated())
        
        if (authService.isAuthenticated()) {
          console.log('📱 Token found, fetching user data...')
          // Try to get user data from dashboard
          const response = await authService.getDashboard()
          console.log('📊 Dashboard response:', response)
          
          if (response.success && response.data) {
            const data = response.data as { user?: User }
            if (data.user) {
              console.log('✅ User authenticated:', data.user.email)
              setUser(data.user)
            }
          } else {
            if (isTokenInvalidError(response.error)) {
              console.log('❌ Token is invalid, clearing token')
              authService.removeToken()
            } else {
              console.warn('⚠️ Dashboard request failed without token error:', response.error)
            }
          }
        } else {
          console.log('❌ No token found')
        }
      } catch (error) {
        console.error('❌ Auth check failed:', error)
        if (error instanceof Error && isTokenInvalidError(error.message)) {
          authService.removeToken()
        }
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [isClient])

  const login = useCallback(async (email: string, password: string) => {
    try {
      console.log('🔐 Attempting login for:', email)
      const response = await authService.login(email, password)
      console.log('🔐 Login response:', { success: response.success, hasToken: !!response.token, hasUser: !!response.user })
      
      if (response.success && response.user) {
        console.log('✅ Login successful, setting user:', response.user.email)
        setUser(response.user)
        return { success: true }
      } else {
        console.log('❌ Login failed:', response.error)
        return { success: false, error: response.error || 'Login failed' }
      }
    } catch (error) {
      console.error('❌ Login error:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Login failed' 
      }
    }
  }, [])

  const register = useCallback(async (email: string, password: string, name: string) => {
    try {
      console.log('📝 Attempting registration for:', email)
      const response = await authService.register(email, password, name)
      console.log('📝 Registration response:', { success: response.success, hasToken: !!response.token, hasUser: !!response.user })
      
      if (response.success && response.user) {
        console.log('✅ Registration successful, setting user:', response.user.email)
        setUser(response.user)
        return { success: true }
      } else {
        console.log('❌ Registration failed:', response.error)
        return { success: false, error: response.error || 'Registration failed' }
      }
    } catch (error) {
      console.error('❌ Registration error:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Registration failed' 
      }
    }
  }, [])

  const logout = useCallback(() => {
    console.log('🚪 Logging out user')
    setUser(null)
    authService.logout()
  }, [])

  const refreshUser = useCallback(async () => {
    try {
      console.log('🔄 Refreshing user data...')
      const response = await authService.getDashboard()
      if (response.success && response.data) {
        const data = response.data as { user?: User }
        if (data.user) {
          console.log('✅ User data refreshed:', data.user.email)
          setUser(data.user)
        }
      }
    } catch (error) {
      console.error('❌ Failed to refresh user:', error)
    }
  }, [])

  const value: AuthContextType = useMemo(() => ({
    user,
    isLoading: isLoading || !isClient, // Keep loading until client-side
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshUser,
  }), [isClient, isLoading, login, logout, refreshUser, register, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 