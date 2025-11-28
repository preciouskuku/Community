"use client"

import { useRouter, useParams } from "next/navigation"
import { usePostsStore } from "@/state/postsStore"
import { useState, useEffect } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Sidebar } from "@/components/layout/sidebar"
import { Input, Textarea, Label } from "@/components/ui/form-components"

export default function EditPostPage() {
  const router = useRouter()
  const params = useParams()
  const postId = params.id as string
  const { posts, updatePost } = usePostsStore()
  const post = posts.find((p) => p.id === postId)

  const [formData, setFormData] = useState({ title: "", description: "", category: "general" })

  useEffect(() => {
    if (post) setFormData({ title: post.title, description: post.description, category: post.category })
  }, [post])

  if (!post) return <div className="p-8">Post not found.</div>

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updatePost(postId, formData)
    router.push(`/posts/${postId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 md:ml-64 p-6 md:p-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold mb-4">Edit Post</h1>
            <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-lg border border-border">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
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
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Save Changes
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
