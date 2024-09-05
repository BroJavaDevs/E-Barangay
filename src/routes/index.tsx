
import { useAuth } from '@/components/AuthContext'
import PostsLoader from '@/components/PostsLoader'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { createFileRoute, ErrorRouteComponent } from '@tanstack/react-router'

type Post = {
  id: number,
  title: string,
  body: string,
  image: string,
  position: string,
  postedAt: string
}

const ErrorPosts: false | ErrorRouteComponent | null | undefined = ({ error, reset }) => {
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <p className='text-2xl'>{error.message}</p>
      <Button onClick={() => reset()}>Retry</Button>
    </div>
  )
}

export const fetchPosts = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  const res = await fetch('https://barangay82.brojava.com/api'+'/posts')
  const data = await res.json() as Post[]
  // Convert postedAt from string to Date
  const posts = data.map(post => ({
    ...post,
    postedAt: new Date(post.postedAt)
  }));

  if(!res.ok) throw new Error('Failed to fetch posts')

  return posts
}

export const Route = createFileRoute('/')({
  loader: () => fetchPosts(),
  pendingComponent: PostsLoader,
  errorComponent: ErrorPosts,
  component: Home
})

function Home() {
  const agent = useAuth()
  const posts = Route.useLoaderData()
  console.log(agent)
  return (
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
            <CardContent className='px-0 w-full'>
              <div className='px-2 lg:px-4 pb-4'>
                {post.body}
              </div>
              <div className='w-full'>
                {post.image && <img className='border mx-auto' src={post.image} alt='tite' />}    
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}

