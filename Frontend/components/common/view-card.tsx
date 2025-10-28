"use client"

import Image from "next/image"

interface ViewCardProps {
  type: "usuario" | "trabajador"
  data: {
    id: string
    firstName?: string
    lastName?: string
    // Usuario
    phone?: string
    username?: string
    email?: string
    rol?: string
    imageUrl?: string
    // Trabajador
    position?: string
    status?: string
    qrCodeUrl?: string
  }
  onEdit?: () => void
  onDelete?: () => void
}

export default function ViewCard({ type, data, onEdit, onDelete }: ViewCardProps) {
  // ✅ Extraemos los datos con fallback para evitar errores
  const {
    firstName = "",
    lastName = "",
    imageUrl,
    qrCodeUrl,
    username,
    email,
    phone,
    rol,
    position,
    status,
  } = data

  // ✅ Para el placeholder del avatar
  const displayInitial = firstName ? firstName.charAt(0).toUpperCase() : "?"

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center text-center relative">
      {/* Imagen circular */}
      <div className="w-20 h-20 rounded-full overflow-hidden shadow-md border-2 border-primary mb-4">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`${firstName} ${lastName}`}
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-lg font-semibold">
            {displayInitial}
          </div>
        )}
      </div>

      {/* ✅ Nombres separados */}
      <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">{firstName}</h2>
      <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">{lastName}</h2>

      {/* Datos según tipo */}
      <div className="mt-1 text-sm text-gray-500">
        {type === "usuario" ? (
          <>
            {username && <p className="truncate">{username}</p>}
            {email && <p className="truncate">{email}</p>}
            {phone && <p className="truncate">{phone}</p>}
            <div className="mt-2">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  (rol || "").toLowerCase() === "admin"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-purple-100 text-purple-700"
                }`}
              >
                {rol?.toUpperCase() || "USUARIO"}
              </span>
            </div>
          </>
        ) : (
          <>
            {position && <p className="truncate">{position}</p>}
            {status && (
              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                  status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {status === "active" ? "Activo" : "Inactivo"}
              </span>
            )}
          </>
        )}
      </div>

      {/* QR */}
      {qrCodeUrl && (
        <div className="mt-4 mb-3 flex items-center justify-center">
          <Image
            src={qrCodeUrl}
            alt={`QR ${firstName} ${lastName}`}
            width={80}
            height={80}
            className="rounded-md border border-gray-200"
          />
        </div>
      )}

      {/* Botones */}
      <div className="mt-3 flex w-full gap-3">
        <button
          onClick={onEdit}
          className="flex-1 bg-primary text-white py-2 rounded-lg text-sm hover:opacity-90 transition"
        >
          Editar
        </button>
        <button
          onClick={onDelete}
          className="flex-1 border border-gray-300 dark:border-neutral-700 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}
