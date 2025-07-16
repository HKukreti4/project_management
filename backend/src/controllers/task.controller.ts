import { Request, Response } from "express";
import Task from "../models/taskModel";
import mongoose from "mongoose";

// Create Task
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, status, dueDate, projectId } = req.body;

    if (!title || !description || !projectId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const task = await Task.create({
      title,
      description,
      status,
      dueDate,
      projectId,
    });

    res.status(201).json({ message: "Task created successfully", task: task });
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

// Get All Tasks for a Project
export const getTasksByProject = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const tasks = await Task.find({ projectId }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

// Get Single Task by ID
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error fetching task", error });
  }
};

// Update Task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

// Delete Task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted", task: deletedTask });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};
