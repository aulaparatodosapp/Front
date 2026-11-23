"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import FormField from "@/components/auth/FormField";
import GoogleButton from "@/components/auth/GoogleButton";
import { authService } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import type { AuthSession, BenefitType } from "@/types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMAIL_MAX = 254;
const PASSWORD_MAX = 64;

export default function LoginPage() {
  const router = useRouter();
  const { setSession } = useAuth();
  const { notify } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const finish = (session: AuthSession) => {
    setSession(session);
    notify(`¡Bienvenido/a, ${session.user.firstName}! Iniciaste sesión correctamente.`, "success");
    router.replace("/dashboard");
  };

  const run = async (fn: () => Promise<AuthSession>) => {
    setFormError("");
    setLoading(true);
    try {
      finish(await fn());
    } catch (e) {
      setFormError(e instanceof Error ? e.message : "Ocurrió un error inesperado.");
      setLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!email.trim()) errs.email = "El email es obligatorio.";
    else if (email.length > EMAIL_MAX) errs.email = `El email no puede superar los ${EMAIL_MAX} caracteres.`;
    else if (!EMAIL_RE.test(email)) errs.email = "Ingresá un email válido.";
    if (!password) errs.password = "La contraseña es obligatoria.";
    else if (password.length < 6) errs.password = "La contraseña debe tener al menos 6 caracteres.";
    else if (password.length > PASSWORD_MAX) errs.password = `La contraseña no puede superar los ${PASSWORD_MAX} caracteres.`;
    setErrors(errs);
    if (Object.keys(errs).length) return;
    run(() => authService.login(email.trim(), password));
  };

  const quick = (kind: BenefitType) => run(() => authService.quickLogin(kind));

  return (
    <AuthShell title="Iniciar sesión" subtitle="Accedé a tu aula virtual">
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        {formError && (
          <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {formError}
          </div>
        )}
        <FormField label="Email" name="email" type="email" maxLength={EMAIL_MAX} autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
        <FormField label="Contraseña" name="password" type="password" maxLength={PASSWORD_MAX} autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />
        <button type="submit" disabled={loading} className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60">
          {loading ? "Ingresando..." : "Iniciar sesión"}
        </button>
      </form>

      <div className="my-4 flex items-center gap-3 text-xs text-slate-400">
        <span className="h-px flex-1 bg-slate-200" /> o <span className="h-px flex-1 bg-slate-200" />
      </div>
      <GoogleButton disabled={loading} onClick={() => run(() => authService.loginWithGoogle())} />

      <div className="mt-6 rounded-lg border border-dashed border-indigo-200 bg-indigo-50/50 p-3">
        <p className="mb-2 text-xs font-medium text-indigo-700">Accesos rápidos de prueba</p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button type="button" disabled={loading} onClick={() => quick("ESTANDAR")} className="flex-1 rounded-lg border border-indigo-200 bg-white px-3 py-2 text-xs font-medium text-indigo-700 hover:bg-indigo-50 disabled:opacity-60">
            Entrar como Alumno Estándar
          </button>
          <button type="button" disabled={loading} onClick={() => quick("PREMIUM")} className="flex-1 rounded-lg bg-violet-600 px-3 py-2 text-xs font-medium text-white hover:bg-violet-700 disabled:opacity-60">
            Entrar como Alumno Premium
          </button>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-slate-500">
        ¿No tenés cuenta?{" "}
        <Link href="/register" className="font-semibold text-indigo-600 hover:underline">
          Registrate
        </Link>
      </p>
    </AuthShell>
  );
}
