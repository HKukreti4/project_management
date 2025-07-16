import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  getUserProjectsWithTasks,
  updateProject,
} from "controllers/project.controller";
import express from "express";
import { authMiddleware } from "middlewares/auth.middleware";

const projectRoutes = express.Router();

projectRoutes.post("/project/add", authMiddleware, createProject);
projectRoutes.get("/projects", authMiddleware, getProjects);
projectRoutes.get("/project-details", authMiddleware, getUserProjectsWithTasks);
projectRoutes.get("/project/:projectId", authMiddleware, getProjectById);
projectRoutes.delete("/project/:projectId", authMiddleware, deleteProject);
projectRoutes.put("/project/:projectId", authMiddleware, updateProject);

export default projectRoutes;
