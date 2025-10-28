"use client"

import type React from "react"

import Sidebar from "./sidebar"
import Navbar from "./navbar"

interface MainLayoutProps {
  children: React.ReactNode
  currentPage: string
  onPageChange: (page: any) => void
}

export default function MainLayout({ children, currentPage, onPageChange }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPage={currentPage} onPageChange={onPageChange} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
