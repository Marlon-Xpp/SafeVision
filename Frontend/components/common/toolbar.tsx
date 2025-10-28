"use client"

import { Search, Grid3x3, List } from "lucide-react"

interface ToolbarProps {
  searchValue: string
  onSearchChange: (value: string) => void
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
  filters?: string[]
  selectedFilter?: string
  onFilterChange?: (filter: string) => void
  placeholder?: string
}

export default function Toolbar({
  searchValue,
  onSearchChange,
  viewMode,
  onViewModeChange,
  filters,
  selectedFilter,
  onFilterChange,
  placeholder = "Buscar...",
}: ToolbarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
      {/* Search Input */}
      <div className="flex-1 min-w-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
          />
        </div>
      </div>

      {/* Filters */}
      {filters && filters.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          <select
            value={selectedFilter || ""}
            onChange={(e) => onFilterChange?.(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
          >
            <option value="">Todos</option>
            {filters.map((filter) => (
              <option key={filter} value={filter}>
                {filter}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* View Mode Toggle */}
      <div className="flex gap-2 border border-border rounded-lg p-1 bg-background">
        <button
          onClick={() => onViewModeChange("grid")}
          className={`p-2 rounded transition-smooth ${
            viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
          title="Vista de tarjetas"
        >
          <Grid3x3 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onViewModeChange("list")}
          className={`p-2 rounded transition-smooth ${
            viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
          title="Vista de lista"
        >
          <List className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
