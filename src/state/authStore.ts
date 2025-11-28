import { create } from "zustand";

// Replace this with your backend URL
const API_URL = "http://localhost:5000/api";

interface User {
  _id: string;
  name: string;
  email: string;
  token?: string;
}

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, mobileNumber?: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.message || "Login failed");

      // Save token and user
      localStorage.setItem("token", data.token);
      set({ user: data.user, isLoading: false });
    } catch (error: any) {
      set({ isLoading: false });
      throw new Error(error.message || "Server error");
    }
  },

  register: async (name, email, password, mobileNumber) => {
    set({ isLoading: true });
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, ...(mobileNumber && { mobileNumber }) }),
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.message || "Registration failed");

      // Save token and user
      localStorage.setItem("token", data.token);
      set({ user: data.user, isLoading: false });
    } catch (error: any) {
      set({ isLoading: false });
      throw new Error(error.message || "Server error");
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null });
  },
}));
