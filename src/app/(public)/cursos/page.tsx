
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Nivel = "Básico" | "Intermedio" | "Avanzado";

type Curso = {
  id: number;
  nombre: string;
  descripcion: string;
  nivel: Nivel;
  imagen: string;
};

const cursos: Curso[] = [
  {
    id: 1,
    nombre: "Introducción a la informática",
    descripcion:
      "Aprende los fundamentos de la informática y el uso básico de una computadora.",
    nivel: "Básico",
    imagen: "/images/courses/informatica.jpg",
  },
  {
    id: 2,
    nombre: "Herramientas de oficina",
    descripcion:
      "Aprende a crear documentos, hojas de cálculo y presentaciones.",
    nivel: "Básico",
    imagen: "/images/courses/ofimatica.jpg",
  },
  {
    id: 3,
    nombre: "Internet y seguridad digital",
    descripcion:
      "Aprende a navegar de forma segura y proteger tu información.",
    nivel: "Básico",
    imagen: "/images/courses/seguridad-digital.jpg",
  },
  {
    id: 4,
    nombre: "Herramientas digitales",
    descripcion:
      "Descubre herramientas digitales para mejorar tu productividad.",
    nivel: "Intermedio",
    imagen: "/images/courses/herramientas-digitales.jpg",
  },
  {
    id: 5,
    nombre: "Diseño digital",
    descripcion:
      "Aprende principios de diseño y crea proyectos visuales.",
    nivel: "Intermedio",
    imagen: "/images/courses/diseño-digital.jpg",
  },
  {
    id: 6,
    nombre: "Introducción a la programación",
    descripcion:
      "Desarrolla tu lógica y aprende conceptos de programación.",
    nivel: "Intermedio",
    imagen: "/images/courses/programación.jpg",
  },
  {
    id: 7,
    nombre: "Desarrollo web",
    descripcion:
      "Aprende los fundamentos para crear sitios y aplicaciones web.",
    nivel: "Avanzado",
    imagen: "/images/courses/desarrollo-web.jpg",
  },
  {
    id: 8,
    nombre: "Análisis de datos",
    descripcion:
      "Aprende a organizar, analizar y visualizar información.",
    nivel: "Avanzado",
    imagen: "/images/courses/análisis-de-datos.jpg",
  },
  {
    id: 9,
    nombre: "Desarrollo de proyectos digitales",
    descripcion:
      "Aplica tus conocimientos en proyectos digitales.",
    nivel: "Avanzado",
    imagen: "/images/courses/proyectos-digitales.jpg",
  },
];

const niveles = [
  "Todos",
  "Básico",
  "Intermedio",
  "Avanzado",
] as const;

type FiltroNivel = (typeof niveles)[number];

const estilosNivel: Record<Nivel, string> = {
  Básico: "bg-green-100 text-green-800",
  Intermedio: "bg-blue-100 text-blue-800",
  Avanzado: "bg-purple-100 text-purple-800",
};

export default function CursosPage() {
  const [busqueda, setBusqueda] = useState("");
  const [nivel, setNivel] = useState<FiltroNivel>("Todos");

  const cursosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    return cursos.filter((curso) => {
      const coincideBusqueda =
        curso.nombre.toLowerCase().includes(texto) ||
        curso.descripcion.toLowerCase().includes(texto);

      const coincideNivel =
        nivel === "Todos" || curso.nivel === nivel;

      return coincideBusqueda && coincideNivel;
    });
  }, [busqueda, nivel]);

  return (
    <main className="min-h-screen bg-white text-slate-700">
      {/* ENCABEZADO */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <span className="font-semibold text-slate-600">
            Aula para Todos
          </span>

          <h1 className="mt-3 text-4xl font-bold text-slate-900">
            Explora nuestros cursos
          </h1>

          <p className="mt-5 max-w-2xl leading-8 text-slate-600">
            Descubre oportunidades de aprendizaje y desarrolla
            nuevas habilidades digitales a tu propio ritmo.
          </p>
        </div>
      </section>

      {/* CATÁLOGO */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        {/* BUSCADOR */}
        <div className="mb-8">
          <label
            htmlFor="buscar-cursos"
            className="mb-2 block font-semibold text-slate-900"
          >
            Buscar cursos
          </label>

          <input
            id="buscar-cursos"
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Busca un curso por nombre o descripción..."
            className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 text-slate-900 outline-none focus:border-slate-600"
          />
        </div>

        {/* FILTROS */}
        <div className="mb-10 flex flex-wrap gap-3">
          {niveles.map((opcion) => (
            <button
              key={opcion}
              type="button"
              onClick={() => setNivel(opcion)}
              aria-pressed={nivel === opcion}
              className={
                nivel === opcion
                  ? "rounded-full bg-slate-900 px-5 py-2 font-semibold text-white"
                  : "rounded-full border border-slate-300 bg-white px-5 py-2 font-semibold text-slate-700 transition hover:bg-slate-100"
              }
            >
              {opcion}
            </button>
          ))}
        </div>

        {/* RESULTADOS */}
        <p className="mb-6 text-sm text-slate-500">
          {cursosFiltrados.length}{" "}
          {cursosFiltrados.length === 1
            ? "curso encontrado"
            : "cursos encontrados"}
        </p>

        {cursosFiltrados.length === 0 ? (
          <div className="rounded-xl bg-slate-50 px-6 py-12 text-center">
            <h2 className="text-xl font-bold text-slate-900">
              No encontramos cursos
            </h2>

            <p className="mt-3 text-slate-600">
              Prueba con otra búsqueda o selecciona otro nivel.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: "24px",
              alignItems: "stretch",
            }}
          >
            {cursosFiltrados.map((curso) => (
              <article
                key={curso.id}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
              >
                {/* FOTOGRAFÍA */}
                <div className="shrink-0 overflow-hidden">
                  <Image
                    src={curso.imagen}
                    alt={curso.nombre}
                    width={600}
                    height={350}
                    className="block h-48 w-full object-cover"
                  />
                </div>

                {/* INFORMACIÓN */}
                <div className="flex flex-1 flex-col items-start p-6">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${estilosNivel[curso.nivel]}`}
                  >
                    {curso.nivel}
                  </span>

                  <h2 className="mt-4 text-xl font-bold text-slate-900">
                    {curso.nombre}
                  </h2>

                  <p className="mt-3 mb-6 leading-7 text-slate-600">
                    {curso.descripcion}
                  </p>

                  <Link
                    href={`/cursos/${curso.id}`}
                    className="mt-auto inline-block rounded-lg bg-slate-900 px-5 py-3 text-center font-semibold text-white transition hover:bg-slate-700"
                  >
                    Ver curso
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
