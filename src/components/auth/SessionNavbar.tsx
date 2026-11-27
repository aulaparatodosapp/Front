"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

/**
 * Réplica visual de `components/layout/Navbar` (sección pública) con soporte de sesión.
 * No modifica el Navbar original. Altura fija (68px) para poder alinear el sidebar del dashboard.
 */
export const NAVBAR_HEIGHT = 68;

const links = [
  { href: "/", label: "Inicio" },
  { href: "/cursos", label: "Cursos" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/donaciones", label: "Donaciones" },
];

export default function SessionNavbar() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const cerrarMenu = () => setMenuAbierto(false);
  const panelActivo = usePathname().startsWith("/dashboard");

  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-md">
      <nav className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-6">
        <Link href="/" onClick={cerrarMenu} className="flex items-center gap-3">
          <span className="text-3xl" aria-hidden="true">
            🎓
          </span>
          <span className="text-xl font-bold">Aula para Todos</span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition hover:text-slate-300">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          {isLoading ? null : isAuthenticated && user ? (
            <>
              <Link
                href="/dashboard"
                aria-current={panelActivo ? "page" : undefined}
                className={`font-medium transition hover:text-slate-300 ${panelActivo ? "underline underline-offset-8" : ""}`}
              >
                Mi panel
              </Link>
              <span className="text-sm text-slate-300">
                {user.firstName}
              </span>
              <button
                type="button"
                onClick={logout}
                className="rounded-lg bg-white px-5 py-2 font-semibold text-slate-900 transition hover:bg-slate-200"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="font-medium transition hover:text-slate-300">
                Iniciar sesión
              </Link>
              <Link href="/register" className="rounded-lg bg-white px-5 py-2 font-semibold text-slate-900 transition hover:bg-slate-200">
                Registrarse
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuAbierto}
          aria-controls="menu-movil"
          className="rounded-lg border border-slate-600 px-3 py-2 text-xl lg:hidden"
        >
          {menuAbierto ? "✕" : "☰"}
        </button>
      </nav>

      {menuAbierto && (
        <div id="menu-movil" className="border-t border-slate-700 bg-slate-900 px-6 pb-6 lg:hidden">
          <div className="flex flex-col gap-5 pt-5">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={cerrarMenu}>
                {l.label}
              </Link>
            ))}
            <hr className="border-slate-700" />
            {isLoading ? null : isAuthenticated && user ? (
              <>
                <span className="text-sm text-slate-300">
                  {user.firstName}
                </span>
                <Link
                  href="/dashboard"
                  onClick={cerrarMenu}
                  aria-current={panelActivo ? "page" : undefined}
                  className={panelActivo ? "underline underline-offset-8" : undefined}
                >
                  Mi panel
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    cerrarMenu();
                    logout();
                  }}
                  className="rounded-lg bg-white px-5 py-3 text-center font-semibold text-slate-900"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={cerrarMenu}>
                  Iniciar sesión
                </Link>
                <Link href="/register" onClick={cerrarMenu} className="rounded-lg bg-white px-5 py-3 text-center font-semibold text-slate-900">
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
