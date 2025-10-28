"use client";

import { Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import LoginForm from "@/components/common/login-form";

export default function LoginPage() {
  const { login, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">SafetyVision</h1>
          </div>
          <p className="text-muted-foreground">Sistema de Prevención de Riesgos</p>
        </div>

        {/* Card */}
        <div className="bg-card rounded-lg border border-border p-8 shadow-lg">
          <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
            Iniciar Sesión
          </h2>

          <LoginForm onSubmit={login} isLoading={isLoading} />
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          © 2025 Marlon Pillaca. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
