import { Request, Response } from "express";
import Project from "../models/projectModel";

import { AuthRequest } from "middlewares/auth.middleware";
import Task from "models/taskModel";

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

// #find project with its task

export const getUserProjectsWithTasks = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Get projects for user
    const projects = await Project.find({ userId });

    // Get all tasks for these projects
    const projectIds = projects.map((p) => p._id);
    const tasks = await Task.find({ projectId: { $in: projectIds } });

    // Group tasks by project
    const tasksByProject: Record<string, any[]> = {};
    tasks.forEach((task) => {
      const projectId = task.projectId.toString();
      if (!tasksByProject[projectId]) {
        tasksByProject[projectId] = [];
      }
      tasksByProject[projectId].push(task);
    });

    // Combine project with its tasks
    const result = projects.map((project) => ({
      ...project.toObject(),
      tasks: tasksByProject[project._id.toString()] || [],
    }));

    return res
      .status(200)
      .json({ message: "succesfully fetched", projects: result });
  } catch (error) {
    console.error("Error fetching projects and tasks:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
