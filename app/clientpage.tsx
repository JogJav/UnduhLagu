"use client"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/header"
import VideoGrid from "@/components/video-grid"
import { SchemaMarkup } from "@/components/schema-markup"
import type { VideoItem } from "@/lib/types"
import ClientLoading from "./clientloading"

// Add these CSS keyframes for animations
const gradientAnimation = `
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes slideUp {
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes marquee {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}
`

// Create a separate component that uses useSearchParams
function VideoContent() {
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const searchParams = useSearchParams()
  const query = searchParams.get("q")

  useEffect(() => {
    if (query) {
      handleSearch(query)
    } else {
      fetchVideos()
    }
  }, [query, page])

  // Add the style tag to the component
  useEffect(() => {
    // Add the keyframes animation to the document
    const style = document.createElement("style")
    style.innerHTML = gradientAnimation
    document.head.appendChild(style)

    return () => {
      // Clean up on unmount
      document.head.removeChild(style)
    }
  }, [])

  // Add proper type for the fetchVideos function
  const fetchVideos = async (): Promise<void> => {
    try {
      setLoading(true)
      const response = await fetch(`/api/list?page=${page}&per_page=12`)
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
        setTotalPages(Math.ceil((data.total || filteredVideos.length) / (data.per_page || 12)))
      }
    } catch (error) {
      console.error("Error fetching videos:", error instanceof Error ? error.message : String(error))
    } finally {
      setLoading(false)
    }
  }

  // Add proper type for the handleSearch function
  const handleSearch = async (searchQuery: string): Promise<void> => {
    if (!searchQuery.trim()) return

    try {
      setLoading(true)
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
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
        setTotalPages(1) // Search results don't have pagination in this implementation
      }
    } catch (error) {
      console.error("Error searching videos:", error instanceof Error ? error.message : String(error))
    } finally {
      setLoading(false)
    }
  }

  // Add proper types for the pagination functions
  const handlePrevPage = (): void => {
    if (page > 1) setPage(page - 1)
  }

  const handleNextPage = (): void => {
    if (page < totalPages) setPage(page + 1)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <SchemaMarkup />

      {query && (
        <h1 className="text-2xl font-bold mb-6">
          Search results for: <span className="text-primary">{query}</span>
        </h1>
      )}

      {!query && (
        <div className="relative overflow-hidden rounded-lg mb-6 backdrop-blur-sm bg-transparent shadow-lg">
          {/* Content with animated text */}
          <div className="relative z-10 space-y-6">
            {/* Description with modern animated styling */}
            <div className="relative overflow-hidden px-2 md:px-8 lg:px-16">
              <p className="text-base md:text-lg lg:text-xl text-center font-medium leading-relaxed tracking-wide whitespace-nowrap overflow-hidden">
                <span
                  className="inline-flex animate-[marquee_15s_linear_infinite] space-x-3"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <span
                    className="text-amber-500 dark:text-amber-300 hover:scale-110 transition-transform cursor-default"
                    tabIndex={-1}
                  >
                    Download
                  </span>
                  <span
                    className="text-rose-500 dark:text-rose-400 hover:scale-110 transition-transform cursor-default"
                    tabIndex={-1}
                  >
                    Musik MP3
                  </span>
                  <span
                    className="text-cyan-600 dark:text-cyan-400 hover:scale-110 transition-transform cursor-default"
                    tabIndex={-1}
                  >
                    Dan
                  </span>
                  <span
                    className="text-amber-500 dark:text-amber-300 hover:scale-110 transition-transform cursor-default"
                    tabIndex={-1}
                  >
                    Video MP4
                  </span>
                  <span
                    className="text-violet-600 dark:text-violet-400 hover:scale-110 transition-transform cursor-default"
                    tabIndex={-1}
                  >
                    Youtube
                  </span>
                  <span
                    className="font-extrabold animate-[heartbeat_1.5s_ease-in-out_infinite] text-rose-500 dark:text-rose-400 hover:scale-125 transition-transform cursor-default"
                    tabIndex={-1}
                  >
                    GRATIS
                  </span>
                  <span
                    className="text-amber-500 dark:text-amber-300 hover:scale-110 transition-transform cursor-default"
                    tabIndex={-1}
                  >
                    Kualitas HD
                  </span>
                  <span
                    className="text-cyan-600 dark:text-cyan-400 hover:scale-110 transition-transform cursor-default"
                    tabIndex={-1}
                  >
                    Trending Musik Youtube
                  </span>
                  <span
                    className="text-rose-500 dark:text-rose-400 hover:scale-110 transition-transform cursor-default"
                    tabIndex={-1}
                  >
                    Terbaru
                  </span>
                  <span
                    className="text-amber-500 dark:text-amber-300 hover:scale-110 transition-transform cursor-default"
                    tabIndex={-1}
                  >
                    Terlengkap
                  </span>
                  <span
                    className="text-violet-600 dark:text-violet-400 hover:scale-110 transition-transform cursor-default"
                    tabIndex={-1}
                  >
                    Mudah Dan Cepat
                  </span>
                </span>
              </p>

              {/* Animated underline effect - updated to match new color scheme */}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-500 via-rose-500 to-violet-500 animate-[pulse_2s_ease-in-out_infinite]"></div>
            </div>

            {/* Animated badge */}
            <div className="flex justify-center mt-2">
              <div
                className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-red-500 text-white text-sm md:text-base font-bold animate-[bounce_2s_infinite] shadow-lg"
                tabIndex={-1}
                aria-hidden="true"
              >
                <span className="mr-2" tabIndex={-1}>
                  ⚡
                </span>{" "}
                Trending YouTube Now{" "}
                <span className="ml-2" tabIndex={-1}>
                  🔥
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <VideoGrid videos={videos} loading={loading} />

      {!query && videos.length > 0 && (
        <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="px-4 py-2 bg-background border border-input rounded-md shadow-sm text-sm font-medium hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-background border border-input rounded-md shadow-sm text-sm font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="px-4 py-2 bg-background border border-input rounded-md shadow-sm text-sm font-medium hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {!query && (
        <article className="mt-12 max-w-none mx-auto text-sm">
          <h2 className="text-xl font-bold text-center mb-6 text-amber-700 dark:text-amber-400">
            UnduhLagu : Platform Terbaik Untuk Download Musik MP3 Dan MP4 Serta Streaming Dari YouTube Dengan Converter,
            GRATIS.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {/* Feature Card 1 */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-2 text-red-600 dark:text-red-400">Streaming Musik Terlengkap</h3>
              <p className="text-sm mb-2">
                <strong>UnduhLagu</strong> menawarkan pengalaman <strong>streaming musik Indonesia</strong> yang mulus
                dengan koleksi terlengkap dari berbagai genre musik.
              </p>
              <ul className="text-xs list-disc pl-4 space-y-1 text-amber-800 dark:text-amber-300">
                <li>Akses ribuan lagu tanpa batas</li>
                <li>Pembaruan katalog musik setiap hari</li>
                <li>Streaming tanpa buffering</li>
              </ul>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-2 text-amber-700 dark:text-amber-400">Download Mudah & Gratis</h3>
              <p className="text-sm mb-2">
                Fitur <strong>unduh lagu gratis</strong> memungkinkan Anda menyimpan musik favorit dalam format MP3
                berkualitas tinggi untuk didengarkan offline.
              </p>
              <ul className="text-xs list-disc pl-4 space-y-1 text-red-700 dark:text-red-300">
                <li>Download tanpa biaya berlangganan</li>
                <li>Berbagai pilihan kualitas audio</li>
                <li>Proses unduh cepat dan mudah</li>
              </ul>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-2 text-red-600 dark:text-red-400">Trending Musik Terkini</h3>
              <p className="text-sm mb-2">
                Temukan <strong>lagu trending Indonesia</strong> yang diperbarui setiap hari, memastikan Anda selalu
                up-to-date dengan musik terpopuler.
              </p>
              <ul className="text-xs list-disc pl-4 space-y-1 text-amber-800 dark:text-amber-300">
                <li>Chart musik Indonesia terbaru</li>
                <li>Rekomendasi berdasarkan preferensi</li>
                <li>Notifikasi rilis baru</li>
              </ul>
            </div>
          </div>

          {/* Converter Features */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 bg-gradient-to-r from-red-50 to-amber-50 dark:from-red-900/20 dark:to-amber-900/20 rounded-xl p-4 shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-center text-amber-700 dark:text-amber-400">
                Konverter YouTube ke MP3
              </h3>
              <p className="text-xs text-center">
                Ubah video musik favorit menjadi file audio MP3 berkualitas tinggi dengan{" "}
                <strong>konverter YouTube ke MP3</strong> yang cepat dan andal.
              </p>
            </div>

            <div className="flex-1 bg-gradient-to-r from-amber-50 to-red-50 dark:from-amber-900/20 dark:to-red-900/20 rounded-xl p-4 shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-center text-red-600 dark:text-red-400">
                Unduh Video MP4 HD
              </h3>
              <p className="text-xs text-center">
                Nikmati <strong>unduh video musik MP4 HD</strong> dengan berbagai pilihan resolusi untuk pengalaman
                menonton terbaik di semua perangkat.
              </p>
            </div>
          </div>

          {/* Categories Section */}
          <div className="bg-gradient-to-r from-amber-100 to-red-100 dark:from-amber-900/30 dark:to-red-900/30 rounded-xl p-4 mb-8 shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-center text-red-600 dark:text-red-400">
              Kategori Musik Populer
            </h3>

            <div className="flex flex-wrap justify-center gap-2 text-xs">
              <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full shadow-sm">Pop Indonesia</span>
              <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full shadow-sm">Dangdut Terbaru</span>
              <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full shadow-sm">Rock Indonesia</span>
              <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full shadow-sm">Musik Daerah</span>
              <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full shadow-sm">Indie</span>
              <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full shadow-sm">Hip Hop</span>
              <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full shadow-sm">EDM</span>
              <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full shadow-sm">Religi</span>
            </div>
          </div>

          {/* Advantages Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 text-center shadow-sm">
              <h4 className="text-sm font-semibold mb-1 text-amber-700 dark:text-amber-400">Tanpa Iklan</h4>
              <p className="text-xs">Nikmati musik tanpa gangguan iklan</p>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 text-center shadow-sm">
              <h4 className="text-sm font-semibold mb-1 text-red-600 dark:text-red-400">Tanpa Registrasi</h4>
              <p className="text-xs">Akses langsung tanpa perlu mendaftar</p>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 text-center shadow-sm">
              <h4 className="text-sm font-semibold mb-1 text-amber-700 dark:text-amber-400">Kualitas HD</h4>
              <p className="text-xs">Audio dan video berkualitas tinggi</p>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 text-center shadow-sm">
              <h4 className="text-sm font-semibold mb-1 text-red-600 dark:text-red-400">Mudah Digunakan</h4>
              <p className="text-xs">Antarmuka sederhana dan intuitif</p>
            </div>
          </div>

          {/* Conclusion */}
          <div className="bg-gradient-to-br from-amber-50 to-red-50 dark:from-amber-900/20 dark:to-red-900/20 rounded-xl p-4 shadow-md">
            <p className="text-xs text-center italic">
              <strong>UnduhLagu</strong> hadir sebagai solusi lengkap bagi pecinta musik Indonesia yang menginginkan
              akses mudah untuk streaming dan download lagu favorit mereka. Dengan koleksi{" "}
              <strong>musik populer Indonesia</strong> yang komprehensif, fitur{" "}
              <strong>unduh video musik kualitas tinggi</strong>, dan antarmuka yang user-friendly, UnduhLagu menjadi{" "}
              <strong>platform streaming musik Indonesia terlengkap</strong> yang wajib dicoba.
            </p>
          </div>
        </article>
      )}
    </main>
  )
}

export default function ClientHomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <Suspense fallback={<ClientLoading />}>
        <VideoContent />
      </Suspense>

      <footer className="border-t bg-background mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-amber-500">
          &copy; {new Date().getFullYear()} UnduhLagu
        </div>
      </footer>
    </div>
  )
}
