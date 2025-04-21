"use client"

import { usePathname } from "next/navigation"
import type { VideoItem } from "@/lib/types"

interface VideoSchemaProps {
  video?: VideoItem
}

export function SchemaMarkup({ video }: VideoSchemaProps) {
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const isWatchPage = pathname?.startsWith("/watch/")
  const isDownloadPage = pathname?.startsWith("/download/")
  const isTrendingPage = pathname === "/trending"

  // Base website schema that will be included on all pages
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "UnduhLagu",
    url: "https://unduhlagu.online/",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://unduhlagu.online/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    description:
      "UnduhLagu adalah platform streaming dan download musik Indonesia terlengkap. Nikmati lagu trending Indonesia terbaru, unduh lagu gratis format MP3 dan MP4 HD dengan mudah.",
  }

  // Organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "UnduhLagu",
    url: "https://unduhlagu.online/",
    logo: "https://unduhlagu.online/icon?size=192",
    sameAs: [
      "https://www.facebook.com/unduhlagu",
      "https://twitter.com/unduhlagu",
      "https://www.instagram.com/unduhlagu",
    ],
  }

  // Video schema for watch and download pages
  const videoSchema =
    video && (isWatchPage || isDownloadPage)
      ? {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: video.title,
          description: video.description || `${video.title} - Streaming dan download di UnduhLagu`,
          thumbnailUrl: video.splash_img,
          uploadDate: video.uploaded || new Date().toISOString(),
          duration: formatDuration(video.length),
          contentUrl: `https://unduhlagu.online/watch/${video.filecode}`,
          embedUrl: video.protected_embed,
          interactionStatistic: {
            "@type": "InteractionCounter",
            interactionType: { "@type": "WatchAction" },
            userInteractionCount: parseViews(video.views),
          },
        }
      : null

  // MusicPlaylist schema for trending page
  const musicPlaylistSchema = isTrendingPage
    ? {
        "@context": "https://schema.org",
        "@type": "MusicPlaylist",
        name: "Trending Musik Indonesia",
        numTracks: 24,
        description: "Koleksi lagu trending dan populer Indonesia terbaru di UnduhLagu",
      }
    : null

  // CollectionPage schema for home page
  const collectionPageSchema = isHomePage
    ? {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "UnduhLagu - Watch and Share Videos",
        description: "Discover and watch amazing videos on UnduhLagu. Share your favorites with friends and family.",
        isPartOf: {
          "@type": "WebSite",
          name: "UnduhLagu",
          url: "https://unduhlagu.online/",
        },
      }
    : null

  // Combine all schemas into an array
  const schemas = [
    websiteSchema,
    organizationSchema,
    ...(videoSchema ? [videoSchema] : []),
    ...(musicPlaylistSchema ? [musicPlaylistSchema] : []),
    ...(collectionPageSchema ? [collectionPageSchema] : []),
  ]

  return (
    <>
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
    </>
  )
}

// Helper function to format duration from "MM:SS" to ISO 8601 duration format
function formatDuration(duration: string | undefined): string {
  if (!duration) return "PT0M0S"

  const parts = duration.split(":")
  if (parts.length === 2) {
    const minutes = Number.parseInt(parts[0], 10)
    const seconds = Number.parseInt(parts[1], 10)
    return `PT${minutes}M${seconds}S`
  }

  return "PT0M0S"
}

// Helper function to parse views from string format (e.g., "1.2K views") to number
function parseViews(views: string | undefined): number {
  if (!views) return 0

  const viewsStr = views.toLowerCase().replace(/\s+views/, "")

  if (viewsStr.endsWith("k")) {
    return Number.parseFloat(viewsStr.replace("k", "")) * 1000
  }
  if (viewsStr.endsWith("m")) {
    return Number.parseFloat(viewsStr.replace("m", "")) * 1000000
  }

  return Number.parseInt(viewsStr, 10) || 0
}
