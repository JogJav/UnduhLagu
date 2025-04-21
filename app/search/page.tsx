import type { Metadata } from "next"
import { siteConfig } from "@/lib/config"
import ClientHomePage from "../clientpage"

export function generateMetadata({ searchParams }: { searchParams: { q: string } }): Metadata {
  const query = searchParams.q || ""
  return {
    title: siteConfig.search_title.replace("{query}", query),
    description: siteConfig.search_description.replace("{query}", query),
    robots: siteConfig.search_robots,
  }
}

export default function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  return <ClientHomePage />
}
