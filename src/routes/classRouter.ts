import express from "express";
import ClassController from "../controllers/ClassController.js";

const router = express.Router();

router.post("/", ClassController.createClass);
router.get("/:id", ClassController.getClass);
router.get("/:id/average-grade", ClassController.getAverageGrade);

export default router;
