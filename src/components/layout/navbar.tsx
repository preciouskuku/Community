"use client"

import Link from "next/link"
import { useAuthStore } from "@/state/authStore"
import { Menu } from "lucide-react" // Using a simple icon from lucide-react (or similar)

interface NavbarProps {
  onMenuClick?: () => void
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const { user, logout } = useAuthStore()

  return (
    // 1. Clearer background, minimal shadow, fixed height
    <nav className="sticky top-0 z-40 w-full bg-white border-b border-gray-100 shadow-md">
      <div className="flex h-20 items-center justify-between container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Logo/Brand - Using Meetup-like color for the main text */}
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-[#004A55] hover:opacity-90 transition-opacity">
          {/* Replaced the 'C' with a simple icon/placeholder to represent a logo */}
          <svg className="w-8 h-8 text-[#ED1C4C]" fill="currentColor" viewBox="0 0 24 24">
             <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4 11h-3v3c0 .552-.448 1-1 1s-1-.448-1-1v-3H8c-.552 0-1-.448-1-1s.448-1 1-1h3V8c0-.552.448-1 1-1s1 .448 1 1v3h3c.552 0 1 .448 1 1s-.448 1-1 1z"/>
          </svg>
          Community
        </Link>

        {/* Main Navigation and Auth Links */}
        <div className="flex items-center gap-4 sm:gap-6">
          
          {/* Primary Navigation Links (Hidden on small screens for cleaner mobile) */}
          <div className="hidden md:flex items-center gap-6">
             <Link href="/dashboard" className="text-base font-medium text-gray-700 hover:text-[#ED1C4C] transition-colors">
               Explore
             </Link>
             <Link href="/posts" className="text-base font-medium text-gray-700 hover:text-[#ED1C4C] transition-colors">
               Start a Group
             </Link>
             <Link href="/events" className="text-base font-medium text-gray-700 hover:text-[#ED1C4C] transition-colors">
               Events
             </Link>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4">
            {user ? (
              // Authenticated View
              <div className="flex items-center gap-4">
                <span className="text-base text-gray-600 hidden lg:inline font-medium">Hi, {user.name}</span>
                {/* Logout as a simple link */}
                <button 
                  onClick={logout} 
                  className="px-4 py-2 text-sm font-semibold border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors hidden sm:block"
                >
                  Logout
                </button>
              </div>
            ) : (
              // Unauthenticated View
              <>
                {/* Simple Sign In link */}
                <Link 
                  href="/auth/login" 
                  className="text-base font-medium text-[#004A55] hover:text-[#ED1C4C] transition-colors hidden sm:block"
                >
                  Log in
                </Link>
                {/* Prominent Sign Up CTA (Button Style) */}
                <Link
                  href="/auth/signup" // Assuming you have a signup path
                  className="px-5 py-2 bg-[#ED1C4C] text-white font-semibold rounded-lg shadow-md hover:bg-[#D51842] transition-colors text-base"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={onMenuClick} 
          className="p-2 rounded-md hover:bg-gray-100 transition-colors md:hidden text-[#004A55]"
          aria-label="Toggle menu"
        >
           {/* Using lucide-react's Menu icon for clarity */}
           <Menu className="w-6 h-6" /> 
        </button>
      </div>
    </nav>
  )
}