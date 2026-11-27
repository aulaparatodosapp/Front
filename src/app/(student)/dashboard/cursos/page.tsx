"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { studentService } from "@/services/studentService";
import type { Course, Enrollment } from "@/types";
import EnrolledCourseCard from "@/components/student/EnrolledCourseCard";
import LessonList from "@/components/student/LessonList";

export default function MyCoursesPage() {
  const { user } = useAuth();
  const { notify } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [openCourse, setOpenCourse] = useState<Course | null>(null);

  const userId = user?.id;
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    Promise.all([studentService.getCourses(), studentService.getEnrollments(userId)])
      .then(([c, e]) => {
        if (cancelled) return;
        setCourses(c);
        setEnrollments(e);
      })
      .catch(() => {
        if (!cancelled) notify("No se pudieron cargar tus datos.", "error");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [userId, notify]);

  if (loading) return <p className="text-slate-500">Cargando tus datos...</p>;

  const enrolledCourses = enrollments
    .map((e) => ({ enrollment: e, course: courses.find((c) => c.id === e.courseId) }))
    .filter((x): x is { enrollment: Enrollment; course: Course } => !!x.course);

  return (
    <>
      <section className="space-y-3">
        <h2 className="text-lg font-bold">Mis cursos</h2>
        {enrolledCourses.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
            Todavía no estás inscripto en ningún curso.
          </p>
        ) : (
          <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
            {enrolledCourses.map(({ enrollment, course }) => (
              <EnrolledCourseCard key={enrollment.id} course={course} enrollment={enrollment} onOpen={() => setOpenCourse(course)} />
            ))}
          </div>
        )}
      </section>

      {openCourse && <LessonList course={openCourse} onClose={() => setOpenCourse(null)} />}
    </>
  );
}
