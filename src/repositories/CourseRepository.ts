import prisma from "../prisma.js";

export interface CreateCourseInput {
  courseName: string;
  courseCode: string;
  courseCredit: number;
}

const CourseRepository = {
  findById: (id: number) =>
    prisma.course.findUnique({
      where: { id },
      include: { enrollments: { include: { student: true } } },
    }),

  findStudentsByCourseId: async (courseId: number) => {
    const enrollments = await prisma.enrollment.findMany({
      where: { courseId },
      include: { student: true },
    });
    return enrollments.map((enrollment) => enrollment.student);
  },

  create: (data: CreateCourseInput) => prisma.course.create({ data }),

  update: (id: number, data: Partial<CreateCourseInput>) =>
    prisma.course.update({ where: { id }, data }),
};

export default CourseRepository;
