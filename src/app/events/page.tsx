"use client"

import { Navbar } from "@/components/layout/navbar"
import { Sidebar } from "@/components/layout/sidebar"
import { Badge } from "@/components/ui/form-components"
import { useEventsStore } from "@/state/eventsStore"
import { useEventActions } from "@/hooks/use-event-actions"

export default function EventsPage() {
  const { events } = useEventsStore()
  const { registerEvent, unregisterEvent } = useEventActions()

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 md:ml-64 p-6 md:p-8">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">Community Events</h1>
                <p className="text-muted-foreground mt-1">Discover and register for upcoming events</p>
              </div>
              <button className="px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity w-full sm:w-auto">
                Create Event
              </button>
            </div>

            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-all hover:border-primary"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                      <p className="text-muted-foreground mb-3">{event.description}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <span>📅</span>
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span>🕒</span>
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span>📍</span>
                          <span>{event.location}</span>
                        </div>
                      </div>

                      <Badge variant="accent">{event.attendees} attending</Badge>
                    </div>

                    <button
                      onClick={() => (event.registered ? unregisterEvent(event.id) : registerEvent(event.id))}
                      className={`px-6 py-2 font-semibold rounded-lg hover:opacity-90 transition-opacity w-full sm:w-auto ${
                        event.registered ? "bg-muted text-muted-foreground" : "bg-accent text-accent-foreground"
                      }`}
                    >
                      {event.registered ? "Unregister" : "Register"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
