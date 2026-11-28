"use client";
import type { SyntheticEvent } from "react";
import { useState } from "react";
import { teachers } from "@/data/teachers/teachers";
import { categoriesMock } from "@/app/(admin)/admin/mocks/categoriesMock";

export interface Course {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  level: string;
  image: string;
  teacherId?: number;
  isActive: boolean;
}

interface CourseModalProps {
  onClose: () => void;
  onSave: (course: Course) => void;
  course: Course | null
}

const CourseModal = ({ onClose, onSave, course }: CourseModalProps) => {
  const [nameCourse, setNameCourse] = useState(course ? course.name : "");
  const [descriptionCourse, setDescriptionCourse] = useState(course ? course.description : "");
  const [levelCourse, setLevelCourse] = useState(course ? course.level : "");
  const [teacherCourse, setTeacherCourse] = useState(course ? String(course.teacherId ?? "") : "");
  const [imageCourse, setImageCourse] = useState(course ? course.image : "");

  const [categoryCourse, setCategoryCourse] = useState(
  course ? String(course.categoryId ?? "") : ""
  );

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newCourse: Course = {
      id: course ? course.id : Date.now(),
      name: nameCourse,
      description: descriptionCourse,
      categoryId: Number(categoryCourse),
      level: levelCourse,
      teacherId: Number(teacherCourse),
      image: imageCourse,
      isActive: course ? course.isActive : true,
    };

    onSave(newCourse);

    setNameCourse("");
    setDescriptionCourse("");
    setLevelCourse("");
    setTeacherCourse("");
    setImageCourse("");

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-bold text-slate-800">
          Crear nuevo curso
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-slate-700">
              Nombre del curso
            </label>

            <input
              id="name"
              type="text"
              minLength={3}
              maxLength={50}
              required
              value={nameCourse}
              onChange={(e) => setNameCourse(e.target.value)}
              placeholder="Ej. Introducción a la programación"
              className="rounded-lg border border-slate-300 p-2 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="descripcion" className="text-sm font-medium text-slate-700">
              Descripción
            </label>

            <textarea
              id="descripcion"
              minLength={10}
              maxLength={500}
              required
              value={descriptionCourse}
              onChange={(e) => setDescriptionCourse(e.target.value)}
              placeholder="Describí brevemente de qué trata el curso..."
              rows={3}
              className="rounded-lg border border-slate-300 p-2 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="category" className="text-sm font-medium text-slate-700">
              Categoría
              </label>

            <select
              id="category"
              value={categoryCourse}
              required
              onChange={(e) => setCategoryCourse(e.target.value)}
              className="rounded-lg border border-slate-300 p-2 text-sm outline-none focus:border-blue-500">            
              <option value="">Seleccionar categoría</option>
              {categoriesMock.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="level" className="text-sm font-medium text-slate-700">
              Nivel
            </label>

            <select
              name="level"
              id="level"              
              required
              value={levelCourse}
              onChange={(e) => setLevelCourse(e.target.value)}
              className="rounded-lg border border-slate-300 p-2 text-sm outline-none focus:border-blue-500"
            >
              <option value="" disabled>Seleccionar nivel</option>
              <option value="Basic">Basic</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="teacher" className="text-sm font-medium text-slate-700">
              Profesor
            </label>

            <select
              name="teacher"
              id="teacher"              
              required
              value={teacherCourse}
              onChange={(e) => setTeacherCourse(e.target.value)}
              className="rounded-lg border border-slate-300 p-2 text-sm outline-none focus:border-blue-500"
            >
              <option value="" disabled>Seleccionar profesor</option>

              {teachers.map((prof) => (
                <option key={prof.id} value={prof.id}>
                  {prof.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="image" className="text-sm font-medium text-slate-700">
              Imagen del curso
            </label>

            <input
              id="image"
              name="image"
              type="text"
              required              
              value={imageCourse}
              onChange={(e) => setImageCourse(e.target.value)}
              placeholder="Pegá la URL de la imagen..."
              className="rounded-lg border border-slate-300 p-2 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <button
              type="submit"
              className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white cursor-pointer transition hover:bg-green-700"
            >
              Crear curso
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white cursor-pointer transition hover:bg-red-700"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseModal;
