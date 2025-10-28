"use client"

import { useState, useCallback, useMemo } from "react"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"

interface Camera {
  title: string
  location: string
  streamUrl?: string
  status?: "active" | "inactive"
}

interface CameraViewProps {
  cameras: Camera[]
}

export default function CameraView({ cameras }: CameraViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? cameras.length - 1 : prev - 1))
  }, [cameras.length])

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === cameras.length - 1 ? 0 : prev + 1))
  }, [cameras.length])

  const currentCamera = cameras[currentIndex]
  const hasMultipleCameras = cameras.length > 1

  const statusBadgeClass = useMemo(
    () => (currentCamera.status === "active" ? "bg-green-500 text-white" : "bg-red-500 text-white"),
    [currentCamera.status],
  )

  if (!cameras || cameras.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="relative w-full aspect-video bg-foreground/5 flex items-center justify-center">
          <p className="text-muted-foreground">No hay cámaras configuradas</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Video Container */}
      <div className="relative w-full aspect-video bg-foreground/5 flex items-center justify-center">
        <img
          src="/construction-site-safety-monitoring-camera-feed.jpg"
          alt={currentCamera.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <Play className="w-12 h-12 text-white/60" />
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadgeClass}`}>
            {currentCamera.status === "active" ? "En Vivo" : "Inactiva"}
          </span>
        </div>

        {hasMultipleCameras && (
          <>
            {/* Previous Button */}
            <button
              onClick={handlePrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              aria-label="Cámara anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              aria-label="Siguiente cámara"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Camera Counter */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-medium">
              {currentIndex + 1} / {cameras.length}
            </div>
          </>
        )}
      </div>

      {/* Info */}
      <div className="p-4 border-t border-border">
        <h3 className="font-semibold text-foreground">{currentCamera.title}</h3>
        <p className="text-xs text-muted-foreground mt-1">📍 {currentCamera.location}</p>
      </div>
    </div>
  )
}
