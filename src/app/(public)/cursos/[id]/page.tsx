
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Nivel = "Básico" | "Intermedio" | "Avanzado";

type Curso = {
  id: number;
  nombre: string;
  nivel: Nivel;
  descripcion: string;
  imagen: string;
  requisitos: string[];
  beneficios: string[];
  modulos: string[];
};

const cursos: Curso[] = [
  {
    id: 1,
    nombre: "Introducción a la informática",
    nivel: "Básico",
    descripcion:
      "Aprende los fundamentos de la informática y el uso básico de una computadora.",
    imagen: "/images/courses/informatica.jpg",
    requisitos: [
      "No necesitas conocimientos previos.",
      "Tener interés en aprender informática.",
    ],
    beneficios: [
      "Comprender el funcionamiento básico de una computadora.",
      "Identificar los principales componentes informáticos.",
      "Utilizar herramientas digitales básicas.",
    ],
    modulos: [
      "Conociendo la computadora",
      "Hardware y software",
      "Sistema operativo",
      "Archivos y carpetas",
    ],
  },
  {
    id: 2,
    nombre: "Herramientas de oficina",
    nivel: "Básico",
    descripcion:
      "Conoce las herramientas esenciales para crear documentos, hojas de cálculo y presentaciones.",
    imagen: "/images/courses/ofimatica.jpg",
    requisitos: [
      "Conocimientos básicos de informática.",
    ],
    beneficios: [
      "Crear documentos digitales.",
      "Organizar información en hojas de cálculo.",
      "Preparar presentaciones.",
    ],
    modulos: [
      "Introducción a las herramientas de oficina",
      "Procesadores de texto",
      "Hojas de cálculo",
      "Presentaciones digitales",
    ],
  },
  {
    id: 3,
    nombre: "Internet y seguridad digital",
    nivel: "Básico",
    descripcion:
      "Aprende a navegar por internet y proteger tu información personal.",
    imagen: "/images/courses/seguridad-digital.jpg",
    requisitos: [
      "Conocimientos básicos de informática.",
    ],
    beneficios: [
      "Navegar por internet de forma segura.",
      "Reconocer riesgos digitales.",
      "Proteger tus cuentas y datos personales.",
    ],
    modulos: [
      "Introducción a internet",
      "Navegadores y buscadores",
      "Privacidad y contraseñas",
      "Prevención de riesgos digitales",
    ],
  },
  {
    id: 4,
    nombre: "Herramientas digitales",
    nivel: "Intermedio",
    descripcion:
      "Desarrolla habilidades para utilizar herramientas digitales en tus actividades diarias.",
    imagen: "/images/courses/herramientas-digitales.jpg",
    requisitos: [
      "Conocimientos básicos de informática e internet.",
    ],
    beneficios: [
      "Utilizar herramientas de productividad.",
      "Colaborar en entornos digitales.",
      "Organizar tareas y proyectos.",
    ],
    modulos: [
      "Productividad digital",
      "Almacenamiento en la nube",
      "Herramientas colaborativas",
      "Organización de proyectos",
    ],
  },
  {
    id: 5,
    nombre: "Diseño digital",
    nivel: "Intermedio",
    descripcion:
      "Descubre los principios del diseño y crea tus primeros proyectos visuales.",
    imagen: "/images/courses/diseño-digital.jpg",
    requisitos: [
      "Manejo básico de herramientas digitales.",
    ],
    beneficios: [
      "Comprender los fundamentos del diseño.",
      "Crear piezas visuales.",
      "Desarrollar proyectos creativos.",
    ],
    modulos: [
      "Fundamentos del diseño",
      "Color y tipografía",
      "Herramientas de diseño",
      "Proyecto visual",
    ],
  },
  {
    id: 6,
    nombre: "Introducción a la programación",
    nivel: "Intermedio",
    descripcion:
      "Conoce los conceptos fundamentales de la programación y la lógica computacional.",
    imagen: "/images/courses/programación.jpg",
    requisitos: [
      "Conocimientos básicos de informática.",
    ],
    beneficios: [
      "Comprender la lógica de programación.",
      "Identificar variables y estructuras de control.",
      "Resolver problemas mediante algoritmos.",
    ],
    modulos: [
      "Pensamiento computacional",
      "Algoritmos y diagramas de flujo",
      "Variables y operadores",
      "Condicionales y ciclos",
    ],
  },
  {
    id: 7,
    nombre: "Desarrollo web",
    nivel: "Avanzado",
    descripcion:
      "Aprende a construir sitios web utilizando tecnologías modernas.",
    imagen: "/images/courses/desarrollo-web.jpg",
    requisitos: [
      "Conocimientos básicos de programación.",
    ],
    beneficios: [
      "Crear estructuras web con HTML.",
      "Aplicar estilos con CSS.",
      "Agregar interactividad con JavaScript.",
    ],
    modulos: [
      "Fundamentos del desarrollo web",
      "HTML",
      "CSS",
      "JavaScript",
      "Proyecto web final",
    ],
  },
  {
    id: 8,
    nombre: "Análisis de datos",
    nivel: "Avanzado",
    descripcion:
      "Aprende a organizar, interpretar y visualizar información para tomar decisiones.",
    imagen: "/images/courses/análisis-de-datos.jpg",
    requisitos: [
      "Manejo de hojas de cálculo.",
      "Conocimientos básicos de herramientas digitales.",
    ],
    beneficios: [
      "Organizar conjuntos de datos.",
      "Interpretar información.",
      "Crear visualizaciones de datos.",
    ],
    modulos: [
      "Introducción al análisis de datos",
      "Preparación de datos",
      "Análisis exploratorio",
      "Visualización de información",
    ],
  },
  {
    id: 9,
    nombre: "Desarrollo de proyectos digitales",
    nivel: "Avanzado",
    descripcion:
      "Planifica y desarrolla proyectos digitales aplicando tus conocimientos.",
    imagen: "/images/courses/proyectos-digitales.jpg",
    requisitos: [
      "Conocimientos intermedios de herramientas digitales.",
    ],
    beneficios: [
      "Planificar proyectos digitales.",
      "Organizar actividades y recursos.",
      "Presentar soluciones tecnológicas.",
    ],
    modulos: [
      "Identificación de necesidades",
      "Planificación de proyectos",
      "Desarrollo de soluciones",
      "Evaluación y presentación final",
    ],
  },
];

const estilosNivel: Record<Nivel, string> = {
  Básico: "bg-green-100 text-green-800",
  Intermedio: "bg-blue-100 text-blue-800",
  Avanzado: "bg-purple-100 text-purple-800",
};

export function generateStaticParams() {
  return cursos.map((curso) => ({
    id: String(curso.id),
  }));
}

export default async function DetalleCursoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const curso = cursos.find(
    (item) => item.id === Number(id)
  );

  if (!curso) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-slate-700">
      {/* ENCABEZADO */}
      <section className="bg-slate-50 px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/cursos"
            className="mb-6 inline-block text-sm font-semibold text-slate-600 hover:text-slate-900"
          >
            ← Volver a cursos
          </Link>

          <span
            className={`block w-fit rounded-full px-3 py-1 text-sm font-semibold ${estilosNivel[curso.nivel]}`}
          >
            {curso.nivel}
          </span>

          <h1 className="mt-5 max-w-3xl text-4xl font-bold text-slate-900 md:text-5xl">
            {curso.nombre}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {curso.descripcion}
          </p>
        </div>
      </section>

      {/* CONTENIDO */}
      <section
        className="mx-auto max-w-7xl px-6 py-14"
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
          gap: "40px",
          alignItems: "start",
        }}
      >
        {/* INFORMACIÓN DEL CURSO */}
        <div className="space-y-10">
          {/* DESCRIPCIÓN */}
          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              Acerca de este curso
            </h2>

            <p className="leading-8 text-slate-600">
              {curso.descripcion} Este curso está diseñado
              para ayudarte a desarrollar nuevas habilidades
              mediante contenidos organizados por módulos.
            </p>
          </div>

          {/* BENEFICIOS */}
          <div>
            <h2 className="mb-5 text-2xl font-bold text-slate-900">
              ¿Qué aprenderás?
            </h2>

            <ul className="space-y-3">
              {curso.beneficios.map((beneficio) => (
                <li
                  key={beneficio}
                  className="flex items-start gap-3 text-slate-600"
                >
                  <span className="font-bold text-green-700">
                    ✓
                  </span>
                  <span>{beneficio}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* MÓDULOS */}
          <div>
            <h2 className="mb-5 text-2xl font-bold text-slate-900">
              Contenido del curso
            </h2>

            <div className="space-y-3">
              {curso.modulos.map((modulo, index) => (
                <div
                  key={modulo}
                  className="flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 font-semibold text-white">
                    {index + 1}
                  </span>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Módulo {index + 1}
                    </p>

                    <h3 className="font-semibold text-slate-900">
                      {modulo}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* REQUISITOS */}
          <div>
            <h2 className="mb-5 text-2xl font-bold text-slate-900">
              Requisitos
            </h2>

            <ul className="list-disc space-y-3 pl-6 text-slate-600">
              {curso.requisitos.map((requisito) => (
                <li key={requisito}>{requisito}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* TARJETA LATERAL */}
        <aside>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
            {/* FOTOGRAFÍA */}
            <Image
              src={curso.imagen}
              alt={curso.nombre}
              width={600}
              height={350}
              className="block h-64 w-full object-cover"
            />

            {/* INFORMACIÓN DE INSCRIPCIÓN */}
            <div className="p-6">
              <h2 className="text-xl font-bold text-slate-900">
                Comienza a aprender
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Explora el contenido de este curso y prepárate
                para desarrollar nuevas habilidades.
              </p>

              <div className="mt-6 rounded-lg bg-slate-100 p-4">
                <p className="text-sm text-slate-600">
                  Nivel del curso
                </p>

                <p className="mt-1 font-semibold text-slate-900">
                  {curso.nivel}
                </p>
              </div>

              <Link
                href="/register"
                className="mt-6 block rounded-lg bg-slate-900 px-5 py-3 text-center font-semibold text-white transition hover:bg-slate-700"
              >
                Inscribirme al curso
              </Link>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
