import { Request, Response } from "express";
import Project from "../models/projectModel";

import { AuthRequest } from "middlewares/auth.middleware";

export const createProject = async (req: AuthRequest, res: Response) => {
  const { title, description, status } = req.body;

  if (!req.user.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const newProject = await Project.create({
      title,
      description,
      status,
      userId: req.user.id,
    });

    return res
      .status(201)
      .json({ message: "Project created", project: newProject });
  } catch (error) {
    return res.status(500).json({ error: "Server error", details: error });
  }
};
