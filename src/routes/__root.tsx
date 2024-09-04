import AuthProvider from '@/components/AuthContext'
import LoginDrawer from '@/components/LoginDrawer'
import Navbar from '@/components/Navbar'
import { Toaster } from '@/components/ui/toaster'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createRootRoute({
  component: Root
})

function Root() {
  const [open, setOpen] = useState<boolean>(false)
  
  return (
    <>
      <AuthProvider>
        <Navbar setOpen={setOpen} />
        <main className='w-full'>
          <LoginDrawer open={open} setOpen={setOpen} />
          <div className='flex mx-auto max-w-screen-lg'>
            <Outlet />
          </div>
          <Toaster />
        </main>
      </AuthProvider>
      
    </>
  )
}