"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"

interface MapEmbedProps {
  location: string
  title?: string
  zoom?: number
  height?: string
  className?: string
}

export default function MapEmbed({
  location,
  title = "Lokasi Kami",
  zoom = 15,
  height = "400px",
  className = "",
}: MapEmbedProps) {
  const [isLoading, setIsLoading] = useState(true)
  const encodedLocation = encodeURIComponent(location)
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodedLocation}&zoom=${zoom}`

  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`} style={{ height }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="flex flex-col items-center">
            <MapPin className="h-8 w-8 text-amber-500 animate-bounce" />
            <p className="text-sm text-muted-foreground mt-2">Loading map...</p>
          </div>
        </div>
      )}
      <iframe
        title={title}
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setIsLoading(false)}
        className="rounded-lg"
      ></iframe>
    </div>
  )
}
