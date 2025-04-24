// Analytics utility functions for tracking user interactions

type EventOptions = {
  // Define properties that can be tracked with events
  [key: string]: string | number | boolean | undefined
}

/**
 * Track a custom event with Vercel Analytics
 * @param eventName The name of the event to track
 * @param options Additional properties to track with the event
 */
export function trackEvent(eventName: string, options?: EventOptions) {
  // Check if we're in the browser and if the analytics object exists
  if (typeof window !== "undefined" && "va" in window) {
    // Cast window to any to access the Vercel Analytics object
    const va = (window as any).va

    if (typeof va === "function") {
      try {
        // Track the event with Vercel Analytics
        va("event", {
          name: eventName,
          ...(options || {}),
        })

        console.log(`[Analytics] Tracked event: ${eventName}`, options)
      } catch (error) {
        // Silently fail - analytics should never break the application
        console.error("[Analytics] Error tracking event:", error)
      }
    }
  }
}

/**
 * Track form submission events
 * @param formName The name/identifier of the form
 * @param success Whether the submission was successful
 * @param metadata Additional metadata about the submission
 */
export function trackFormSubmission(
  formName: string,
  success: boolean,
  metadata?: {
    subject?: string
    hasMessage?: boolean
    errorType?: string
    submissionTime?: number
  },
) {
  trackEvent("form_submission", {
    form_name: formName,
    success: success,
    subject_category: metadata?.subject || "not_specified",
    has_message: metadata?.hasMessage || false,
    error_type: metadata?.errorType,
    submission_time_ms: metadata?.submissionTime,
    timestamp: new Date().toISOString(),
  })
}
