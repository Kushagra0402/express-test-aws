import prisma from "../prisma.js";

export interface CreateStudentInput {
  firstName: string;
  lastName: string;
  classId: number;
  finalGrade?: number | null;
}

const StudentRepository = {
  findById: (id: number) =>
    prisma.student.findUnique({
      where: { id },
      include: {
        class: true,
        enrollments: { include: { course: true } },
      },
    }),

  findCoursesByStudentId: async (studentId: number) => {
    const enrollments = await prisma.enrollment.findMany({
      where: { studentId },
      include: { course: true },
    });
    return enrollments.map((enrollment) => enrollment.course);
  },

  create: (data: CreateStudentInput) => prisma.student.create({ data }),

  updateGrade: (id: number, finalGrade: number) =>
    prisma.student.update({
      where: { id },
      data: { finalGrade },
    }),

  assignCourse: (studentId: number, courseId: number) =>
    prisma.enrollment.create({
      data: { studentId, courseId },
    }),
};

export default StudentRepository;
