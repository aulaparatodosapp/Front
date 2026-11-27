"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import SessionNavbar from "@/components/auth/SessionNavbar";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/student/Sidebar";

/** Protege todas las rutas del grupo (student): sin sesión → /login */
export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) router.replace("/login");
  }, [isLoading, user, router]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <SessionNavbar />
      <div className="flex flex-1 flex-col">
        {isLoading || !user ? (
          <div className="flex flex-1 items-center justify-center text-slate-500">Cargando...</div>
        ) : (
          <div className="flex min-h-[calc(100dvh-68px)] flex-1 items-start">
            <Sidebar onLogout={logout} open={menuOpen} onClose={() => setMenuOpen(false)} />

            <div className="min-w-0 flex-1 self-stretch">
              <header className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3 md:px-8">
                <div className="flex items-center gap-3">
                  <button onClick={() => setMenuOpen(true)} aria-label="Abrir menú" className="rounded-lg border border-slate-200 px-2.5 py-1.5 md:hidden">
                    ☰
                  </button>
                  <h1 className="text-xl font-bold">¡Hola, {user.firstName}!</h1>
                </div>
              </header>

              <main className="space-y-6 p-4 md:p-8">{children}</main>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
