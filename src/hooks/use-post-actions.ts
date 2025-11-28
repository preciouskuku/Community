"use client"

import { usePostsStore } from "@/state/postsStore"
import { useRouter } from "next/navigation"

export function usePostActions() {
  const router = useRouter()
  const { createPost, updatePost, deletePost, likePost, unlikePost } = usePostsStore()

  // Create a new post
  const handleCreatePost = async (data: { title: string; description: string; category: string }) => {
    createPost(data)
    router.push("/posts") // redirect to posts list after creation
  }

  // Update an existing post
  const handleUpdatePost = async (
    id: string,
    data: { title: string; description: string; category: string }
  ) => {
    updatePost(id, data)
    router.push(`/posts/${id}`) // redirect back to post detail after editing
  }

  // Delete a post
  const handleDeletePost = (id: string) => {
    deletePost(id)
    router.push("/posts") // redirect to posts list after deletion
  }

  return {
    createPost: handleCreatePost,
    updatePost: handleUpdatePost,
    deletePost: handleDeletePost,
    likePost,
    unlikePost,
  }
}
