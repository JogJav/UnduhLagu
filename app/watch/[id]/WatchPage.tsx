"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import type { VideoItem } from "@/lib/types"

export default function WatchPage({ params }: { params: { id: string } }) {
  const [video, setVideo] = useState<VideoItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [relatedVideos, setRelatedVideos] = useState<VideoItem[]>([])
  const [loadingRelated, setLoadingRelated] = useState(true)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)

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
        }
      } catch (error) {
        console.error("Error fetching video details:", error)
      } finally {
        setLoading(false)
        setLoadingRelated(false)
      }
    }

    fetchVideoDetails()
  }, [params.id])

  const handleLike = () => {
    setIsLiked(!isLiked)
    if (isDisliked) setIsDisliked(false)
  }

  const handleDislike = () => {
    setIsDisliked(!isDisliked)
    if (isLiked) setIsLiked(false)
  }

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed)
  }

  // ... rest of the component code (unchanged)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6">{/* ... rest of the JSX (unchanged) */}</main>

      <footer className="border-t bg-background mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} YouTube Clone
        </div>
      </footer>
    </div>
  )
}
