"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import DownloadFrame from "@/components/download-frame"
import RelatedVideos from "@/components/related-videos"
import UnduhLaguQuote from "@/components/unduh-lagu-quote"
import { SchemaMarkup } from "@/components/schema-markup"
import type { VideoItem } from "@/lib/types"
import Link from "next/link"
import Image from "next/image"

export default function DownloadPage({ params }: { params: { id: string } }) {
  const [video, setVideo] = useState<VideoItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [relatedVideos, setRelatedVideos] = useState<VideoItem[]>([])
  const [loadingRelated, setLoadingRelated] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        setLoading(true)
        setLoadingRelated(true)

        // Fetch video details
        const response = await fetch(`/api/info?file_code=${params.id}`)
        const data = await response.json()

        if (data.status === 200 && data.result.length > 0) {
          setVideo(data.result[0])

          // Fetch related videos
          const relatedResponse = await fetch(`/api/related?video_id=${params.id}`)
          const relatedData = await relatedResponse.json()

          if (relatedData.status === 200) {
            setRelatedVideos(relatedData.result)
          }
        } else {
          setError("Video not found")
        }
      } catch (error) {
        console.error("Error fetching video details:", error)
        setError(error instanceof Error ? error.message : "An error occurred")
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
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-destructive">{error}</p>
                <Button asChild className="mt-4">
                  <Link href="/">Go Home</Link>
                </Button>
              </div>
            ) : video ? (
              <>
                <div className="space-y-4">
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={video.splash_img || `/placeholder.svg?height=720&width=1280`}
                      alt={video.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Link href={`/watch/${params.id}`}>
                        <Button size="lg">Watch Video</Button>
                      </Link>
                    </div>
                  </div>

                  <h1 className="text-2xl font-bold text-foreground">{video.title}</h1>

                  <div className="flex items-baseline gap-2 text-sm">
                    <span className="font-medium">{video.views} views</span>
                    <span className="text-muted-foreground">{video.uploaded}</span>
                  </div>

                  <UnduhLaguQuote />

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h2 className="text-lg font-semibold mb-4">Download Options</h2>
                    <DownloadFrame videoId={params.id} />
                  </div>

                  {video.description && (
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h2 className="text-lg font-semibold mb-2">Description</h2>
                      <p className="text-sm whitespace-pre-line">{video.description}</p>
                    </div>
                  )}
                </div>

                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Related Videos</h2>
                  <div className="lg:hidden">
                    <RelatedVideos videos={relatedVideos} loading={loadingRelated} currentVideoId={params.id} />
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Video not found</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-1 hidden lg:block">
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
