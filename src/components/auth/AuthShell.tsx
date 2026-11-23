export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen items-start justify-center bg-slate-50 px-4 py-6 sm:items-center sm:py-10">
      <div className="w-full min-w-0 max-w-md rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 md:max-w-lg">
        <div className="mb-4 text-center">
          <p className="text-xl font-bold tracking-tight text-indigo-700 sm:text-2xl">Aula para todos</p>
          <div className="mx-auto mt-2 mb-3 h-1 w-12 rounded-full bg-indigo-600" aria-hidden />
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>
        {children}
      </div>
    </main>
  );
}
