import mongoose, { Schema } from "mongoose";

/** @type {"active" | "completed"} */
const ProjectStatus = {
  ACTIVE: "active",
  COMPLETED: "completed",
};

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
    },
    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", ProjectSchema);

export default Project;
