import { Card, CardContent, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'

export default function AddPost() {
  return (
    <div>
      <Card className='border-0'>
        <CardContent className='border-0 py-2'>
          <CardTitle>Add Announcement</CardTitle>
        </CardContent>
      </Card>
    </div>
  )
}
