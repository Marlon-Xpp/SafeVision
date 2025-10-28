import type React from "react"
import StatCard from "./stat-card"

interface StatItem {
  title: string
  value: string | number
  delta?: number
  icon?: React.ReactNode
  color?: "blue" | "green" | "red" | "yellow"
}

interface StatsGridProps {
  items: StatItem[]
}

export default function StatsGrid({ items }: StatsGridProps) {
  // Calculates optimal column width based on number of items
  const getGridCols = () => {
    const count = items.length
    if (count === 1) return "grid-cols-1"
    if (count === 2) return "grid-cols-1 md:grid-cols-2"
    if (count === 3) return "grid-cols-1 md:grid-cols-3"
    if (count === 4) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
    if (count === 5) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-5"
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  }

  return (
    <div className={`grid ${getGridCols()} gap-4 mb-8`}>
      {items.map((item, index) => (
        <StatCard key={index} {...item} />
      ))}
    </div>
  )
}
