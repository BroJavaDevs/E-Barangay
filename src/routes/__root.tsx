import Navbar from '@/components/Navbar'
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <>
      <main className=''>
        <Navbar />
        <main className='w-full'>
          <div className='flex mx-auto max-w-screen-lg'>
            <Outlet />
          </div>
        </main>
      </main>
    </>
  ),
})