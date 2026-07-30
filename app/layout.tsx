import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { getMetaInfo } from "@/lib/data"

const metaInfo = getMetaInfo()

export const metadata: Metadata = {
  title: metaInfo.title,
  description: metaInfo.description,
  icons: {
    icon: '/icon.jpg',
    apple: '/icon.jpg',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  )
}
