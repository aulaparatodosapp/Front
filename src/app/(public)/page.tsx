import Link from "next/link";

const cursos = [
  {
    id: 1,
    nombre: "Introducción a la informática",
    nivel: "Básico",
    descripcion:
      "Aprende los fundamentos de la informática y desarrolla habilidades digitales.",
    icono: "💻",
  },
  {
    id: 2,
    nombre: "Herramientas de oficina",
    nivel: "Básico",
    descripcion:
      "Aprende a utilizar herramientas digitales para tus actividades diarias.",
    icono: "📁",
  },
  {
    id: 3,
    nombre: "Internet y seguridad digital",
    nivel: "Básico",
    descripcion:
      "Descubre cómo navegar por internet de forma segura y responsable.",
    icono: "🔐",
  },
  {
    id: 4,
    nombre: "Herramientas digitales",
    nivel: "Intermedio",
    descripcion:
      "Fortalece tus conocimientos tecnológicos para el estudio y el trabajo.",
    icono: "🖥️",
  },
  {
    id: 5,
    nombre: "Diseño digital",
    nivel: "Intermedio",
    descripcion:
      "Aprende conceptos de diseño y crea contenido visual atractivo.",
    icono: "🎨",
  },
  {
    id: 6,
    nombre: "Introducción a la programación",
    nivel: "Intermedio",
    descripcion:
      "Conoce los fundamentos de la programación y la lógica computacional.",
    icono: "⌨️",
  },
  {
    id: 7,
    nombre: "Desarrollo web",
    nivel: "Avanzado",
    descripcion:
      "Aprende a construir páginas web utilizando tecnologías modernas.",
    icono: "🌐",
  },
  {
    id: 8,
    nombre: "Análisis de datos",
    nivel: "Avanzado",
    descripcion:
      "Desarrolla habilidades para organizar, interpretar y analizar datos.",
    icono: "📊",
  },
  {
    id: 9,
    nombre: "Desarrollo de proyectos digitales",
    nivel: "Avanzado",
    descripcion: "Aplica tus conocimientos para crear soluciones tecnológicas.",
    icono: "🚀",
  },
];

// COLORES DE LOS NIVELES

const coloresNivel: Record<string, string> = {
  Básico: "bg-green-100 text-green-800",
  Intermedio: "bg-blue-100 text-blue-800",
  Avanzado: "bg-purple-100 text-purple-800",
};

const fondosNivel: Record<string, string> = {
  Básico: "bg-green-100",
  Intermedio: "bg-blue-100",
  Avanzado: "bg-purple-100",
};

// PÁGINA PRINCIPAL

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* SECCIÓN 1: BIENVENIDA*/}

      <section className="bg-slate-100 px-6 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div>
            <span className="mb-5 inline-block rounded-full bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
              Educación para todos
            </span>

            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl">
              Aprende hoy,
              <span className="block text-slate-600">construye tu futuro.</span>
            </h1>

            <p className="mb-8 max-w-xl text-lg leading-relaxed text-slate-700">
              Descubre nuevas oportunidades de aprendizaje con nuestros nueve
              cursos organizados en niveles básico, intermedio y avanzado.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/cursos"
                className="rounded-lg bg-slate-900 px-7 py-3 font-semibold text-white transition hover:bg-slate-700"
              >
                Explorar cursos
              </Link>

              <a
                href="#nosotros"
                className="rounded-lg border border-slate-300 bg-white px-7 py-3 font-semibold text-slate-900 transition hover:bg-slate-200"
              >
                Conoce nuestra misión
              </a>
            </div>
          </div>

          <div className="flex min-h-72 items-center justify-center rounded-3xl bg-slate-200 p-10 md:min-h-96">
            <div className="text-center">
              <div className="mb-5 text-8xl">🎓</div>

              <h2 className="text-2xl font-bold text-slate-900">
                Tu futuro comienza aquí
              </h2>

              <p className="mt-3 text-slate-700">
                Aprende a tu ritmo y desarrolla nuevas habilidades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: NIVELES*/}

      <section className="border-b border-slate-200 bg-white px-6 py-10">
        <div className="mx-auto grid max-w-6xl gap-5 text-center md:grid-cols-3">
          {[
            {
              nivel: "Básico",
              descripcion: "Comienza desde cero",
              color: "bg-green-50 border-green-200",
            },
            {
              nivel: "Intermedio",
              descripcion: "Amplía tus conocimientos",
              color: "bg-blue-50 border-blue-200",
            },
            {
              nivel: "Avanzado",
              descripcion: "Perfecciona tus habilidades",
              color: "bg-purple-50 border-purple-200",
            },
          ].map((item) => (
            <div
              key={item.nivel}
              className={`rounded-xl border p-6 ${item.color}`}
            >
              <h3 className="text-xl font-bold text-slate-900">
                3 cursos de nivel {item.nivel.toLowerCase()}
              </h3>

              <p className="mt-2 text-slate-600">{item.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN 3: CURSOS*/}

      <section id="cursos" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Descubre nuestros cursos
            </h2>

            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Encuentra el curso que mejor se adapte a tus intereses y nivel de
              conocimiento.
            </p>
          </div>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {cursos.map((curso) => (
              <article
                key={curso.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className={`flex h-44 items-center justify-center ${fondosNivel[curso.nivel]}`}
                >
                  <span className="text-7xl" aria-hidden="true">
                    {curso.icono}
                  </span>
                </div>

                {/* Información del curso */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${coloresNivel[curso.nivel]}`}
                    >
                      {curso.nivel}
                    </span>
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-slate-900">
                    {curso.nombre}
                  </h3>

                  <p className="mb-6 flex-1 leading-relaxed text-slate-600">
                    {curso.descripcion}
                  </p>

                  <Link
                    href={`/cursos/${curso.id}`}
                    className="rounded-lg bg-slate-900 px-5 py-3 text-center font-semibold text-white transition hover:bg-slate-700"
                  >
                    Ver detalles
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/cursos"
              className="inline-block rounded-lg border border-slate-300 px-7 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Ir al catálogo de cursos
            </Link>
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: SOBRE LA ONG */}

      <section id="nosotros" className="bg-slate-100 px-6 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div className="flex min-h-64 items-center justify-center rounded-3xl bg-white p-10 shadow-sm">
            <div className="text-center">
              <span className="text-7xl" aria-hidden="true">
                📚
              </span>

              <h3 className="mt-5 text-2xl font-bold text-slate-900">
                Educación que transforma
              </h3>
            </div>
          </div>

          <div>
            <span className="font-semibold text-slate-600">NUESTRA MISIÓN</span>

            <h2 className="mb-6 mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
              Creemos en el poder de la educación
            </h2>

            <p className="mb-5 text-lg leading-relaxed text-slate-700">
              Aula para Todos es una iniciativa educativa que busca facilitar el
              acceso al conocimiento y promover nuevas oportunidades de
              aprendizaje.
            </p>

            <p className="leading-relaxed text-slate-600">
              Nuestro objetivo es que más personas puedan desarrollar
              habilidades útiles para su crecimiento personal y profesional.
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN 5: DONACIONES */}

      <section className="bg-slate-900 px-6 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 text-6xl" aria-hidden="true">
            ❤️
          </div>

          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Ayúdanos a llegar más lejos
          </h2>

          <p className="mx-auto mb-9 max-w-2xl text-lg leading-relaxed text-slate-300">
            Tu colaboración puede abrir nuevas oportunidades educativas. Juntos
            podemos acercar el conocimiento a más personas.
          </p>

          <Link
            href="/donaciones"
            className="inline-block rounded-lg bg-white px-8 py-3 font-bold text-slate-900 transition hover:bg-slate-200"
          >
            Quiero donar
          </Link>
        </div>
      </section>
    </main>
  );
}
