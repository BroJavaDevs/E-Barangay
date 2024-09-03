import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from './ui/badge'

type Props = {
  id: number,
  title: string,
  body: string,
  image: string,
  position: string,
  postedAt: Date
}

export default function CardPost({ id, title, body, image, position, postedAt }: Props) {
  return (
    <Card key={id} className='w-full rounded-none'>
      <CardHeader className='px-4'>
        <CardTitle className='text-xl'>{title}</CardTitle>
        <CardDescription>
          <Badge className='rounded-full bg-green-400 hover:bg-green-500'>{position}</Badge> {
          postedAt.toLocaleDateString('en-US', { dateStyle: 'full' }) +
          ' ' + postedAt.toLocaleTimeString('en-US', { timeStyle: 'short' })
          }
        </CardDescription>
      </CardHeader>
      <CardContent className='px-0'>
        <div className='px-2 lg:px-4'>
          {body}
        </div>
        <img className='border' src={image} alt='tite' />
      </CardContent>
    </Card>
  )
}
