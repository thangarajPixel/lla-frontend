"use client"

import type React from "react"
import { useState } from "react"
import { useCreatePost } from "@/lib/hooks/use-posts"

export function CreatePostForm(): React.ReactElement {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [author, setAuthor] = useState("")

  const createPost = useCreatePost()

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()

    if (!title || !content || !author) {
      alert("Please fill in all fields")
      return
    }

    createPost.mutate(
      { title, content, author },
      {
        onSuccess: () => {
          setTitle("")
          setContent("")
          setAuthor("")
        },
      },
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter post content"
          rows={4}
          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Enter author name"
          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <button
        type="submit"
        disabled={createPost.isPending}
        className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-colors font-medium"
      >
        {createPost.isPending ? "Creating..." : "Create Post"}
      </button>

      {createPost.isError && (
        <div className="text-red-600 text-sm">Error creating post: {createPost.error?.message}</div>
      )}
    </form>
  )
}
