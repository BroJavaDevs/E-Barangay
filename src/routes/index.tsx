import { fetchPosts } from '@/utils/fetchPosts'
import { createFileRoute, useLoaderData } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  loader: () => fetchPosts(),
  staleTime: Infinity,
  component: Home
})

function Home() {
  const data = useLoaderData({
    from: '/'
  })

  console.log(data)

  return (
    <main className='w-full bg-gray-100 h-[calc(100vh-63px)]'>
      <div className='flex mx-auto max-w-screen-lg'>
        asdsad
      </div>
    </main>
  )
}