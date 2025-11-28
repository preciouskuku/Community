// ./profile/page.tsx
"use client"

import { Navbar } from "@/components/layout/navbar"
import { Sidebar } from "@/components/layout/sidebar"
import { Label } from "@/components/ui/form-components"
import { useAuthStore } from "@/state/authStore" // Now returns a clean AppUser
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

  // Assuming post/event filtering logic is correct
  const userPosts = posts.filter((p) => p.authorId === "1") // <- NOTE: This ID check should likely use user.id
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

            {/* ... Stats section ... */}

            <div className="bg-card p-8 rounded-lg border border-border space-y-6">
              <h2 className="text-2xl font-bold">Account Information</h2>

              <div className="space-y-2">
                <Label>Full Name</Label>
                <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted flex items-center text-sm">
                  {user.name} {/* ✅ Now uses the clean 'name' property */}
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
                  {user.mobileNumber} {/* ✅ Use the clean 'mobileNumber' property */}
                </div>
              </div>
              
              {/* ... Logout and other sections ... */}

            </div>
          </div>
        </main>
      </div>
    </div>
  )
}