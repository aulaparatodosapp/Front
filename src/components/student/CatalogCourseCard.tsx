import type { Course } from "@/types";
import CourseCover from "./CourseCover";
import { LevelBadge } from "./Badges";

interface Props {
  course: Course;
  enrolled: boolean;
  loading: boolean;
  onEnroll: () => void;
}

export default function CatalogCourseCard({ course, enrolled, loading, onEnroll }: Props) {
  const noSlots = course.availableSlots === 0;
  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg">
      <CourseCover src={course.imagen} alt={course.nombre} />
      <div className="flex flex-1 flex-col p-4">
        <div>
          <LevelBadge level={course.nivel} />
        </div>
        <h3 className="mt-2 font-bold text-slate-900">{course.nombre}</h3>
        <p className="mt-1 flex-1 text-sm leading-6 text-slate-600">{course.descripcion}</p>
        {noSlots && !enrolled && (
          <p role="alert" className="mt-1 text-xs text-red-600">
            No hay cupos disponibles para este curso.
          </p>
        )}
        <button
          onClick={onEnroll}
          disabled={enrolled || noSlots || loading}
          className="mt-3 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
        >
          {enrolled ? "Ya inscripto" : noSlots ? "Sin cupos" : loading ? "Inscribiendo..." : "Inscribirme"}
        </button>
      </div>
    </article>
  );
}
