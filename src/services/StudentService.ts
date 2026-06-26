import StudentRepository, { CreateStudentInput } from "../repositories/StudentRepository.js";

const StudentService = {
  getStudentById: (id: number) => StudentRepository.findById(id),
  getStudentCourses: (studentId: number) => StudentRepository.findCoursesByStudentId(studentId),
  createStudent: (data: CreateStudentInput) => StudentRepository.create(data),
  updateStudentGrade: (id: number, finalGrade: number) => StudentRepository.updateGrade(id, finalGrade),
  assignCourseToStudent: (studentId: number, courseId: number) => StudentRepository.assignCourse(studentId, courseId),
};

export default StudentService;
