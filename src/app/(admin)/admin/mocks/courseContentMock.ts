
export interface CourseClass {
  id: number;
  title: string;
  videoUrl?: string;
  content?: string;
}

export type ModuleType = "obligatorio" | "adicional";

export interface CourseModule {
  id: number;
  courseId: number;
  title: string;
  type: ModuleType;
  classes: CourseClass[];  
}

export const courseContentMock: CourseModule[] = [
  {
    id: 1,
    courseId: 1,
    title: "Introducción a HTML",
    type: "obligatorio",    
    classes: [
      {
        id: 1,
        title: "¿Qué es HTML?",
        videoUrl: "https://www.youtube.com/watch?v=example1",
        content: "Introducción al lenguaje HTML y su función en el desarrollo web.",
      },
      {
        id: 2,
        title: "Estructura de un documento HTML",
        content: "Conocemos las etiquetas principales de un documento HTML.",
      },
      {
        id: 3,
        title: "Primer documento HTML",
        videoUrl: "https://www.youtube.com/watch?v=example2",
      },
    ],
  },
  {
    id: 2,
    courseId: 1,
    title: "Contenido adicional: HTML avanzado",
    type: "adicional",    
    classes: [
      {
        id: 4,
        title: "Formularios avanzados",
        content: "Aprendemos a crear formularios con diferentes tipos de campos.",
      },
      {
        id: 5,
        title: "Tablas en HTML",
      },
      {
        id: 6,
        title: "Buenas prácticas de HTML",
        videoUrl: "https://www.youtube.com/watch?v=example3",
        content: "Recomendaciones para escribir HTML organizado y accesible.",
      },
    ],
  },
];
