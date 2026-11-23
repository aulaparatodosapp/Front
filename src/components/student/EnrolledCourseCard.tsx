import type { Course, Enrollment } from "@/types";
import { StatusBadge } from "./Badges";

interface Props {
  course: Course;
  enrollment: Enrollment;
  onOpen: () => void;
}

export default function EnrolledCourseCard({ course, enrollment, onOpen }: Props) {
  return (
    <div className="flex min-w-0 flex-col rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-slate-900">{course.nombre}</h3>
        <StatusBadge status={enrollment.status} />
      </div>
      <p className="mt-1 text-xs text-slate-500">Nivel {course.nivel}</p>
      <div className="mt-4">
        <div className="mb-1 flex justify-between text-xs text-slate-500">
          <span>Progreso</span>
          <span>{enrollment.progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-indigo-600" style={{ width: `${enrollment.progress}%` }} />
        </div>
      </div>
      <button onClick={onOpen} className="mt-4 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
        Acceder al curso
      </button>
    </div>
  );
}
