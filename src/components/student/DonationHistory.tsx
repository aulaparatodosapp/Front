import type { Donation } from "@/types";

const style: Record<Donation["status"], string> = {
  Aprobada: "bg-emerald-100 text-emerald-700",
  Pendiente: "bg-amber-100 text-amber-700",
  Rechazada: "bg-red-100 text-red-700",
};

const fmtDate = (iso: string) => new Date(iso + "T00:00:00").toLocaleDateString("es-AR");
const fmtMoney = (n: number) => n.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });

export default function DonationHistory({ donations }: { donations: Donation[] }) {
  if (donations.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
        Aún no realizaste donaciones
      </div>
    );
  }
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th className="px-4 py-3">Fecha</th>
            <th className="px-4 py-3">Monto</th>
            <th className="px-4 py-3">Método</th>
            <th className="px-4 py-3">Estado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {donations.map((d) => (
            <tr key={d.id}>
              <td className="px-4 py-3">{fmtDate(d.date)}</td>
              <td className="px-4 py-3 font-medium">{fmtMoney(d.amount)}</td>
              <td className="px-4 py-3">{d.method}</td>
              <td className="px-4 py-3">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${style[d.status]}`}>{d.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
