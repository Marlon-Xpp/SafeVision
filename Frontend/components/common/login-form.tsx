"use client";

import { useState, useRef } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface LoginFormProps {
  onSubmit: (username: string, password: string) => Promise<string | null>;
  isLoading?: boolean;
}

export default function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{ text: string; type: "error" | "success" | null }>({
    text: "",
    type: null,
  });

  const passwordRef = useRef<HTMLInputElement>(null); // 👈 referencia al campo contraseña

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setMessage({ text: "", type: null });

    if (!username.trim()) return setMessage({ text: "El usuario es requerido", type: "error" });
    if (!password.trim()) return setMessage({ text: "La contraseña es requerida", type: "error" });
    if (password.length < 4)
      return setMessage({ text: "La contraseña debe tener al menos 4 caracteres", type: "error" });

    const result = await onSubmit(username, password);

    if (result === "success") {
      setMessage({ text: "Inicio de sesión exitoso, redirigiendo...", type: "success" });
      window.location.href = "/"; // 👈 redirige inmediatamente
    } else {
      setMessage({ text: result || "Credenciales inválidas", type: "error" });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
            Usuario
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingresa tu usuario"
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                passwordRef.current?.focus(); // 👈 salta al campo contraseña
              }
            }}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
            Contraseña
          </label>
          <input
            id="password"
            ref={passwordRef}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit(); // 👈 ejecuta el login
            }}
          />
        </div>

        {/* Mensaje dinámico */}
        {message.text && (
          <div
            className={`flex items-center gap-2 p-3 border rounded-lg ${
              message.type === "error"
                ? "bg-red-50 border-red-200 text-red-600"
                : "bg-green-50 border-green-200 text-green-700"
            }`}
          >
            {message.type === "error" ? (
              <AlertCircle className="w-4 h-4" />
            ) : (
              <CheckCircle2 className="w-4 h-4" />
            )}
            <p className="text-sm">{message.text}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Verificando credenciales..." : "Iniciar Sesión"}
        </button>
      </form>
    </div>
  );
}
