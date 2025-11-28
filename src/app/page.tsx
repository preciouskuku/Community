"use client"

import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center text-center gap-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-foreground">Welcome to Community Portal</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with others, share your thoughts, and discover upcoming events in your community.
            </p>
          </div>

          <div className="flex gap-4 flex-col sm:flex-row">
            <Link
              href="/auth/login"
              className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Browse Community
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-12">
            {[
              { icon: "💬", title: "Share Posts", desc: "Express yourself and connect with the community" },
              { icon: "📅", title: "Discover Events", desc: "Find and register for upcoming events" },
              { icon: "👥", title: "Build Connections", desc: "Network and collaborate with members" },
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
