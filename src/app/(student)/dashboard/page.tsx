"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { studentService } from "@/services/studentService";
import type { Enrollment } from "@/types";
import SummaryCards from "@/components/student/SummaryCards";

export default function DashboardPage() {
  const { user } = useAuth();
  const { notify } = useToast();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = user?.id;
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    studentService
      .getEnrollments(userId)
      .then((e) => {
        if (!cancelled) setEnrollments(e);
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

  const initials = `${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`.toUpperCase();

  return (
    <>
      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xl font-bold text-white">{initials}</div>
          <div className="min-w-0">
            <p className="text-lg font-semibold">
              {user.firstName} {user.lastName}
            </p>
            <p className="break-words text-sm text-slate-500">{user.email}</p>
          </div>
        </div>
      </section>
      <SummaryCards enrollments={enrollments} />
      <Link
        href="/dashboard/cursos"
        className="inline-block rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        Ver mis cursos
      </Link>
    </>
  );
}
