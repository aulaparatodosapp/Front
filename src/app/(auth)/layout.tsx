"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

/** Si ya hay sesión, /login y /register redirigen a /dashboard */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) router.replace("/dashboard");
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || isAuthenticated) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-500">Cargando...</div>;
  }
  return <>{children}</>;
}
