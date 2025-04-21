import Link from "next/link"
import Image from "next/image"

type Video = {
  id: string
  title: string
  channel: string
  views: string
  timestamp: string
  thumbnail: string
}

export default function RecommendedVideos() {
  const videos: Video[] = [
    {
      id: "1",
      title: "Building a Full-Stack App with Next.js and Prisma",
      channel: "Vercel",
      views: "450K views",
      timestamp: "3 weeks ago",
      thumbnail: "/placeholder.svg?height=180&width=320",
    },
    {
      id: "2",
      title: "React Server Components Explained",
      channel: "Lee Robinson",
      views: "210K views",
      timestamp: "1 month ago",
      thumbnail: "/placeholder.svg?height=180&width=320",
    },
    {
      id: "3",
      title: "Next.js 15 Performance Deep Dive",
      channel: "Delba de Oliveira",
      views: "125K views",
      timestamp: "2 weeks ago",
      thumbnail: "/placeholder.svg?height=180&width=320",
    },
    {
      id: "4",
      title: "Building a SaaS with Next.js and Stripe",
      channel: "Code With Antonio",
      views: "89K views",
      timestamp: "5 days ago",
      thumbnail: "/placeholder.svg?height=180&width=320",
    },
    {
      id: "5",
      title: "Tailwind CSS Tips and Tricks",
      channel: "Sam Selikoff",
      views: "320K views",
      timestamp: "2 months ago",
      thumbnail: "/placeholder.svg?height=180&width=320",
    },
    {
      id: "6",
      title: "Next.js Authentication with NextAuth.js",
      channel: "Colby Fayock",
      views: "175K views",
      timestamp: "3 weeks ago",
      thumbnail: "/placeholder.svg?height=180&width=320",
    },
    {
      id: "7",
      title: "Building a Blog with Next.js and MDX",
      channel: "Josh W Comeau",
      views: "230K views",
      timestamp: "1 month ago",
      thumbnail: "/placeholder.svg?height=180&width=320",
    },
    {
      id: "8",
      title: "State Management in React 2024",
      channel: "Theo",
      views: "410K views",
      timestamp: "2 weeks ago",
      thumbnail: "/placeholder.svg?height=180&width=320",
    },
  ]

  return (
    <div className="space-y-4">
      <h2 className="font-medium">Recommended videos</h2>

      <div className="space-y-4">
        {videos.map((video) => (
          <Link key={video.id} href="#" className="group flex gap-2 items-start">
            <div className="relative flex-shrink-0 w-40 sm:w-48">
              <Image
                src={video.thumbnail || "/placeholder.svg"}
                alt={video.title}
                width={320}
                height={180}
                className="rounded-lg object-cover aspect-video"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                {video.title}
              </h3>

              <p className="text-xs text-muted-foreground mt-1">{video.channel}</p>

              <p className="text-xs text-muted-foreground">
                {video.views} • {video.timestamp}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
