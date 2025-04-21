import type { Metadata } from "next"
import { siteConfig } from "@/lib/config"
import ClientHomePage from "./clientpage"

export const metadata: Metadata = {
  title: siteConfig.home_title,
  description: siteConfig.home_description,
  robots: siteConfig.home_robots,
}

export default function HomePage() {
  return (
    <>
      <ClientHomePage />
    </>
  )
}
