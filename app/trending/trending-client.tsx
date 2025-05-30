"use client"
import { useState, useEffect } from "react"
import Header from "@/components/header"
import VideoGrid from "@/components/video-grid"
import UnduhLaguQuote from "@/components/unduh-lagu-quote"
import { SchemaMarkup } from "@/components/schema-markup"
import type { VideoItem } from "@/lib/types"

// Import the Footer component
import Footer from "@/components/footer"

export default function TrendingPage() {
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrendingVideos = async (): Promise<void> => {
      try {
        setLoading(true)
        // Use the list API endpoint as a fallback if trending doesn't work
        const response = await fetch(`/api/list?page=1&per_page=24`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()

        if (data.status === 200) {
          // Filter out any videos related to Washington, D.C. (client-side backup filter)
          const filteredVideos = data.result.filter(
            (video: VideoItem) =>
              !video.title.toLowerCase().includes("washington") &&
              !video.title.toLowerCase().includes("d.c.") &&
              !(video.description && video.description.toLowerCase().includes("washington")) &&
              !(video.description && video.description.toLowerCase().includes("d.c.")),
          )
          setVideos(filteredVideos)
        }
      } catch (error) {
        console.error("Error fetching trending videos:", error instanceof Error ? error.message : String(error))
        // Fallback to empty array if error occurs
        setVideos([])
      } finally {
        setLoading(false)
      }
    }

    fetchTrendingVideos()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SchemaMarkup />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Trending Musik Indonesia</h1>

        <UnduhLaguQuote />

        <VideoGrid videos={videos} loading={loading} />
      </main>

      {/* Replace the existing footer in the return statement with: */}
      <Footer />
    </div>
  )
}
