"use client"

import { useEventsStore } from "@/state/eventsStore"
import { useUIStore } from "@/state/uiStore"

export function useEventActions() {
  const { registerEvent, unregisterEvent } = useEventsStore()
  const { addToast } = useUIStore()

  return {
    registerEvent: async (id: string) => {
      try {
        registerEvent(id)
        addToast("Successfully registered for event", "success")
      } catch (err: any) {
        addToast(err.message || "Failed to register for event", "error")
      }
    },

    unregisterEvent: async (id: string) => {
      try {
        unregisterEvent(id)
        addToast("Unregistered from event", "success")
      } catch (err: any) {
        addToast(err.message || "Failed to unregister from event", "error")
      }
    },
  }
}
