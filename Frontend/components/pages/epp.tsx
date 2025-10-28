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
    details: "Puesto: Operario | EPP: Completo",
    time: "03:03",
  },
  {
    id: "2",
    name: "María González",
    code: "W002",
    status: "error" as const,
    details: "Puesto: Supervisor | EPP: Sin casco",
    time: "03:13",
  },
  {
    id: "3",
    name: "Carlos Rodríguez",
    code: "W003",
    status: "warning" as const,
    details: "Puesto: Operario | EPP: Advertencia",
    time: "03:55",
  },
  {
    id: "4",
    name: "Carlos Rodríguez",
    code: "W003",
    status: "warning" as const,
    details: "Puesto: Operario | EPP: Advertencia",
    time: "03:55",
  },
  {
    id: "5",
    name: "Carlos Rodríguez",
    code: "W003",
    status: "warning" as const,
    details: "Puesto: Operario | EPP: Advertencia",
    time: "03:55",
  },
  {
    id: "6",
    name: "Carlos Rodríguez",
    code: "W003",
    status: "warning" as const,
    details: "Puesto: Operario | EPP: Advertencia",
    time: "03:55",
  },
]

export default function EPP() {
  const stats = [
    { title: "Total Trabajadores", value: "8", color: "blue" as const },
    { title: "Cumpliendo", value: "6", delta: 0, color: "green" as const },
    { title: "No Cumpliendo", value: "1", delta: 0, color: "red" as const },
    { title: "Advertencias", value: "1", delta: 0, color: "yellow" as const },
  ]

  const cameras = [
    { title: "Cámara Zona EPP", location: "Área de Trabajo A", status: "active" as const },
    { title: "Cámara Zona EPP 2", location: "Área de Trabajo B", status: "active" as const },
    { title: "Cámara Zona EPP 3", location: "Área de Trabajo C", status: "inactive" as const },
    { title: "Cámara Zona EPP 4", location: "Área de Trabajo D", status: "active" as const },
  ]

  return (
    <div className="p-8">
      <PageHeader title="Uso de EPP" subtitle="Monitoreo de equipos de protección personal" />
      <StatsGrid items={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CameraView cameras={cameras} />
        </div>
        <div className="lg:col-span-1 h-120">
          <RecordListWithSearch
            items={mockRecords}
            title="Registro de EPP"
            placeholder="Buscar por nombre o código..."
          />
        </div>
      </div>
    </div>
  )
}
