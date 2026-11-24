"use client";

import { useState } from "react";
import type { Course, Lesson } from "@/types";

interface Props {
  course: Course;
  onClose: () => void;
}

/** Panel modal con las clases del curso. */
export default function LessonList({ course, onClose }: Props) {
  const [selected, setSelected] = useState<Lesson | null>(null);
  const lessons = course.lessons ?? [];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-0 sm:items-center sm:p-4" role="dialog" aria-modal="true">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white p-5 sm:rounded-2xl">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">{course.nombre}</h2>
            <p className="text-sm text-slate-500">Nivel {course.nivel}</p>
          </div>
          <button onClick={onClose} aria-label="Cerrar" className="text-2xl leading-none text-slate-400 hover:text-slate-700">
            ×
          </button>
        </div>

        {selected && (
          <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="flex aspect-video items-center justify-center rounded-lg bg-slate-900 text-sm text-white">
              ▶ Reproduciendo: {selected.title}
            </div>
            <p className="mt-2 text-sm text-slate-700">{selected.description}</p>
          </div>
        )}

        {lessons.length === 0 && <p className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">Este curso todavía no tiene clases cargadas.</p>}
        <ul className="space-y-2">
          {lessons.map((l, i) => (
            <li key={l.id}>
              <button
                onClick={() => setSelected(l)}
                className="flex w-full items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-3 text-left hover:border-slate-400"
              >
                <span>
                  <span className="block text-sm font-medium text-slate-900">
                    {i + 1}. {l.title}
                  </span>
                  <span className="text-xs text-slate-500">{l.duration}</span>
                </span>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">Disponible</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
