"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import FormField from "@/components/auth/FormField";
import FormSelect from "@/components/auth/FormSelect";
import GoogleButton from "@/components/auth/GoogleButton";
import { authService } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import type { AuthSession } from "@/types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// El código de país se elige aparte; acá va solo código de área + número
const PHONE_RE = /^\d+(?:[ -]\d+)*$/;
const PHONE_MAX = 16; // con el código de país no supera los 20 caracteres
const COUNTRIES = [
  { code: "+54", iso: "AR", name: "Argentina", minDigits: 10, maxDigits: 11, example: "11 5555-1234" },
  { code: "+57", iso: "CO", name: "Colombia", minDigits: 10, maxDigits: 10, example: "300 123-4567" },
  { code: "+53", iso: "CU", name: "Cuba", minDigits: 8, maxDigits: 8, example: "5 123-4567" },
  { code: "+55", iso: "BR", name: "Brasil", minDigits: 10, maxDigits: 11, example: "11 91234-5678" },
];
const findCountry = (code: string) => COUNTRIES.find((c) => c.code === code) ?? COUNTRIES[0];
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const NAME_RE = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s.'-]+$/;
const NAME_MIN = 2;
const NAME_MAX = 20;

type Form = {
  firstName: string;
  lastName: string;
  email: string;
  codigoPais: string;
  telefono: string;
  fechaNacimiento: string;
  password: string;
  confirm: string;
};

function validate(form: Form) {
  const errs: Partial<Form> = {};
  const nameErr = (v: string, label: string) => {
    const t = v.trim();
    if (!t) return `El ${label} es obligatorio.`;
    if (t.length < NAME_MIN || t.length > NAME_MAX) return `El ${label} debe tener entre ${NAME_MIN} y ${NAME_MAX} caracteres.`;
    if (!NAME_RE.test(t)) return `El ${label} solo puede contener letras.`;
  };
  const nErr = nameErr(form.firstName, "nombre");
  if (nErr) errs.firstName = nErr;
  const aErr = nameErr(form.lastName, "apellido");
  if (aErr) errs.lastName = aErr;

  const email = form.email.trim();
  if (!email) errs.email = "El email es obligatorio.";
  else if (!email.includes("@")) errs.email = "El email debe contener el carácter especial @.";
  else if (email.length < 10 || email.length > 20) errs.email = "El email debe tener entre 10 y 20 caracteres.";
  else if (!EMAIL_RE.test(email)) errs.email = "Ingresá un email válido (ej. usuario@mail.com).";

  const tel = form.telefono.trim();
  const country = findCountry(form.codigoPais);
  const digits = tel.replace(/\D/g, "").length;
  const range = country.minDigits === country.maxDigits ? `${country.minDigits}` : `${country.minDigits} u ${country.maxDigits}`;
  if (!tel) errs.telefono = "El teléfono es obligatorio.";
  else if (tel.startsWith("+")) errs.telefono = "No incluyas el código de país: elegilo en la lista.";
  else if (!PHONE_RE.test(tel)) errs.telefono = `Usá solo números, espacios o guiones (ej. ${country.example}).`;
  else if (digits < country.minDigits || digits > country.maxDigits)
    errs.telefono = `Para ${country.name} ingresá ${range} dígitos, con código de área.`;

  if (!form.fechaNacimiento) errs.fechaNacimiento = "La fecha de nacimiento es obligatoria.";
  else {
    const [y, m, day] = form.fechaNacimiento.split("-").map(Number);
    const d = new Date(y, (m || 1) - 1, day || 1);
    const valid = DATE_RE.test(form.fechaNacimiento) && d.getFullYear() === y && d.getMonth() === m - 1 && d.getDate() === day;
    if (!valid) errs.fechaNacimiento = "Ingresá una fecha válida (AAAA-MM-DD).";
    else if (y < 1900) errs.fechaNacimiento = "El año no puede ser anterior a 1900.";
    else if (d > new Date()) errs.fechaNacimiento = "La fecha no puede ser futura.";
  }

  const pw = form.password;
  if (!pw) errs.password = "La contraseña es obligatoria.";
  else if (pw.length < 10 || pw.length > 20) errs.password = "La contraseña debe tener entre 10 y 20 caracteres.";
  else if (!/\d/.test(pw)) errs.password = "La contraseña debe incluir al menos un número.";
  else if (!/[^A-Za-z0-9\s]/.test(pw)) errs.password = "La contraseña debe incluir al menos un carácter especial (ej. ! @ # $ %).";
  else if (/\s/.test(pw)) errs.password = "La contraseña no puede contener espacios.";
  if (!form.confirm) errs.confirm = "Confirmá tu contraseña.";
  else if (form.confirm !== form.password) errs.confirm = "Las contraseñas no coinciden.";
  return errs;
}

export default function RegisterPage() {
  const router = useRouter();
  const { setSession } = useAuth();
  const { notify } = useToast();
  const [form, setForm] = useState<Form>({ firstName: "", lastName: "", email: "", codigoPais: COUNTRIES[0].code, telefono: "", fechaNacimiento: "", password: "", confirm: "" });
  const [touched, setTouched] = useState<Partial<Record<keyof Form, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  // Se recalcula en cada tecla; solo se muestra en campos ya usados (o tras enviar)
  const errors = validate(form);
  const touch = (k: keyof Form) => setTouched((t) => ({ ...t, [k]: true }));

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value } = e.target;
    setForm((f) => ({ ...f, [k]: value }));
    // El input de fecha emite años parciales (0002, 0019...) mientras se escribe
    if (k !== "fechaNacimiento" || Number(value.split("-")[0]) >= 1000) touch(k);
  };

  const field = (k: keyof Form) => ({
    name: k,
    value: form[k],
    onChange: set(k),
    onBlur: () => touch(k),
    error: submitted || touched[k] ? errors[k] : undefined,
  });

  const finish = (s: AuthSession, msg: string) => {
    setSession(s);
    notify(msg, "success");
    router.replace("/dashboard");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length) return;

    setFormError("");
    setLoading(true);
    try {
      const s = await authService.register({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        telefono: `${form.codigoPais} ${form.telefono.trim()}`,
        fechaNacimiento: form.fechaNacimiento,
        password: form.password,
      });
      finish(s, "¡Registro exitoso! Bienvenido/a a Aula para todos.");
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Ocurrió un error inesperado.");
      setLoading(false);
    }
  };

  const google = async () => {
    setLoading(true);
    try {
      finish(await authService.loginWithGoogle(), "Ingresaste con Google correctamente.");
    } catch {
      setFormError("No pudimos continuar con Google.");
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Crear cuenta" subtitle="Empezá a aprender hoy">
      <form onSubmit={onSubmit} noValidate className="space-y-2.5">
        {formError && (
          <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {formError}
          </div>
        )}
        <div className="grid min-w-0 gap-3 sm:gap-4 md:grid-cols-2">
          <FormField label="Nombre" maxLength={NAME_MAX} autoComplete="given-name" {...field("firstName")} />
          <FormField label="Apellido" maxLength={NAME_MAX} autoComplete="family-name" {...field("lastName")} />
        </div>
        <FormField label="Email" type="email" maxLength={20} autoComplete="email" {...field("email")} />
        <div className="grid min-w-0 grid-cols-[7rem_minmax(0,1fr)] items-start gap-3 sm:gap-4">
          <FormSelect label="Código país" name="codigoPais" autoComplete="tel-country-code" value={form.codigoPais} onChange={set("codigoPais")}>
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code} title={c.name}>
                {c.code} {c.iso}
              </option>
            ))}
          </FormSelect>
          <FormField label="Teléfono" type="tel" maxLength={PHONE_MAX} inputMode="tel" autoComplete="tel-national" placeholder={findCountry(form.codigoPais).example} {...field("telefono")} />
        </div>
        <FormField label="Fecha de nacimiento" type="date" autoComplete="bday" min="1900-01-01" max={new Date().toISOString().slice(0, 10)} {...field("fechaNacimiento")} />
        <FormField label="Contraseña" type="password" maxLength={20} autoComplete="new-password" {...field("password")} />
        <FormField label="Confirmar contraseña" type="password" maxLength={20} autoComplete="new-password" {...field("confirm")} />
        <button type="submit" disabled={loading} className="w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-60">
          {loading ? "Creando cuenta..." : "Registrarme"}
        </button>
      </form>

      <div className="my-3 flex items-center gap-3 text-xs text-slate-400">
        <span className="h-px flex-1 bg-slate-200" /> o <span className="h-px flex-1 bg-slate-200" />
      </div>
      <GoogleButton disabled={loading} onClick={google} />

      <p className="mt-3 text-center text-sm text-slate-500">
        ¿Ya tenés cuenta?{" "}
        <Link href="/login" className="font-semibold text-slate-900 hover:underline">
          Iniciá sesión
        </Link>
      </p>
    </AuthShell>
  );
}
