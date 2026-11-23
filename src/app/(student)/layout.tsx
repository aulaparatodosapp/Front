"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

/** Protege todas las rutas del grupo (student): sin sesión → /login */
export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.replace("/login");
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-500">Cargando...</div>;
  }
  return <div className="min-h-screen bg-slate-50 text-slate-900">{children}</div>;
}
