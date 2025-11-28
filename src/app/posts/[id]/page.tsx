"use client"

import { Navbar } from "@/components/layout/navbar"
import { Sidebar } from "@/components/layout/sidebar"
import { Badge } from "@/components/ui/form-components"
import { usePostsStore } from "@/state/postsStore"
import { usePostActions } from "@/hooks/use-post-actions"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function PostDetailPage() {
  const params = useParams()
  const postId = params.id as string
  const { posts } = usePostsStore()
  const { likePost, unlikePost, deletePost } = usePostActions()

  const post = posts.find((p) => p.id === postId)

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 md:ml-64 p-6 md:p-8">
            <div className="text-center py-12">
              <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
              <p className="text-muted-foreground mb-6">This post doesn't exist or has been deleted.</p>
              <Link
                href="/posts"
                className="px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Back to Posts
              </Link>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 md:ml-64 p-6 md:p-8">
          <div className="max-w-3xl">
            <Link
              href="/posts"
              className="inline-flex items-center gap-2 text-primary hover:underline mb-8 font-medium"
            >
              <span>←</span> Back to Posts
            </Link>

            <article className="bg-card p-8 rounded-lg border border-border shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{post.author}</p>
                    <p className="text-sm text-muted-foreground">{post.date}</p>
                  </div>
                </div>
                <Badge variant="secondary">{post.category}</Badge>
              </div>

              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

              <div className="prose prose-invert max-w-none mb-8">
                <p className="text-lg text-foreground leading-relaxed whitespace-pre-wrap">{post.description}</p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <button
                  onClick={() => (post.liked ? unlikePost(post.id) : likePost(post.id))}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    post.liked
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  <span className="text-xl">{post.liked ? "❤️" : "🤍"}</span>
                  <span className="font-semibold">{post.likes}</span>
                </button>

                {post.authorId === "1" && (
                  <>
                    <Link
                      href={`/posts/${post.id}/edit`}
                      className="px-4 py-2 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => {
                        deletePost(post.id)
                        // Redirect would happen in the action hook
                      }}
                      className="px-4 py-2 bg-destructive text-destructive-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </article>

            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">More from {post.author}</h2>
              <div className="grid gap-4">
                {/* Placeholder for related posts */}
                <p className="text-muted-foreground text-center py-8">No other posts from this author yet.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
