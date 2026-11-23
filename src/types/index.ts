export type BenefitType = "ESTANDAR" | "PREMIUM";
export type EnrollmentStatus = "Activa" | "En curso" | "Pendiente" | "Completada";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  telefono: string;
  fechaNacimiento: string; // ISO yyyy-mm-dd
  fechaRegistro: string; // ISO, generado al registrarse
  benefit: BenefitType;
}

/** Datos que envía el formulario de registro (sin id ni fechaRegistro: los genera el backend) */
export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  telefono: string;
  fechaNacimiento: string;
  password: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  premiumOnly: boolean;
  description: string;
}

export type CourseLevel = "Básico" | "Intermedio" | "Avanzado";

export interface Course {
  id: number;
  nombre: string;
  nivel: CourseLevel;
  descripcion: string;
  imagen: string;
  // Datos mock extra (el backend todavía no los entrega): opcionales
  availableSlots?: number;
  lessons?: Lesson[];
}

export interface Enrollment {
  id: string;
  courseId: number;
  status: EnrollmentStatus;
  progress: number; // 0-100
  enrolledAt: string; // ISO
}

export interface Donation {
  id: string;
  date: string; // ISO
  amount: number;
  method: string;
  status: "Aprobada" | "Pendiente" | "Rechazada";
}

export interface AuthSession {
  user: User;
  token: string;
}
