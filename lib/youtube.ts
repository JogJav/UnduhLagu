import type { VideoItem } from "./types"

// In-memory cache for development
const dataCache: VideoItem[] = []

// Function to fetch data from YouTube
async function fetchFromYouTube(
  url: string,
  userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
) {
  try {
    console.log(`Fetching from URL: ${url}`)
    const response = await fetch(url, {
      headers: {
        "User-Agent": userAgent,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const html = await response.text()
    return html
  } catch (error) {
    console.error("Error fetching from YouTube:", error)
    return null
  }
}

// Function to parse YouTube HTML response for search results
function parseYouTubeHTML(html: string): VideoItem[] {
  const results: VideoItem[] = []

  try {
    // Find ytInitialData
    const startIndex = html.indexOf("ytInitialData") + "ytInitialData".length + 3
    const endIndex = html.indexOf("};", startIndex) + 1
    const jsonStr = html.substring(startIndex, endIndex)

    const data = JSON.parse(jsonStr)

    // Extract video data
    const contents = data.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents || []

    for (const content of contents) {
      const itemSection = content.itemSectionRenderer || {}
      const videoItems = itemSection.contents || []

      for (const item of videoItems) {
        if (item.videoRenderer) {
          const videoData = item.videoRenderer

          // Extract data
          const videoId = videoData.videoId || ""
          const title = videoData.title?.runs?.[0]?.text || ""
          const views = (videoData.viewCountText?.simpleText || "0").replace(" views", "")
          const thumbnails = videoData.thumbnail?.thumbnails || []
          const length = videoData.lengthText?.simpleText || "0"
          const uploaded = videoData.publishedTimeText?.simpleText || ""
          const description = videoData.descriptionSnippet?.runs?.[0]?.text || ""

          // Clean and format title
          const cleanTitle = cleanText(title)

          // Get thumbnail URLs
          const splashImg = thumbnails.length > 0 ? thumbnails[thumbnails.length - 1].url.split("?")[0] : ""
          const singleImg = thumbnails.length > 0 ? thumbnails[0].url.split("?")[0] : ""

          // Build result item
          const resultItem: VideoItem = {
            splash_img: splashImg,
            size: "0",
            last_view: new Date().toISOString(),
            title: cleanTitle,
            views: views,
            filecode: videoId,
            file_code: videoId,
            protected_dl: `/d/${videoId}`,
            canplay: 1,
            length: length,
            single_img: singleImg,
            protected_embed: `https://www.youtube.com/embed/${videoId}`,
            uploaded: uploaded,
            status: 200,
            description: description,
          }

          results.push(resultItem)
        }
      }
    }
  } catch (error) {
    console.error("Error parsing YouTube HTML:", error)
  }

  return results
}

// Function to clean text
function cleanText(text: string): string {
  // Remove special characters except spaces
  let cleaned = text.replace(/[^a-zA-Z0-9\s]/g, " ")

  // Replace multiple spaces with a single space
  cleaned = cleaned.replace(/\s+/g, " ")

  // Convert to lowercase
  cleaned = cleaned.replace(/\b\w/g, (char) => char.toUpperCase())

  // Remove duplicate words
  const words = cleaned.split(" ")
  const uniqueWords = [...new Set(words)]
  cleaned = uniqueWords.join(" ")

  return cleaned
}

// Function to save data to cache
function saveToCache(newData: VideoItem[]) {
  // Add new data to cache, avoiding duplicates
  for (const newItem of newData) {
    const isDuplicate = dataCache.some((existingItem) => existingItem.filecode === newItem.filecode)
    if (!isDuplicate) {
      dataCache.push(newItem)
    }
  }
}

// Ubah fungsi searchVideos untuk menambahkan parameter Indonesia dan filter Washington, D.C.
export async function searchVideos(query: string, maxResults?: number): Promise<VideoItem[]> {
  const encodedQuery = encodeURIComponent(query)
  // Tambahkan parameter gl=ID untuk region Indonesia
  const url = `https://m.youtube.com/results?search_query=${encodedQuery}&gl=ID`

  const html = await fetchFromYouTube(url)
  if (!html) return []

  const results = parseYouTubeHTML(html)

  // Filter out any videos related to Washington, D.C.
  const filteredResults = results.filter(
    (video) =>
      !video.title.toLowerCase().includes("washington") &&
      !video.title.toLowerCase().includes("d.c.") &&
      !(video.description && video.description.toLowerCase().includes("washington")) &&
      !(video.description && video.description.toLowerCase().includes("d.c.")),
  )

  saveToCache(filteredResults)

  return maxResults ? filteredResults.slice(0, maxResults) : filteredResults
}

// Function to get video details
export async function getVideoDetails(fileCode: string): Promise<VideoItem[]> {
  // First check if we have it in cache
  const cachedVideo = dataCache.find((item) => item.filecode === fileCode)
  if (cachedVideo) {
    return [cachedVideo]
  }

  // If not in cache, fetch from YouTube
  const url = `https://www.youtube.com/watch?v=${fileCode}`
  const html = await fetchFromYouTube(url)
  if (!html) return []

  const results = parseYouTubeHTML(html)

  // Extract full description
  const descriptionMatch = html.match(/"description":{"simpleText":"(.*?)"}/)
  if (descriptionMatch && descriptionMatch[1]) {
    results[0].description = descriptionMatch[1].replace(/\\n/g, "\n")
  }

  // Filter for the specific video
  const videoDetails = results.filter((video) => video.filecode === fileCode)

  if (videoDetails.length > 0) {
    saveToCache(videoDetails)
    return videoDetails
  }

  return []
}

// Function to get related videos
export async function getRelatedVideos(videoId: string, maxResults = 10): Promise<VideoItem[]> {
  // First check if we have enough videos in cache
  if (dataCache.length > maxResults) {
    // Filter out the current video
    const filteredCache = dataCache.filter((item) => item.filecode !== videoId)
    // Return random selection of videos from cache
    return filteredCache.sort(() => 0.5 - Math.random()).slice(0, maxResults)
  }

  // If not enough in cache, fetch from YouTube
  // We'll use the video title as a search query to find related videos
  const cachedVideo = dataCache.find((item) => item.filecode === videoId)

  if (cachedVideo) {
    // Extract keywords from the title
    const keywords = cachedVideo.title.split(" ").slice(0, 3).join(" ")
    return searchVideos(keywords, maxResults)
  }

  // If we don't have the video in cache, fetch trending videos
  const url = `https://m.youtube.com/trending`
  const html = await fetchFromYouTube(url)
  if (!html) return []

  const results = parseYouTubeHTML(html)
  saveToCache(results)

  // Filter out the current video
  const filteredResults = results.filter((video) => video.filecode !== videoId)
  return filteredResults.slice(0, maxResults)
}

// Fungsi untuk mengekstrak video dari halaman trending musik YouTube
function extractTrendingMusicVideos(html: string): VideoItem[] {
  const results: VideoItem[] = []

  try {
    // Find ytInitialData
    const startIndex = html.indexOf("ytInitialData") + "ytInitialData".length + 3
    const endIndex = html.indexOf("};", startIndex) + 1
    const jsonStr = html.substring(startIndex, endIndex)

    const data = JSON.parse(jsonStr)

    // Debugging: Log struktur data untuk analisis
    console.log("Data structure keys:", Object.keys(data))
    if (data.contents) {
      console.log("Contents keys:", Object.keys(data.contents))
    }

    // Ekstrak video dari struktur data trending musik
    const videoItems: any[] = []

    // Coba ekstrak dari struktur tab
    if (data.contents?.twoColumnBrowseResultsRenderer?.tabs) {
      const tabs = data.contents.twoColumnBrowseResultsRenderer.tabs
      console.log(`Found ${tabs.length} tabs`)

      for (const tab of tabs) {
        if (tab.tabRenderer?.selected) {
          console.log("Found selected tab")

          // Coba ekstrak dari richGridRenderer (struktur umum untuk trending)
          if (tab.tabRenderer.content?.richGridRenderer) {
            const contents = tab.tabRenderer.content.richGridRenderer.contents || []
            console.log(`Found richGridRenderer with ${contents.length} items`)

            for (const item of contents) {
              if (item.richItemRenderer?.content?.videoRenderer) {
                videoItems.push(item.richItemRenderer.content.videoRenderer)
              }
            }
          }

          // Coba ekstrak dari sectionListRenderer (struktur alternatif)
          if (tab.tabRenderer.content?.sectionListRenderer) {
            const sections = tab.tabRenderer.content.sectionListRenderer.contents || []
            console.log(`Found sectionListRenderer with ${sections.length} sections`)

            for (const section of sections) {
              // Cek itemSectionRenderer
              if (section.itemSectionRenderer) {
                const items = section.itemSectionRenderer.contents || []
                for (const item of items) {
                  if (item.videoRenderer) {
                    videoItems.push(item.videoRenderer)
                  } else if (item.shelfRenderer) {
                    // Cek shelfRenderer yang sering berisi video musik
                    const shelfItems =
                      item.shelfRenderer.content?.expandedShelfContentsRenderer?.items ||
                      item.shelfRenderer.content?.gridRenderer?.items ||
                      []

                    for (const shelfItem of shelfItems) {
                      if (shelfItem.videoRenderer) {
                        videoItems.push(shelfItem.videoRenderer)
                      }
                    }
                  }
                }
              }

              // Cek richSectionRenderer
              if (section.richSectionRenderer) {
                const content = section.richSectionRenderer.content || {}
                if (content.richShelfRenderer) {
                  const items = content.richShelfRenderer.contents || []
                  for (const item of items) {
                    if (item.richItemRenderer?.content?.videoRenderer) {
                      videoItems.push(item.richItemRenderer.content.videoRenderer)
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    console.log(`Found ${videoItems.length} trending music videos`)

    // Proses video items
    for (const videoData of videoItems) {
      // Extract data
      const videoId = videoData.videoId || ""
      const title = videoData.title?.runs?.[0]?.text || ""
      const views = (videoData.viewCountText?.simpleText || videoData.viewCountText?.runs?.[0]?.text || "0").replace(
        " views",
        "",
      )
      const thumbnails = videoData.thumbnail?.thumbnails || []
      const length = videoData.lengthText?.simpleText || "0"
      const uploaded = videoData.publishedTimeText?.simpleText || ""
      const description = videoData.descriptionSnippet?.runs?.[0]?.text || ""

      // Clean and format title
      const cleanTitle = cleanText(title)

      // Get thumbnail URLs
      const splashImg = thumbnails.length > 0 ? thumbnails[thumbnails.length - 1].url.split("?")[0] : ""
      const singleImg = thumbnails.length > 0 ? thumbnails[0].url.split("?")[0] : ""

      // Build result item
      const resultItem: VideoItem = {
        splash_img: splashImg,
        size: "0",
        last_view: new Date().toISOString(),
        title: cleanTitle,
        views: views,
        filecode: videoId,
        file_code: videoId,
        protected_dl: `/d/${videoId}`,
        canplay: 1,
        length: length,
        single_img: singleImg,
        protected_embed: `https://www.youtube.com/embed/${videoId}`,
        uploaded: uploaded,
        status: 200,
        description: description,
      }

      results.push(resultItem)
    }
  } catch (error) {
    console.error("Error extracting trending music videos:", error)
  }

  return results
}

// Ubah fungsi getVideoList untuk mengambil trending musik dari YouTube Indonesia
export async function getVideoList(page = 1, perPage = 50) {
  try {
    // Jika cache kosong atau sudah lebih dari 30 menit, perbarui cache
    const cacheAge =
      dataCache.length > 0 ? Date.now() - new Date(dataCache[0].last_view).getTime() : Number.POSITIVE_INFINITY
    const cacheExpired = cacheAge > 1800000 // 30 menit dalam milidetik

    if (dataCache.length === 0 || cacheExpired) {
      console.log("Cache empty or expired, fetching fresh trending music videos from Indonesia")

      // Gunakan URL yang tepat untuk trending musik di YouTube Indonesia
      // Parameter gl=ID untuk region Indonesia dan bp untuk kategori musik
      const url = "https://www.youtube.com/feed/trending?gl=ID&bp=4gINGgt5dG1hX2NoYXJ0cw%3D%3D"
      const html = await fetchFromYouTube(url)

      if (html) {
        const results = extractTrendingMusicVideos(html)

        // Filter out any videos related to Washington, D.C.
        const filteredResults = results.filter(
          (video) =>
            !video.title.toLowerCase().includes("washington") &&
            !video.title.toLowerCase().includes("d.c.") &&
            !(video.description && video.description.toLowerCase().includes("washington")) &&
            !(video.description && video.description.toLowerCase().includes("d.c.")),
        )

        if (filteredResults.length > 0) {
          // Update cache with new results
          dataCache.length = 0 // Clear existing cache
          saveToCache(filteredResults)

          console.log(`Updated cache with ${filteredResults.length} trending music videos from Indonesia`)
        } else {
          console.log("No trending music videos found, falling back to search")
          // Fallback: Jika tidak ada video yang ditemukan, cari video musik populer Indonesia
          const searchResults = await searchVideos("musik populer indonesia trending", 50)

          // Filter out any videos related to Washington, D.C.
          const filteredSearchResults = searchResults.filter(
            (video) =>
              !video.title.toLowerCase().includes("washington") &&
              !video.title.toLowerCase().includes("d.c.") &&
              !(video.description && video.description.toLowerCase().includes("washington")) &&
              !(video.description && video.description.toLowerCase().includes("d.c.")),
          )

          // Update cache with search results
          dataCache.length = 0 // Clear existing cache
          saveToCache(filteredSearchResults)

          console.log(`Updated cache with ${filteredSearchResults.length} music videos from Indonesia search`)
        }
      }
    } else {
      console.log(`Using cached trending music videos (${dataCache.length} videos)`)
    }

    const total = dataCache.length
    const offset = (page - 1) * perPage
    const paginatedData = dataCache.slice(offset, offset + perPage)

    return {
      status: 200,
      result: paginatedData,
      total: total,
      page: page,
      per_page: perPage,
      server_time: new Date().toISOString(),
      msg: "OK",
    }
  } catch (error) {
    console.error("Error in getVideoList:", error)

    // Fallback: Jika terjadi error, coba pencarian musik populer Indonesia
    const results = await searchVideos("musik populer indonesia trending", 50)

    // Filter out any videos related to Washington, D.C.
    const filteredResults = results.filter(
      (video) =>
        !video.title.toLowerCase().includes("washington") &&
        !video.title.toLowerCase().includes("d.c.") &&
        !(video.description && video.description.toLowerCase().includes("washington")) &&
        !(video.description && video.description.toLowerCase().includes("d.c.")),
    )

    return {
      status: 200,
      result: filteredResults.slice(0, perPage),
      total: filteredResults.length,
      page: page,
      per_page: perPage,
      server_time: new Date().toISOString(),
      msg: "OK",
    }
  }
}

// Ubah fungsi getTrendingVideos untuk mengambil trending videos dari Indonesia
export async function getTrendingVideos() {
  try {
    // Use the trending URL for Indonesia
    const url = "https://m.youtube.com/feed/trending?gl=ID"
    const html = await fetchFromYouTube(url)

    if (!html) {
      return {
        status: 500,
        result: [],
        server_time: new Date().toISOString(),
        msg: "Failed to fetch trending videos",
      }
    }

    const results = parseYouTubeHTML(html)

    // Filter out any videos related to Washington, D.C.
    const filteredResults = results.filter(
      (video) =>
        !video.title.toLowerCase().includes("washington") &&
        !video.title.toLowerCase().includes("d.c.") &&
        !(video.description && video.description.toLowerCase().includes("washington")) &&
        !(video.description && video.description.toLowerCase().includes("d.c.")),
    )

    saveToCache(filteredResults)

    return {
      status: 200,
      result: filteredResults,
      server_time: new Date().toISOString(),
      msg: "OK",
    }
  } catch (error) {
    console.error("Error in getTrendingVideos:", error)
    return {
      status: 500,
      result: [],
      server_time: new Date().toISOString(),
      msg: "Error fetching trending videos",
    }
  }
}
