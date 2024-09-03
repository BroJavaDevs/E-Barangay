import { createLazyFileRoute } from '@tanstack/react-router'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { fakePosts } from '@/utils/fakePost'

export const Route = createLazyFileRoute('/')({
  component: Home
})

function Home() {

  return (
    <main className='w-full'>
      <div className='flex mx-auto max-w-screen-lg'>
        <ScrollArea className='w-full h-full'>
          <div className='flex mx-auto flex-col gap-2'>
            {fakePosts.map((post) => (
              <Card key={post.id} className='w-full rounded-none'>
                <CardHeader className='px-4'>
                  <CardTitle className='text-xl'>{post.title}</CardTitle>
                  <CardDescription>
                    <Badge className='rounded-full bg-green-400 hover:bg-green-500'>{post.staff}</Badge> {
                    post.postedAt.toLocaleDateString('en-US', { dateStyle: 'full' }) +
                    ' ' + post.postedAt.toLocaleTimeString('en-US', { timeStyle: 'short' })
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className='px-0'>
                  <div className='px-2 lg:px-4'>
                    {post.body}
                  </div>
                  <img className='border' src={post.imageUrl} alt='tite' />
                  
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </main>
  )
}