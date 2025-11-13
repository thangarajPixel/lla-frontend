import { type NextRequest, NextResponse } from "next/server"
import { mockDatabase, getNextPostId } from "@/lib/mock-db"

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(mockDatabase.posts)
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json()

  const newPost = {
    id: getNextPostId(),
    ...body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  mockDatabase.posts.push(newPost)
  return NextResponse.json(newPost, { status: 201 })
}
