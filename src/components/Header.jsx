import React from "react"
import { useState } from "react"
import { Menu, Bell, User } from "lucide-react"
import { Link } from "react-router-dom"

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center md:hidden">
        <button className="text-gray-500">
          <Menu size={24} />
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <button className="text-gray-500 relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>

        <div className="relative">
          <button className="flex items-center space-x-2" onClick={() => setIsProfileOpen(!isProfileOpen)}>
            <div className="w-8 h-8 bg-[#9747ff] rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <span className="hidden md:block text-sm font-medium">Dr. Anita Wijaya</span>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Profile
              </Link>
              <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Settings
              </Link>
              <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header