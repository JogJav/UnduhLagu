import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-background mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h3 className="font-bold text-lg mb-3 text-amber-500">UnduhLagu</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Platform streaming dan download musik Indonesia terlengkap. Nikmati lagu trending Indonesia terbaru dengan
              mudah.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-3 text-amber-500">Tautan</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-amber-500 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/trending" className="text-muted-foreground hover:text-amber-500 transition-colors">
                  Trending
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="text-muted-foreground hover:text-amber-500 transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="text-muted-foreground hover:text-amber-500 transition-colors">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-3 text-amber-500">Informasi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/kebijakan-privasi"
                  className="text-muted-foreground hover:text-amber-500 transition-colors"
                >
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="/syarat-ketentuan" className="text-muted-foreground hover:text-amber-500 transition-colors">
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link href="/dmca" className="text-muted-foreground hover:text-amber-500 transition-colors">
                  DMCA
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-amber-500 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} UnduhLagu. Hak Cipta Dilindungi.</p>
          <p className="mt-1">
            <Link href="/kontak" className="text-amber-500 hover:text-red-600 transition-colors">
              Informasi Geografis
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
