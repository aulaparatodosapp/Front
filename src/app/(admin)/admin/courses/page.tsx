"use client";
import { useState } from "react";
import { teachers } from "@/data/teachers/teachers";
import { coursesMock } from "../mocks/coursesMock";
import { categoriesMock } from "../mocks/categoriesMock";
import CourseModal, { type Course } from "@/components/admin/CourseModal";
import Link from "next/link";

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

    const handleToggleCourse = (id: number) => {
         const curso = courses.find((curso) => curso.id === id);

            if (!curso) return;

            const confirmToggle = window.confirm(
              curso.isActive
                ? "¿Estás seguro de que querés deshabilitar este curso?"
                : "¿Querés volver a habilitar este curso?"
            );

            if (!confirmToggle) return;
    
        setCourses((prevCourses) =>
          prevCourses.map((curso) =>
            curso.id === id
              ? { ...curso, isActive: !curso.isActive }
              : curso
          ));
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
              className={`rounded-xl border p-3 shadow-md ${curso.isActive ? "border-blue-200 bg-white" : "border-slate-400 bg-slate-300" }`}>                                                  
              <p className="min-h-14 text-lg font-semibold text-slate-800">
                {curso.name}
              </p>

              <p className="mt-2 min-h-20 text-sm text-slate-600">
                {curso.description}
              </p>

              <p className="mt-2 text-sm text-slate-600">
                Categoría: {categoriesMock.find((cat) => cat.id === curso.categoryId)?.name}
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
                className="mt-4 rounded-lg bg-slate-700 px-4 py-2 text-white cursor-pointer"
              >
                Editar
              </button>

              <button
                onClick={() => handleToggleCourse(curso.id)}
                className={`${curso.isActive
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                    } text-white px-4 py-2 ml-2 cursor-pointer rounded-lg transition-colors`}
                  >
                {curso.isActive ? "Deshabilitar" : "Habilitar"}
              </button>

              <button><Link href={`/admin/courses/${curso.id}/content`}
               className="mt-4 inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
                Gestionar contenidos
                </Link></button>
                </div>
          ))}
            </div>
      </section>
    </main>
  );
};

export default Courses;
