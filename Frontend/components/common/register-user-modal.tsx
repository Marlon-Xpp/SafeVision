"use client"

import type React from "react"
import { useToast } from "@/contexts/toast-context"

import { useState } from "react"
import { X } from "lucide-react"
import AlertModal from "./alert-modal"

interface RegisterUserModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

const ROLES = ["Administrador", "Supervisor"]

export default function RegisterUserModal({ isOpen, onClose, onSubmit }: RegisterUserModalProps) {
  const { addToast } = useToast()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  })
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

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.firstName.trim()) newErrors.firstName = "El nombre es obligatorio"
    if (!formData.lastName.trim()) newErrors.lastName = "El apellido es obligatorio"
    if (!formData.username.trim()) newErrors.username = "El username es obligatorio"
    if (!formData.email.trim()) newErrors.email = "El correo es obligatorio"
    else if (!validateEmail(formData.email)) newErrors.email = "El correo no es válido"
    if (!formData.phone.trim()) newErrors.phone = "El teléfono es obligatorio"
    if (!formData.password.trim()) newErrors.password = "La contraseña es obligatoria"
    else if (formData.password.length < 6) newErrors.password = "La contraseña debe tener al menos 6 caracteres"
    if (!formData.role) newErrors.role = "El rol es obligatorio"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        onSubmit(formData)
        addToast("success", "Usuario registrado exitosamente")
        setFormData({ firstName: "", lastName: "", username: "", email: "", phone: "", password: "", role: "" })
        onClose()
      } catch (error) {
        addToast("error", "Error al registrar el usuario")
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
            <h2 className="text-xl font-bold text-foreground">Registrar Usuario</h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-smooth">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
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

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Username *</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Ej: jperez"
                className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm ${
                  errors.username ? "border-red-500" : "border-border"
                }`}
              />
              {errors.username && <p className="text-xs text-red-600 mt-1">{errors.username}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Correo Electrónico *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Ej: juan@example.com"
                className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm ${
                  errors.email ? "border-red-500" : "border-border"
                }`}
              />
              {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Teléfono *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Ej: +34 123 456 789"
                className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm ${
                  errors.phone ? "border-red-500" : "border-border"
                }`}
              />
              {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Contraseña *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Mínimo 6 caracteres"
                className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm ${
                  errors.password ? "border-red-500" : "border-border"
                }`}
              />
              {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Rol *</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm ${
                  errors.role ? "border-red-500" : "border-border"
                }`}
              >
                <option value="">Selecciona un rol</option>
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              {errors.role && <p className="text-xs text-red-600 mt-1">{errors.role}</p>}
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
