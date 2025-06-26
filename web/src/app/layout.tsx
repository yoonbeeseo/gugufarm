import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import AppProvider from "@/contexts/AppProvider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "재미있는 구구단",
  description: "구구단도 재밌게 공부해요",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/192*192.png",
    apple: "/icons/512*512.png",
  },
}
export const viewport: Viewport = {
  themeColor: "#20C997",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
