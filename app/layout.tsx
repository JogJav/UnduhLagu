import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { siteConfig } from "@/lib/config"
import { Favicon } from "@/components/favicon"
import { Analytics } from "@/components/analytics"
import { SchemaMarkup } from "@/components/schema-markup"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: siteConfig.home_title,
    template: `%s | ${siteConfig.site_name}`,
  },
  description: siteConfig.home_description,
  robots: siteConfig.home_robots,
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Favicon />
        <meta name="google-site-verification" content="HC0vAGjXcF_uXca73RPneXlFAXPbDDZL_W5AJS55xPc" />
        <meta name="msvalidate.01" content="71827436BB8C2AD893147B536B3582FB" />
        <meta name="yandex-verification" content="d154cfdd432021ee" />
        <SchemaMarkup />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Suspense>{children}</Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
