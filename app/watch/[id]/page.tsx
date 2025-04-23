"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Header from "@/components/header"
import RelatedVideos from "@/components/related-videos"
import VideoComments from "@/components/video-comments"
import UnduhLaguQuote from "@/components/unduh-lagu-quote"
import { SchemaMarkup } from "@/components/schema-markup"
import type { VideoItem } from "@/lib/types"
import Link from "next/link"

export default function WatchPage({ params }: { params: { id: string } }) {
  const [video, setVideo] = useState<VideoItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [relatedVideos, setRelatedVideos] = useState<VideoItem[]>([])
  const [loadingRelated, setLoadingRelated] = useState(true)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)

  const handleLike = (): void => {
    setIsLiked(!isLiked)
    if (isDisliked) setIsDisliked(false)
  }

  const handleDislike = (): void => {
    setIsDisliked(!isDisliked)
    if (isLiked) setIsLiked(false)
  }

  const handleSubscribe = (): void => {
    setIsSubscribed(!isSubscribed)
  }

  useEffect(() => {
    const fetchVideoDetails = async (): Promise<void> => {
      try {
        setLoading(true)
        setLoadingRelated(true)

        // Fetch video details
        const response = await fetch(`/api/search?q=${params.id}&max_results=1`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()

        if (data.status === 200 && data.result.length > 0) {
          setVideo(data.result[0])

          // Fetch related videos
          const relatedResponse = await fetch(`/api/related?video_id=${params.id}`)
          if (!relatedResponse.ok) {
            throw new Error(`HTTP error! status: ${relatedResponse.status}`)
          }
          const relatedData = await relatedResponse.json()

          if (relatedData.status === 200) {
            setRelatedVideos(relatedData.result)
          }
        }
      } catch (error) {
        console.error("Error fetching video details:", error instanceof Error ? error.message : String(error))
      } finally {
        setLoading(false)
        setLoadingRelated(false)
      }
    }

    fetchVideoDetails()
  }, [params.id])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {video && <SchemaMarkup video={video} />}

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {loading ? (
              <div className="space-y-4 animate-pulse">
                <div className="aspect-video bg-muted rounded-lg"></div>
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            ) : video ? (
              <>
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.filecode}`}
                    title={video.title}
                    className="w-full h-full"
                    allowFullScreen
                  ></iframe>
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-foreground">{video.title}</h1>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Channel" />
                        <AvatarFallback>YT</AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-medium">Channel Name</h3>
                        <p className="text-xs text-muted-foreground">1.2M subscribers</p>
                      </div>

                      <Button
                        variant={isSubscribed ? "outline" : "default"}
                        size="sm"
                        onClick={handleSubscribe}
                        className="ml-2"
                      >
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`h-4 w-4 mr-1 ${isLiked ? "fill-current" : ""}`}
                            aria-hidden="true"
                            tabIndex={-1}
                          >
                            <path d="M7 10v12" />
                            <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                          </svg>
                          <span>12K</span>
                        </Button>

                        <Separator orientation="vertical" className="h-6" />

                        <Button
                          variant="ghost"
                          size="sm"
                          className={`rounded-none px-3 ${isDisliked ? "bg-primary/10" : ""}`}
                          onClick={handleDislike}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`h-4 w-4 ${isDisliked ? "fill-current" : ""}`}
                            aria-hidden="true"
                            tabIndex={-1}
                          >
                            <path d="M17 14V2" />
                            <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
                          </svg>
                        </Button>
                      </div>

                      <Button variant="outline" size="sm" className="gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                          aria-hidden="true"
                          tabIndex={-1}
                        >
                          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                          <polyline points="16 6 12 2 8 6" />
                          <line x1="12" x2="12" y1="2" y2="15" />
                        </svg>
                        <span className="hidden sm:inline">Share</span>
                      </Button>
                      <Link href={`/download/${params.id}`}>
                        <Button variant="outline" size="sm" className="gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                            aria-hidden="true"
                            tabIndex={-1}
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" x2="12" y1="15" y2="3" />
                          </svg>
                          <span className="hidden sm:inline">Download</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 text-sm">
                  <div className="flex items-baseline gap-2">
                    <span className="font-medium">{video.views} views</span>
                    <span className="text-muted-foreground">{video.uploaded}</span>
                  </div>

                  <div className="mt-2">
                    <p className={showFullDescription ? "" : "line-clamp-2"}>
                      {video.description || "No description available."}
                    </p>

                    {video.description && video.description.length > 100 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-1 h-auto p-0 text-muted-foreground"
                        onClick={() => setShowFullDescription(!showFullDescription)}
                      >
                        {showFullDescription ? "Show less" : "Show more"}
                      </Button>
                    )}
                  </div>
                </div>

                <VideoComments videoId={params.id} />

                <UnduhLaguQuote />
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Video not found</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <RelatedVideos videos={relatedVideos} loading={loadingRelated} currentVideoId={params.id} />
          </div>
        </div>
      </main>

      <footer className="border-t bg-background mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} UnduhLagu
        </div>
      </footer>
    </div>
  )
}
