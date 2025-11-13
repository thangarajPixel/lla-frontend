"use client"

import { usePosts, useDeletePost } from "@/lib/hooks/use-posts"
import type { JSX } from "react"

export function PostsList(): JSX.Element {
  const { data: posts, isLoading, error } = usePosts()
  const deletePost = useDeletePost()

  if (isLoading) {
    return <div className="text-center py-8">Loading posts...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error loading posts: {error.message}</div>
  }

  return (
    <div className="space-y-4">
      {posts?.map((post) => (
        <div key={post.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">{post.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{post.content}</p>
              <p className="text-xs text-gray-500 mt-2">By {post.author}</p>
            </div>
            <button
              onClick={() => deletePost.mutate(post.id)}
              disabled={deletePost.isPending}
              className="ml-4 px-3 py-1 bg-danger text-white rounded hover:bg-red-600 disabled:opacity-50 transition-colors"
            >
              {deletePost.isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
