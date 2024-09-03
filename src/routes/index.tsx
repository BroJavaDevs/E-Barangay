
import { createFileRoute } from '@tanstack/react-router'

type Post = {
  id: number,
  title: string,
  body: string,
  image: string,
  position: string,
  postedAt: string
}

export const fetchPosts = async () => {
  const res = await fetch(import.meta.env.VITE_API_URL)
  const data = await res.json() as Post[]

  // Convert postedAt from string to Date
  const posts = data.map(post => ({
    ...post,
    postedAt: new Date(post.postedAt)
  }));

  return posts
}

export const Route = createFileRoute('/')({
  loader: () => fetchPosts(),
})

