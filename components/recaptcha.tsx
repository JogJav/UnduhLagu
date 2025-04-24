"use client"

import { useEffect, useRef } from "react"
import Script from "next/script"

interface ReCAPTCHAProps {
  siteKey: string
  onChange: (token: string | null) => void
}

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
      render: (container: string | HTMLElement, options: any) => number
      reset: (widgetId?: number) => void
      getResponse: (widgetId?: number) => string
    }
    onRecaptchaLoad: () => void
  }
}

export default function ReCAPTCHA({ siteKey, onChange }: ReCAPTCHAProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<number | null>(null)

  useEffect(() => {
    // Define the callback function that will be called when reCAPTCHA is loaded
    window.onRecaptchaLoad = () => {
      if (containerRef.current && window.grecaptcha) {
        // Render the reCAPTCHA widget
        widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
          sitekey: siteKey,
          callback: onChange,
          "expired-callback": () => onChange(null),
          "error-callback": () => onChange(null),
        })
      }
    }

    // Clean up
    return () => {
      // Reset reCAPTCHA if it was rendered
      if (widgetIdRef.current !== null && window.grecaptcha) {
        window.grecaptcha.reset(widgetIdRef.current)
      }
    }
  }, [siteKey, onChange])

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit`}
        strategy="lazyOnload"
      />
      <div ref={containerRef} className="g-recaptcha mt-4" />
    </>
  )
}
