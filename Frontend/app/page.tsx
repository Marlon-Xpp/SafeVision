"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import MainLayout from "@/components/layout/main-layout"
import Dashboard from "@/components/pages/dashboard"
import Asistencia from "@/components/pages/asistencia"
import EPP from "@/components/pages/epp"
import Accesos from "@/components/pages/accesos"
import Productividad from "@/components/pages/productividad"
import Camaras from "@/components/pages/camaras"
import Trabajadores from "@/components/pages/trabajadores"
import Configuracion from "@/components/pages/configuracion"

type Page =
  | "dashboard"
  | "asistencia"
  | "epp"
  | "accesos"
  | "productividad"
  | "camaras"
  | "trabajadores"
  | "configuracion"

export default function Home() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState<Page>("dashboard")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/login")
    } else {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Cargando...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />
      case "asistencia":
        return <Asistencia />
      case "epp":
        return <EPP />
      case "accesos":
        return <Accesos />
      case "productividad":
        return <Productividad />
      case "camaras":
        return <Camaras />
      case "trabajadores":
        return <Trabajadores />
      case "configuracion":
        return <Configuracion />
      default:
        return <Dashboard />
    }
  }

  return (
    <MainLayout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </MainLayout>
  )
}
