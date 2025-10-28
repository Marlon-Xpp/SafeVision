import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ToastProvider } from "@/contexts/toast-context"
import ToastContainer from "@/components/common/toast-container"
import { AuthProvider } from "@/contexts/AuthContext";

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SafetyVision - Sistema de Prevención de Riesgos",
  description: "Monitoreo en tiempo real de seguridad en obra",
  generator: "Marlon Pillaca",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased`}>
        <ToastProvider>
          <AuthProvider>
            {children}
            <ToastContainer />
            <Analytics />
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
