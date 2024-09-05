import { useAuth } from "./AuthContext"

type Props = {
  setOpen: (open: boolean) => void
}

export default function Navbar({ setOpen }: Props) {
  const { data } = useAuth()
  let holdLogin : any = null

  const handleStart = () => {
    holdLogin = setTimeout(() => {
      setOpen(true)
    }, 3000) // 3 seconds = 3000 milliseconds
  }

  const handleEnd = () => {
    clearTimeout(holdLogin)
  }
  
  return (
    <nav className="w-full bg-orange-400">
      <div className="h-[3px] bg-orange-600 "/>
      <div className="flex mx-auto max-w-screen-lg justify-between items-center p-4">
        <div className="container flex justify-between">
          <h1 className="text-xl font-medium text-white cursor-pointer select-none"
            onMouseDown={handleStart}
            onMouseUp={handleEnd}
            onTouchStart={handleStart}
            onTouchEnd={handleEnd}
          >Announcements</h1>
          {data?.user.username && (
            <h2 className="font-bold text-white cursor-pointer select-none"
            onClick={() => setOpen(true)}
              >{data.user.username}
            </h2>
          )}
        </div>
      </div>
    </nav>
  )
}
