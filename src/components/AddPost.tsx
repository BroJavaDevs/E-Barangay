import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardTitle } from './ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from './AuthContext';
import { useEffect, useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { PushNotifications } from '@capacitor/push-notifications';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ImagePlus, X } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';

const schema = z.object({
  title: z.string().min(5, '*Required at least 5 characters'),
  body: z.string().min(10, '*Required at least 10 characters'),
  image: z.instanceof(File).optional(),
});

export default function AddPost() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isNotified, setIsNotified] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isAuthenticated } = useAuth();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      body: '',
      image: undefined,
    },
  });

  const registerPushNotifications = async () => {
    // Request permission to use push notifications
    const permission = await PushNotifications.requestPermissions();
    if (permission.receive === 'granted') {
      // Register for push notifications
      await PushNotifications.register();

      // Listen for push notifications
      PushNotifications.addListener(
        'pushNotificationReceived',
        (notification) => {
          console.log('Notification received:', notification);
          // Display notification content to user
        }
      );

      // Handle notification tap event
      PushNotifications.addListener(
        'pushNotificationActionPerformed',
        (notification) => {
          console.log('Notification action performed:', notification);
          // Navigate to the message or perform an action
        }
      );
    }
    useEffect(() => {
      let flag = false;
      if (flag) {
        registerPushNotifications();
      }
    }, []);
  };

  const handleImageUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleOnImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 1024 * 1024 * 5) {
      // 5MB
      toast({
        title: 'Image too large',
        description: 'Image must be less than 5MB',
        variant: 'destructive',
      });
      return;
    }

    if (!file.type.includes('image')) {
      toast({
        title: 'Invalid image type',
        description: 'Only images that png, jpg, jpeg are allowed.',
        variant: 'destructive',
      });
      return;
    }

    form.setValue('image', file);
    setImage(file);
    
  };

  const onSubmit = async (data: z.infer<typeof schema>) => {
    let notified = isNotified ? 'all' : 'none';
    let visibility = isPrivate ? 'private' : 'public';
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log({...data}, notified, visibility);
    setLoading(false);
    toast({
      title: 'Post Success',
      description: 'Your post has been successfully posted to the community',
    })
    form.reset();
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // This clears the file input
    }
    setOpen(false);
  };

  if (isAuthenticated) {
    return (
      <div className='w-full'>
        <Card className='rounded-none mt-4 mb-4 lg:mb-0 shadow-sm'>
          <CardContent className='py-4 lg:py-4 space-y-4 lg:space-y-0 px-2 lg:px-6'>
            <CardTitle className='text-xl text-gray-700'>
              Add Announcements
            </CardTitle>
            <div
              className='w-full p-2 px-4 rounded-full bg-muted hover:bg-gray-200 cursor-pointer'
              onClick={() => setOpen(true)}
            >
              <h1 className='text-muted-foreground select-none'>
                Announce, something...
              </h1>
            </div>
          </CardContent>
        </Card>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className='h-[410px] flex flex-col'>
            <DialogHeader>
              <DialogDescription className='text-lg text-start'>
                Announce something to the community
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='w-full h-full'>
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel className='sr-only'>Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className={cn('w-full rounded-full bg-muted p-5 focus-visible:ring-2 focus-visible:ring-orange-500',
                            fieldState.error && 'focus-visible:ring-red-500'
                          )}
                          placeholder='Title'
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='body'
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel className='sr-only'>Body</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className={cn('w-full max-h-[100px] rounded-3xl bg-muted p-5 focus-visible:ring-2 focus-visible:ring-orange-500',
                            fieldState.error && 'focus-visible:ring-red-500'
                          )}
                          placeholder='Description'
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <div className='flex justify-end gap-6 my-4'>
                  <div className='flex gap-3'>
                    <div className='flex items-center space-x-2'>
                      <Switch
                        id='notify-users'
                        onCheckedChange={() => setIsNotified((prev) => !prev)}
                      />
                      <Label htmlFor='notify-users'>Notify All</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Switch
                        id='private-post'
                        onCheckedChange={() => setIsPrivate((prev) => !prev)}
                      />
                      <Label htmlFor='private-post'>Private</Label>
                    </div>
                  </div>
                  
                  <div className='flex items-center'>
                    <div>
                      <FormField
                        control={form.control}
                        name='image'
                        render={({ }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...form.register('image')}
                                type='file'
                                accept='image/*'
                                ref={fileInputRef}
                                onChange={handleOnImageChange}
                                style={{ display: 'none' }}
                              />
                            </FormControl>
                          </FormItem>
                          
                        )}
                      />

                      <Button
                        type='button'
                        className='bg-green-600/80 hover:bg-green-600 px-2 text-[12px]'
                        onClick={handleImageUpload}
                      >
                        <ImagePlus size={20} /> {image?.name &&
                          `
                          ${image.name.length <= 20 ? image.name : `${image.name.slice(0, 7)}...${image.name.slice(-7)}`}
                          `}
                      </Button>
                    </div>
                    {image && (
                      <Button type='button' size='sm' className='px-1 py-1' variant='ghost'
                        onClick={() => {
                          setImage(null)
                          if (fileInputRef.current) {
                            fileInputRef.current.value = ''; // This clears the file input
                          }
                        }}
                      >
                        <X size={15}/>
                      </Button>
                    )}
                  </div>
                  
                </div>
                <Button type='submit' className='bg-orange-500' disabled={loading}>
                  {loading ? 'Posting...' : 'Post'}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
