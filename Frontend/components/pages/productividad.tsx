"use client"

import PageHeader from "@/components/common/page-header"
import StatsGrid from "@/components/common/stats-grid"
import CameraView from "@/components/common/camera-view"
import RecordListWithSearch from "@/components/common/record-list-with-search"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const productivityData = [
  { operator: "Juan", active: 7.5, inactive: 0.5 },
  { operator: "María", active: 8, inactive: 0 },
  { operator: "Carlos", active: 6.5, inactive: 1.5 },
  { operator: "Ana", active: 7.8, inactive: 0.2 },
]

const mockRecords = [
  {
    id: "1",
    name: "Juan Pérez",
    code: "W001",
    status: "success" as const,
    details: "Horas Activas: 7.5h | Actividad: 94%",
    time: "03:03",
  },
  {
    id: "2",
    name: "María González",
    code: "W002",
    status: "success" as const,
    details: "Horas Activas: 8h | Actividad: 100%",
    time: "03:13",
  },
  {
    id: "3",
    name: "Carlos Rodríguez",
    code: "W003",
    status: "warning" as const,
    details: "Horas Activas: 6.5h | Actividad: 81%",
    time: "03:55",
  },

  {
    id: "4",
    name: "Carlos Rodríguez",
    code: "W003",
    status: "warning" as const,
    details: "Horas Activas: 6.5h | Actividad: 81%",
    time: "03:55",
  },

  {
    id: "5",
    name: "Carlos Rodríguez",
    code: "W003",
    status: "warning" as const,
    details: "Horas Activas: 6.5h | Actividad: 81%",
    time: "03:55",
  },

  {
    id: "6",
    name: "Carlos Rodríguez",
    code: "W003",
    status: "warning" as const,
    details: "Horas Activas: 6.5h | Actividad: 81%",
    time: "03:55",
  },

  {
    id: "7",
    name: "Carlos Rodríguez",
    code: "W003",
    status: "warning" as const,
    details: "Horas Activas: 6.5h | Actividad: 81%",
    time: "03:55",
  },

  {
    id: "8",
    name: "Carlos Rodríguez",
    code: "W003",
    status: "warning" as const,
    details: "Horas Activas: 6.5h | Actividad: 81%",
    time: "03:55",
  },
]

export default function Productividad() {
  const stats = [
    { title: "Total Operadores", value: "4", color: "blue" as const },
    { title: "Horas Activas", value: "29.8h", delta: 0, color: "green" as const },
    { title: "Horas Inactivas", value: "2.2h", delta: 0, color: "red" as const },
  ]

  const cameras = [
    { title: "Cámara Zona de Trabajo", location: "Área de Operaciones", status: "active" as const },
    { title: "Cámara Zona de Almacén", location: "Área de Almacenamiento", status: "active" as const },
  ]

  return (
    <div className="p-8">
      <PageHeader title="Control de Productividad" subtitle="Monitoreo de actividad y rendimiento de operadores" />
      <StatsGrid items={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CameraView cameras={cameras} />
        </div>
        <div className="lg:col-span-1 h-120">
          <RecordListWithSearch
            items={mockRecords}
            title="Registro de Productividad"
            placeholder="Buscar por nombre o código..."
          />
        </div>
      </div>

      {/* Productivity Chart */}
      <div className="mt-8 bg-card rounded-lg border border-border p-6">
        <h3 className="font-semibold text-foreground mb-4">Productividad por Operador</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={productivityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="operator" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Bar dataKey="active" fill="#10b981" name="Horas Activas" />
            <Bar dataKey="inactive" fill="#ef4444" name="Horas Inactivas" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
