import { donationsMock } from "@/components/admin/donationsMock";

const Donations = () => {
  const totalDonated = donationsMock.reduce(
    (total, donation) => total + donation.amount,
    0
  );

  return (
    <div className="space-y-6 bg-slate-100 p-6">
      {/* Título y subtítulo */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Donaciones</h1>
        <p className="mt-1 text-sm text-slate-500">
          Consultá el historial de donaciones recibidas.
        </p>
      </div>

      {/* Contenido recuadrado */}
      <div className="space-y-6 rounded-xl border border-blue-100 bg-white p-6 shadow-sm">
        {/* Total recaudado */}
        <div>
          <p className="text-sm font-medium text-slate-500">
            Total recaudado
          </p>
          <p className="mt-1 text-3xl font-bold text-slate-800">
            {totalDonated.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            })}
          </p>
        </div>

        {/* Tabla de donaciones */}
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Donante
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Correo electrónico
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Monto donado
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Fecha
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {donationsMock.map((donations) => (
                  <tr
                    key={donations.id}
                    className="transition-colors hover:bg-blue-50/40"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">
                      {donations.donor}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {donations.email}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                      {donations.amount.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {donations.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donations;