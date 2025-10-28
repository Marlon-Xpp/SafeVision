"use client"

import { AlertCircle, AlertTriangle, X } from "lucide-react"

interface AlertToastProps {
  type: "epp" | "acceso" | "conduccion" | "productividad"
  level: "alta" | "media" | "baja"
  title: string
  description: string
  user: string
  time: string
  onDismiss?: () => void
}

const typeConfig = {
  epp: { bg: "bg-orange-50", border: "border-orange-200", icon: AlertTriangle, label: "EPP" },
  acceso: { bg: "bg-red-50", border: "border-red-200", icon: AlertCircle, label: "Acceso" },
  conduccion: { bg: "bg-blue-50", border: "border-blue-200", icon: AlertCircle, label: "Conducción" },
  productividad: { bg: "bg-purple-50", border: "border-purple-200", icon: AlertCircle, label: "Productividad" },
}

const levelConfig = {
  alta: "bg-red-500 text-white",
  media: "bg-yellow-500 text-white",
  baja: "bg-blue-500 text-white",
}

export default function AlertToast({ type, level, title, description, user, time, onDismiss }: AlertToastProps) {
  const config = typeConfig[type]
  const Icon = config.icon

  return (
    <div className={`${config.bg} border ${config.border} rounded-lg p-4 mb-3`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <Icon className="w-5 h-5 text-foreground mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-2 py-1 rounded ${levelConfig[level]}`}>{level.toUpperCase()}</span>
              <span className="text-xs font-bold text-foreground">{config.label}</span>
            </div>
            <p className="font-medium text-foreground mt-1">{title}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
            <p className="text-xs text-muted-foreground mt-2">
              {user} • {time}
            </p>
          </div>
        </div>
        {onDismiss && (
          <button onClick={onDismiss} className="text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
