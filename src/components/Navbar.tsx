import { Link } from "@tanstack/react-router";

export default function Navbar() {
  return (
    <nav className="w-full bg-orange-400">
      <div className="h-[3px] bg-orange-600 "/>
      <div className="flex mx-auto max-w-screen-lg justify-between items-center p-4">
        <div className="container">
          <Link to="/" className="text-xl font-medium text-white">Announcements</Link>
        </div>
      </div>
    </nav>
  )
}
