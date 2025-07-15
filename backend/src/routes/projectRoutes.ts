import { createProject } from "controllers/project.controller";
import express from "express";
import { authMiddleware } from "middlewares/auth.middleware";

const projectRoutes = express.Router();

projectRoutes.post("/add", authMiddleware, createProject);

export default projectRoutes;
