"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send, CheckCircle, AlertCircle } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Nama diperlukan"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email diperlukan"
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subjek diperlukan"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Pesan diperlukan"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setFormStatus("submitting")

    // Simulate form submission
    try {
      // In a real application, you would send the form data to your server here
      // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setFormStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })

      // Reset form status after 5 seconds
      setTimeout(() => {
        setFormStatus("idle")
      }, 5000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setFormStatus("error")

      // Reset form status after 5 seconds
      setTimeout(() => {
        setFormStatus("idle")
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nama</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nama Lengkap"
            className={errors.name ? "border-red-500" : ""}
            disabled={formStatus === "submitting"}
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@example.com"
            className={errors.email ? "border-red-500" : ""}
            disabled={formStatus === "submitting"}
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subjek</Label>
        <Input
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subjek pesan"
          className={errors.subject ? "border-red-500" : ""}
          disabled={formStatus === "submitting"}
        />
        {errors.subject && <p className="text-xs text-red-500">{errors.subject}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Pesan</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tulis pesan Anda di sini..."
          rows={5}
          className={errors.message ? "border-red-500" : ""}
          disabled={formStatus === "submitting"}
        />
        {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={formStatus === "submitting" || formStatus === "success"}
          className="bg-amber-500 hover:bg-amber-600 text-white"
        >
          {formStatus === "submitting" ? (
            <>
              <span className="animate-pulse">Mengirim...</span>
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" aria-hidden="true" tabIndex={-1} />
              Kirim Pesan
            </>
          )}
        </Button>
      </div>

      {formStatus === "success" && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-4 flex items-start">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" aria-hidden="true" tabIndex={-1} />
          <div>
            <h3 className="text-sm font-medium text-green-800 dark:text-green-300">Pesan Terkirim</h3>
            <p className="mt-1 text-xs text-green-700 dark:text-green-400">
              Terima kasih telah menghubungi kami. Kami akan segera merespons pesan Anda.
            </p>
          </div>
        </div>
      )}

      {formStatus === "error" && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" aria-hidden="true" tabIndex={-1} />
          <div>
            <h3 className="text-sm font-medium text-red-800 dark:text-red-300">Terjadi Kesalahan</h3>
            <p className="mt-1 text-xs text-red-700 dark:text-red-400">
              Maaf, terjadi kesalahan saat mengirim pesan Anda. Silakan coba lagi nanti.
            </p>
          </div>
        </div>
      )}
    </form>
  )
}
