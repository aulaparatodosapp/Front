import type { Enrollment } from "@/types";

export default function SummaryCards({ enrollments }: { enrollments: Enrollment[] }) {
  const stats = [
    { label: "Cursos inscriptos", value: enrollments.length },
    { label: "En progreso", value: enrollments.filter((e) => e.status === "En curso" || e.status === "Activa").length },
    { label: "Completados", value: enrollments.filter((e) => e.status === "Completada").length },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((s) => (
        <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">{s.label}</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">{s.value}</p>
        </div>
      ))}
    </div>
  );
}
