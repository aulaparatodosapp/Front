"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import SessionNavbar from "@/components/auth/SessionNavbar";
import Footer from "@/components/layout/Footer";

/** Si ya hay sesión, /login y /register redirigen a /dashboard */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) router.replace("/dashboard");
  }, [isLoading, isAuthenticated, router]);

  return (
    <div className="flex min-h-screen flex-col">
      <SessionNavbar />
      <div className="flex flex-1 flex-col">
        {isLoading || isAuthenticated ? (
          <div className="flex flex-1 items-center justify-center bg-slate-50 text-slate-500">Cargando...</div>
        ) : (
          children
        )}
      </div>
      <Footer />
    </div>
  );
}
