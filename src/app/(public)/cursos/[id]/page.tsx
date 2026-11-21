import Link from "next/link";
import { notFound } from "next/navigation";

const cursos = [
  {
    id: 1,
    nombre: "Introducción a la informática",
    nivel: "Básico",
    descripcion:
      "Aprende los fundamentos de la informática y el uso básico de una computadora.",
    icono: "💻",
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
    icono: "📁",
    requisitos: ["Conocimientos básicos de informática."],
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
    icono: "🔐",
    requisitos: ["Conocimientos básicos de informática."],
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
    icono: "🖥️",
    requisitos: ["Conocimientos básicos de informática e internet."],
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
    icono: "🎨",
    requisitos: ["Manejo básico de herramientas digitales."],
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
    icono: "⌨️",
    requisitos: ["Conocimientos básicos de informática."],
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
    icono: "🌐",
    requisitos: ["Conocimientos básicos de programación."],
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
    icono: "📊",
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
    icono: "🚀",
    requisitos: ["Conocimientos intermedios de herramientas digitales."],
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

export default async function DetalleCursoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const curso = cursos.find((item) => item.id === Number(id));

  if (!curso) {
    notFound();
  }

  const estilo = estilosNivel[curso.nivel];

  return (
    <div className="bg-white">
      {/* ENCABEZADO */}
      <section className="bg-slate-100 px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/cursos"
            className="mb-6 inline-block text-sm font-semibold text-slate-600 hover:text-slate-900"
          >
            ← Volver a cursos
          </Link>

          <span
            className={`block w-fit rounded-full px-3 py-1 text-sm font-semibold ${estilo.etiqueta}`}
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
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          {/* DESCRIPCIÓN */}
          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              Acerca de este curso
            </h2>

            <p className="leading-8 text-slate-600">
              {curso.descripcion} Este curso está diseñado para ayudarte a
              desarrollar nuevas habilidades mediante contenidos organizados por
              módulos.
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
                  <span className="font-bold text-green-700">✓</span>
                  {beneficio}
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

                    <h3 className="font-semibold text-slate-900">{modulo}</h3>
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
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md lg:sticky lg:top-28">
            <div
              className={`flex h-48 items-center justify-center ${estilo.fondo}`}
            >
              <span className="text-8xl" role="img" aria-label={curso.nombre}>
                {curso.icono}
              </span>
            </div>

            <div className="p-6">
              <h2 className="text-xl font-bold text-slate-900">
                Comienza a aprender
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Explora el contenido de este curso y prepárate para desarrollar
                nuevas habilidades.
              </p>

              <div className="mt-6 rounded-lg bg-slate-100 p-4">
                <p className="text-sm text-slate-600">Nivel del curso</p>

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
    </div>
  );
}
