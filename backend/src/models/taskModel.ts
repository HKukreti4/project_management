import mongoose, { Document, Schema } from "mongoose";

export interface TaskDocument extends Document {
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  dueDate?: Date;
  projectId: mongoose.Types.ObjectId;
}

const TaskSchema = new Schema<TaskDocument>(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Task description is required"],
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },
    dueDate: {
      type: Date,
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Project",
    },
  },
  {
    timestamps: true,
  }
);
const Task = mongoose.model("Task", TaskSchema);
export default Task;
