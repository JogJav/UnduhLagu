export function Favicon() {
  return (
    <>
      {/* We're using dynamic routes for favicon generation now */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/icon" />
      <link rel="icon" type="image/png" sizes="16x16" href="/icon?size=16" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon" />
      <link rel="mask-icon" href="/icon?mask=true" color="#f59e0b" />
      <meta name="msapplication-TileColor" content="#f59e0b" />
      <meta name="theme-color" content="#f59e0b" />
      <link rel="manifest" href="/site.webmanifest" />
    </>
  )
}
