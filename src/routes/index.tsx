import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
    <main className='w-full h-[calc(100vh-63px)]'>
      <div className='flex mx-auto max-w-screen-lg'>
        <Card className='w-full rounded-none'>
          <CardHeader>
            <CardTitle>asdasd</CardTitle>
          </CardHeader>
          <CardContent>
            
          </CardContent>
        </Card>
      </div>
    </main>
  )
}