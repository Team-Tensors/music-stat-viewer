"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { type AuthState, getCurrentUser } from "@/lib/auth"

interface AuthContextType extends AuthState {
  login: (platform: "spotify" | "apple") => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  useEffect(() => {
    // Check for existing authentication on mount
    const user = getCurrentUser()
    setAuthState({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    })
  }, [])

  const login = async (platform: "spotify" | "apple") => {
    setAuthState((prev) => ({ ...prev, isLoading: true }))

    try {
      const { loginWithPlatform } = await import("@/lib/auth")
      const user = await loginWithPlatform(platform)

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      })
    } catch (error) {
      setAuthState((prev) => ({ ...prev, isLoading: false }))
      throw error
    }
  }

  const logout = () => {
    const { logout: authLogout } = require("@/lib/auth")
    authLogout()
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    })
  }

  return <AuthContext.Provider value={{ ...authState, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
