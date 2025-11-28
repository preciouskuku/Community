"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

interface SidebarProps {
  isOpen?: boolean
}

export function Sidebar({ isOpen = true }: SidebarProps) {
  const pathname = usePathname()

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/posts", label: "Posts", icon: "📝" },
    { href: "/posts/create", label: "Create Post", icon: "✨" },
    { href: "/events", label: "Events", icon: "📅" },
    { href: "/profile", label: "Profile", icon: "👤" },
  ]

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-64px)] w-64 border-r border-border bg-sidebar transition-transform duration-200",
        "hidden md:block",
        !isOpen && "-translate-x-full",
      )}
    >
      <div className="flex flex-col gap-2 p-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              pathname === link.href
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </div>
    </aside>
  )
}
