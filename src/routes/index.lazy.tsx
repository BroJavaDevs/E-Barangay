import { createLazyFileRoute } from '@tanstack/react-router'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

export const Route = createLazyFileRoute('/')({
  component: Home
})

function Home() {
  const posts = Route.useLoaderData()

  return (
    <main className='w-full'>
      <div className='flex mx-auto max-w-screen-lg'>
        <ScrollArea className='w-full h-full'>
          <div className='flex mx-auto flex-col gap-4 lg:gap-8 my-0 lg:my-8'>
            {posts.map((post) => (
              <Card key={post.id} className='w-full rounded-none'>
                <CardHeader className='px-4'>
                  <CardTitle className='text-2xl'>{post.title}</CardTitle>
                  <CardDescription>
                    <Badge className='rounded-full bg-green-400 hover:bg-green-500'>{post.position}</Badge> {
                    post.postedAt.toLocaleDateString('en-US', { dateStyle: 'full' }) +
                    ' ' + post.postedAt.toLocaleTimeString('en-US', { timeStyle: 'short' })
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className='px-0'>
                  <div className='px-2 lg:px-4 pb-4'>
                    {post.body}
                  </div>
                  {post.image && <img className='border' src={post.image} alt='tite' />}    
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </main>
  )
}