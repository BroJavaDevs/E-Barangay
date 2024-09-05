import { Card, CardContent, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'

export default function AddPost() {
  return (
    <div>
      <Card className='border-0'>
        <CardContent className='border-0 py-4 space-y-4'>
          <CardTitle>Add Announcements</CardTitle>
        </CardContent>
      </Card>
    </div>
  )
}
