import Image from "next/image";
import Link from "next/link";

const cursos = [
  {
    id: 1,
    nombre: "Introducción a la informática",
    nivel: "Básico",
    descripcion:
      "Aprende los fundamentos de la informática y el uso básico de una computadora.",
    imagen: "/images/courses/informatica.jpg",
  },
  {
    id: 2,
    nombre: "Herramientas de oficina",
    nivel: "Básico",
    descripcion:
      "Conoce las herramientas esenciales para crear documentos, hojas de cálculo y presentaciones.",
    imagen: "/images/courses/ofimatica.jpg",
  },
  {
    id: 3,
    nombre: "Internet y seguridad digital",
    nivel: "Básico",
    descripcion:
      "Aprende a navegar por internet y proteger tu información personal.",
    imagen: "/images/courses/seguridad-digital.jpg",
  },
  {
    id: 4,
    nombre: "Herramientas digitales",
    nivel: "Intermedio",
    descripcion:
      "Desarrolla habilidades para utilizar herramientas digitales en tus actividades diarias.",
    imagen: "/images/courses/herramientas-digitales.jpg",
  },
  {
    id: 5,
    nombre: "Diseño digital",
    nivel: "Intermedio",
    descripcion:
      "Descubre los principios del diseño y crea tus primeros proyectos visuales.",
    imagen: "/images/courses/diseño-digital.jpg",
  },
  {
    id: 6,
    nombre: "Introducción a la programación",
    nivel: "Intermedio",
    descripcion:
      "Conoce los conceptos fundamentales de la programación y la lógica computacional.",
    imagen: "/images/courses/programación.jpg",
  },
  {
    id: 7,
    nombre: "Desarrollo web",
    nivel: "Avanzado",
    descripcion:
      "Aprende a construir sitios web utilizando tecnologías modernas.",
    imagen: "/images/courses/desarrollo-web.jpg",
  },
  {
    id: 8,
    nombre: "Análisis de datos",
    nivel: "Avanzado",
    descripcion:
      "Aprende a organizar, interpretar y visualizar información para tomar decisiones.",
    imagen: "/images/courses/análisis-de-datos.jpg",
  },
  {
    id: 9,
    nombre: "Desarrollo de proyectos digitales",
    nivel: "Avanzado",
    descripcion:
      "Planifica y desarrolla proyectos digitales aplicando tus conocimientos.",
    imagen: "/images/courses/proyectos-digitales.jpg",
  },
];

const coloresNivel: Record<string, string> = {
  Básico: "bg-green-100 text-green-800",
  Intermedio: "bg-blue-100 text-blue-800",
  Avanzado: "bg-purple-100 text-purple-800",
};

export default function HomePage() {
  return (
    <div className="w-full bg-white">
      {/* BIENVENIDA */}

      <section className="w-full bg-slate-100">
        <div className="home-hero mx-auto max-w-7xl px-6 py-16">
          {/* TEXTO */}
          <div className="home-hero-text">
            <span className="inline-block rounded-full bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
              Educación para todos
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
              Aprende hoy,
              <span className="block text-slate-600">construye tu futuro.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Descubre nuevas oportunidades de aprendizaje con nuestros nueve
              cursos organizados en niveles básico, intermedio y avanzado.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/cursos"
                className="rounded-lg bg-slate-900 px-7 py-3 font-semibold text-white transition hover:bg-slate-700"
              >
                Explorar cursos
              </Link>

              <Link
                href="/#nosotros"
                className="rounded-lg border border-slate-300 bg-white px-7 py-3 font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                Conoce nuestra misión
              </Link>
            </div>
          </div>

          {/* IMAGEN DEL HERO */}
          <div className="home-hero-image overflow-hidden rounded-2xl shadow-md">
            <Image
              src="/images/home/hero-educacion.jpg"
              alt="Estudiantes aprendiendo juntos"
              width={600}
              height={400}
              priority
              className="block h-80 w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* NIVELES DE APRENDIZAJE */}

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
            <h2 className="font-bold text-slate-900">
              3 cursos de nivel básico
            </h2>

            <p className="mt-2 text-sm text-slate-600">Comienza desde cero</p>
          </div>

          <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 text-center">
            <h2 className="font-bold text-slate-900">
              3 cursos de nivel intermedio
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              Amplía tus conocimientos
            </p>
          </div>

          <div className="rounded-xl border border-purple-200 bg-purple-50 p-6 text-center">
            <h2 className="font-bold text-slate-900">
              3 cursos de nivel avanzado
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              Perfecciona tus habilidades
            </p>
          </div>
        </div>
      </section>

      {/* CURSOS */}

      <section className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Descubre nuestros cursos
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Encuentra el curso ideal para desarrollar tus habilidades
              digitales.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {cursos.map((curso) => (
              <article
                key={curso.id}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {/* IMAGEN DEL CURSO */}
                <div className="h-44 w-full overflow-hidden">
                  <Image
                    src={curso.imagen}
                    alt={curso.nombre}
                    width={600}
                    height={350}
                    className="block h-44 w-full object-cover"
                  />
                </div>

                {/* INFORMACIÓN DEL CURSO */}
                <div className="flex min-h-64 flex-col p-6">
                  <span
                    className={`mb-3 w-fit rounded-full px-3 py-1 text-xs font-semibold ${coloresNivel[curso.nivel]}`}
                  >
                    {curso.nivel}
                  </span>

                  <h3 className="mb-3 text-xl font-bold text-slate-900">
                    {curso.nombre}
                  </h3>

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
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/cursos"
              className="inline-block rounded-lg border border-slate-300 px-8 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Ver catálogo de cursos
            </Link>
          </div>
        </div>
      </section>

      {/* SOBRE NOSOTROS */}
      <section id="nosotros" className="bg-slate-50 py-20">
        <div
          className="mx-auto max-w-7xl px-6"
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
            gap: "40px",
            alignItems: "center",
          }}
        >
          {/* IMAGEN */}
          <div className="overflow-hidden rounded-2xl shadow-md">
            <Image
              src="/images/home/sobre-nosotros.jpg"
              alt="Docente ayudando a estudiantes"
              width={600}
              height={400}
              className="block h-80 w-full object-cover"
            />
          </div>

          {/* TEXTO */}
          <div>
            <span className="font-semibold text-slate-600">
              Nuestra organización
            </span>

            <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Educación que transforma vidas
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              En Aula para Todos creemos que la educación debe estar al alcance
              de todas las personas. Nuestro objetivo es ofrecer oportunidades
              de aprendizaje que permitan desarrollar habilidades digitales.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Queremos acompañarte en cada etapa de tu formación, desde tus
              primeros conocimientos hasta el desarrollo de proyectos digitales.
            </p>

            <Link
              href="/cursos"
              className="mt-8 inline-block rounded-lg bg-slate-900 px-7 py-3 font-semibold text-white transition hover:bg-slate-700"
            >
              Conoce nuestros cursos
            </Link>
          </div>
        </div>
      </section>

      {/* COMUNIDAD */}

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          {/* TEXTO */}
          <div className="min-w-0">
            <span className="font-semibold text-slate-600">
              Aprendemos juntos
            </span>

            <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Una comunidad que crece contigo
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              El aprendizaje es una oportunidad para compartir conocimientos,
              descubrir nuevas habilidades y construir un mejor futuro.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Nuestra comunidad busca impulsar el acceso a la educación digital
              y fomentar el crecimiento personal y profesional.
            </p>

            <Link
              href="/cursos"
              className="mt-8 inline-block rounded-lg border border-slate-300 px-7 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Empieza a aprender
            </Link>
          </div>

          {/* IMAGEN */}

          <div className="w-full overflow-hidden rounded-2xl shadow-md">
            <Image
              src="/images/home/comunidad.jpg"
              alt="Comunidad de estudiantes"
              width={600}
              height={400}
              className="block h-72 w-full object-cover sm:h-96"
            />
          </div>
        </div>
      </section>

      {/* DONACIONES */}

      <section className="bg-slate-900 py-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Ayúdanos a transformar vidas
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-slate-300">
            Tu apoyo puede ayudar a que más personas tengan acceso a
            oportunidades de educación y desarrollen habilidades para su futuro.
          </p>

          <Link
            href="/donaciones"
            className="mt-8 inline-block rounded-lg bg-white px-8 py-3 font-semibold text-slate-900 transition hover:bg-slate-200"
          >
            Quiero donar
          </Link>
        </div>
      </section>
    </div>
  );
}
