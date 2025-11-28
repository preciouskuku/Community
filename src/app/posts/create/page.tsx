"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Sidebar } from "@/components/layout/sidebar"
import { Input, Textarea, Label } from "@/components/ui/form-components"
import { Spinner } from "@/components/ui/form-components"
import { usePostActions } from "@/hooks/use-post-actions"
import Link from "next/link"

export default function CreatePostPage() {
  const { createPost } = usePostActions()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "general",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await createPost(formData)
      setFormData({ title: "", description: "", category: "general" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 md:ml-64 p-6 md:p-8">
          <div className="max-w-2xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Create Post</h1>
              <p className="text-muted-foreground mt-2">Share your thoughts with the community</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-lg border border-border">
              <div className="space-y-2">
                <Label htmlFor="title">Post Title</Label>
                <Input
                  id="title"
                  placeholder="What's on your mind?"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                >
                  <option value="general">General</option>
                  <option value="tutorial">Tutorial</option>
                  <option value="question">Question</option>
                  <option value="news">News</option>
                  <option value="event">Event</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Share your thoughts, ideas, and insights..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={8}
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
                >
                  {loading && <Spinner size="sm" />}
                  {loading ? "Publishing..." : "Publish Post"}
                </button>
                <Link
                  href="/posts"
                  className="px-6 py-2 border border-border text-foreground font-semibold rounded-lg hover:bg-muted transition-colors"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
