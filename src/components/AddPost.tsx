import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardTitle } from './ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from './AuthContext'
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { Textarea } from '@/components/ui/textarea'
import { PushNotifications } from '@capacitor/push-notifications'
import { Switch } from "@/components/ui/switch"

export default function AddPost() {
  const [open, setOpen] = useState(false)
  const { isAuthenticated } = useAuth()

  

  const handlePostSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

  }
  
  if(isAuthenticated) {
    return (
      <div className='w-full'>
        <Card className='rounded-none mt-4 mb-4 lg:mb-0 shadow-sm'>
          <CardContent className='py-4 lg:py-4 space-y-4 lg:space-y-0 px-2 lg:px-6'>
            <CardTitle className='text-xl text-gray-700'>Add Announcements</CardTitle>
            <div 
              className='w-full p-2 px-4 rounded-full bg-muted hover:bg-gray-200 cursor-pointer'
              onClick={() => setOpen(true)}
            >
              <h1 className='text-muted-foreground select-none'>Announce, something...</h1>
            </div>
          </CardContent>
        </Card>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className='h-96 flex flex-col'>
            <DialogHeader>
              <DialogDescription className='text-lg text-start'>
                Announce something to the community
              </DialogDescription>
            </DialogHeader>
            <Input
              className='w-full rounded-full bg-muted p-5 focus-visible:ring-2 focus-visible:ring-orange-500'
              placeholder='Title'
            />
            <Textarea
              className='w-full rounded-3xl bg-muted p-5 focus-visible:ring-2 focus-visible:ring-orange-500'
              placeholder='Description'
            />
            <Button className='bg-orange-500' onClick={handlePostSubmit}>Post</Button>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
  
}
