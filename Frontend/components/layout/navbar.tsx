"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, User, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 👇 Cerrar el menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="h-16 bg-card border-b border-border flex items-center justify-between px-8 relative">
      {/* Sección izquierda */}
      <div>
        <h2 className="text-sm text-muted-foreground">
          Bienvenido, <span className="font-semibold text-foreground">{user?.username || "Usuario"}</span>
        </h2>
        <p className="text-xs text-muted-foreground">Sistema de Prevención de Riesgos</p>
      </div>

      {/* Sección derecha */}
      <div className="flex items-center gap-6">
        <button className="relative p-2 hover:bg-muted rounded-lg transition-smooth">
          <Bell className="w-5 h-5 text-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
        </button>

        {/* User dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 hover:bg-muted rounded-lg transition-smooth"
          >
            <User className="w-5 h-5 text-foreground" />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-lg p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <h3 className="text-sm font-semibold mb-2 text-foreground">Datos del Usuario</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li><strong>Nombre:</strong> {user?.first_name || "—"}</li>
                <li><strong>Apellido:</strong> {user?.last_name || "—"}</li>
                <li><strong>Teléfono:</strong> {user?.phone || "—"}</li>
                <li><strong>Correo:</strong> {user?.email || "—"}</li>
                <li><strong>Rol:</strong> {user?.role || "—"}</li>
              </ul>
            </div>
          )}
        </div>

        <button className="p-2 hover:bg-muted rounded-lg transition-smooth">
          <Settings className="w-5 h-5 text-foreground" />
        </button>
      </div>
    </nav>
  );
}
