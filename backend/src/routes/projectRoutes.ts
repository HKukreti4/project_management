import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from "controllers/project.controller";
import express from "express";
import { authMiddleware } from "middlewares/auth.middleware";

const projectRoutes = express.Router();

projectRoutes.post("/project/add", authMiddleware, createProject);
projectRoutes.get("/projects", authMiddleware, getProjects);
projectRoutes.get("/project/:projectId", authMiddleware, getProjectById);
projectRoutes.delete("/project/:projectId", authMiddleware, deleteProject);
projectRoutes.put("/project/:projectId", authMiddleware, updateProject);

export default projectRoutes;
