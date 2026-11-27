"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { studentService } from "@/services/studentService";
import type { Course, Enrollment } from "@/types";
import CatalogCourseCard from "@/components/student/CatalogCourseCard";

export default function ExplorePage() {
  const { user } = useAuth();
  const { notify } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrollingId, setEnrollingId] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

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

  if (!user) return null;
  if (loading) return <p className="text-slate-500">Cargando tus datos...</p>;

  const enroll = async (course: Course) => {
    setMessage(null);
    setEnrollingId(course.id);
    try {
      const { enrollment, course: updated } = await studentService.enroll(user.id, course.id);
      setEnrollments((e) => [...e, enrollment]);
      setCourses((cs) => cs.map((c) => (c.id === updated.id ? updated : c)));
      const text = `¡Inscripción confirmada! Ya sos parte de «${course.nombre}».`;
      setMessage({ type: "success", text });
      notify(text, "success");
    } catch (err) {
      const text = err instanceof Error ? err.message : "No se pudo completar la inscripción.";
      setMessage({ type: "error", text });
      notify(text, "error");
    } finally {
      setEnrollingId(null);
    }
  };

  return (
    <section className="space-y-3">
      <h2 className="text-lg font-bold">Explorar e inscribirse</h2>
      {message && (
        <div
          role="alert"
          className={`rounded-lg border px-4 py-3 text-sm ${
            message.type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}
      <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
        {courses.map((c) => (
          <CatalogCourseCard
            key={c.id}
            course={c}
            enrolled={enrollments.some((e) => e.courseId === c.id)}
            loading={enrollingId === c.id}
            onEnroll={() => enroll(c)}
          />
        ))}
      </div>
    </section>
  );
}
