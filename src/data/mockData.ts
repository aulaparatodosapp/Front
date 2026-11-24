
import type {
  Course,
  Donation,
  Enrollment,
  Lesson,
  User,
} from "@/types";

export interface MockAccount extends User {
  password: string;
}

// CUENTAS DE PRUEBA
export const mockAccounts: MockAccount[] = [
  {
    id: "u1",
    firstName: "Lucía",
    lastName: "Fernández",
    email: "alumno@aulaparatodos.org",
    telefono: "+54 11 5555-1234",
    fechaNacimiento: "2001-04-12",
    fechaRegistro: "2026-01-15",
    password: "123456",
  },
  {
    id: "u2",
    firstName: "Mateo",
    lastName: "Gómez",
    email: "premium@aulaparatodos.org",
    telefono: "+54 351 555-9876",
    fechaNacimiento: "1998-09-30",
    fechaRegistro: "2026-02-03",
    password: "123456",
  },
];

// CATÁLOGO DE CURSOS
export const mockCourses: Course[] = [
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

// FUNCIÓN PARA CREAR LECCIONES
const L = (
  id: string,
  title: string,
  duration: string,
  description: string
): Lesson => ({
  id,
  title,
  duration,
  description,
});

// CUPOS Y MÓDULOS DE LOS CURSOS
export const mockCourseExtras: Record<
  number,
  {
    availableSlots: number;
    lessons: Lesson[];
  }
> = {
  // CURSO 1
  1: {
    availableSlots: 4,
    lessons: [
      L(
        "1-1",
        "Conociendo la computadora",
        "20 min",
        "Introducción al funcionamiento y uso básico de una computadora."
      ),
      L(
        "1-2",
        "Hardware y software",
        "30 min",
        "Identificación de componentes físicos y programas informáticos."
      ),
      L(
        "1-3",
        "Sistema operativo",
        "30 min",
        "Conoce el escritorio y las funciones principales del sistema operativo."
      ),
      L(
        "1-4",
        "Archivos y carpetas",
        "45 min",
        "Aprende a crear, organizar, guardar y administrar archivos."
      ),
    ],
  },

  // CURSO 2
  2: {
    availableSlots: 12,
    lessons: [
      L(
        "2-1",
        "Introducción a las herramientas de oficina",
        "20 min",
        "Conoce las principales aplicaciones de oficina."
      ),
      L(
        "2-2",
        "Procesadores de texto",
        "30 min",
        "Creación y edición de documentos digitales."
      ),
      L(
        "2-3",
        "Hojas de cálculo",
        "35 min",
        "Organización de información, tablas y fórmulas básicas."
      ),
      L(
        "2-4",
        "Presentaciones digitales",
        "40 min",
        "Creación y diseño de presentaciones."
      ),
    ],
  },

  // CURSO 3
  3: {
    availableSlots: 1,
    lessons: [
      L(
        "3-1",
        "Introducción a internet",
        "20 min",
        "Conceptos básicos sobre internet y sus principales servicios."
      ),
      L(
        "3-2",
        "Navegadores y buscadores",
        "25 min",
        "Uso de navegadores y búsqueda eficiente de información."
      ),
      L(
        "3-3",
        "Privacidad y contraseñas",
        "30 min",
        "Protección de cuentas, contraseñas y datos personales."
      ),
      L(
        "3-4",
        "Prevención de riesgos digitales",
        "40 min",
        "Identificación de amenazas, fraudes y riesgos en internet."
      ),
    ],
  },

  // CURSO 4
  4: {
    availableSlots: 8,
    lessons: [
      L(
        "4-1",
        "Productividad digital",
        "25 min",
        "Herramientas para mejorar la productividad personal."
      ),
      L(
        "4-2",
        "Almacenamiento en la nube",
        "30 min",
        "Guardar, compartir y organizar archivos en línea."
      ),
      L(
        "4-3",
        "Herramientas colaborativas",
        "35 min",
        "Comunicación y trabajo colaborativo en entornos digitales."
      ),
      L(
        "4-4",
        "Organización de proyectos",
        "40 min",
        "Planificación y seguimiento de tareas mediante herramientas digitales."
      ),
    ],
  },

  // CURSO 5
  5: {
    availableSlots: 6,
    lessons: [
      L(
        "5-1",
        "Fundamentos del diseño",
        "30 min",
        "Principios básicos de composición y comunicación visual."
      ),
      L(
        "5-2",
        "Color y tipografía",
        "35 min",
        "Uso del color y selección de tipografías."
      ),
      L(
        "5-3",
        "Herramientas de diseño",
        "40 min",
        "Introducción a las aplicaciones de diseño digital."
      ),
      L(
        "5-4",
        "Proyecto visual",
        "45 min",
        "Creación de una pieza gráfica aplicando los conocimientos adquiridos."
      ),
    ],
  },

  // CURSO 6
  6: {
    availableSlots: 10,
    lessons: [
      L(
        "6-1",
        "Pensamiento computacional",
        "25 min",
        "Resolución de problemas mediante el pensamiento lógico."
      ),
      L(
        "6-2",
        "Algoritmos y diagramas de flujo",
        "35 min",
        "Representación de soluciones mediante algoritmos y diagramas."
      ),
      L(
        "6-3",
        "Variables y operadores",
        "40 min",
        "Conceptos básicos de variables, datos y operaciones."
      ),
      L(
        "6-4",
        "Condicionales y ciclos",
        "45 min",
        "Estructuras de decisión y repetición en programación."
      ),
    ],
  },

  // CURSO 7
  7: {
    availableSlots: 0,
    lessons: [
      L(
        "7-1",
        "Fundamentos del desarrollo web",
        "30 min",
        "Introducción al funcionamiento de los sitios web."
      ),
      L(
        "7-2",
        "HTML",
        "40 min",
        "Creación de la estructura de una página web."
      ),
      L(
        "7-3",
        "CSS",
        "45 min",
        "Diseño, estilos y presentación de páginas web."
      ),
      L(
        "7-4",
        "JavaScript",
        "50 min",
        "Incorporación de funcionalidades e interactividad."
      ),
      L(
        "7-5",
        "Proyecto web final",
        "60 min",
        "Desarrollo de un sitio web aplicando los conocimientos adquiridos."
      ),
    ],
  },

  // CURSO 8
  8: {
    availableSlots: 3,
    lessons: [
      L(
        "8-1",
        "Introducción al análisis de datos",
        "25 min",
        "Conceptos fundamentales del análisis de información."
      ),
      L(
        "8-2",
        "Preparación de datos",
        "35 min",
        "Limpieza, organización y preparación de conjuntos de datos."
      ),
      L(
        "8-3",
        "Análisis exploratorio",
        "45 min",
        "Identificación de patrones e interpretación de información."
      ),
      L(
        "8-4",
        "Visualización de información",
        "50 min",
        "Creación de gráficos y presentación de resultados."
      ),
    ],
  },

  // CURSO 9
  9: {
    availableSlots: 0,
    lessons: [
      L(
        "9-1",
        "Identificación de necesidades",
        "30 min",
        "Identificación de problemas y oportunidades de mejora."
      ),
      L(
        "9-2",
        "Planificación de proyectos",
        "35 min",
        "Definición de objetivos, recursos y cronogramas."
      ),
      L(
        "9-3",
        "Desarrollo de soluciones",
        "50 min",
        "Implementación de soluciones mediante herramientas digitales."
      ),
      L(
        "9-4",
        "Evaluación y presentación final",
        "60 min",
        "Evaluación de resultados y presentación del proyecto desarrollado."
      ),
    ],
  },
};

// INSCRIPCIONES INICIALES POR USUARIO
export const mockEnrollments: Record<string, Enrollment[]> = {
  u1: [
    {
      id: "e1",
      courseId: 1,
      status: "En curso",
      progress: 45,
      enrolledAt: "2026-09-10",
    },
    {
      id: "e2",
      courseId: 2,
      status: "Pendiente",
      progress: 0,
      enrolledAt: "2026-11-02",
    },
  ],
  u2: [
    {
      id: "e3",
      courseId: 1,
      status: "Completada",
      progress: 100,
      enrolledAt: "2026-06-01",
    },
    {
      id: "e4",
      courseId: 3,
      status: "En curso",
      progress: 70,
      enrolledAt: "2026-08-15",
    },
  ],
};

// HISTORIAL DE DONACIONES
export const mockDonations: Record<string, Donation[]> = {
  u1: [
    {
      id: "d1",
      date: "2026-10-05",
      amount: 5000,
      method: "Mercado Pago",
      status: "Aprobada",
    },
    {
      id: "d2",
      date: "2026-08-20",
      amount: 2500,
      method: "Transferencia bancaria",
      status: "Aprobada",
    },
    {
      id: "d3",
      date: "2026-11-15",
      amount: 3000,
      method: "Tarjeta de crédito",
      status: "Pendiente",
    },
  ],
  u2: [],
};
