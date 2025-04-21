interface DownloadFrameProps {
  videoId: string
}

export default function DownloadFrame({ videoId }: DownloadFrameProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border p-4 bg-card shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 active:translate-y-0 active:shadow-inner duration-300">
        <h3 className="text-sm font-medium mb-2 text-amber-500">Download MP3 Audio</h3>
        <p className="text-xs text-muted-foreground mb-3">High quality audio format for music listening</p>
        <div className="bg-emerald-600 dark:bg-emerald-700 rounded-md overflow-hidden shadow-inner hover:bg-emerald-500 dark:hover:bg-emerald-600 transition-colors">
          <iframe
            allowFullScreen={true}
            frameBorder="0"
            height="65"
            scrolling="no"
            src={`https://musicyt.click/mp33.php?id=${videoId}`}
            width="100%"
            className="border-0 transition-transform hover:scale-[1.01] active:scale-[0.99]"
            style={{ display: "block" }}
          />
        </div>
      </div>

      <div className="rounded-lg border border-border p-4 bg-card shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 active:translate-y-0 active:shadow-inner duration-300">
        <h3 className="text-sm font-medium mb-2 text-amber-500">Download MP4 Video</h3>
        <p className="text-xs text-muted-foreground mb-3">Multiple quality options for video playback</p>
        <div className="bg-emerald-600 dark:bg-emerald-700 rounded-md overflow-hidden shadow-inner hover:bg-emerald-500 dark:hover:bg-emerald-600 transition-colors">
          <iframe
            allowFullScreen={true}
            frameBorder="0"
            height="65"
            scrolling="no"
            src={`https://mp4api.ytjar.info/?id=${videoId}`}
            width="100%"
            className="border-0 transition-transform hover:scale-[1.01] active:scale-[0.99]"
            style={{ display: "block" }}
          />
        </div>
      </div>
    </div>
  )
}
