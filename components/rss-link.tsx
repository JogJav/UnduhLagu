import { RssIcon } from "lucide-react"
import Link from "next/link"

interface RssLinkProps {
  className?: string
}

export default function RssLink({ className = "" }: RssLinkProps) {
  return (
    <div className="flex flex-col">
      <Link
        href="/rss"
        className={`flex items-center gap-1 text-amber-500 hover:text-red-600 transition-colors ${className}`}
        title="Learn about our RSS feed"
      >
        <RssIcon className="h-4 w-4" />
        <span className="text-sm">RSS Feed</span>
      </Link>
      <p className="text-xs text-muted-foreground mt-1">
        Gunakan aplikasi pembaca RSS untuk berlangganan pembaruan kami
      </p>
    </div>
  )
}
