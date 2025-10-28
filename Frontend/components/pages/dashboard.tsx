"use client"

import { useState } from "react"
import PageHeader from "@/components/common/page-header"
import StatsGrid from "@/components/common/stats-grid"
import AlertToast from "@/components/common/alert-toast"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const complianceData = [
  { time: "00:00", value: 85 },
  { time: "04:00", value: 78 },
  { time: "08:00", value: 92 },
  { time: "12:00", value: 88 },
  { time: "16:00", value: 95 },
  { time: "20:00", value: 89 },
]

const infractionsData = [
  { day: "Lun", value: 12 },
  { day: "Mar", value: 8 },
  { day: "Mié", value: 15 },
  { day: "Jue", value: 10 },
  { day: "Vie", value: 18 },
  { day: "Sab", value: 11 },
  { day: "Dom", value: 5 },
]

const alerts = [
  {
    type: "epp" as const,
    level: "alta" as const,
    title: "Trabajador sin casco detectado",
    description: "Zona de trabajo A",
    user: "Carlos Rodríguez",
    time: "3:36:13",
  },
  {
    type: "acceso" as const,
    level: "alta" as const,
    title: "Acceso no autorizado a zona restringida",
    description: "Zona Peligrosa 1",
    user: "Ana Martínez",
    time: "3:46:13",
  },
  {
    type: "conduccion" as const,
    level: "media" as const,
    title: "Conducción sin cinturón de seguridad",
    description: "Vía principal",
    user: "Carlos Rodríguez",
    time: "3:51:13",
  },
]

export default function Dashboard() {
  const [visibleAlerts, setVisibleAlerts] = useState(alerts)

  const stats = [
    { title: "Uso de EPP", value: "87%", delta: -3, color: "blue" as const },
    { title: "Control de Productividad", value: "92%", delta: 2, color: "green" as const },
    { title: "Control de Asistencia", value: "95%", delta: 0, color: "green" as const },
    { title: "Control de Accesos", value: "88%", delta: -5, color: "yellow" as const },
  ]

  return (
    <div className="p-8">
      <PageHeader title="Dashboard" subtitle="Monitoreo en tiempo real de seguridad en obra" />

      <StatsGrid items={stats} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Compliance Chart */}
        <div className="lg:col-span-2 bg-card rounded-lg border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4">Cumplimiento por Dimensión (24h)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={complianceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#0066cc" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Alerts */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4">Alertas en Tiempo Real</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {visibleAlerts.map((alert, idx) => (
              <AlertToast
                key={idx}
                {...alert}
                onDismiss={() => setVisibleAlerts(visibleAlerts.filter((_, i) => i !== idx))}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Infractions Chart */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="font-semibold text-foreground mb-4">Infracciones por Día (Última Semana)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={infractionsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Bar dataKey="value" fill="#1f2937" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
