import type { Request, Response } from "express";
import CourseService from "../services/CourseService.js";
import ApiError from "../errors/ApiError.js";

const CourseController = {
  getCourse: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const course = await CourseService.getCourseById(id);
    if (!course) throw new ApiError(404, "Course not found");
    res.json(course);
  },

  getCourseStudents: async (req: Request, res: Response) => {
    const courseId = Number(req.params.id);
    const students = await CourseService.getCourseStudents(courseId);
    res.json(students);
  },

  createCourse: async (req: Request, res: Response) => {
    const created = await CourseService.createCourse(req.body);
    res.status(201).json(created);
  },

  updateCourse: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const updated = await CourseService.updateCourse(id, req.body);
    res.json(updated);
  },
};

export default CourseController;
