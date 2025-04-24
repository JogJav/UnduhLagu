import Link from "next/link"

export default function ReCAPTCHAPrivacyNotice() {
  return (
    <div className="text-xs text-muted-foreground mt-6 space-y-2">
      <p>
        Situs ini dilindungi oleh reCAPTCHA dan{" "}
        <Link
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-500 hover:text-red-600 transition-colors"
        >
          Kebijakan Privasi
        </Link>{" "}
        serta{" "}
        <Link
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-500 hover:text-red-600 transition-colors"
        >
          Persyaratan Layanan
        </Link>{" "}
        Google berlaku.
      </p>
      <p>
        Kami mengumpulkan data analitik tentang penggunaan formulir kontak untuk meningkatkan layanan kami. Data yang
        dikumpulkan bersifat anonim dan tidak mengidentifikasi Anda secara pribadi. Untuk informasi lebih lanjut,
        silakan baca{" "}
        <Link href="/kebijakan-privasi" className="text-amber-500 hover:text-red-600 transition-colors">
          Kebijakan Privasi
        </Link>{" "}
        kami.
      </p>
    </div>
  )
}
