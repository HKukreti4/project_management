import express from "express";
import {
  createTask,
  getTasksByProject,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const taskRoutes = express.Router();

taskRoutes.use(authMiddleware);

taskRoutes.post("/create-task", createTask); // Create
taskRoutes.get("/tasks/:projectId", getTasksByProject); // List by project
taskRoutes.get("/task/:taskId", getTaskById); // Read
taskRoutes.put("/task/:taskId", updateTask); // Update
taskRoutes.delete("/task/:taskId", deleteTask); // Delete

export default taskRoutes;
