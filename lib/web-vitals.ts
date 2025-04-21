import type { NextWebVitalsMetric } from "next/app"

export function reportWebVitals(metric: NextWebVitalsMetric) {
  // Log metrics to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(metric)
  }

  // In production, you could send these metrics to your analytics service
  if (process.env.NODE_ENV === "production") {
    const body = JSON.stringify(metric)
    // This is where you would normally send the data to your analytics service
    // For now, we'll just log it to avoid any external dependencies
    console.log("Production metric:", metric)

    // Example of how you might send this to an endpoint:
    // if (navigator.sendBeacon) {
    //   navigator.sendBeacon('/api/vitals', body);
    // } else {
    //   fetch('/api/vitals', {
    //     body,
    //     method: 'POST',
    //     keepalive: true,
    //   });
    // }
  }
}
