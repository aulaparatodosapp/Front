"use client";
import { useState } from "react";
import { teachers } from "@/data/teachers/teachers";
import { coursesMock } from "../mocks/coursesMock";
import CourseModal, { type Course } from "@/components/admin/CourseModal";

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>(coursesMock);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleSaveCourse = (newCourse: Course) => {
    setCourses((prevCourses) => {
      const courseExists = prevCourses.some(
        (course) => course.id === newCourse.id
      );

      if (courseExists) {
        return prevCourses.map((course) =>
          course.id === newCourse.id ? newCourse : course
        );
      }

      return [...prevCourses, newCourse];
    });
  };

    const handleDeleteCourse = (id: number) => {

     const confirmDelete = window.confirm(
        "¿Estás seguro de que querés eliminar este curso?"
      );

      if (!confirmDelete) return;

    setCourses((prevCourses) =>
      prevCourses.filter((rem) => rem.id !== id)
    );
  };

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Gestión de cursos
          </h1>

          <h2 className="mt-2 text-slate-600">
            Administrá los cursos, sus contenidos y niveles de Aula para Todos.
          </h2>
        </div>

        <button
          onClick={() => {setSelectedCourse(null); setIsModalOpen(true)}}
          className="rounded-md bg-slate-900 px-2 py-2 text-sm font-semibold text-white cursor-pointer shadow-md transition hover:bg-slate-700"
        >
          + Crear curso
        </button>
      </div>

      {isModalOpen && (
        <CourseModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveCourse}
          course={selectedCourse}
        />
      )}

      <section className="mt-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.map((curso) => (
            <div
              key={curso.id}
              className="rounded-xl border border-blue-200 bg-white p-4 shadow-md"
            >
              <p className="text-lg font-semibold text-slate-800">
                {curso.name}
              </p>

              <p className="mt-2 text-sm text-slate-600">
                Nivel: {curso.level}
              </p>

              <p className="mt-2 text-sm text-slate-600">
                Profesor: {teachers.find((profe) => profe.id === curso.teacherId)?.name}
              </p>

              <img
                src={curso.image}
                alt={`Imagen del curso ${curso.name}`}
                className="mt-4 h-32 w-full rounded-lg object-cover"
              />

              <button
                onClick={() => {
                  setSelectedCourse(curso);
                  setIsModalOpen(true);
                }}
                className="mt-4 rounded-lg bg-slate-800 px-4 py-2 text-white cursor-pointer"
              >
                Editar
              </button>

              <button
                onClick={() => handleDeleteCourse(curso.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 ml-2 cursor-pointer rounded-lg transition-colors"
              >
                Eliminar
              </button>
                </div>
          ))}
            </div>
      </section>
    </main>
  );
};

export default Courses;
