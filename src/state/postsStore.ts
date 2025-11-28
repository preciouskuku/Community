"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Post {
  id: string
  authorId: string
  author: string
  title: string
  description: string
  category: string
  date: string
  likes: number
  liked?: boolean
  image?: string
}

export interface PostsState {
  posts: Post[]
  isLoading: boolean
  error: string | null

  getPosts: () => void
  createPost: (data: Omit<Post, "id" | "date" | "likes" | "author">) => void
  updatePost: (id: string, data: Partial<Post>) => void
  deletePost: (id: string) => void
  likePost: (id: string) => void
  unlikePost: (id: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
}

const mockPosts: Post[] = [
  {
    id: "1",
    authorId: "2",
    author: "Sarah Johnson",
    title: "Getting Started with React",
    description: "A comprehensive guide to learning React fundamentals and hooks.",
    category: "Tutorial",
    date: "2 hours ago",
    likes: 34,
    liked: false,
  },
  {
    id: "2",
    authorId: "3",
    author: "Mike Chen",
    title: "Next.js Best Practices 2024",
    description: "Explore the latest patterns and optimizations in Next.js development.",
    category: "Best Practices",
    date: "5 hours ago",
    likes: 52,
    liked: false,
  },
  {
    id: "3",
    authorId: "4",
    author: "Emma Davis",
    title: "Community Meetup Recap",
    description: "Highlights from our December meetup with great discussions.",
    category: "Community",
    date: "1 day ago",
    likes: 28,
    liked: false,
  },
]

export const usePostsStore = create<PostsState>()(
  persist(
    (set) => ({
      posts: mockPosts,
      isLoading: false,
      error: null,

      getPosts: () => {
        set({ isLoading: true, error: null })
        // Simulate API call
        setTimeout(() => {
          set({ isLoading: false })
        }, 300)
      },

      createPost: (data) => {
        const newPost: Post = {
          ...data,
          id: Date.now().toString(),
          date: "just now",
          likes: 0,
          liked: false,
        }
        set((state) => ({ posts: [newPost, ...state.posts] }))
      },

      updatePost: (id, data) => {
        set((state) => ({
          posts: state.posts.map((post) => (post.id === id ? { ...post, ...data } : post)),
        }))
      },

      deletePost: (id) => {
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== id),
        }))
      },

      likePost: (id) => {
        set((state) => ({
          posts: state.posts.map((post) => (post.id === id ? { ...post, liked: true, likes: post.likes + 1 } : post)),
        }))
      },

      unlikePost: (id) => {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id ? { ...post, liked: false, likes: Math.max(0, post.likes - 1) } : post,
          ),
        }))
      },

      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
    }),
    {
      name: "posts-storage",
    },
  ),
)
