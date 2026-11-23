"use client";

export type SectionId = "resumen" | "cursos" | "explorar" | "planes" | "donaciones" | "perfil";

const items: { id: SectionId; label: string }[] = [
  { id: "resumen", label: "Resumen / Inicio" },
  { id: "cursos", label: "Mis Cursos" },
  { id: "explorar", label: "Explorar e Inscribirse" },
  { id: "planes", label: "Planes y Beneficios" },
  { id: "donaciones", label: "Historial de Donaciones" },
  { id: "perfil", label: "Perfil" },
];

interface Props {
  active: SectionId;
  onSelect: (id: SectionId) => void;
  onLogout: () => void;
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ active, onSelect, onLogout, open, onClose }: Props) {
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-slate-900/40 md:hidden" onClick={onClose} aria-hidden />}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-dvh max-h-dvh w-64 shrink-0 flex-col overflow-hidden bg-slate-700 p-4 pb-8 text-white transition-transform md:sticky md:top-0 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <p className="mb-6 shrink-0 px-2 text-lg font-bold text-white">Aula para todos</p>
        <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto">
          {items.map((i) => (
            <button
              key={i.id}
              onClick={() => {
                onSelect(i.id);
                onClose();
              }}
              aria-current={active === i.id ? "page" : undefined}
              className={`rounded-lg px-3 py-2 text-left text-sm font-medium ${
                active === i.id ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {i.label}
            </button>
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
