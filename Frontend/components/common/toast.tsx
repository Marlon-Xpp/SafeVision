"use client"

import { useEffect, useState } from "react"
import { Check, X } from "lucide-react"

interface ToastProps {
  type: "success" | "error"
  message: string
  onClose: () => void
}

export default function Toast({ type, message, onClose }: ToastProps) {
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - 100 / 30 // 3 segundos = 30 frames de 100ms
        return newProgress <= 0 ? 0 : newProgress
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  const bgColor = type === "success" ? "bg-green-50" : "bg-red-50"
  const borderColor = type === "success" ? "border-green-200" : "border-red-200"
  const textColor = type === "success" ? "text-green-800" : "text-red-800"
  const barColor = type === "success" ? "bg-green-500" : "bg-red-500"
  const iconAnimation = type === "success" ? "animate-bounce-check" : "animate-shake"
  const Icon = type === "success" ? Check : X

  return (
    <div className={`animate-slide-up ${bgColor} border ${borderColor} rounded-lg shadow-lg min-w-80 overflow-hidden`}>
      <div className="p-4 flex items-center gap-3">
        <Icon className={`w-6 h-6 flex-shrink-0 ${textColor} ${iconAnimation}`} />
        <span className={`text-sm font-medium ${textColor} flex-1`}>{message}</span>
      </div>

      <div className="h-1 bg-gray-200 overflow-hidden">
        <div className={`h-full ${barColor} transition-all duration-100`} style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
