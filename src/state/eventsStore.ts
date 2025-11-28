"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  attendees: number
  registered?: boolean
}

export interface EventsState {
  events: Event[]
  isLoading: boolean
  error: string | null

  getEvents: () => void
  createEvent: (data: Omit<Event, "id" | "attendees">) => void
  registerEvent: (id: string) => void
  unregisterEvent: (id: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "React Workshop",
    date: "December 10, 2024",
    time: "2:00 PM - 5:00 PM",
    location: "Community Center",
    attendees: 24,
    description: "Learn React fundamentals with hands-on examples.",
    registered: false,
  },
  {
    id: "2",
    title: "Networking Lunch",
    date: "December 15, 2024",
    time: "12:00 PM - 1:30 PM",
    location: "Downtown Café",
    attendees: 18,
    description: "Connect with fellow community members over lunch.",
    registered: false,
  },
  {
    id: "3",
    title: "Web Dev Conference",
    date: "December 20, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "Convention Center",
    attendees: 142,
    description: "Annual conference with talks from industry leaders.",
    registered: false,
  },
]

export const useEventsStore = create<EventsState>()(
  persist(
    (set) => ({
      events: mockEvents,
      isLoading: false,
      error: null,

      getEvents: () => {
        set({ isLoading: true, error: null })
        setTimeout(() => {
          set({ isLoading: false })
        }, 300)
      },

      createEvent: (data) => {
        const newEvent: Event = {
          ...data,
          id: Date.now().toString(),
          attendees: 1,
          registered: true,
        }
        set((state) => ({ events: [newEvent, ...state.events] }))
      },

      registerEvent: (id) => {
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id ? { ...event, registered: true, attendees: event.attendees + 1 } : event,
          ),
        }))
      },

      unregisterEvent: (id) => {
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id ? { ...event, registered: false, attendees: Math.max(0, event.attendees - 1) } : event,
          ),
        }))
      },

      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
    }),
    {
      name: "events-storage",
    },
  ),
)
