import { create } from 'zustand'
import { supabase } from '@/lib/supabaseClient'

interface User {
  id: string
  email: string
  name?: string
  mobileNumber?: string
}

interface AuthStore {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, mobileNumber?: string) => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true })
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    set({ isLoading: false })

    if (error) throw error
    if (data.session?.user) {
      set({ user: { id: data.session.user.id, email: data.session.user.email! } })
    }
  },

  register: async (name, email, password, mobileNumber) => {
    set({ isLoading: true })
    try {
      const { data, error } = await supabase.auth.signUp({ email, password })
      set({ isLoading: false })

      console.log("Supabase signUp data:", data)
      console.log("Supabase signUp error:", error)

      if (error) throw error
      if (data.user) {
        // optionally save extra info in Supabase table later
        set({ user: { id: data.user.id, email: data.user.email!, name, mobileNumber } })
      }
    } catch (err) {
      set({ isLoading: false })
      throw err
    }
  },

  logout: async () => {
    await supabase.auth.signOut()
    set({ user: null })
  },
}))
