"use client"
import { useEffect, useState } from "react"
import { CheckCircle2, XCircle } from "lucide-react"

interface AlertModalProps {
  isOpen: boolean
  type: "success" | "error"
  message: string
  onClose: () => void
  autoCloseDelay?: number
}

export default function AlertModal({ isOpen, type, message, onClose, autoCloseDelay = 3000 }: AlertModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      setProgress(100)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isVisible) return

    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.max(0, 100 - (elapsed / autoCloseDelay) * 100)
      setProgress(newProgress)

      if (newProgress <= 0) {
        clearInterval(interval)
        handleClose()
      }
    }, 16) // ~60fps

    return () => clearInterval(interval)
  }, [isVisible, autoCloseDelay])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  if (!isOpen && !isVisible) return null

  const isSuccess = type === "success"
  const bgColor = isSuccess ? "bg-white dark:bg-slate-900" : "bg-white dark:bg-slate-900"
  const borderColor = isSuccess ? "border-green-500" : "border-red-500"
  const barColor = isSuccess ? "bg-green-500" : "bg-red-500"
  const iconColor = isSuccess ? "text-green-500" : "text-red-500"
  const Icon = isSuccess ? CheckCircle2 : XCircle

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div
        className={`${bgColor} border-l-4 ${borderColor} rounded-lg shadow-lg overflow-hidden max-w-sm w-80 transition-all`}
      >
        {/* Content */}
        <div className="flex items-center gap-3 p-4">
          <div className={`flex-shrink-0 ${iconColor}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <p
              className={`text-sm font-medium ${isSuccess ? "text-green-900 dark:text-green-100" : "text-red-900 dark:text-red-100"}`}
            >
              {isSuccess ? "Registro exitoso" : "Error"}
            </p>
            <p
              className={`text-xs ${isSuccess ? "text-green-700 dark:text-green-200" : "text-red-700 dark:text-red-200"} truncate`}
            >
              {message}
            </p>
          </div>
        </div>

        <div className="h-1 bg-gray-200 dark:bg-slate-700">
          <div className={`h-full ${barColor} transition-all`} style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}
