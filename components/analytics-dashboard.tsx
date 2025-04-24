"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// This is a mock component that would typically fetch real data from your analytics service
// In a real implementation, you would connect this to your analytics API

interface FormAnalyticsProps {
  adminMode?: boolean
}

export default function FormAnalyticsDashboard({ adminMode = false }: FormAnalyticsProps) {
  // This would normally be fetched from your analytics API
  const [analyticsData, setAnalyticsData] = useState({
    totalSubmissions: 0,
    successRate: 0,
    averageTimeSpent: 0,
    submissionsByDay: [],
    submissionsBySubject: [],
    errorTypes: [],
  })

  // Mock data for demonstration purposes
  const mockData = {
    totalSubmissions: 127,
    successRate: 92,
    averageTimeSpent: 145,
    submissionsByDay: [
      { name: "Sen", submissions: 18, successful: 16, failed: 2 },
      { name: "Sel", submissions: 22, successful: 20, failed: 2 },
      { name: "Rab", submissions: 15, successful: 14, failed: 1 },
      { name: "Kam", submissions: 25, successful: 23, failed: 2 },
      { name: "Jum", submissions: 30, successful: 28, failed: 2 },
      { name: "Sab", submissions: 12, successful: 11, failed: 1 },
      { name: "Min", submissions: 5, successful: 5, failed: 0 },
    ],
    submissionsBySubject: [
      { name: "Pertanyaan", value: 45 },
      { name: "Saran", value: 32 },
      { name: "Kerjasama", value: 28 },
      { name: "Lainnya", value: 22 },
    ],
    errorTypes: [
      { name: "Validasi", value: 6 },
      { name: "Server", value: 2 },
      { name: "reCAPTCHA", value: 3 },
    ],
  }

  useEffect(() => {
    // In a real implementation, you would fetch data from your analytics API
    // For now, we'll use mock data
    setAnalyticsData(mockData)
  }, [])

  // Only render if in admin mode
  if (!adminMode) return null

  return (
    <div className="space-y-4">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Ringkasan</TabsTrigger>
          <TabsTrigger value="submissions">Pengiriman</TabsTrigger>
          <TabsTrigger value="errors">Kesalahan</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Pengiriman</CardTitle>
                <CardDescription>Total formulir yang dikirim</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{analyticsData.totalSubmissions}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Tingkat Keberhasilan</CardTitle>
                <CardDescription>Persentase pengiriman berhasil</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{analyticsData.successRate}%</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Waktu Pengisian</CardTitle>
                <CardDescription>Rata-rata waktu pengisian (detik)</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{analyticsData.averageTimeSpent}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Pengiriman per Hari</CardTitle>
              <CardDescription>Jumlah pengiriman formulir per hari dalam seminggu terakhir</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer
                  config={{
                    successful: {
                      label: "Berhasil",
                      color: "hsl(var(--chart-1))",
                    },
                    failed: {
                      label: "Gagal",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData.submissionsByDay}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="successful" stackId="a" fill="var(--color-successful)" name="Berhasil" />
                      <Bar dataKey="failed" stackId="a" fill="var(--color-failed)" name="Gagal" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pengiriman berdasarkan Subjek</CardTitle>
              <CardDescription>Distribusi pengiriman formulir berdasarkan subjek</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer
                  config={{
                    value: {
                      label: "Jumlah",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData.submissionsBySubject}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="value" fill="var(--color-value)" name="Jumlah" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Jenis Kesalahan</CardTitle>
              <CardDescription>Distribusi kesalahan berdasarkan jenisnya</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer
                  config={{
                    value: {
                      label: "Jumlah",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData.errorTypes}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="value" fill="var(--color-value)" name="Jumlah" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
