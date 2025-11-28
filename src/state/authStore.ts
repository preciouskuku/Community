// src/state/authStore.ts
import { create } from 'zustand'
import { supabase } from '@/lib/supabaseClient' // Assuming your client is here
import { User } from '@supabase/supabase-js' // Supabase's built-in User type

// --- 1. Define the clean application-level User type ---
export interface AppUser {
  id: string;
  email: string;
  // These properties are mapped from user_metadata
  name: string; 
  mobileNumber: string | null; 
  // Add other properties if necessary (e.g., avatar_url)
}

// Helper function to map the messy Supabase User object to your clean AppUser object
const transformSupabaseUser = (sbUser: User): AppUser => ({
  id: sbUser.id,
  email: sbUser.email!,
  name: sbUser.user_metadata.full_name || '', // Use the key you saved during registration
  mobileNumber: sbUser.user_metadata.mobile_number || null, // Use the key you saved
});
// ----------------------------------------------------


interface AuthState {
  user: AppUser | null; // Use the clean AppUser type
  isLoading: boolean;
  
  // You may need an action to fetch the current user's session
  fetchUser: () => Promise<void>; 
  register: (name: string, email: string, password: string, mobileNumber?: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null, // Initialize user state as null
  isLoading: false,

  // --- 2. Update the fetchUser logic (Example) ---
  fetchUser: async () => {
    set({ isLoading: true });
    const { data: { user: sbUser } } = await supabase.auth.getSession();
    
    if (sbUser) {
        set({ user: transformSupabaseUser(sbUser) });
    } else {
        set({ user: null });
    }
    set({ isLoading: false });
  },

  // --- 3. Update the register logic to save AppUser object ---
  register: async (name, email, password, mobileNumber) => {
    set({ isLoading: true })
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          mobile_number: mobileNumber,
        }
      }
    })

    set({ isLoading: false })

    if (error) {
      throw new Error(error.message)
    }

    if (data.user) {
        // Map and save the user object immediately after successful registration
        set({ user: transformSupabaseUser(data.user) });
    }

    if (data.user && !data.user.identities?.length) {
      throw new Error("Registration successful! Please check your email for a verification link.")
    }
  },
  
  // --- 4. Update the logout logic ---
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null }); // Clear user state on logout
  }
}));