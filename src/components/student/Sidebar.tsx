"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/dashboard", label: "Resumen / Inicio" },
  { href: "/dashboard/cursos", label: "Mis Cursos" },
  { href: "/dashboard/explorar", label: "Explorar e Inscribirse" },
  { href: "/dashboard/donaciones", label: "Historial de Donaciones" },
];

interface Props {
  onLogout: () => void;
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ onLogout, open, onClose }: Props) {
  const pathname = usePathname();
  // "/dashboard" es prefijo de las demás rutas: solo se activa con coincidencia exacta.
  const isActive = (href: string) => (href === "/dashboard" ? pathname === href : pathname.startsWith(href));

  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-slate-900/40 md:hidden" onClick={onClose} aria-hidden />}
      <aside
        className={`fixed left-0 top-[68px] z-40 flex h-[calc(100dvh-68px)] w-64 shrink-0 flex-col overflow-hidden border-r border-slate-700 bg-slate-900 p-4 pb-8 text-white transition-transform md:sticky md:top-[68px] md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <p className="mb-6 shrink-0 px-2 text-lg font-bold text-white">Mi panel</p>
        <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto">
          {items.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              onClick={onClose}
              aria-current={isActive(i.href) ? "page" : undefined}
              className={`rounded-lg px-3 py-2 text-left text-sm font-medium ${
                isActive(i.href) ? "bg-white text-slate-900" : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {i.label}
            </Link>
          ))}
        </nav>
        <div className="mt-3 shrink-0 border-t border-white/10 pt-4 pb-10">
          <button
            onClick={onLogout}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-rose-300 transition-colors hover:bg-rose-600 hover:text-white"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
}
