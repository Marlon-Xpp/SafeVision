"use client"
import { v4 as uuidv4 } from "uuid"
import { useState, useMemo } from "react"
import PageHeader from "@/components/common/page-header"
import Toolbar from "@/components/common/toolbar"
import RegisterWorkerModal from "@/components/common/register-worker-modal"
import ViewCard from "@/components/common/view-card"
import { Plus } from "lucide-react"

interface Worker {
  id: string
  firstName: string
  lastName: string
  position: string
  status: "active" | "inactive"
  imageUrl?: string
  qrCodeUrl?: string
}

const mockWorkers: Worker[] = [
  {
    id: "1",
    firstName: "Juan Casimiro",
    lastName: "Pérez Godoy",
    position: "Operario",
    status: "active",
    imageUrl: "/construction-worker-portrait.png",
    qrCodeUrl: "/qr-code-w001.jpg",
  },
  {
    id: "2",
    firstName: "María Casimiro",
    lastName: "González Godoy",
    position: "Supervisor",
    status: "active",
    imageUrl: "/construction-worker-portrait.png",
    qrCodeUrl: "/qr-code-w002.jpg",
  },
  {
    id: "3",
    firstName: "Carlos Casimiro",
    lastName: "Rodríguez Godoy",
    position: "Operario",
    status: "active",
    imageUrl: "/construction-worker-portrait.png",
    qrCodeUrl: "/qr-code-w003.jpg",
  },
]

export default function Trabajadores() {
  const [workers, setWorkers] = useState(mockWorkers)
  const [showForm, setShowForm] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredWorkers = useMemo(() => {
    return workers.filter(
      (worker) =>
        worker.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
        worker.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
        worker.position.toLowerCase().includes(searchValue.toLowerCase()),
    )
  }, [workers, searchValue])

  const handleRegisterWorker = (data: any) => {
    const newWorker: Worker = {
      id: uuidv4(),
      firstName: data.firstName,
      lastName: data.lastName,
      position: data.position,
      status: "active",
      imageUrl: data.image ? URL.createObjectURL(data.image) : "/construction-worker-portrait.png",
      qrCodeUrl: `/placeholder.svg?height=80&width=80&query=QR%20code%20W${String(workers.length + 1).padStart(3, "0")}`,
    }
    setWorkers([...workers, newWorker])
  }

  return (
    <div className="p-8">
      <PageHeader
        title="Gestión de Trabajadores"
        subtitle="Administración de personal y datos de trabajadores"
        action={
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-smooth"
          >
            <Plus className="w-5 h-5" />
            Registrar Trabajador
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-card rounded-lg border border-border p-6">
          <p className="text-sm text-muted-foreground">Total Trabajadores</p>
          <p className="text-3xl font-bold mt-2">{workers.length}</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <p className="text-sm text-muted-foreground">Activos</p>
          <p className="text-3xl font-bold mt-2 text-green-600">
            {workers.filter((w) => w.status === "active").length}
          </p>
        </div>
      </div>

      <Toolbar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        placeholder="Buscar trabajador por nombre, apellido o puesto..."
      />

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredWorkers.map((worker) => (
            <ViewCard
              key={worker.id}
              type="trabajador"
              data={{
                id: worker.id,
                firstName: worker.firstName,
                lastName: worker.lastName,
                position: worker.position,
                status: worker.status,
                imageUrl: worker.imageUrl,
                qrCodeUrl: worker.qrCodeUrl,
              }}
              onEdit={() => console.log("Edit", worker.id)}
              onDelete={() => setWorkers(workers.filter((w) => w.id !== worker.id))}
            />
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Nombres</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Apellidos</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Puesto</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Estado</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredWorkers.map((worker) => (
                  <tr key={worker.id} className="hover:bg-muted/50 transition-smooth">
                    <td className="px-6 py-4 text-sm text-foreground">{worker.firstName}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{worker.lastName}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{worker.position}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          worker.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        {worker.status === "active" ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded hover:opacity-90 transition-smooth">
                          Editar
                        </button>
                        <button
                          onClick={() => setWorkers(workers.filter((w) => w.id !== worker.id))}
                          className="px-3 py-1 text-xs border border-border rounded hover:bg-muted transition-smooth"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredWorkers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No se encontraron trabajadores</p>
        </div>
      )}

      <RegisterWorkerModal isOpen={showForm} onClose={() => setShowForm(false)} onSubmit={handleRegisterWorker} />
    </div>
  )
}
