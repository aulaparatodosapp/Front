import type { BenefitType, EnrollmentStatus } from "@/types";

export function BenefitBadge({ benefit }: { benefit: BenefitType }) {
  return benefit === "PREMIUM" ? (
    <span className="inline-flex items-center gap-1 rounded-full bg-violet-600 px-3 py-1 text-xs font-semibold text-white">
      ★ Plan Premium
    </span>
  ) : (
    <span className="inline-flex items-center rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
      Plan Estándar
    </span>
  );
}

const statusStyles: Record<EnrollmentStatus, string> = {
  Activa: "bg-emerald-100 text-emerald-700",
  "En curso": "bg-indigo-100 text-indigo-700",
  Pendiente: "bg-amber-100 text-amber-700",
  Completada: "bg-slate-200 text-slate-700",
};

export function StatusBadge({ status }: { status: EnrollmentStatus }) {
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]}`}>{status}</span>;
}

export function PremiumTag() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-semibold text-violet-700">
      <LockIcon /> Exclusivo Premium
    </span>
  );
}

export function LockIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}
