"use client"

import type React from "react"

import { useState } from "react"
import { X, Upload } from "lucide-react"
import AlertModal from "./alert-modal"
import { useToast } from "@/contexts/toast-context"

interface RegisterWorkerModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

const POSITIONS = ["Maestro", "Obrero", "Ayudante"]

export default function RegisterWorkerModal({ isOpen, onClose, onSubmit }: RegisterWorkerModalProps) {
  const { addToast } = useToast()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    position: "",
    image: null as File | null,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    type: "success" as "success" | "error",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, image: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.firstName.trim()) newErrors.firstName = "El nombre es obligatorio"
    if (!formData.lastName.trim()) newErrors.lastName = "El apellido es obligatorio"
    if (!formData.position) newErrors.position = "El puesto es obligatorio"
    if (!formData.image) newErrors.image = "La imagen es obligatoria"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        onSubmit(formData)
        addToast("success", "Trabajador registrado exitosamente")
        setFormData({ firstName: "", lastName: "", position: "", image: null })
        setImagePreview(null)
        onClose()
      } catch (error) {
        addToast("error", "Error al registrar el trabajador")
      }
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
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-card rounded-lg border border-border max-w-md w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-card flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Registrar Trabajador</h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-smooth">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Fotografía *</label>
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDragDrop}
                className="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-smooth"
              >
                {imagePreview ? (
                  <div className="space-y-2">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-24 h-24 mx-auto rounded object-cover"
                    />
                    <p className="text-xs text-muted-foreground">Haz clic para cambiar</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-6 h-6 mx-auto text-muted-foreground" />
                    <p className="text-sm text-foreground">Arrastra la imagen aquí o haz clic</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG hasta 5MB</p>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="image-input" />
                <label htmlFor="image-input" className="cursor-pointer block" />
              </div>
              {errors.image && <p className="text-xs text-red-600 mt-1">{errors.image}</p>}
            </div>

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Nombres *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Ej: Juan"
                className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm ${
                  errors.firstName ? "border-red-500" : "border-border"
                }`}
              />
              {errors.firstName && <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Apellidos *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Ej: Pérez García"
                className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm ${
                  errors.lastName ? "border-red-500" : "border-border"
                }`}
              />
              {errors.lastName && <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>}
            </div>

            {/* Position */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Puesto *</label>
              <select
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm ${
                  errors.position ? "border-red-500" : "border-border"
                }`}
              >
                <option value="">Selecciona un puesto</option>
                {POSITIONS.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
              {errors.position && <p className="text-xs text-red-600 mt-1">{errors.position}</p>}
            </div>

            {/* Buttons */}
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
                Registrar
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
