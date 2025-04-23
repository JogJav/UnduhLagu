import type { Metadata } from "next"
import Header from "@/components/header"
import Link from "next/link"
import { Mail, MapPin, Phone, Globe, Clock } from "lucide-react"
import Footer from "@/components/footer"
import ContactForm from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Kontak UnduhLagu - Informasi Geografis",
  description: "Informasi kontak dan geografis UnduhLagu. Hubungi kami untuk pertanyaan, saran, atau kerjasama.",
  keywords: "kontak unduhlagu, informasi geografis, hubungi unduhlagu, lokasi unduhlagu, email unduhlagu",
}

export default function KontakPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-amber-700 dark:text-amber-400">Kontak</h1>

          <div className="bg-gradient-to-r from-amber-50 to-red-50 dark:from-amber-950/30 dark:to-red-950/30 rounded-lg p-6 mb-8 border border-amber-100 dark:border-amber-900/50 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-amber-700 dark:text-amber-400">Tentang UnduhLagu</h2>
            <p className="mb-4">
              Unduh Lagu Adalah Platform Streaming dan Download Musik Indonesia Yang Beroperasi Secara Online. Kami
              Berkomitmen Untuk Menyediakan Akses Mudah ke Konten Musik Berkualitas Tinggi Bagi Pengguna di Seluruh
              Indonesia.
            </p>
            <p>
              Sebagai Platform Digital, Kami Menghormati Hak Cipta dan Sesuai Dengan Peraturan Yang Berlaku di
              Indonesia Terkait dengan Distribusi Konten Digital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-amber-700 dark:text-amber-400">
                <MapPin className="h-5 w-5" aria-hidden="true" tabIndex={-1} />
                Informasi Geografis
              </h2>
              <p className="mb-2">
                <strong>Wilayah Operasi:</strong> Indonesia
              </p>
              <p className="mb-2">
                <strong>Bahasa Utama:</strong> Bahasa Indonesia
              </p>
              <p className="mb-2">
                <strong>Mata Uang:</strong> Rupiah (IDR)
              </p>
              <p>
                <strong>Zona Waktu:</strong> WIB (GMT+7)
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-amber-700 dark:text-amber-400">
                <Mail className="h-5 w-5" aria-hidden="true" tabIndex={-1} />
                Hubungi Kami
              </h2>
              <p className="mb-3 flex items-center gap-2">
                <Mail className="h-4 w-4 text-amber-600 dark:text-amber-400" aria-hidden="true" tabIndex={-1} />
                <span>Email: unduhlagu123@gmail.com</span>
              </p>
              <p className="mb-3 flex items-center gap-2">
                <Phone className="h-4 w-4 text-amber-600 dark:text-amber-400" aria-hidden="true" tabIndex={-1} />
                <span>Telepon: +6282227920263</span>
              </p>
              <p className="mb-3 flex items-center gap-2">
                <Globe className="h-4 w-4 text-amber-600 dark:text-amber-400" aria-hidden="true" tabIndex={-1} />
                <span>Website: unduhlagu.online</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" aria-hidden="true" tabIndex={-1} />
                <span>Jam Operasional: 09.00 - 18.00 WIB (Senin-Jumat)</span>
              </p>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4 text-amber-700 dark:text-amber-400">Formulir Kontak</h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Silakan isi formulir di bawah ini untuk mengirimkan pertanyaan, saran, atau permintaan kerjasama. Tim kami
              akan merespons dalam waktu 1-2 hari kerja.
            </p>
            <ContactForm />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4 text-amber-700 dark:text-amber-400">
              Kebijakan Privasi & Penggunaan
            </h2>
            <p className="mb-4">
              UnduhLagu berkomitmen untuk melindungi privasi pengguna dan menggunakan data sesuai dengan peraturan
              perlindungan data yang berlaku di Indonesia.
            </p>
            <div className="flex gap-4">
              <Link
                href="/kebijakan-privasi"
                className="text-amber-600 hover:text-red-600 dark:text-amber-400 dark:hover:text-red-400 font-medium"
              >
                Kebijakan Privasi
              </Link>
              <Link
                href="/syarat-ketentuan"
                className="text-amber-600 hover:text-red-600 dark:text-amber-400 dark:hover:text-red-400 font-medium"
              >
                Syarat & Ketentuan
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-red-50 dark:from-amber-950/30 dark:to-red-950/30 rounded-lg p-6 border border-amber-100 dark:border-amber-900/50 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-amber-700 dark:text-amber-400">Kerjasama & Pertanyaan</h2>
            <p className="mb-4">
              Untuk pertanyaan, saran, atau kerjasama bisnis, silakan hubungi kami melalui email di{" "}
              <a
                href="mailto:kerjasama@unduhlagu.online"
                className="text-amber-600 hover:text-red-600 dark:text-amber-400 dark:hover:text-red-400 font-medium"
              >
                unduhlagu123@gmail.com
              </a>
            </p>
            <p>Tim kami akan merespons dalam waktu 1-2 hari kerja.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
