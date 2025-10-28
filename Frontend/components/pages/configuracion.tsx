"use client"

import { useState } from "react"
import PageHeader from "@/components/common/page-header"
import RegisterUserModal from "@/components/common/register-user-modal"
import ViewCard from "@/components/common/view-card"

type Tab = "umbrales" | "notificaciones" | "usuarios"

interface User {
  id: string
  firstName: string
  lastName: string
  username: string
  email: string
  phone: string   // 👈 AGREGA ESTA LÍNEA
  role: "Administrador" | "Supervisor"
  status: "active" | "inactive"
}

export default function Configuracion() {
  const [activeTab, setActiveTab] = useState<Tab>("umbrales")
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      firstName: "Admin",
      lastName: "Sistema",
      username: "admin",
      email: "admin@safetyvision.com",
      phone: "+51 999 999 999",
      role: "Administrador",
      status: "active",
    },
    {
      id: "2",
      firstName: "Carlos",
      lastName: "Supervisor",
      username: "csupervisor",
      email: "carlos@safetyvision.com",
      phone: "+51 999 999 999",
      role: "Supervisor",
      status: "active",
    },
    {
      id: "3",
      firstName: "Carlos",
      lastName: "Supervisor",
      username: "csupervisor",
      email: "carlos@safetyvision.com",
      phone: "+51 999 999 999",
      role: "Supervisor",
      status: "active",
    },
  ])

  const tabs = [
    { id: "umbrales", label: "Umbrales" },
    { id: "notificaciones", label: "Notificaciones" },
    { id: "usuarios", label: "Usuarios" },
  ]

  const handleRegisterUser = (formData: any) => {
    const newUser: User = {
      id: String(users.length + 1),
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      phone: formData.phone,
      email: formData.email,
      role: formData.role,
      status: "active",
    }
    setUsers([...users, newUser])
  }

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((u) => u.id !== userId))
  }

  return (
    <div className="p-8">
      <PageHeader title="Configuración" subtitle="Gestión de parámetros del sistema" />

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`px-4 py-3 font-medium transition-smooth border-b-2 ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-card rounded-lg border border-border p-8">
        {activeTab === "umbrales" && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Umbrales de Alarma</h3>
            {["EPP", "Acceso", "Productividad"].map((type) => (
              <div key={type} className="border border-border rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-4">{type}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Valor Umbral (%)</label>
                    <input
                      type="number"
                      placeholder="80"
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Período (minutos)</label>
                    <input
                      type="number"
                      placeholder="5"
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-smooth">
              Guardar Umbrales
            </button>
          </div>
        )}

        {activeTab === "notificaciones" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Canales de Notificación</h3>
            {["Email", "SMS", "Push"].map((channel) => (
              <div key={channel} className="flex items-center gap-3 p-4 border border-border rounded-lg">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <label className="text-foreground font-medium">{channel}</label>
              </div>
            ))}
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-smooth">
              Guardar Notificaciones
            </button>
          </div>
        )}

        {activeTab === "usuarios" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Gestión de Usuarios</h3>
              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-smooth"
              >
                Registrar Nuevo Usuario
              </button>
            </div>

            {/* Users Grid */}
            {users.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {users.map((user) => (
                  <ViewCard
                    key={user.id}
                    type="usuario"
                    data={{
                      id: user.id,
                      firstName: user.firstName,
                      lastName: user.lastName,
                      username: user.username,
                      email: user.email,
                      phone: user.phone,
                      rol: user.role,
                    }}
                    onDelete={() => handleDeleteUser(user.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No hay usuarios registrados</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Register User Modal */}
      <RegisterUserModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSubmit={handleRegisterUser}
      />
    </div>
  )
}
