"use client"

import { useUIStore } from "@/state/uiStore"
import { useEffect, useState } from "react"

export function OfflineIndicator() {
  const { isOffline, setOffline } = useUIStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleOnline = () => setOffline(false)
    const handleOffline = () => setOffline(true)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [setOffline])

  if (!mounted || !isOffline) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-white px-4 py-2 text-center text-sm font-medium">
      You are currently offline. Some features may be unavailable.
    </div>
  )
}
