"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send, CheckCircle, AlertCircle, ShieldCheck } from "lucide-react"
import ReCAPTCHA from "@/components/recaptcha"
import { trackFormSubmission } from "@/lib/analytics"

// Use a placeholder site key - in production, this would be your actual reCAPTCHA site key
const RECAPTCHA_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // This is Google's test key

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [startTime, setStartTime] = useState<number | null>(null)

  // Set the start time when the component mounts
  useEffect(() => {
    setStartTime(Date.now())
  }, [])

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

    if (!recaptchaToken) {
      newErrors.recaptcha = "Silakan verifikasi bahwa Anda bukan robot"
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

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token)
    if (token) {
      // Clear recaptcha error if it exists
      setErrors((prev) => ({ ...prev, recaptcha: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Calculate time spent on form if startTime exists
    const timeSpent = startTime ? Date.now() - startTime : null

    if (!validateForm()) {
      // Track failed validation
      trackFormSubmission("contact_form", false, {
        subject: formData.subject || "not_specified",
        hasMessage: Boolean(formData.message.trim()),
        errorType: "validation_error",
        submissionTime: timeSpent || undefined,
      })
      return
    }

    setFormStatus("submitting")

    // Simulate form submission
    try {
      // In a real application, you would send the form data and recaptchaToken to your server here
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   body: JSON.stringify({ ...formData, recaptchaToken })
      // })

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Track successful submission
      trackFormSubmission("contact_form", true, {
        subject: formData.subject,
        hasMessage: true,
        submissionTime: timeSpent || undefined,
      })

      setFormStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
      setRecaptchaToken(null)
      setStartTime(Date.now()) // Reset start time for potential new submission

      // Reset reCAPTCHA
      if (window.grecaptcha) {
        window.grecaptcha.reset()
      }

      // Reset form status after 5 seconds
      setTimeout(() => {
        setFormStatus("idle")
      }, 5000)
    } catch (error) {
      console.error("Error submitting form:", error)

      // Track failed submission
      trackFormSubmission("contact_form", false, {
        subject: formData.subject,
        hasMessage: Boolean(formData.message.trim()),
        errorType: "server_error",
        submissionTime: timeSpent || undefined,
      })

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

      {/* reCAPTCHA component */}
      <div className="flex flex-col items-center">
        <ReCAPTCHA siteKey={RECAPTCHA_SITE_KEY} onChange={handleRecaptchaChange} />
        {errors.recaptcha && <p className="text-xs text-red-500 mt-1">{errors.recaptcha}</p>}
      </div>

      <div className="flex justify-between items-center">
        <div className="text-xs text-muted-foreground flex items-center">
          <ShieldCheck className="h-3 w-3 mr-1" aria-hidden="true" tabIndex={-1} />
          Dilindungi oleh reCAPTCHA
        </div>

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
