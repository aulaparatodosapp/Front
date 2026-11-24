import { mockCourseExtras, mockCourses, mockDonations, mockEnrollments } from "@/data/mockData";
import type { Course, Donation, Enrollment } from "@/types";

const delay = (ms = 600) => new Promise((r) => setTimeout(r, ms));

// Estado mock en memoria (se reemplaza por la base de datos del backend)
// Cursos + cupos/clases mock extra (hasta que el backend los entregue)
const courses: Course[] = structuredClone(mockCourses).map((c) => ({ ...c, ...structuredClone(mockCourseExtras[c.id]) }));
const enrollments: Record<string, Enrollment[]> = structuredClone(mockEnrollments);

export const studentService = {
  async getCourses(): Promise<Course[]> {
    await delay();
    // TODO(backend): fetch(`${API_URL}/courses`)
    return structuredClone(courses);
  },

  async getEnrollments(userId: string): Promise<Enrollment[]> {
    await delay();
    // TODO(backend): fetch(`${API_URL}/students/${userId}/enrollments`)
    return structuredClone(enrollments[userId] ?? []);
  },

  async getDonations(userId: string): Promise<Donation[]> {
    await delay();
    // TODO(backend): fetch(`${API_URL}/students/${userId}/donations`)
    return structuredClone(mockDonations[userId] ?? []);
  },

  async enroll(userId: string, courseId: number): Promise<{ enrollment: Enrollment; course: Course }> {
    await delay(800);
    // TODO(backend): fetch(`${API_URL}/courses/${courseId}/enroll`, { method: "POST" })
    const course = courses.find((c) => c.id === courseId);
    if (!course) throw new Error("El curso no existe.");
    const list = (enrollments[userId] ??= []);
    if (list.some((e) => e.courseId === courseId)) throw new Error("Ya estás inscripto en este curso.");
    // Si el curso no informa cupos (undefined), se considera sin límite.
    if (course.availableSlots !== undefined) {
      if (course.availableSlots <= 0) throw new Error("No hay cupos disponibles para este curso.");
      course.availableSlots -= 1;
    }
    const enrollment: Enrollment = {
      id: `e${Date.now()}`,
      courseId,
      status: "Activa",
      progress: 0,
      enrolledAt: new Date().toISOString().slice(0, 10),
    };
    list.push(enrollment);
    return { enrollment: structuredClone(enrollment), course: structuredClone(course) };
  },
};
