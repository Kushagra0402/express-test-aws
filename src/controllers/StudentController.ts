import type { Request, Response } from "express";
import StudentService from "../services/StudentService.js";
import ApiError from "../errors/ApiError.js";

const StudentController = {
  getStudent: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const student = await StudentService.getStudentById(id);
    if (!student) throw new ApiError(404, "Student not found");
    res.json(student);
  },

  getStudentCourses: async (req: Request, res: Response) => {
    const studentId = Number(req.params.id);
    const courses = await StudentService.getStudentCourses(studentId);
    res.json(courses);
  },

  createStudent: async (req: Request, res: Response) => {
    const created = await StudentService.createStudent(req.body);
    res.status(201).json(created);
  },

  updateGrade: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { finalGrade } = req.body;
    const updated = await StudentService.updateStudentGrade(id, Number(finalGrade));
    res.json(updated);
  },

  assignCourseToStudent: async (req: Request, res: Response) => {
    const studentId = Number(req.params.id);
    const { courseId } = req.body;
    const enrollment = await StudentService.assignCourseToStudent(studentId, Number(courseId));
    res.status(201).json(enrollment);
  },
};

export default StudentController;
