import type { BenefitType } from "@/types";

const standard = ["Acceso a clases estándar de todos los cursos", "Inscripción a cursos con cupo", "Seguimiento de progreso", "Historial de donaciones"];
const premiumExtra = ["Clases exclusivas Premium (talleres, clases en vivo)", "Corrección y feedback personalizado", "Proyectos finales guiados", "Prioridad en nuevos cursos"];

export default function PlanComparison({ current }: { current: BenefitType }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className={`rounded-xl border-2 bg-white p-5 ${current === "ESTANDAR" ? "border-indigo-600" : "border-slate-200"}`}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Estándar</h3>
          {current === "ESTANDAR" && <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700">Tu plan</span>}
        </div>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {standard.map((b) => (
            <li key={b}>✓ {b}</li>
          ))}
        </ul>
      </div>
      <div className={`rounded-xl border-2 bg-white p-5 ${current === "PREMIUM" ? "border-violet-600" : "border-slate-200"}`}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-violet-700">Premium</h3>
          {current === "PREMIUM" && <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-semibold text-violet-700">Tu plan</span>}
        </div>
        <p className="mt-1 text-xs text-slate-500">Incluye todo lo del plan Estándar, más:</p>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {premiumExtra.map((b) => (
            <li key={b}>★ {b}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
