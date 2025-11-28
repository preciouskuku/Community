"use client"

import { useUIStore } from "@/state/uiStore"

export function ToastContainer() {
  const { toasts, removeToast } = useUIStore()

  const typeClasses: Record<string, string> = {
    success: "bg-green-500 text-white",
    error: "bg-destructive text-destructive-foreground",
    warning: "bg-yellow-500 text-white",
    info: "bg-blue-500 text-white",
  }

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {toasts.map((toast) => {
        if (!toast.id) return null // ignore items without ID

        return (
          <div
            key={toast.id} // must be unique
            className={`px-4 py-3 rounded-lg text-sm font-medium animate-slide-in ${typeClasses[toast.type] || ""}`}
          >
            <div className="flex items-center justify-between gap-3">
              <span>{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-lg leading-none opacity-70 hover:opacity-100"
              >
                ×
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
