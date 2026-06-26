import express from "express";
import type { Application } from "express";
import studentRouter from "./routes/studentRouter.js";
import courseRouter from "./routes/courseRouter.js";
import classRouter from "./routes/classRouter.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app: Application = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/students", studentRouter);
app.use("/api/courses", courseRouter);
app.use("/api/classes", classRouter);

app.get("/", (_req, res) => {
  res.send("Hello, TypeScript + Express!");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});