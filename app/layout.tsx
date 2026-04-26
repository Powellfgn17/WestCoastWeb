import type { Metadata, Viewport } from "next"
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { CustomCursor } from "@/components/custom-cursor"
import { ScrollProgress } from "@/components/scroll-progress"
import { Toaster } from "@/components/ui/sonner"
import { LocaleProvider } from "@/lib/i18n"

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["500", "600", "700", "800"],
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Powell Digital — Websites for Local Businesses in 5 Days",
  description:
    "I build fast, mobile-first websites for barbershops, garages, and restaurants across the US, UK, and French-speaking Africa. Delivery in 5 days from $500.",
  generator: "v0.app",
  keywords: [
    "web agency",
    "local business websites",
    "Charlotte web design",
    "Cotonou développeur",
    "Birmingham web design",
    "barbershop website",
    "garage website",
  ],
  authors: [{ name: "Treasure Fagnon (Powell)" }],
  openGraph: {
    title: "Powell Digital — Websites for Local Businesses in 5 Days",
    description:
      "Clean, mobile-first websites delivered in 5 days for businesses that don't exist online yet.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#0A0F1E",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} bg-background`}
    >
      <body className="font-sans antialiased bg-background text-foreground overflow-x-hidden">
        <LocaleProvider>
          <ScrollProgress />
          <CustomCursor />
          {children}
          <Toaster position="top-right" theme="dark" />
          {process.env.NODE_ENV === "production" && <Analytics />}
        </LocaleProvider>
      </body>
    </html>
  )
}
