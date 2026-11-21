"use client";

import { useState } from "react";
import Link from "next/link";

const cursos = [
  {
    id: 1,
    nombre: "Introducción a la informática",
    nivel: "Básico",
    descripcion:
      "Aprende los fundamentos de la informática y el uso básico de una computadora.",
    icono: "💻",
  },
  {
    id: 2,
    nombre: "Herramientas de oficina",
    nivel: "Básico",
    descripcion:
      "Conoce las herramientas esenciales para crear documentos, hojas de cálculo y presentaciones.",
    icono: "📁",
  },
  {
    id: 3,
    nombre: "Internet y seguridad digital",
    nivel: "Básico",
    descripcion:
      "Aprende a navegar por internet y proteger tu información personal.",
    icono: "🔐",
  },
  {
    id: 4,
    nombre: "Herramientas digitales",
    nivel: "Intermedio",
    descripcion:
      "Desarrolla habilidades para utilizar herramientas digitales en tus actividades diarias.",
    icono: "🖥️",
  },
  {
    id: 5,
    nombre: "Diseño digital",
    nivel: "Intermedio",
    descripcion:
      "Descubre los principios del diseño y crea tus primeros proyectos visuales.",
    icono: "🎨",
  },
  {
    id: 6,
    nombre: "Introducción a la programación",
    nivel: "Intermedio",
    descripcion:
      "Conoce los conceptos fundamentales de la programación y la lógica computacional.",
    icono: "⌨️",
  },
  {
    id: 7,
    nombre: "Desarrollo web",
    nivel: "Avanzado",
    descripcion:
      "Aprende a construir sitios web utilizando tecnologías modernas.",
    icono: "🌐",
  },
  {
    id: 8,
    nombre: "Análisis de datos",
    nivel: "Avanzado",
    descripcion:
      "Aprende a organizar, interpretar y visualizar información para tomar decisiones.",
    icono: "📊",
  },
  {
    id: 9,
    nombre: "Desarrollo de proyectos digitales",
    nivel: "Avanzado",
    descripcion:
      "Planifica y desarrolla proyectos digitales aplicando tus conocimientos.",
    icono: "🚀",
  },
];

const estilosNivel: Record<string, { fondo: string; etiqueta: string }> = {
  Básico: {
    fondo: "bg-green-100",
    etiqueta: "bg-green-100 text-green-800",
  },
  Intermedio: {
    fondo: "bg-blue-100",
    etiqueta: "bg-blue-100 text-blue-800",
  },
  Avanzado: {
    fondo: "bg-purple-100",
    etiqueta: "bg-purple-100 text-purple-800",
  },
};

export default function CursosPage() {
  const [busqueda, setBusqueda] = useState("");
  const [nivel, setNivel] = useState("Todos");

  const cursosFiltrados = cursos.filter((curso) => {
    const coincideBusqueda = curso.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase().trim());

    const coincideNivel = nivel === "Todos" || curso.nivel === nivel;

    return coincideBusqueda && coincideNivel;
  });

  return (
    <div className="bg-white">
      {/* ENCABEZADO */}
      <section className="bg-slate-100 px-6 py-16 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
            Explora nuestros cursos
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            Descubre nuevas oportunidades de aprendizaje. Tenemos cursos para
            cada etapa de tu formación.
          </p>
        </div>
      </section>

      {/* CATÁLOGO */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        {/* BUSCADOR Y FILTROS */}
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="w-full md:max-w-md">
            <label
              htmlFor="buscar-curso"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Buscar cursos
            </label>

            <input
              id="buscar-curso"
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Ej. Programación, diseño..."
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-700"
            />
          </div>

          <div className="w-full md:w-64">
            <label
              htmlFor="filtrar-nivel"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Filtrar por nivel
            </label>

            <select
              id="filtrar-nivel"
              value={nivel}
              onChange={(e) => setNivel(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-700"
            >
              <option value="Todos">Todos los niveles</option>
              <option value="Básico">Básico</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
            </select>
          </div>
        </div>

        {/* CONTADOR */}
        <p className="mb-6 text-sm text-slate-600">
          Mostrando {cursosFiltrados.length} de {cursos.length} cursos
        </p>

        {/* TARJETAS */}
        {cursosFiltrados.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {cursosFiltrados.map((curso) => {
              const estilo = estilosNivel[curso.nivel];

              return (
                <article
                  key={curso.id}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className={`flex h-44 items-center justify-center ${estilo.fondo}`}
                  >
                    <span
                      className="text-7xl"
                      role="img"
                      aria-label={curso.nombre}
                    >
                      {curso.icono}
                    </span>
                  </div>

                  <div className="flex h-[250px] flex-col p-6">
                    <span
                      className={`mb-3 w-fit rounded-full px-3 py-1 text-xs font-semibold ${estilo.etiqueta}`}
                    >
                      {curso.nivel}
                    </span>

                    <h2 className="mb-3 text-xl font-bold text-slate-900">
                      {curso.nombre}
                    </h2>

                    <p className="mb-5 line-clamp-3 text-sm leading-6 text-slate-600">
                      {curso.descripcion}
                    </p>

                    <Link
                      href={`/cursos/${curso.id}`}
                      className="mt-auto block rounded-lg bg-slate-900 px-5 py-3 text-center font-semibold text-white transition hover:bg-slate-700"
                    >
                      Ver curso
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl bg-slate-100 px-6 py-16 text-center">
            <h2 className="text-xl font-semibold text-slate-900">
              No encontramos cursos
            </h2>

            <p className="mt-3 text-slate-600">
              Prueba con otro nombre o selecciona un nivel diferente.
            </p>

            <button
              type="button"
              onClick={() => {
                setBusqueda("");
                setNivel("Todos");
              }}
              className="mt-6 rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-700"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
