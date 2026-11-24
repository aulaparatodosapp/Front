import { mockAccounts } from "@/data/mockData";
import type { AuthSession, RegisterPayload } from "@/types";

const delay = (ms = 700) => new Promise((r) => setTimeout(r, ms));

/** Cuentas registradas en memoria durante la sesión del navegador (solo mock). */
const registered = [...mockAccounts];

function toSession(acc: (typeof registered)[number]): AuthSession {
  const { password, ...user } = acc;
  void password;
  return { user, token: `mock-token-${acc.id}-${Date.now()}` };
}

export const authService = {
  async login(email: string, password: string): Promise<AuthSession> {
    await delay();
    // TODO(backend): return fetch(`${API_URL}/auth/login`, { method: "POST", body: JSON.stringify({ email, password }) })
    const acc = registered.find(
      (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password,
    );
    if (!acc) throw new Error("Email o contraseña incorrectos.");
    return toSession(acc);
  },

  async register(data: RegisterPayload): Promise<AuthSession> {
    await delay();
    // TODO(backend): POST `${API_URL}/auth/register`
    //   body: { nombre, apellido, email, telefono, fechaNacimiento (yyyy-mm-dd), password }
    //   El backend genera `id` (uuid) y `fechaRegistro`, y devuelve { user, token }.
    if (registered.some((a) => a.email.toLowerCase() === data.email.toLowerCase())) {
      throw new Error("Ya existe una cuenta con ese email.");
    }
    const acc = {
      ...data,
      id: crypto.randomUUID(), // generado por el backend
      fechaRegistro: new Date().toISOString().slice(0, 10), // generado por el backend
    };
    registered.push(acc);
    return toSession(acc);
  },

  /** Mock de OAuth. En producción: window.location.href = `${API_URL}/auth/google` */
  async loginWithGoogle(): Promise<AuthSession> {
    await delay(900);
    // TODO(backend): redirigir a `${API_URL}/auth/google` y recibir el token en el callback.
    return toSession(registered[0]);
  },
};
