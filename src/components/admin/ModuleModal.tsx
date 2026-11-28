"use client";
import { useState, useEffect } from "react";
import { ModuleType, CourseModule } from "@/app/(admin)/admin/mocks/courseContentMock";

interface ModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, type: ModuleType) => void;
  selectedModule: CourseModule | null;
}

const ModuleModal = ({ isOpen, onClose, onSave, selectedModule }: ModuleModalProps) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<ModuleType | "">("");
  const [error, setError] = useState("");

    useEffect(() => {
      if (selectedModule) {
        setTitle(selectedModule.title);
        setType(selectedModule.type);
      } else {
        setTitle("");
        setType("");
      }

      setError("");
    }, [selectedModule, isOpen]);

  const handleCreate = () => {
    if (!title.trim()) {
      setError("El nombre del módulo es obligatorio.");
      return;
    }

    if (title.trim().length < 3) {
      setError("El nombre debe tener al menos 3 caracteres.");
      return;
    }

    if (!type) {
      setError("Tenés que seleccionar un tipo de módulo.");
      return;
    }

    setError("");
    onSave(title.trim(), type);
    setTitle("");
    setType("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">
            {selectedModule ? "Editar módulo" : "Crear módulo"}
          </h2>

          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800"
          >
            ✕
          </button>
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Nombre del módulo
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
            required
            maxLength={80}
            placeholder="Ej: Introducción a HTML"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
          />

          <p className="mt-1 text-right text-xs text-slate-500">
            {title.length}/80 caracteres
          </p>
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Tipo de módulo
          </label>

          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value as ModuleType | "");
              setError("");
            }}
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
          >
            <option value="" disabled>
              Seleccioná un tipo
            </option>
            <option value="obligatorio">Obligatorio</option>
            <option value="adicional">Adicional</option>
          </select>
        </div>

        {error && (
          <p className="mb-4 text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-4 py-2 text-slate-600 hover:bg-slate-100"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleCreate}
            className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
          >
            {selectedModule ? "Guardar cambios" : "Crear módulo"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ModuleModal;
