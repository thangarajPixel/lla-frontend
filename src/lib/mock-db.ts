export interface Post {
  id: string
  title: string
  content: string
  author: string
  createdAt: string
  updatedAt: string
}

export const mockDatabase = {
  posts: [
    {
      id: "1",
      title: "Getting Started with Next.js",
      content: "Learn how to build modern web applications with Next.js",
      author: "John Doe",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "React Query Best Practices",
      content: "Master data fetching with React Query",
      author: "Jane Smith",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ] as Post[],
}

export function getNextPostId(): string {
  const maxId = Math.max(...mockDatabase.posts.map((p) => Number.parseInt(p.id, 10)), 0)
  return String(maxId + 1)
}
