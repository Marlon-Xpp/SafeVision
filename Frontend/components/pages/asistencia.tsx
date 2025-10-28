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
    details: "Entrada: 03:03 | Turno: Tarde",
    time: "03:03",
  },
  {
    id: "2",
    name: "María González",
    code: "W002",
    status: "warning" as const,
    details: "Entrada: 03:13 | Turno: Mañana",
    time: "03:13",
  },
  {
    id: "3",
    name: "Carlos Rodríguez",
    code: "W003",
    status: "warning" as const,
    details: "Entrada: 03:55 | Turno: Mañana",
    time: "03:55",
  },
  {
    id: "4",
    name: "Ana Martínez",
    code: "W004",
    status: "warning" as const,
    details: "Entrada: 02:55 | Turno: Mañana",
    time: "02:55",
  },

  {
    id: "5",
    name: "Ana Martínez",
    code: "W004",
    status: "warning" as const,
    details: "Entrada: 02:55 | Turno: Mañana",
    time: "02:55",
  },

  {
    id: "6",
    name: "Ana Martínez",
    code: "W004",
    status: "warning" as const,
    details: "Entrada: 02:55 | Turno: Mañana",
    time: "02:55",
  },

  {
    id: "7",
    name: "Ana Martínez",
    code: "W004",
    status: "warning" as const,
    details: "Entrada: 02:55 | Turno: Mañana",
    time: "02:55",
  },

  {
    id: "8",
    name: "Ana Martínez",
    code: "W004",
    status: "warning" as const,
    details: "Entrada: 02:55 | Turno: Mañana",
    time: "02:55",
  },
]

export default function Asistencia() {
  const stats = [
    { title: "Total Trabajadores", value: "8", color: "blue" as const },
    { title: "Presentes", value: "5", delta: 0, color: "green" as const },
    { title: "Puntuales", value: "4", delta: 0, color: "green" as const },
    { title: "Tardanzas", value: "1", delta: 0, color: "yellow" as const },
  ]

  const cameras = [
    { title: "Cámara Entrada Principal", location: "Entrada Principal", status: "active" as const },
    { title: "Cámara Entrada Secundaria", location: "Entrada Lateral", status: "active" as const },
    { title: "Cámara Recepción", location: "Área de Recepción", status: "active" as const },
  ]

  return (
    <div className="p-8">
      <PageHeader title="Control de Asistencia" subtitle="Registro automático de entrada y salida de trabajadores" />
      <StatsGrid items={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CameraView cameras={cameras} />
        </div>
        <div className="lg:col-span-1 h-120">
          <RecordListWithSearch
            items={mockRecords}
            title="Registro de Asistencia"
            placeholder="Buscar por nombre o código..."
          />
        </div>
      </div>
    </div>
  )
}
