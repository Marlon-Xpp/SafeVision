"use client"

import type React from "react"

import { useState, useMemo, useCallback } from "react"
import { Search } from "lucide-react"

interface RecordListWithSearchProps {
  items: any[]
  title?: string
  placeholder?: string
}

export default function RecordListWithSearch({ items, title, placeholder = "Buscar..." }: RecordListWithSearchProps) {
  const [searchValue, setSearchValue] = useState("")

  const filteredItems = useMemo(() => {
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.code.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.details.toLowerCase().includes(searchValue.toLowerCase()),
    )
  }, [items, searchValue])

  const statusConfig = useMemo(
    () => ({
      success: { bg: "bg-green-50", text: "text-green-700", icon: "✓" },
      warning: { bg: "bg-yellow-50", text: "text-yellow-700", icon: "!" },
      error: { bg: "bg-red-50", text: "text-red-700", icon: "✕" },
    }),
    [],
  )

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }, [])

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden flex flex-col h-full">
      {/* Header with Search */}
      <div className="p-4 border-b border-border space-y-3">
        {title && <h3 className="font-semibold text-foreground">{title}</h3>}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={placeholder}
            value={searchValue}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>
      </div>

      {/* Records with Scroll */}
      <div className="flex-1 overflow-y-auto">
        {filteredItems.length > 0 ? (
          <div className="divide-y divide-border">
            {filteredItems.map((item) => {
              const config = statusConfig[item.status as keyof typeof statusConfig]

              return (
                <div key={item.id} className="p-4 hover:bg-muted/30 transition-smooth">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-lg ${config.bg} text-xs font-bold ${config.text}`}>
                        {config.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.code}</p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.details}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
            No se encontraron registros
          </div>
        )}
      </div>
    </div>
  )
}
