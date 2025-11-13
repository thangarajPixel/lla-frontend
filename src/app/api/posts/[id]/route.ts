import { type NextRequest, NextResponse } from "next/server"
import { mockDatabase } from "@/lib/mock-db"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id } = await params
  const post = mockDatabase.posts.find((p) => p.id === id)

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }

  return NextResponse.json(post)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id } = await params
  const body = await request.json()

  const postIndex = mockDatabase.posts.findIndex((p) => p.id === id)

  if (postIndex === -1) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }

  mockDatabase.posts[postIndex] = {
    ...mockDatabase.posts[postIndex],
    ...body,
    updatedAt: new Date().toISOString(),
  }

  return NextResponse.json(mockDatabase.posts[postIndex])
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id } = await params
  const postIndex = mockDatabase.posts.findIndex((p) => p.id === id)

  if (postIndex === -1) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }

  const deletedPost = mockDatabase.posts.splice(postIndex, 1)
  return NextResponse.json(deletedPost[0])
}
