import { Geist, Geist_Mono } from "next/font/google"

import { Header } from "client/components/Header"
import { Separator } from "client/libs/shadcn/separator"
import { cn } from "client/libs/utils"
import { Metadata } from "next"
import { Toaster } from "sonner"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Sample Library",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <div className="flex min-h-svh flex-col">
          <Header />
          <Separator />
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  )
}
