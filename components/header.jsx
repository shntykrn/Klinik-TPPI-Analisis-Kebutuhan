import { useState } from "react"
import { Menu } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-[#d9d9d9]">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-[#9747ff] rounded-full flex items-center justify-center">
          <span className="text-white font-bold">TPPL</span>
        </div>
        <h1 className="text-xl font-bold">Terminal Petikemas Palembang</h1>
      </div>

      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
          <Menu size={24} />
        </button>
      </div>

      <nav
        className={`${isMenuOpen ? "block absolute top-16 left-0 right-0 bg-white p-4 shadow-md z-50" : "hidden"} md:flex md:static md:shadow-none md:p-0 md:items-center md:gap-6`}
      >
        <a href="#" className="block py-2 md:py-0 text-[#362969] font-medium">
          Home
        </a>
        <a href="#" className="block py-2 md:py-0 text-[#362969] font-medium">
          About
        </a>
        <a href="#" className="block py-2 md:py-0 text-[#362969] font-medium">
          Services
        </a>
        <a href="#" className="block py-2 md:py-0 text-[#362969] font-medium">
          Contact
        </a>
      </nav>
    </header>
  )
}
