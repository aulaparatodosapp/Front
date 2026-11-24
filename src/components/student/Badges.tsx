import type { CourseLevel, EnrollmentStatus } from "@/types";

const statusStyles: Record<EnrollmentStatus, string> = {
  Activa: "bg-green-100 text-green-800",
  "En curso": "bg-blue-100 text-blue-800",
  Pendiente: "bg-amber-100 text-amber-700",
  Completada: "bg-slate-200 text-slate-700",
};

export function StatusBadge({ status }: { status: EnrollmentStatus }) {
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]}`}>{status}</span>;
}

const levelStyles: Record<CourseLevel, string> = {
  Básico: "bg-green-100 text-green-800",
  Intermedio: "bg-blue-100 text-blue-800",
  Avanzado: "bg-purple-100 text-purple-800",
};

/** Mismos colores de nivel que la sección pública de cursos */
export function LevelBadge({ level }: { level: CourseLevel }) {
  return <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${levelStyles[level]}`}>{level}</span>;
}
