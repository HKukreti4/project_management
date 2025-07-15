// const express = require("express");
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/connectDb";
import authRoute from "routes/auth.route";
import projectRoutes from "routes/projectRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({}));
app.use(express.json());

app.use("/api/v1", authRoute);
app.use("/api/v1/project", projectRoutes);

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
