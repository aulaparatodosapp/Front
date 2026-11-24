import type { Course, Donation, Enrollment, Lesson, User } from "@/types";

export interface MockAccount extends User {
  password: string;
}

export const mockAccounts: MockAccount[] = [
  { id: "u1", firstName: "Lucía", lastName: "Fernández", email: "alumno@aulaparatodos.org", telefono: "+54 11 5555-1234", fechaNacimiento: "2001-04-12", fechaRegistro: "2026-01-15", password: "123456", benefit: "ESTANDAR" },
  { id: "u2", firstName: "Mateo", lastName: "Gómez", email: "premium@aulaparatodos.org", telefono: "+54 351 555-9876", fechaNacimiento: "1998-09-30", fechaRegistro: "2026-02-03", password: "123456", benefit: "PREMIUM" },
];

/** Cursos tal como los devolverá el backend. */
export const mockCourses: Course[] = [
  { id: 1, nombre: "Introducción a la informática", nivel: "Básico", descripcion: "Aprende los fundamentos de la informática y el uso básico de una computadora.", imagen: "/images/courses/informatica.jpg" },
  { id: 2, nombre: "Herramientas de oficina", nivel: "Básico", descripcion: "Conoce las herramientas esenciales para crear documentos, hojas de cálculo y presentaciones.", imagen: "/images/courses/ofimatica.jpg" },
  { id: 3, nombre: "Internet y seguridad digital", nivel: "Básico", descripcion: "Aprende a navegar por internet y proteger tu información personal.", imagen: "/images/courses/seguridad-digital.jpg" },
  { id: 4, nombre: "Herramientas digitales", nivel: "Intermedio", descripcion: "Desarrolla habilidades para utilizar herramientas digitales en tus actividades diarias.", imagen: "/images/courses/herramientas-digitales.jpg" },
  { id: 5, nombre: "Diseño digital", nivel: "Intermedio", descripcion: "Descubre los principios del diseño y crea tus primeros proyectos visuales.", imagen: "/images/courses/diseño-digital.jpg" },
  { id: 6, nombre: "Introducción a la programación", nivel: "Intermedio", descripcion: "Conoce los conceptos fundamentales de la programación y la lógica computacional.", imagen: "/images/courses/programación.jpg" },
  { id: 7, nombre: "Desarrollo web", nivel: "Avanzado", descripcion: "Aprende a construir sitios web utilizando tecnologías modernas.", imagen: "/images/courses/desarrollo-web.jpg" },
  { id: 8, nombre: "Análisis de datos", nivel: "Avanzado", descripcion: "Aprende a organizar, interpretar y visualizar información para tomar decisiones.", imagen: "/images/courses/análisis-de-datos.jpg" },
  { id: 9, nombre: "Desarrollo de proyectos digitales", nivel: "Avanzado", descripcion: "Planifica y desarrolla proyectos digitales aplicando tus conocimientos.", imagen: "/images/courses/proyectos-digitales.jpg" },
];

const L = (id: string, title: string, duration: string, premiumOnly: boolean, description: string): Lesson => ({ id, title, duration, premiumOnly, description });

/**
 * Datos mock EXTRA (cupos y clases) que el backend todavía no entrega.
 * Se combinan con `mockCourses` por `id` en studentService.
 */
export const mockCourseExtras: Record<number, { availableSlots: number; lessons: Lesson[] }> = {
  1: { availableSlots: 4, lessons: [L("1-1", "Partes de la computadora", "20 min", false, "Hardware y periféricos básicos."), L("1-2", "Sistema operativo y archivos", "30 min", false, "Carpetas, archivos y escritorio."), L("1-3", "Taller de práctica guiada", "45 min", true, "Ejercicios con acompañamiento del docente.")] },
  2: { availableSlots: 12, lessons: [L("2-1", "Procesador de textos", "30 min", false, "Crear y dar formato a documentos."), L("2-2", "Hojas de cálculo", "35 min", false, "Fórmulas y tablas básicas."), L("2-3", "Presentaciones efectivas", "40 min", true, "Diseño de diapositivas con devolución personalizada.")] },
  3: { availableSlots: 1, lessons: [L("3-1", "Navegar de forma segura", "25 min", false, "Buscadores, sitios confiables y estafas."), L("3-2", "Contraseñas y privacidad", "30 min", false, "Gestión de claves y datos personales."), L("3-3", "Clase en vivo: casos reales", "60 min", true, "Análisis de casos con el docente.")] },
  4: { availableSlots: 8, lessons: [L("4-1", "Almacenamiento en la nube", "25 min", false, "Compartir y organizar archivos."), L("4-2", "Videollamadas y colaboración", "30 min", false, "Herramientas de trabajo remoto."), L("4-3", "Automatizá tareas cotidianas", "40 min", true, "Atajos y flujos de trabajo avanzados.")] },
  5: { availableSlots: 6, lessons: [L("5-1", "Principios de diseño", "30 min", false, "Color, tipografía y composición."), L("5-2", "Tu primera pieza gráfica", "40 min", false, "Creación paso a paso."), L("5-3", "Revisión personalizada de portfolio", "45 min", true, "Feedback individual del docente.")] },
  6: { availableSlots: 10, lessons: [L("6-1", "¿Qué es programar?", "20 min", false, "Algoritmos y lógica."), L("6-2", "Variables y condicionales", "40 min", false, "Primeros programas."), L("6-3", "Proyecto guiado", "60 min", true, "Construcción de un programa completo.")] },
  7: { availableSlots: 0, lessons: [L("7-1", "HTML y CSS básicos", "40 min", false, "Estructura y estilos de una página."), L("7-2", "Interactividad con JavaScript", "45 min", false, "Eventos y manipulación del DOM."), L("7-3", "Despliegue de tu sitio", "35 min", true, "Publicación con acompañamiento.")] },
  8: { availableSlots: 3, lessons: [L("8-1", "Organización de datos", "30 min", false, "Limpieza y estructura de tablas."), L("8-2", "Gráficos e indicadores", "40 min", false, "Visualización para decidir."), L("8-3", "Caso práctico con mentoría", "60 min", true, "Análisis de un dataset real con el docente.")] },
  9: { availableSlots: 0, lessons: [L("9-1", "Planificación de proyectos", "30 min", false, "Objetivos, alcance y cronograma."), L("9-2", "Trabajo en equipo", "30 min", false, "Roles y herramientas colaborativas."), L("9-3", "Mentoría de proyecto final", "60 min", true, "Seguimiento personalizado de tu proyecto.")] },
};

/** Inscripciones iniciales por usuario */
export const mockEnrollments: Record<string, Enrollment[]> = {
  u1: [
    { id: "e1", courseId: 1, status: "En curso", progress: 45, enrolledAt: "2026-09-10" },
    { id: "e2", courseId: 2, status: "Pendiente", progress: 0, enrolledAt: "2026-11-02" },
  ],
  u2: [
    { id: "e3", courseId: 1, status: "Completada", progress: 100, enrolledAt: "2026-06-01" },
    { id: "e4", courseId: 3, status: "En curso", progress: 70, enrolledAt: "2026-08-15" },
  ],
};

export const mockDonations: Record<string, Donation[]> = {
  u1: [
    { id: "d1", date: "2026-10-05", amount: 5000, method: "Mercado Pago", status: "Aprobada" },
    { id: "d2", date: "2026-08-20", amount: 2500, method: "Transferencia bancaria", status: "Aprobada" },
    { id: "d3", date: "2026-11-15", amount: 3000, method: "Tarjeta de crédito", status: "Pendiente" },
  ],
  u2: [],
};
