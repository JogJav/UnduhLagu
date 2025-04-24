import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FormAnalyticsDashboard from "@/components/analytics-dashboard"

export const metadata: Metadata = {
  title: "Form Analytics Dashboard - UnduhLagu Admin",
  description: "Analytics dashboard for form submissions on UnduhLagu",
  robots: "noindex, nofollow", // Ensure this admin page isn't indexed
}

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-amber-700 dark:text-amber-400">Form Analytics Dashboard</h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8">
          <FormAnalyticsDashboard adminMode={true} />
        </div>

        <div className="text-sm text-muted-foreground">
          <p>
            Catatan: Data yang ditampilkan adalah data contoh. Dalam implementasi sebenarnya, data akan diambil dari
            layanan analitik Anda.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
