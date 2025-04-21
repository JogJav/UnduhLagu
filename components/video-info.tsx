"use client"

import { useState } from "react"
import { ThumbsUp, ThumbsDown, Share, Download, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export default function VideoInfo() {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    if (isDisliked) setIsDisliked(false)
  }

  const handleDislike = () => {
    setIsDisliked(!isDisliked)
    if (isLiked) setIsLiked(false)
  }

  const toggleSubscribe = () => {
    setIsSubscribed(!isSubscribed)
  }

  const description = `In this video, we explore the latest features of Next.js 15 and how it improves developer experience and application performance. We'll cover the new compiler, improved static site generation, and more.

This is a comprehensive guide for both beginners and experienced developers looking to leverage the power of Next.js for their web applications.

Topics covered:
- New compiler architecture
- Improved static site generation
- Server components
- Streaming and partial rendering
- Performance optimizations
- Migration guide from previous versions`

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Next.js 15: The Complete Guide to New Features</h1>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Channel" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>

          <div>
            <h3 className="font-medium text-sm">Vercel</h3>
            <p className="text-xs text-muted-foreground">1.2M subscribers</p>
          </div>

          <Button variant={isSubscribed ? "outline" : "default"} size="sm" onClick={toggleSubscribe} className="ml-2">
            {isSubscribed ? "Subscribed" : "Subscribe"}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded-full overflow-hidden">
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-none px-3 ${isLiked ? "bg-primary/10" : ""}`}
              onClick={handleLike}
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span>12K</span>
            </Button>

            <Separator orientation="vertical" className="h-6" />

            <Button
              variant="ghost"
              size="sm"
              className={`rounded-none px-3 ${isDisliked ? "bg-primary/10" : ""}`}
              onClick={handleDislike}
            >
              <ThumbsDown className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="outline" size="sm" className="gap-1">
            <Share className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>

          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download</span>
          </Button>

          <Button variant="outline" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="bg-muted/50 rounded-lg p-3 text-sm">
        <div className="flex items-baseline gap-2">
          <span className="font-medium">1.5M views</span>
          <span className="text-muted-foreground">2 weeks ago</span>
        </div>

        <div className="mt-2">
          <p className={showFullDescription ? "" : "line-clamp-2"}>{description}</p>

          <Button
            variant="ghost"
            size="sm"
            className="mt-1 h-auto p-0 text-muted-foreground"
            onClick={() => setShowFullDescription(!showFullDescription)}
          >
            {showFullDescription ? "Show less" : "Show more"}
          </Button>
        </div>
      </div>
    </div>
  )
}
