import useSWR, { mutate } from "swr"
import { useState } from "react"
import { apiClient } from "@/lib/api-client"
import type { AxiosError } from "axios"

export interface Post {
  id: string
  title: string
  content: string
  author: string
  createdAt: string
  updatedAt: string
}
  
export interface CreatePostInput {
  title: string
  content: string
  author: string
}

export interface UpdatePostInput {
  title?: string
  content?: string
  author?: string
}

const POSTS_QUERY_KEY = "/api/posts"

export const usePosts = () => {
  const { data, error, isLoading } = useSWR<Post[]>(POSTS_QUERY_KEY, async () => {
    const response = await apiClient.get<Post[]>("/posts")
    return Array.isArray(response) ? response : []
  })

  return {
    data: Array.isArray(data) ? data : [],
    isLoading,
    error,
  }
}

export const usePost = (id: string) => {
  const { data, error, isLoading } = useSWR<Post>(id ? `/api/posts/${id}` : null, async () => {
    const response = await apiClient.get<Post>(`/posts/${id}`)
    return response
  })

  return {
    data,
    isLoading,
    error,
  }
}

export const useCreatePost = () => {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const mutate_create = async (data: CreatePostInput, options?: { onSuccess?: () => void }) => {
    setIsPending(true)
    setError(null)
    try {
      const response = await apiClient.post<Post>("/posts", data)
      await mutate(POSTS_QUERY_KEY)
      options?.onSuccess?.()
      return response
    } catch (err) {
      const axiosError = err as AxiosError
      const errorMessage = axiosError.response?.data 
        ? (axiosError.response.data as { message?: string }).message || axiosError.message
        : axiosError.message
      const error = new Error(errorMessage)
      setError(error)
      throw error
    } finally {
      setIsPending(false)
    }
  }

  return {
    mutate: mutate_create,
    isPending,
    isError: error !== null,
    error,
  }
}

export const useUpdatePost = () => {
  const isLoading = false

  const mutate_update = async ({ id, data }: { id: string; data: UpdatePostInput }) => {
    try {
      const response = await apiClient.put<Post>(`/posts/${id}`, data)
      await mutate(POSTS_QUERY_KEY)
      return response
    } catch (error) {
      throw error
    }
  }

  return {
    mutate: mutate_update,
    isPending: isLoading,
  }
}

export const useDeletePost = () => {
  const isLoading = false

  const mutate_delete = async (id: string) => {
    try {
      await apiClient.delete(`/posts/${id}`)
      await mutate(POSTS_QUERY_KEY)
    } catch (error) {
      throw error
    }
  }

  return {
    mutate: mutate_delete,
    isPending: isLoading,
  }
}
