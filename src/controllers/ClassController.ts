import type { Request, Response } from "express";
import ClassService from "../services/ClassService.js";
import ApiError from "../errors/ApiError.js";

const ClassController = {
  getClass: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const classItem = await ClassService.getClassById(id);
    if (!classItem) throw new ApiError(404, "Class not found");
    res.json(classItem);
  },

  getAverageGrade: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const average = await ClassService.getAverageGrade(id);
    res.json(average);
  },

  createClass: async (req: Request, res: Response) => {
    const created = await ClassService.createClass(req.body);
    res.status(201).json(created);
  },
};

export default ClassController;
