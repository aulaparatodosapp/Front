"use client";

import StudentModal from "@/components/admin/StudentModal";
import { useState } from "react";
import { Student, studentsMock } from "../mocks/studentsMock";
import { coursesMock } from "../mocks/coursesMock";

const Students = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  return (
    <div className="p-6 bg-slate-100 space-y-6">
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
                  className="transition-colors hover:bg-blue-50/40">                
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
                      }`}>                    
                      {studentMock.benefit}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedStudent(studentMock)}
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

        {selectedStudent && (
          <StudentModal
            student={selectedStudent}
            onClose={() => setSelectedStudent(null)}
          />
        )}
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Disponibilidad de cupos
          </h2>
          <p className="text-sm text-slate-500">
            Consultá los alumnos inscriptos y los cupos disponibles por curso.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {coursesMock.map((course) => {
            const enrolledCount = studentsMock.filter((student) =>
              student.enrollments.includes(course.name)
            ).length;

            const availableSeats = 5 - enrolledCount;

            return (
              <section
                key={course.id}
                className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm">              
                <h3 className="text-lg font-semibold text-slate-800">
                  {course.name}
                </h3>
                <p>Alumnos inscriptos:{enrolledCount}</p>
                <p>Capacidad máxima: 5 alumnos</p>
                <p>Cupos disponibles: {availableSeats}</p>
                <p
                  className={`text-sm font-semibold ${
                    availableSeats === 0 ? "text-red-600" : "text-green-600"
                  }`}>                
                  Estado: {availableSeats === 0 ? "Completo" : "Disponible"}
                </p>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Students;