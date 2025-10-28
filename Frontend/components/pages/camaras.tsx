"use client"

import { useState, useMemo } from "react"
import PageHeader from "@/components/common/page-header"
import Toolbar from "@/components/common/toolbar"
import RegisterCameraModal, { type CameraFormData } from "@/components/common/register-camera-modal"
import { Plus } from "lucide-react"

interface Camera {
  id: string
  name: string
  location: string
  module: "Asistencia" | "EPP" | "Accesos" | "Productividad"
  status: "active" | "inactive"
}

const mockCameras: Camera[] = [
  {
    id: "1",
    name: "Cámara Entrada Principal",
    location: "Entrada Principal",
    module: "Asistencia",
    status: "active",
  },
  {
    id: "2",
    name: "Cámara Zona EPP",
    location: "Área de Trabajo A",
    module: "EPP",
    status: "active",
  },
  {
    id: "3",
    name: "Cámara Zona Restringida",
    location: "Zona Peligrosa 1",
    module: "Accesos",
    status: "active",
  },
  {
    id: "4",
    name: "Cámara Zona Operaciones",
    location: "Área de Operaciones",
    module: "Productividad",
    status: "active",
  },
]

const moduleColors = {
  Asistencia: "bg-blue-100 text-blue-700",
  EPP: "bg-orange-100 text-orange-700",
  Accesos: "bg-purple-100 text-purple-700",
  Productividad: "bg-green-100 text-green-700",
}

const modules = ["Asistencia", "EPP", "Accesos", "Productividad"]

export default function Camaras() {
  const [cameras, setCameras] = useState(mockCameras)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [selectedModule, setSelectedModule] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredCameras = useMemo(() => {
    return cameras.filter((camera) => {
      const matchesSearch =
        camera.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        camera.location.toLowerCase().includes(searchValue.toLowerCase())
      const matchesModule = !selectedModule || camera.module === selectedModule
      return matchesSearch && matchesModule
    })
  }, [cameras, searchValue, selectedModule])

  const handleRegisterCamera = (formData: CameraFormData) => {
    const newCamera: Camera = {
      id: String(cameras.length + 1),
      name: formData.name,
      location: formData.location,
      module: formData.module,
      status: "active",
    }
    setCameras([...cameras, newCamera])
  }

  return (
    <div className="p-8">
      <PageHeader
        title="Gestión de Cámaras"
        subtitle="Monitoreo y administración de todas las cámaras del sistema"
        action={
          <button
            onClick={() => setIsRegisterModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-smooth"
          >
            <Plus className="w-5 h-5" />
            Agregar Cámara
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-card rounded-lg border border-border p-6">
          <p className="text-sm text-muted-foreground">Total Cámaras</p>
          <p className="text-3xl font-bold mt-2">{cameras.length}</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <p className="text-sm text-muted-foreground">Activas</p>
          <p className="text-3xl font-bold mt-2 text-green-600">
            {cameras.filter((c) => c.status === "active").length}
          </p>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <p className="text-sm text-muted-foreground">Inactivas</p>
          <p className="text-3xl font-bold mt-2 text-red-600">
            {cameras.filter((c) => c.status === "inactive").length}
          </p>
        </div>
      </div>

      <Toolbar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        filters={modules}
        selectedFilter={selectedModule}
        onFilterChange={setSelectedModule}
        placeholder="Buscar cámara por nombre o ubicación..."
      />

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCameras.map((camera) => (
            <div
              key={camera.id}
              className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-smooth"
            >
              {/* Image */}
              <div className="relative w-full aspect-video bg-foreground/5">
                <img
                  src="/construction-site-camera-feed.png"
                  alt={camera.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      camera.status === "active" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}
                  >
                    {camera.status === "active" ? "Activa" : "Inactiva"}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold text-foreground">{camera.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">📍 {camera.location}</p>
                <div className="mt-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${moduleColors[camera.module]}`}
                  >
                    {camera.module}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Nombre</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Ubicación</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Módulo</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredCameras.map((camera) => (
                  <tr key={camera.id} className="hover:bg-muted/50 transition-smooth">
                    <td className="px-6 py-4 text-sm text-foreground">{camera.name}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{camera.location}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${moduleColors[camera.module]}`}
                      >
                        {camera.module}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          camera.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        {camera.status === "active" ? "Activa" : "Inactiva"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredCameras.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No se encontraron cámaras</p>
        </div>
      )}

      <RegisterCameraModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSubmit={handleRegisterCamera}
      />
    </div>
  )
}
