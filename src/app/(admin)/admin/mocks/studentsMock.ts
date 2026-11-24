
export interface Student {
  id: number;
  name: string;
  email: string;
  benefit: "Premium" | "Estándar";
  enrollments: string[];
}

export const studentsMock: Student[] = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan.perez@email.com",
    benefit: "Premium",
    enrollments: ["Web Development", "Introduction to Programming"],
  },
  {
    id: 2,
    name: "Ana López",
    email: "ana.lopez@email.com",
    benefit: "Estándar",
    enrollments: ["Introduction to Computer Science"],
  },
  {
    id: 3,
    name: "Carlos Gómez",
    email: "carlos.gomez@email.com",
    benefit: "Premium",
    enrollments: ["Web Development"],
  },
  {
    id: 4,
    name: "María Torres",
    email: "maria.torres@email.com",
    benefit: "Estándar",
    enrollments: ["Office Tools", "Introduction to Programming"],
  },
];
