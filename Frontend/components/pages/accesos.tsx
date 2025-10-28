"use client"

import PageHeader from "@/components/common/page-header"
import StatsGrid from "@/components/common/stats-grid"
import CameraView from "@/components/common/camera-view"
import RecordListWithSearch from "@/components/common/record-list-with-search"

const mockRecords = [
  {
    id: "1",
    name: "Juan Pérez",
    code: "W001",
    status: "success" as const,
    details: "Zona: Área General | Hora: 03:03",
    time: "03:03",
  },
  {
    id: "2",
    name: "María González",
    code: "W002",
    status: "success" as const,
    details: "Zona: Zona Restringida | Hora: 03:13",
    time: "03:13",
  },
  {
    id: "3",
    name: "Carlos Rodríguez",
    code: "W003",
    status: "error" as const,
    details: "Zona: Zona Peligrosa | Acceso Denegado",
    time: "03:55",
  },
  {
    id: "4",
    name: "Carlos Rodríguez",
    code: "W003",
    status: "error" as const,
    details: "Zona: Zona Peligrosa | Acceso Denegado",
    time: "03:55",
  },
  {
    id: "5",
    name: "Carlos Rodríguez",
    code: "W003",
    status: "error" as const,
    details: "Zona: Zona Peligrosa | Acceso Denegado",
    time: "03:55",
  },
  {
    id: "6",
    name: "Carlos Rodríguez",
    code: "W003",
    status: "error" as const,
    details: "Zona: Zona Peligrosa | Acceso Denegado",
    time: "03:55",
  },
  {
    id: "7",
    name: "Carlos Rodríguez",
    code: "W003",
    status: "error" as const,
    details: "Zona: Zona Peligrosa | Acceso Denegado",
    time: "03:55",
  },
]

export default function Accesos() {
  const stats = [
    { title: "Total Trabajadores", value: "8", color: "blue" as const },
    { title: "Autorizados", value: "7", delta: 0, color: "green" as const },
    { title: "No Autorizados", value: "1", delta: 0, color: "red" as const },
    { title: "Accesos Recientes", value: "12", delta: 0, color: "blue" as const },
  ]

  const cameras = [{ title: "Cámara Zona Restringida", location: "Zona Peligrosa 1", status: "active" as const }]

  return (
    <div className="p-8">
      <PageHeader title="Control de Accesos" subtitle="Gestión de acceso a zonas restringidas" />
      <StatsGrid items={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CameraView cameras={cameras} />
        </div>
        <div className="lg:col-span-1 h-120">
          <RecordListWithSearch
            items={mockRecords}
            title="Registro de Accesos"
            placeholder="Buscar por nombre o código..."
          />
        </div>
      </div>
    </div>
  )
}
