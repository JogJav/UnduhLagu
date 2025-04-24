"use client"

import { MapPin, Clock, Phone, Mail, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import MapEmbed from "@/components/map-embed"

interface LocationCardProps {
  address: string
  mapLocation: string
  operatingHours: string
  phone: string
  email: string
  className?: string
}

export default function LocationCard({
  address,
  mapLocation,
  operatingHours,
  phone,
  email,
  className = "",
}: LocationCardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm ${className}`}>
      <div className="h-[250px]">
        <MapEmbed location={mapLocation} height="100%" />
      </div>

      <div className="p-5 space-y-4">
        <h3 className="font-semibold text-lg text-amber-700 dark:text-amber-400">Kantor Pusat</h3>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" aria-hidden="true" tabIndex={-1} />
            <p className="text-sm">{address}</p>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" aria-hidden="true" tabIndex={-1} />
            <p className="text-sm">{operatingHours}</p>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" aria-hidden="true" tabIndex={-1} />
            <p className="text-sm">{phone}</p>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" aria-hidden="true" tabIndex={-1} />
            <p className="text-sm">{email}</p>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full mt-2 border-amber-500 text-amber-700 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/20"
          onClick={() =>
            window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapLocation)}`, "_blank")
          }
        >
          Buka di Google Maps
          <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" tabIndex={-1} />
        </Button>
      </div>
    </div>
  )
}
