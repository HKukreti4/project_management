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
export const updateProject = async (req: AuthRequest, res: Response) => {
  const { title, description, status } = req.body;

  if (!req.user.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const updatedProject = await Project.findOneAndUpdate(
      { _id: req.params.projectId },
      {
        title,
        description,
        status,
        userId: req.user.id,
      }
    );

    return res
      .status(201)
      .json({ message: "Project created", project: updatedProject });
  } catch (error) {
    return res.status(500).json({ error: "Server error", details: error });
  }
};

export const getProjects = async (req: AuthRequest, res: Response) => {
  if (!req.user.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const projects = await Project.find({ userId: req.user.id });
    console.log(projects);
    return res
      .status(200)
      .json({ message: "Project fetched Successfully", projects: projects });
  } catch (error) {
    return res.status(500).json({ error: "Server error", details: error });
  }
};
export const getProjectById = async (req: AuthRequest, res: Response) => {
  if (!req.user.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const project = await Project.find({
      _id: req.params.projectId,
      userId: req.user.id,
    });
    return res
      .status(200)
      .json({ message: "Project fetched Successfully", projects: project });
  } catch (error) {
    return res.status(500).json({ error: "Server error", details: error });
  }
};
export const deleteProject = async (req: AuthRequest, res: Response) => {
  if (!req.user.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const deletedProject = await Project.deleteOne({
      _id: req.params.projectId,
    });

    return res.status(200).json({
      message: "Project fetched Successfully",
      project: deletedProject,
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error", details: error });
  }
};
