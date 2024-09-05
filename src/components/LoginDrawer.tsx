import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useToast } from './ui/use-toast'
import { useAuth } from './AuthContext'

type Props = {
  open: boolean,
  setOpen: (open: boolean) => void
}

type LoginState = 'idle' | 'loading' | 'verifying' | 'success';

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required')
})

export default function LoginDrawer({ open, setOpen }: Props) {
  const { data, isAuthenticated, logout, login } = useAuth()
  const [state, setState] = useState<LoginState>('idle')
  const [loading, setLoading] = useState<boolean>(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  async function onSubmit(data: z.infer<typeof schema>) {
    setLoading(true)
    setState('loading')
    await new Promise(resolve => setTimeout(resolve, 500))
    try {
      setState('verifying')
      await new Promise(resolve => setTimeout(resolve, 1000))
      const response = await fetch('https://barangay82.brojava.com/api'+'/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if(!response.ok) {
        throw new Error(result.message || 'Invalid username or password!')
      }

      login(result.token)
      
      setState('success')
      setOpen(false)
      form.reset()
    } catch (error: any) {
      setState('idle')
      toast({
        title: 'Login Failed',
        description: error.message,
        variant: 'destructive'
      })
      form.setValue('password', '')
    }
    setLoading(false)
  }

  return (
    <Drawer 
      open={open} 
      onOpenChange={setOpen}
    >
      <DrawerContent className='focus-visible:ring-0'>
        <div className='mx-auto w-full h-96 max-w-sm'>
          <DrawerHeader>
            <DrawerTitle>{isAuthenticated ? 'Welcome User' : 'Login'}</DrawerTitle>
            <DrawerDescription>Only for Barangay 82 Authorized personnel</DrawerDescription>
          </DrawerHeader>
          <div className='flex w-full justify-center my-9 h-full'>
            {isAuthenticated ?
            (
              <div className='flex flex-col'>
                <h1>Username: {data?.user.username}</h1>
                <h1>Position: {data?.user.position}</h1>
                <Button
                  className='bg-orange-500'
                  onClick={() => {
                    logout()
                    setOpen(false)
                  }}
                >Logout</Button>
              </div>
            ):
            (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-4'>
                  <FormField
                    control={form.control}
                    name='username'
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel className='sr-only'>Username</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Username' {...field}
                            className={cn(fieldState.error && 'focus-visible:ring-red-500')}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel className='sr-only'>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Password' {...field}
                            className={cn(fieldState.error && 'focus-visible:ring-red-500')}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button 
                    disabled={loading || state === 'verifying'}
                    className='flex gap-2 bg-orange-500'
                    type='submit'>
                      {loading && <Loader2 className='animate-spin' />}
                      {state === 'idle' && 'Login'}
                      {state === 'loading' && 'Loading'}
                      {state === 'verifying' && 'Checking'}
                      {state === 'success' && 'Success'}
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
