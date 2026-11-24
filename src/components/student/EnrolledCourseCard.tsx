import type { Course, Enrollment } from "@/types";
import { LevelBadge, StatusBadge } from "./Badges";
import CourseCover from "./CourseCover";

interface Props {
  course: Course;
  enrollment: Enrollment;
  onOpen: () => void;
}

export default function EnrolledCourseCard({ course, enrollment, onOpen }: Props) {
  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg">
      <CourseCover src={course.imagen} alt={course.nombre} />
      <div className="flex flex-1 flex-col p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <LevelBadge level={course.nivel} />
          <StatusBadge status={enrollment.status} />
        </div>
        <h3 className="mt-2 font-bold text-slate-900">{course.nombre}</h3>
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-xs text-slate-500">
            <span>Progreso</span>
            <span>{enrollment.progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-slate-900" style={{ width: `${enrollment.progress}%` }} />
          </div>
        </div>
        <button onClick={onOpen} className="mt-4 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">
          Acceder al curso
        </button>
      </div>
    </article>
  );
}
