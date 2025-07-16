import mongoose from "mongoose";
import User from "./models/UserModel";
import Project from "./models/projectModel";
import Task from "./models/taskModel";
import dotenv from "dotenv";
import connectDb from "config/connectDb";

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDb();
    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Task.deleteMany({});

    // Create test user
    const user = await User.create({
      email: "test@example.com",
      password: "Test@123",
    });

    // Create projects
    const project1 = await Project.create({
      title: "Website Redesign",
      description: "Redesign company website with modern UI",
      status: "active",
      userId: user._id,
    });

    const project2 = await Project.create({
      title: "Mobile App Development",
      description: "Develop iOS and Android mobile apps",
      status: "active",
      userId: user._id,
    });

    // Create tasks for project 1
    await Task.create([
      {
        title: "Design Homepage",
        description: "Create new homepage design",
        status: "todo",
        dueDate: new Date("2024-03-01"),
        projectId: project1._id,
      },
      {
        title: "Implement Frontend",
        description: "Code the frontend using React",
        status: "in-progress",
        dueDate: new Date("2024-03-15"),
        projectId: project1._id,
      },
      {
        title: "Testing",
        description: "Perform QA testing",
        status: "todo",
        dueDate: new Date("2024-03-30"),
        projectId: project1._id,
      },
    ]);

    // Create tasks for project 2
    await Task.create([
      {
        title: "App Wireframes",
        description: "Create app wireframes",
        status: "done",
        dueDate: new Date("2024-02-15"),
        projectId: project2._id,
      },
      {
        title: "API Development",
        description: "Develop backend API",
        status: "in-progress",
        dueDate: new Date("2024-03-15"),
        projectId: project2._id,
      },
      {
        title: "User Testing",
        description: "Conduct user testing",
        status: "todo",
        dueDate: new Date("2024-04-01"),
        projectId: project2._id,
      },
    ]);

    console.log("Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
