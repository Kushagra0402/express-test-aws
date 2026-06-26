import CourseRepository, { CreateCourseInput } from "../repositories/CourseRepository.js";

const CourseService = {
  getCourseById: (id: number) => CourseRepository.findById(id),
  getCourseStudents: (courseId: number) => CourseRepository.findStudentsByCourseId(courseId),
  createCourse: (data: CreateCourseInput) => CourseRepository.create(data),
  updateCourse: (id: number, data: Partial<CreateCourseInput>) => CourseRepository.update(id, data),
};

export default CourseService;
