import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Quote Generator - Inspire Your Day",
  description:
    "Discover inspiring quotes from various categories including motivational, funny, life wisdom, and success quotes. Built with Next.js 15 and Shadcn UI.",
  keywords: "quotes, inspiration, motivation, wisdom, success, funny quotes",
  authors: [{ name: "Quote Generator Team" }],
  openGraph: {
    title: "Quote Generator - Inspire Your Day",
    description: "Discover inspiring quotes from various categories",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
