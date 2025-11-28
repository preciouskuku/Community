"use client"

import { Navbar } from "@/components/layout/navbar"
import { Sidebar } from "@/components/layout/sidebar"
import { Label } from "@/components/ui/form-components"
import { useAuthStore } from "@/state/authStore"
import { usePostsStore } from "@/state/postsStore"
import { useEventsStore } from "@/state/eventsStore"
import { useUIStore } from "@/state/uiStore"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const router = useRouter()
  const { user, logout } = useAuthStore()
  const { posts } = usePostsStore()
  const { events } = useEventsStore()
  const { addToast } = useUIStore()

  const userPosts = posts.filter((p) => p.authorId === "1")
  const registeredEvents = events.filter((e) => e.registered)

  if (!user) {
    router.push("/auth/login")
    return null
  }

  const handleLogout = () => {
    logout()
    addToast("Logged out successfully", "success")
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 md:ml-64 p-6 md:p-8">
          <div className="max-w-3xl space-y-8">
            <div>
              <h1 className="text-3xl font-bold">My Profile</h1>
              <p className="text-muted-foreground mt-1">Manage your account and view your activity</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "My Posts", value: userPosts.length, icon: "📝" },
                { label: "Events Registered", value: registeredEvents.length, icon: "📅" },
                { label: "Total Likes Received", value: userPosts.reduce((sum, p) => sum + p.likes, 0), icon: "❤️" },
              ].map((stat, i) => (
                <div key={i} className="p-6 rounded-lg border border-border bg-card">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-3xl font-bold mt-2">{stat.value}</p>
                    </div>
                    <span className="text-3xl">{stat.icon}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-card p-8 rounded-lg border border-border space-y-6">
              <h2 className="text-2xl font-bold">Account Information</h2>

              <div className="space-y-2">
                <Label>Full Name</Label>
                <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted flex items-center text-sm">
                  {user.name}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Email Address</Label>
                <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted flex items-center text-sm">
                  {user.email}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Mobile Number</Label>
                <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted flex items-center text-sm">
                  {user.mobile}
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-destructive text-destructive-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Logout
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Your Posts</h2>
              {userPosts.length > 0 ? (
                <div className="space-y-3">
                  {userPosts.map((post) => (
                    <div
                      key={post.id}
                      className="p-4 rounded-lg border border-border bg-card hover:shadow-md transition-shadow"
                    >
                      <h3 className="font-semibold">{post.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{post.description}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-xs text-muted-foreground">{post.date}</span>
                        <span className="text-xs text-muted-foreground">{post.likes} likes</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">You haven't created any posts yet.</p>
              )}
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Events You're Attending</h2>
              {registeredEvents.length > 0 ? (
                <div className="space-y-3">
                  {registeredEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-4 rounded-lg border border-border bg-card hover:shadow-md transition-shadow"
                    >
                      <h3 className="font-semibold">{event.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {event.date} • {event.time}
                      </p>
                      <p className="text-sm text-muted-foreground">{event.location}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">You haven't registered for any events yet.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
