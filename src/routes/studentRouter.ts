import express from "express";
import StudentController from "../controllers/StudentController.js";

const router = express.Router();

router.post("/", StudentController.createStudent);
router.get("/:id", StudentController.getStudent);
router.put("/:id/grade", StudentController.updateGrade);
router.get("/:id/courses", StudentController.getStudentCourses);
router.post("/:id/courses", StudentController.assignCourseToStudent);

export default router;
