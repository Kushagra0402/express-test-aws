import prisma from "../prisma.js";

export interface CreateClassInput {
  className: string;
  classTeacherName: string;
}

const classClient = prisma["class"];

const ClassRepository = {
  findById: (id: number) =>
    classClient.findUnique({
      where: { id },
      include: { students: true },
    }),

  create: (data: CreateClassInput) => classClient.create({ data }),

  averageGrade: (classId: number) =>
    prisma.student.aggregate({
      _avg: { finalGrade: true },
      where: { classId },
    }),
};

export default ClassRepository;
