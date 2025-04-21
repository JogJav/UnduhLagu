"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import SearchBar from "@/components/search-bar"
import { ModeToggle } from "@/components/mode-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export default function Header() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSearch = (query: string) => {
    if (!query.trim()) return
    router.push(`/?q=${encodeURIComponent(query)}`)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                {/* Fix: Add tabindex="-1" to icon */}
                <Menu className="h-5 w-5" aria-hidden="true" tabIndex={-1} />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/"
                  className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/trending"
                  className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Trending
                </Link>
                <Link
                  href="/tentang"
                  className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tentang UnduhLagu
                </Link>
                <Link
                  href="/subscriptions"
                  className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Subscriptions
                </Link>
                <Link
                  href="/library"
                  className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Library
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2">
            <div
              className="relative h-7 w-7 flex items-center justify-center bg-gradient-to-br from-amber-500 to-red-600 rounded-lg shadow-sm"
              aria-hidden="true"
              tabIndex={-1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-white"
              >
                <path d="M12 18v-6" />
                <path d="M8 18v-1" />
                <path d="M16 18v-3" />
                <path d="M20 18v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
                <path d="M12 12 8 8" />
                <path d="M12 6v6" />
                <path d="M12 8l4 4" />
              </svg>
            </div>
            <span className="font-bold text-lg hidden md:inline-block bg-gradient-to-r from-amber-500 to-red-600 bg-clip-text text-transparent">
              UnduhLagu
            </span>
          </Link>
        </div>

        <div className="flex-1 flex justify-center max-w-xl mx-4 md:mx-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="flex items-center gap-3">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex text-amber-500 hover:text-red-600 transition-colors"
          >
            <Bell className="h-5 w-5" aria-hidden="true" tabIndex={-1} />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-amber-500 hover:text-red-600 transition-colors"
          >
            <User className="h-5 w-5" aria-hidden="true" tabIndex={-1} />
            <span className="sr-only">Profile</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
