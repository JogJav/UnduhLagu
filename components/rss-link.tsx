import { RssIcon } from "lucide-react"
import Link from "next/link"

interface RssLinkProps {
  className?: string
}

export default function RssLink({ className = "" }: RssLinkProps) {
  return (
    <Link
      href="/api/rss"
      className={`flex items-center gap-1 text-amber-500 hover:text-red-600 transition-colors ${className}`}
      target="_blank"
      rel="noopener noreferrer"
      title="Subscribe to our RSS feed"
    >
      <RssIcon className="h-4 w-4" />
      <span className="text-sm">RSS Feed</span>
    </Link>
  )
}
