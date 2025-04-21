import Link from "next/link"
import Image from "next/image"
import type { VideoItem } from "@/lib/types"

interface RelatedVideosProps {
  videos: VideoItem[]
  loading: boolean
  currentVideoId: string
}

export default function RelatedVideos({ videos, loading, currentVideoId }: RelatedVideosProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Related Videos</h2>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-3 animate-pulse">
            <div className="w-40 h-24 bg-muted rounded"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const filteredVideos = videos.filter((video) => video.filecode !== currentVideoId)

  if (filteredVideos.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Related Videos</h2>
      {filteredVideos.map((video) => (
        <Link
          href={`/watch/${video.filecode}`}
          key={video.filecode}
          className="flex gap-3 hover:bg-accent p-2 rounded-lg transition-colors"
        >
          <div className="relative w-40 h-24 flex-shrink-0">
            <Image
              src={video.splash_img || `/placeholder.svg?height=90&width=160`}
              alt={video.title}
              fill
              className="object-cover rounded-md"
            />
            <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded">
              {video.length}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-medium line-clamp-2 text-sm">{video.title}</h3>
            <div className="mt-1 text-xs text-muted-foreground">
              <div>{video.views} views</div>
              <div>{video.uploaded}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
