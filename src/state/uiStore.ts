import { create } from "zustand";

interface UIStore {
  toasts: { message: string; type: "success" | "error" }[];
  addToast: (message: string, type: "success" | "error") => void;
}

export const useUIStore = create<UIStore>((set) => ({
  toasts: [],
  addToast: (message, type) =>
    set((state) => ({ toasts: [...state.toasts, { message, type }] })),
}));
