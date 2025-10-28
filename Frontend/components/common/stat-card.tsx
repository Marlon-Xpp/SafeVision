import type React from "react"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  delta?: number
  icon?: React.ReactNode
  color?: "blue" | "green" | "red" | "yellow"
}

const colorClasses = {
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  green: "bg-green-50 text-green-700 border-green-200",
  red: "bg-red-50 text-red-700 border-red-200",
  yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
}

export default function StatCard({ title, value, delta, icon, color = "blue" }: StatCardProps) {
  return (
    <div className={`p-6 rounded-lg border bg-card ${colorClasses[color]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          {delta !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              {delta >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
              <span className={`text-xs font-medium ${delta >= 0 ? "text-green-600" : "text-red-600"}`}>
                {delta >= 0 ? "+" : ""}
                {delta}%
              </span>
            </div>
          )}
        </div>
        {icon && <div className="text-2xl">{icon}</div>}
      </div>
    </div>
  )
}
