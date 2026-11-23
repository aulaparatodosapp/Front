import type { Course } from "@/types";
import CourseCover from "./CourseCover";

interface Props {
  course: Course;
  enrolled: boolean;
  loading: boolean;
  onEnroll: () => void;
}

export default function CatalogCourseCard({ course, enrolled, loading, onEnroll }: Props) {
  const hasSlots = course.availableSlots !== undefined;
  const noSlots = course.availableSlots === 0;
  return (
    <div className="flex min-w-0 flex-col rounded-xl border border-slate-200 bg-white p-3">
      <CourseCover src={course.imagen} alt={course.nombre} />
      <span className="mt-2 w-fit rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">{course.nivel}</span>
      <h3 className="mt-1.5 font-semibold text-slate-900">{course.nombre}</h3>
      <p className="mt-1 flex-1 text-sm text-slate-600">{course.descripcion}</p>
      {hasSlots && (
        <p className={`mt-2 text-sm font-medium ${noSlots ? "text-red-600" : "text-emerald-600"}`}>
          {noSlots
            ? "0 cupos - Sin cupos"
            : `${course.availableSlots} ${course.availableSlots === 1 ? "cupo disponible" : "cupos disponibles"}`}
        </p>
      )}
      {noSlots && !enrolled && (
        <p role="alert" className="mt-1 text-xs text-red-600">
          No hay cupos disponibles para este curso.
        </p>
      )}
      <button
        onClick={onEnroll}
        disabled={enrolled || noSlots || loading}
        className="mt-3 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
      >
        {enrolled ? "Ya inscripto" : noSlots ? "Sin cupos" : loading ? "Inscribiendo..." : "Inscribirme"}
      </button>
    </div>
  );
}
