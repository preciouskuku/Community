'use client'

import { createContext, useContext, useEffect, ReactNode } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useAuthStore } from '@/state/authStore'

interface AuthContextType {
  user: any
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { user, isLoading, login, register, logout } = useAuthStore()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        useAuthStore.setState({
          user: {
            id: session.user.id,
            email: session.user.email!,
            name: session.user.user_metadata?.name,
            mobileNumber: session.user.user_metadata?.mobileNumber
          }
        })
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          useAuthStore.setState({
            user: {
              id: session.user.id,
              email: session.user.email!,
              name: session.user.user_metadata?.name,
              mobileNumber: session.user.user_metadata?.mobileNumber
            }
          })
        } else {
          useAuthStore.setState({ user: null })
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const value = {
    user,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
