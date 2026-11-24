
import { Student } from "@/app/(admin)/admin/mocks/studentsMock";

interface StudentModalProps {
  student: Student;
  onClose: () => void;
}

const StudentModal = ({ student, onClose }: StudentModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-bold text-slate-800">
          Detalle del alumno
        </h2>

        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-slate-700">Nombre completo</p>
            <p className="text-base text-slate-700">
              {student.name}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-slate-700">Correo electrónico</p>
            <p className="text-base text-slate-700">
              {student.email}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-slate-700">Beneficio asignado</p>
            <span
              className={`w-fit rounded-full px-3 py-1 text-sm font-semibold ${
                student.benefit === "Premium"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {student.benefit}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-slate-700">
              Cursos inscriptos
            </p>

            {student.enrollments.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {student.enrollments.map((course, index) => (
                  <li
                    key={index}
                    className="rounded-lg border border-slate-300 bg-slate-50 p-2 text-sm text-slate-800"
                  >
                    {course}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-500">
                Este alumno todavía no tiene inscripciones.
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentModal;
