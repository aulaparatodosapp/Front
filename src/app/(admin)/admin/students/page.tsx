
import { studentsMock } from "../mocks/studentsMock";

const Students = () => {
  return (
    <main className="p-6 bg-slate-100 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Gestión de alumnos
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Consultá los alumnos registrados y sus beneficios.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                  Alumno
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                  Correo
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                  Beneficio
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                  Acción
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {studentsMock.map((studentMock) => (
                <tr
                  key={studentMock.id}
                  className="transition-colors hover:bg-blue-50/40"
                >
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">
                    {studentMock.name}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-500">
                    {studentMock.email}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        studentMock.benefit === "Premium"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {studentMock.benefit}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm cursor-pointer font-medium text-white transition-colors hover:bg-blue-700"
                    >
                      Ver detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Students;
