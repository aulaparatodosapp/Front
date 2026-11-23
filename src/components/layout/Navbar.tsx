"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* LOGO Y NOMBRE */}
        <Link href="/" onClick={cerrarMenu} className="flex items-center gap-3">
          <span className="text-3xl" aria-hidden="true">
            🎓
          </span>

          <span className="text-xl font-bold">Aula para Todos</span>
        </Link>

        {/* MENÚ PARA COMPUTADORAS */}
        <div className="hidden items-center gap-6 lg:flex">
          <Link href="/" className="transition hover:text-slate-300">
            Inicio
          </Link>

          <Link href="/cursos" className="transition hover:text-slate-300">
            Cursos
          </Link>

          <Link href="/#nosotros" className="transition hover:text-slate-300">
            Nosotros
          </Link>

          <Link href="/donaciones" className="transition hover:text-slate-300">
            Donaciones
          </Link>
        </div>

        {/* BOTONES DE AUTENTICACIÓN */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/login"
            className="font-medium transition hover:text-slate-300"
          >
            Iniciar sesión
          </Link>

          <Link
            href="/register"
            className="rounded-lg bg-white px-5 py-2 font-semibold text-slate-900 transition hover:bg-slate-200"
          >
            Registrarse
          </Link>
        </div>

        {/* BOTÓN PARA CELULARES */}
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

      {/* MENÚ DESPLEGABLE PARA CELULARES */}
      {menuAbierto && (
        <div
          id="menu-movil"
          className="border-t border-slate-700 bg-slate-900 px-6 pb-6 lg:hidden"
        >
          <div className="flex flex-col gap-5 pt-5">
            <Link href="/" onClick={cerrarMenu}>
              Inicio
            </Link>

            <Link href="/cursos" onClick={cerrarMenu}>
              Cursos
            </Link>

            <Link href="/#nosotros" onClick={cerrarMenu}>
              Nosotros
            </Link>

            <Link href="/donaciones" onClick={cerrarMenu}>
              Donaciones
            </Link>

            <hr className="border-slate-700" />

            <Link href="/login" onClick={cerrarMenu}>
              Iniciar sesión
            </Link>

            <Link
              href="/register"
              onClick={cerrarMenu}
              className="rounded-lg bg-white px-5 py-3 text-center font-semibold text-slate-900"
            >
              Registrarse
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
