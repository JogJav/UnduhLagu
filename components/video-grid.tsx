"use client"

import Link from "next/link"
import Image from "next/image"
import type { VideoItem } from "@/lib/types"

interface VideoGridProps {
  videos: VideoItem[]
  loading: boolean
}

export default function VideoGrid({ videos, loading }: VideoGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="bg-card rounded-lg shadow-sm overflow-hidden animate-pulse">
            <div className="aspect-video bg-muted"></div>
            <div className="p-4 space-y-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-4 bg-muted rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No videos found. Please try again later.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Refresh Page
        </button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {videos.map((video) => (
        <Link
          href={`/watch/${video.filecode}`}
          key={video.filecode}
          className="bg-card rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
        >
          <div className="relative aspect-video">
            <div className="cover video-thumbnail-bg absolute inset-0"></div>
            <Image
              src={video.splash_img || `/placeholder.svg?height=180&width=320`}
              alt={video.title}
              fill
              className="yt-core-image cover video-thumbnail-img yt-core-image--fill-parent-height yt-core-image--fill-parent-width yt-core-image--content-mode-scale-aspect-fill object-cover"
            />
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded">
              {video.length}
            </div>
          </div>
          <div className="p-4">
            <h3 className="media-item-headline font-medium text-foreground line-clamp-2">
              <span className="yt-core-attributed-string">{video.title}</span>
            </h3>
            <div className="mt-2 flex justify-between text-sm text-muted-foreground">
              <span>{video.views} views</span>
              <span>{video.uploaded}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
