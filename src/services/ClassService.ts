import ClassRepository, { CreateClassInput } from "../repositories/ClassRepository.js";

const ClassService = {
  getClassById: (id: number) => ClassRepository.findById(id),
  createClass: (data: CreateClassInput) => ClassRepository.create(data),
  getAverageGrade: (classId: number) => ClassRepository.averageGrade(classId),
};

export default ClassService;
