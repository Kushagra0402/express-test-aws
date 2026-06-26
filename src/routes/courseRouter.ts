import express from "express";
import CourseController from "../controllers/CourseController.js";

const router = express.Router();

router.post("/", CourseController.createCourse);
router.get("/:id", CourseController.getCourse);
router.put("/:id", CourseController.updateCourse);
router.get("/:id/students", CourseController.getCourseStudents);

export default router;
