"use client"

import { Navbar } from "@/components/layout/navbar"
import { Sidebar } from "@/components/layout/sidebar"
import Link from "next/link"
import { Badge } from "@/components/ui/form-components"
import { usePostsStore } from "@/state/postsStore"
import { usePostActions } from "@/hooks/use-post-actions"

export default function PostsPage() {
  const { posts } = usePostsStore()
  const { likePost, unlikePost } = usePostActions()

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 md:ml-64 p-6 md:p-8">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">Community Posts</h1>
                <p className="text-muted-foreground mt-1">Share your thoughts and learn from others</p>
              </div>
              <Link
                href="/posts/create"
                className="px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity w-full sm:w-auto text-center"
              >
                Create Post
              </Link>
            </div>

            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-all hover:border-primary"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{post.category}</Badge>
                        <span className="text-xs text-muted-foreground">{post.date}</span>
                      </div>
                      <Link href={`/posts/${post.id}`}>
                        <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-muted-foreground mb-3">{post.description}</p>
                      <p className="text-sm text-muted-foreground">by {post.author}</p>
                    </div>
                    <div className="flex items-center gap-4 sm:flex-col">
                      <button
                        onClick={() => (post.liked ? unlikePost(post.id) : likePost(post.id))}
                        className={`flex flex-col items-center gap-1 p-2 rounded hover:bg-muted transition-colors ${post.liked ? "text-primary" : ""}`}
                      >
                        <span className="text-2xl">{post.liked ? "❤️" : "🤍"}</span>
                        <p className="text-xs text-muted-foreground">{post.likes}</p>
                      </button>
                    </div>
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
