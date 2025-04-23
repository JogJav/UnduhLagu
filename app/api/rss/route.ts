import { NextResponse } from "next/server"
import { getVideoList } from "@/lib/youtube"

export async function GET() {
  try {
    // Get the latest videos (first page, 20 items)
    const data = await getVideoList(1, 20)

    if (data.status !== 200 || !data.result || data.result.length === 0) {
      throw new Error("Failed to fetch videos for RSS feed")
    }

    // Format current date for RSS
    const now = new Date()
    const pubDate = now.toUTCString()

    // Build RSS XML
    const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Unduh Lagu - Streaming dan Download Musik Indonesia Terbaru</title>
  <link>https://unduhlagu.online</link>
  <description>Unduh Lagu adalah platform streaming dan download musik Indonesia terlengkap. Nikmati lagu trending Indonesia terbaru, unduh lagu gratis format MP3 dan MP4 HD dengan mudah.</description>
  <language>id-id</language>
  <lastBuildDate>${pubDate}</lastBuildDate>
  <atom:link href="https://unduhlagu.online/api/rss" rel="self" type="application/rss+xml" />
  ${data.result
    .map(
      (video) => `
  <item>
    <title><![CDATA[${video.title}]]></title>
    <link>https://unduhlagu.online/watch/${video.filecode}</link>
    <guid>https://unduhlagu.online/watch/${video.filecode}</guid>
    <pubDate>${video.uploaded ? new Date(video.uploaded).toUTCString() : pubDate}</pubDate>
    <description><![CDATA[${video.description || video.title}]]></description>
    <enclosure url="${video.splash_img}" type="image/jpeg" />
  </item>
  `,
    )
    .join("")}
</channel>
</rss>`

    // Return RSS XML with proper content type
    return new NextResponse(rssXml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "max-age=3600, s-maxage=3600, stale-while-revalidate",
      },
    })
  } catch (error) {
    console.error("Error generating RSS feed:", error)
    return NextResponse.json({ error: "Failed to generate RSS feed" }, { status: 500 })
  }
}
