"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import ModuleModal from "@/components/admin/ModuleModal";
import Link from "next/link";
import { coursesMock } from "../../../mocks/coursesMock";
import { courseContentMock, CourseModule, ModuleType, CourseClass } from "../../../mocks/courseContentMock";
import ClassModal from "@/components/admin/ClassModal";

const ContentPage = () => {
  const { courseId } = useParams<{ courseId: string }>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);
  const [selectedClass, setSelectedClass] = useState<CourseClass | null>(null);
  const [selectedModule, setSelectedModule] = useState<CourseModule | null>(null);

  const handleCreateModule = (title: string, type: ModuleType) => {
    const newModule: CourseModule = {
      id: Date.now(),
      courseId: Number(courseId),
      title,
      type,      
      classes: [],     
    };

    setModules((prevModules) => [...prevModules, newModule]);
    setIsModalOpen(false);
  };

  const handleSaveModule = (title: string, type: ModuleType) => {

    const hasMandatoryModule = modules.some(
      (module) =>
        module.type === "obligatorio" &&
        module.id !== selectedModule?.id
      );
        if (type === "adicional" && !hasMandatoryModule) {
          alert("Primero tenés que crear un módulo obligatorio.");
          return;
      } 

    if (selectedModule) {
      setModules((prevModules) =>
        prevModules.map((module) =>
          module.id === selectedModule.id
            ? { ...module, title, type }
            : module
        )
      );
    } else {
      handleCreateModule(title, type);
    }

    setIsModalOpen(false);
    setSelectedModule(null);
  };

  const handleCreateClass = (
    title: string,
    videoUrl: string,
    content: string
    ) => {
    if (selectedClass) {
        // Estamos editando una clase existente
        setModules((prevModules) =>
        prevModules.map((module) => ({
            ...module,
            classes: module.classes.map((clase) =>
            clase.id === selectedClass.id
                ? { ...clase, title, videoUrl, content }
                : clase
            ),
        }))
        );
    } else {
        // Estamos creando una clase nueva para que sepan mis compas
        setModules((prevModules) =>
        prevModules.map((module) =>
            module.id === selectedModuleId
            ? {
                ...module,
                classes: [
                    ...module.classes,
                    {
                    id: Date.now(),
                    title,
                    videoUrl,
                    content,
                    },
                ],
                }
            : module
        )
        );
    }

  setIsClassModalOpen(false);
  setSelectedClass(null);
  setSelectedModuleId(null);
};

  const [modules, setModules] = useState(
    courseContentMock.filter(
      (module) => module.courseId === Number(courseId)
    )
  );

  const course = coursesMock.find(
    (curso) => curso.id === Number(courseId)
  );

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <Link
        href="/admin/courses"
        className="mb-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-800"
      >
        ← Volver a cursos
      </Link>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Gestión de contenidos
        </h1>

        <p className="mt-2 text-slate-600">
          Administrá los módulos y las clases de este curso.
        </p>

        <p className="mt-2 text-sm text-slate-500">
          Curso: {course?.name}
        </p>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          Crear módulo
        </button>
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => (
          <div
            key={module.id}
            className="flex h-full flex-col rounded-xl border border-blue-200 bg-white p-5 shadow-md"
          >
                <h2 className="text-lg font-semibold text-slate-800">
                {module.title}
                </h2>

                <button
                    onClick={() => {
                      setSelectedModule(module);
                      setIsModalOpen(true);
                    }}
                    className="mt-2 rounded-lg bg-amber-500 px-3 py-1 text-sm font-semibold text-white hover:bg-amber-600">                  
                    Editar módulo
                </button>

                <p className="mt-2 text-sm text-slate-600">
                Tipo: {module.type}
                </p>

                <p className="mt-2 text-sm text-slate-600">
                Clases: {module.classes.length}
                </p>

            <div className="mt-4 space-y-3">
                {module.classes.length === 0 ? (
                    <p className="text-sm text-slate-500">
                    Este módulo todavía no tiene clases.
                    </p>
                ) : (
                    module.classes.map((clase) => (
                    <div
                        key={clase.id}
                        className="rounded-lg border border-slate-200 bg-slate-50 p-3">                    
                        <p className="font-medium text-slate-700">
                        {clase.title}
                        </p>

                        <button
                            onClick={() => {
                                setSelectedClass(clase);
                                setIsClassModalOpen(true);
                            }}
                            className="mt-2 rounded-lg bg-amber-500 px-3 py-1 text-sm font-semibold text-white hover:bg-amber-600"
                            >
                            Editar
                        </button>

                        {clase.videoUrl && (
                        <p className="mt-1 text-sm text-blue-600">
                            <span className="font-semibold">Video:</span> Disponible
                        </p>
                        )}

                        {clase.content && (
                        <p className="mt-1 text-sm text-slate-600">
                            <span className="font-semibold">Contenido escrito:</span> Disponible
                        </p>
                        )}

                        {!clase.videoUrl && !clase.content && (
                        <p className="mt-1 text-sm text-slate-500">
                            Sin video ni contenido escrito.
                        </p>
                        )}
                    </div>
                    ))
                )}
            </div>

            <div className="mt-auto pt-4">
              <button
                onClick={() => {
                  setSelectedModuleId(module.id);
                  setIsClassModalOpen(true);
                }}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Agregar clase
              </button>
            </div>
          </div>
        ))}
      </section>

      <ModuleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveModule}
        selectedModule={selectedModule}
      />

      <ClassModal
        isOpen={isClassModalOpen}
        onClose={() => setIsClassModalOpen(false)}
        onCreate={handleCreateClass}
        selectedClass={selectedClass}
      />
    </main>
  );
};

export default ContentPage;
