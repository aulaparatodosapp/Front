
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
import type { AuthSession } from "@/types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validación de teléfono internacional
const PHONE_RE = /^\+[1-9]\d{7,14}$/;

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const NAME_RE = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s.'-]+$/;
const NAME_MIN = 2;
const NAME_MAX = 20;

type Form = {
  firstName: string;
  lastName: string;
  email: string;
  telefono: string;
  fechaNacimiento: string;
  password: string;
  confirm: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const { setSession } = useAuth();
  const { notify } = useToast();

  const [form, setForm] = useState<Form>({
    firstName: "",
    lastName: "",
    email: "",
    telefono: "",
    fechaNacimiento: "",
    password: "",
    confirm: "",
  });

  const [errors, setErrors] = useState<Partial<Form>>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const set =
    (k: keyof Form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({
        ...f,
        [k]: e.target.value,
      }));

  const finish = (s: AuthSession, msg: string) => {
    setSession(s);
    notify(msg, "success");
    router.replace("/dashboard");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errs: Partial<Form> = {};

    // VALIDACIÓN DEL NOMBRE Y APELLIDO
    const nameErr = (v: string, label: string) => {
      const t = v.trim();

      if (!t)
        return `El ${label} es obligatorio.`;

      if (t.length < NAME_MIN || t.length > NAME_MAX)
        return `El ${label} debe tener entre ${NAME_MIN} y ${NAME_MAX} caracteres.`;

      if (!NAME_RE.test(t))
        return `El ${label} solo puede contener letras.`;
    };

    const nErr = nameErr(form.firstName, "nombre");

    if (nErr) errs.firstName = nErr;

    const aErr = nameErr(form.lastName, "apellido");

    if (aErr) errs.lastName = aErr;

    // VALIDACIÓN DEL CORREO
    const email = form.email.trim();

    if (!email) {
      errs.email = "El email es obligatorio.";
    } else if (!email.includes("@")) {
      errs.email = "El email debe contener el carácter especial @.";
    } else if (email.length < 10 || email.length > 20) {
      errs.email = "El email debe tener entre 10 y 20 caracteres.";
    } else if (!EMAIL_RE.test(email)) {
      errs.email = "Ingresa un email válido.";
    }

    // VALIDACIÓN DEL TELÉFONO INTERNACIONAL
    const tel = form.telefono
      .trim()
      .replace(/[\s()-]/g, "");

    if (!tel) {
      errs.telefono = "El teléfono es obligatorio.";
    } else if (!PHONE_RE.test(tel)) {
      errs.telefono =
        "Ingresa un teléfono con código internacional. Ejemplo: +593991234567.";
    }

    // VALIDACIÓN DE LA FECHA DE NACIMIENTO
    if (!form.fechaNacimiento) {
      errs.fechaNacimiento =
        "La fecha de nacimiento es obligatoria.";
    } else {
      const [y, m, day] = form.fechaNacimiento
        .split("-")
        .map(Number);

      const d = new Date(
        y,
        (m || 1) - 1,
        day || 1
      );

      const valid =
        DATE_RE.test(form.fechaNacimiento) &&
        d.getFullYear() === y &&
        d.getMonth() === m - 1 &&
        d.getDate() === day;

      if (!valid) {
        errs.fechaNacimiento =
          "Ingresa una fecha válida (AAAA-MM-DD).";
      } else if (y < 1900) {
        errs.fechaNacimiento =
          "El año no puede ser anterior a 1900.";
      } else if (d > new Date()) {
        errs.fechaNacimiento =
          "La fecha no puede ser futura.";
      }
    }

    // VALIDACIÓN DE LA CONTRASEÑA
    const pw = form.password;

    if (!pw) {
      errs.password = "La contraseña es obligatoria.";
    } else if (pw.length < 10 || pw.length > 20) {
      errs.password =
        "La contraseña debe tener entre 10 y 20 caracteres.";
    } else if (!/\d/.test(pw)) {
      errs.password =
        "La contraseña debe incluir al menos un número.";
    } else if (!/[^A-Za-z0-9\s]/.test(pw)) {
      errs.password =
        "La contraseña debe incluir al menos un carácter especial (ej. ! @ # $ %).";
    } else if (/\s/.test(pw)) {
      errs.password =
        "La contraseña no puede contener espacios.";
    }

    // CONFIRMAR CONTRASEÑA
    if (!form.confirm) {
      errs.confirm = "Confirma tu contraseña.";
    } else if (form.confirm !== form.password) {
      errs.confirm = "Las contraseñas no coinciden.";
    }

    setErrors(errs);

    if (Object.keys(errs).length) return;

    setFormError("");
    setLoading(true);

    try {
      const s = await authService.register({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        telefono: tel,
        fechaNacimiento: form.fechaNacimiento,
        password: form.password,
      });

      finish(
        s,
        "¡Registro exitoso! Bienvenido/a a Aula para Todos."
      );
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error inesperado."
      );

      setLoading(false);
    }
  };

  // REGISTRO CON GOOGLE
  const google = async () => {
    setLoading(true);

    try {
      finish(
        await authService.loginWithGoogle(),
        "Ingresaste con Google correctamente."
      );
    } catch {
      setFormError("No pudimos continuar con Google.");
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Crear cuenta"
      subtitle="Empezá a aprender hoy"
    >
      <form
        onSubmit={onSubmit}
        noValidate
        className="space-y-2.5"
      >
        {/* MENSAJE DE ERROR */}
        {formError && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          >
            {formError}
          </div>
        )}

        {/* NOMBRE Y APELLIDO */}
        <div className="grid min-w-0 gap-3 sm:gap-4 md:grid-cols-2">
          <FormField
            label="Nombre"
            name="firstName"
            maxLength={NAME_MAX}
            autoComplete="given-name"
            value={form.firstName}
            onChange={set("firstName")}
            error={errors.firstName}
          />

          <FormField
            label="Apellido"
            name="lastName"
            maxLength={NAME_MAX}
            autoComplete="family-name"
            value={form.lastName}
            onChange={set("lastName")}
            error={errors.lastName}
          />
        </div>

        {/* CORREO ELECTRÓNICO */}
        <FormField
          label="Email"
          name="email"
          type="email"
          maxLength={20}
          autoComplete="email"
          value={form.email}
          onChange={set("email")}
          error={errors.email}
        />

        {/* TELÉFONO Y FECHA DE NACIMIENTO */}
        <div className="grid min-w-0 gap-3 sm:gap-4 md:grid-cols-2">
          <FormField
            label="Teléfono"
            name="telefono"
            type="tel"
            maxLength={25}
            inputMode="tel"
            autoComplete="tel"
            placeholder="+593 99 123 4567"
            value={form.telefono}
            onChange={set("telefono")}
            error={errors.telefono}
          />

          <FormField
            label="Fecha de nacimiento"
            name="fechaNacimiento"
            type="date"
            autoComplete="bday"
            min="1900-01-01"
            max={new Date().toISOString().slice(0, 10)}
            value={form.fechaNacimiento}
            onChange={set("fechaNacimiento")}
            error={errors.fechaNacimiento}
          />
        </div>

        {/* CONTRASEÑA */}
        <FormField
          label="Contraseña"
          name="password"
          type="password"
          maxLength={20}
          autoComplete="new-password"
          value={form.password}
          onChange={set("password")}
          error={errors.password}
        />

        {/* CONFIRMAR CONTRASEÑA */}
        <FormField
          label="Confirmar contraseña"
          name="confirm"
          type="password"
          maxLength={20}
          autoComplete="new-password"
          value={form.confirm}
          onChange={set("confirm")}
          error={errors.confirm}
        />

        {/* BOTÓN DE REGISTRO */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-60"
        >
          {loading
            ? "Creando cuenta..."
            : "Registrarme"}
        </button>
      </form>

      {/* SEPARADOR */}
      <div className="my-3 flex items-center gap-3 text-xs text-slate-400">
        <span className="h-px flex-1 bg-slate-200" />
        o
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      {/* GOOGLE */}
      <GoogleButton
        disabled={loading}
        onClick={google}
      />

      {/* INICIAR SESIÓN */}
      <p className="mt-3 text-center text-sm text-slate-500">
        ¿Ya tenés cuenta?{" "}
        <Link
          href="/login"
          className="font-semibold text-slate-900 hover:underline"
        >
          Iniciá sesión
        </Link>
      </p>
    </AuthShell>
  );
}
