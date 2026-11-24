
import Link from "next/link";

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
    <main
      className="bg-slate-50"
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: "48px 20px",
        minHeight: "650px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          minWidth: 0,
        }}
      >
        {/* VOLVER AL INICIO */}
        <Link
          href="/"
          className="text-sm font-semibold text-slate-600 transition hover:text-slate-900"
          style={{
            display: "inline-block",
            marginBottom: "16px",
          }}
        >
          ← Volver al inicio
        </Link>

        {/* TARJETA DEL FORMULARIO */}
        <div
          className="rounded-2xl border border-slate-200 bg-white shadow-sm"
          style={{
            width: "100%",
            padding: "32px",
            boxSizing: "border-box",
          }}
        >
          {/* ENCABEZADO */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "28px",
            }}
          >
            <p
              className="font-bold text-slate-900"
              style={{ fontSize: "24px" }}
            >
              🎓 Aula para Todos
            </p>

            <div
              className="rounded-full bg-slate-900"
              style={{
                width: "48px",
                height: "4px",
                margin: "14px auto 20px",
              }}
              aria-hidden="true"
            />

            <h1
              className="font-bold text-slate-900"
              style={{ fontSize: "28px" }}
            >
              {title}
            </h1>

            <p
              className="text-slate-500"
              style={{
                fontSize: "14px",
                marginTop: "8px",
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* CONTENIDO DEL FORMULARIO */}
          {children}
        </div>
      </div>
    </main>
  );
}
