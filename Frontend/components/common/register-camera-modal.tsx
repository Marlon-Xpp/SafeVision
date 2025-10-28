"use client"

import type React from "react"
import { useState } from "react"
import { X } from "lucide-react"
import AlertModal from "./alert-modal"
import { useToast } from "@/contexts/toast-context"

interface RegisterCameraModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: CameraFormData) => void
}

export interface CameraFormData {
  name: string
  location: string
  module: "Asistencia" | "EPP" | "Accesos" | "Productividad"
  rtspUrl: string
}

export default function RegisterCameraModal({ isOpen, onClose, onSubmit }: RegisterCameraModalProps) {
  const { addToast } = useToast()
  const [formData, setFormData] = useState<CameraFormData>({
    name: "",
    location: "",
    module: "Asistencia",
    rtspUrl: "",
  })
  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    type: "success" as "success" | "error",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      onSubmit(formData)
      addToast("success", "Cámara agregada exitosamente")
      setFormData({
        name: "",
        location: "",
        module: "Asistencia",
        rtspUrl: "",
      })
      onClose()
    } catch (error) {
      addToast("error", "Error al agregar la cámara")
    }
  }

  const handleAlertClose = () => {
    setAlertModal({ ...alertModal, isOpen: false })
    if (alertModal.type === "success") {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-card rounded-lg border border-border p-8 max-w-md w-full mx-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">Agregar Cámara</h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej: Cámara Entrada Norte"
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Ubicación</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Ej: Área de Trabajo B"
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Módulo Asignado</label>
              <select
                name="module"
                value={formData.module}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Asistencia</option>
                <option>EPP</option>
                <option>Accesos</option>
                <option>Productividad</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">URL RTSP</label>
              <input
                type="text"
                name="rtspUrl"
                value={formData.rtspUrl}
                onChange={handleChange}
                placeholder="rtsp://..."
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-smooth"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-smooth"
              >
                Agregar Cámara
              </button>
            </div>
          </form>
        </div>
      </div>

      <AlertModal
        isOpen={alertModal.isOpen}
        type={alertModal.type}
        message={alertModal.message}
        onClose={handleAlertClose}
      />
    </>
  )
}
