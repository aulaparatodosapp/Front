"use client";
import { CourseClass } from "@/app/(admin)/admin/mocks/courseContentMock";
import { useEffect, useState } from "react";

interface ClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (
    title: string,
    videoUrl: string,
    content: string
  ) => void;
  selectedClass: CourseClass | null;
}

const ClassModal = ({ isOpen, onClose, onCreate, selectedClass }: ClassModalProps) => {
    const [title, setTitle] = useState(selectedClass?.title ?? "");
    const [videoUrl, setVideoUrl] = useState(selectedClass?.videoUrl ?? "");
    const [content, setContent] = useState(selectedClass?.content ?? "");
    const [error, setError] = useState("");

    useEffect(() => {
            setTitle(selectedClass?.title ?? "");
            setVideoUrl(selectedClass?.videoUrl ?? "");
            setContent(selectedClass?.content ?? "");
        }, [selectedClass]);

  const handleCreate = () => {
    if (!title.trim()) {
      setError("El título de la clase es obligatorio.");
      return;
    }

    if (title.trim().length < 3) {
      setError("El título debe tener al menos 3 caracteres.");
      return;
    }

    setError("");
    onCreate(title.trim(), videoUrl.trim(), content.trim());

    setTitle("");
    setVideoUrl("");
    setContent("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">
            Crear clase
          </h2>

          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800"
          >
            ✕
          </button>
        </div>

        <div className="mb-4 min-w-0">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Título de la clase
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
            maxLength={100}
            placeholder="Ej: Introducción a HTML"
            className="block w-full min-w-0 box-border rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
          />

          <p className="mt-1 h-4 text-right text-xs text-slate-500">
            {title.length}/100 caracteres
          </p>
        </div>

        <div className="mb-4 min-w-0">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Video de YouTube (opcional)
          </label>

          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            maxLength={500}
            placeholder="https://www.youtube.com/watch?v=..."
            className="block w-full min-w-0 box-border rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
          />

          <p className="mt-1 h-4 text-right text-xs text-slate-500">
            {videoUrl.length}/500 caracteres
          </p>
        </div>

        <div className="mb-6 min-w-0">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Contenido escrito (opcional)
          </label>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={5000}
            placeholder="Escribí el contenido de la clase..."
            rows={5}
            className="block w-full min-w-0 box-border resize-y rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
          />

          <p className="mt-1 h-4 text-right text-xs text-slate-500">
            {content.length}/5000 caracteres
          </p>
        </div>

        <div className="mb-4 min-h-5">
          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}
        </div>

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
            Crear clase
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassModal;
