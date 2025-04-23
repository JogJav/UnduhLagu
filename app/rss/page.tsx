import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { RssIcon, Copy, ExternalLink } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "RSS Feed - Unduh Lagu",
  description: "Subscribe to our RSS feed to get the latest updates on trending music and videos from Unduh Lagu.",
}

export default function RssPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <RssIcon className="h-8 w-8 text-amber-500" />
            <h1 className="text-3xl font-bold text-amber-700 dark:text-amber-400">RSS Feed</h1>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-red-50 dark:from-amber-950/30 dark:to-red-950/30 rounded-lg p-6 mb-8 border border-amber-100 dark:border-amber-900/50 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-amber-700 dark:text-amber-400">
              Tentang RSS Feed Unduh Lagu
            </h2>
            <p className="mb-4">
              RSS (Really Simple Syndication) adalah format feed web yang memungkinkan Anda untuk tetap mendapatkan
              informasi terbaru tentang konten baru di Unduh Lagu tanpa harus mengunjungi situs web secara langsung.
            </p>
            <p>
              Dengan berlangganan feed RSS kami, Anda akan mendapatkan notifikasi tentang video musik trending terbaru,
              rilis baru, dan konten populer lainnya di platform kami.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4 text-amber-700 dark:text-amber-400">Cara Berlangganan</h2>

            <div className="mb-6">
              <h3 className="font-medium mb-2">URL Feed RSS:</h3>
              <div className="flex items-center gap-2">
                <code className="bg-gray-100 dark:bg-gray-900 px-3 py-2 rounded flex-1 overflow-x-auto">
                  https://unduhlagu.online/api/rss
                </code>
                <Button variant="outline" size="icon" className="flex-shrink-0" title="Copy RSS URL">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Langkah-langkah berlangganan:</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Salin URL feed RSS di atas</li>
                  <li>Buka aplikasi pembaca RSS favorit Anda (seperti Feedly, Inoreader, atau NewsBlur)</li>
                  <li>Tambahkan feed baru dengan menempelkan URL</li>
                  <li>Simpan dan nikmati pembaruan otomatis dari Unduh Lagu</li>
                </ol>
              </div>

              <div className="pt-4">
                <Button asChild className="bg-amber-500 hover:bg-amber-600 text-white">
                  <Link href="/api/rss" target="_blank" rel="noopener noreferrer">
                    <RssIcon className="h-4 w-4 mr-2" />
                    Lihat Feed RSS
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-amber-700 dark:text-amber-400">
              Aplikasi Pembaca RSS Populer
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Feedly</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Pembaca RSS berbasis cloud yang populer dengan antarmuka yang bersih dan intuitif.
                </p>
                <a
                  href="https://feedly.com/i/discover"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-500 hover:text-red-600 text-sm flex items-center"
                >
                  Kunjungi Feedly
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Inoreader</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Platform pembaca RSS yang kuat dengan banyak fitur untuk mengatur konten.
                </p>
                <a
                  href="https://www.inoreader.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-500 hover:text-red-600 text-sm flex items-center"
                >
                  Kunjungi Inoreader
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">NewsBlur</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Pembaca berita sosial dengan fitur penyaringan cerdas dan berbagi.
                </p>
                <a
                  href="https://newsblur.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-500 hover:text-red-600 text-sm flex items-center"
                >
                  Kunjungi NewsBlur
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Aplikasi Bawaan Browser</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Beberapa browser seperti Firefox memiliki pembaca RSS bawaan yang dapat Anda gunakan.
                </p>
                <p className="text-sm text-muted-foreground">
                  Periksa dokumentasi browser Anda untuk informasi lebih lanjut.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
