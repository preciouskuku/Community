"use client"

import { Navbar } from "@/components/layout/navbar"
import { Sidebar } from "@/components/layout/sidebar"
import { Badge } from "@/components/ui/form-components"
import { PostSkeleton, EventSkeleton } from "@/components/ui/skeleton"
import { ActivityFeed } from "@/components/activity-feed"
import { usePostsStore } from "@/state/postsStore"
import { useEventsStore } from "@/state/eventsStore"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FiEdit, FiCalendar, FiUsers } from "react-icons/fi"

export default function DashboardPage() {
  const { posts = [], isLoading: postsLoading } = usePostsStore()
  const { events = [], isLoading: eventsLoading } = useEventsStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const recentPosts = Array.isArray(posts) ? posts.slice(0, 3) : []
  const upcomingEvents = Array.isArray(events) ? events.slice(0, 3) : []

  const stats = [
    { label: "Total Posts", value: posts.length, icon: <FiEdit className="text-3xl text-primary" /> },
    { label: "Active Events", value: events.length, icon: <FiCalendar className="text-3xl text-primary" /> },
    { label: "Community Members", value: "1,240", icon: <FiUsers className="text-3xl text-primary" /> },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 md:ml-64 p-6 md:p-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
              <p className="text-muted-foreground">Here's what's happening in your community</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div>{stat.icon}</div>
                </div>
              ))}
            </div>

            {/* Recent Posts & Activity Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Recent Posts</h2>
                  <Link href="/posts" className="text-sm text-primary hover:underline font-medium">
                    View all
                  </Link>
                </div>
                <div className="space-y-3">
                  {!mounted || postsLoading
                    ? Array.from({ length: 3 }).map((_, idx) => <PostSkeleton key={idx} />)
                    : recentPosts.map((post) => (
                        <Link
                          key={post.id}
                          href={`/posts/${post.id}`}
                          className="block p-4 rounded-lg border border-border bg-card hover:shadow-md transition-all hover:border-primary"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <h3 className="font-semibold">{post.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{post.description}</p>
                              <p className="text-xs text-muted-foreground mt-2">by {post.author}</p>
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">{post.date}</span>
                          </div>
                        </Link>
                      ))}
                </div>
              </div>

              <div className="space-y-4">
                <ActivityFeed />
              </div>
            </div>

            {/* Upcoming Events & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Upcoming Events</h2>
                  <Link href="/events" className="text-sm text-primary hover:underline font-medium">
                    View all
                  </Link>
                </div>
                <div className="space-y-3">
                  {!mounted || eventsLoading
                    ? Array.from({ length: 2 }).map((_, idx) => <EventSkeleton key={idx} />)
                    : upcomingEvents.map((event) => (
                        <div
                          key={event.id}
                          className="p-4 rounded-lg border border-border bg-card hover:shadow-md transition-shadow flex items-start justify-between"
                        >
                          <div className="flex-1">
                            <h3 className="font-semibold">{event.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{event.date}</p>
                          </div>
                          <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                            {event.attendees}
                          </Badge>
                        </div>
                      ))}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-bold">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/posts/create"
                    className="p-6 rounded-lg border border-dashed border-border bg-card hover:shadow-md transition-all hover:border-primary text-center group cursor-pointer"
                  >
                    <div className="text-3xl mb-2">✨</div>
                    <p className="text-sm font-medium group-hover:text-primary transition-colors">Create Post</p>
                  </Link>
                  <Link
                    href="/events"
                    className="p-6 rounded-lg border border-dashed border-border bg-card hover:shadow-md transition-all hover:border-primary text-center group cursor-pointer"
                  >
                    <div className="text-3xl mb-2">📅</div>
                    <p className="text-sm font-medium group-hover:text-primary transition-colors">View Events</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
