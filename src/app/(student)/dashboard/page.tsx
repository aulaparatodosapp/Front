"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { studentService } from "@/services/studentService";
import type { Course, Donation, Enrollment } from "@/types";
import Sidebar, { type SectionId } from "@/components/student/Sidebar";
import { BenefitBadge } from "@/components/student/Badges";
import SummaryCards from "@/components/student/SummaryCards";
import EnrolledCourseCard from "@/components/student/EnrolledCourseCard";
import CatalogCourseCard from "@/components/student/CatalogCourseCard";
import LessonList from "@/components/student/LessonList";
import PlanComparison from "@/components/student/PlanComparison";
import DonationHistory from "@/components/student/DonationHistory";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const { notify } = useToast();
  const [section, setSection] = useState<SectionId>("resumen");
  const [menuOpen, setMenuOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrollingId, setEnrollingId] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [openCourse, setOpenCourse] = useState<Course | null>(null);

  const userId = user?.id;
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    Promise.all([studentService.getCourses(), studentService.getEnrollments(userId), studentService.getDonations(userId)]).then(
      ([c, e, d]) => {
        if (cancelled) return;
        setCourses(c);
        setEnrollments(e);
        setDonations(d);
        setLoading(false);
      },
    );
    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (!user) return null;

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

  const enrolledCourses = enrollments
    .map((e) => ({ enrollment: e, course: courses.find((c) => c.id === e.courseId) }))
    .filter((x): x is { enrollment: Enrollment; course: Course } => !!x.course);

  const initials = `${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`.toUpperCase();

  const myCourses = (
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
  );

  return (
    <div className="flex min-h-[calc(100dvh-68px)] flex-1 items-start">
      <Sidebar active={section} onSelect={setSection} onLogout={logout} open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="min-w-0 flex-1 self-stretch">
        <header className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3 md:px-8">
          <div className="flex items-center gap-3">
            <button onClick={() => setMenuOpen(true)} aria-label="Abrir menú" className="rounded-lg border border-slate-200 px-2.5 py-1.5 md:hidden">
              ☰
            </button>
            <h1 className="text-xl font-bold">¡Hola, {user.firstName}!</h1>
          </div>
          <BenefitBadge benefit={user.benefit} />
        </header>

        <main className="space-y-6 p-4 md:p-8">
          {loading ? (
            <p className="text-slate-500">Cargando tus datos...</p>
          ) : (
            <>
              {section === "resumen" && (
                <>
                  <SummaryCards enrollments={enrollments} />
                  {myCourses}
                </>
              )}
              {section === "cursos" && myCourses}
              {section === "explorar" && (
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
              )}
              {section === "planes" && (
                <section className="space-y-3">
                  <h2 className="text-lg font-bold">Planes y beneficios</h2>
                  <PlanComparison current={user.benefit} />
                </section>
              )}
              {section === "donaciones" && (
                <section className="space-y-3">
                  <h2 className="text-lg font-bold">Historial de donaciones</h2>
                  <DonationHistory donations={donations} />
                </section>
              )}
              {section === "perfil" && (
                <section className="max-w-md space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-xl font-bold text-white">{initials}</div>
                    <div>
                      <p className="text-lg font-semibold">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm text-slate-500">{user.email}</p>
                    </div>
                  </div>
                  <BenefitBadge benefit={user.benefit} />
                </section>
              )}
            </>
          )}
        </main>
      </div>

      {openCourse && <LessonList course={openCourse} benefit={user.benefit} onClose={() => setOpenCourse(null)} />}
    </div>
  );
}
