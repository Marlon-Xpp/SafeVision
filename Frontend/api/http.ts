// frontend/api/http.ts
import { API_URL } from "./config"

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${API_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`

    const response = await fetch(url, {
        headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        },
        ...options,
    })

    const data = await response.json().catch(() => ({}))
    console.log("🔍 API response:", response.status, data)

    if (!response.ok) {
        const errorMessage = data.detail || data.error || data.message || "Error en la solicitud"
        throw new Error(errorMessage)
    }

    return data
}
