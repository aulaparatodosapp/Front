import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3">
        {/* INFORMACIÓN DE LA ORGANIZACIÓN */}
        <div>
          <h2 className="mb-4 text-xl font-bold">🎓 Aula para Todos</h2>

          <p className="text-sm leading-7 text-slate-300">
            Creemos que la educación debe estar al alcance de todas las
            personas. Ofrecemos oportunidades de aprendizaje para desarrollar
            nuevas habilidades y construir un mejor futuro.
          </p>
        </div>

        {/* ENLACES RÁPIDOS */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">Enlaces rápidos</h3>

          <ul className="space-y-3 text-sm text-slate-300">
            <li>
              <Link href="/" className="hover:text-white">
                Inicio
              </Link>
            </li>

            <li>
              <Link href="/cursos" className="hover:text-white">
                Nuestros cursos
              </Link>
            </li>

            <li>
              <Link href="/#nosotros" className="hover:text-white">
                Sobre nosotros
              </Link>
            </li>

            <li>
              <Link href="/donaciones" className="hover:text-white">
                Donaciones
              </Link>
            </li>
          </ul>
        </div>

        {/* NUESTRA MISIÓN */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">Nuestra misión</h3>

          <p className="text-sm leading-7 text-slate-300">
            Impulsar el acceso a la educación digital mediante cursos
            organizados en niveles básico, intermedio y avanzado.
          </p>
        </div>
      </div>

      {/* PARTE INFERIOR */}
      <div className="border-t border-slate-700">
        <div className="mx-auto max-w-7xl px-6 py-5 text-center">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Aula para Todos. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
