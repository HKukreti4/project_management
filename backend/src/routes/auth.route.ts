import { loginUser, registerUser, verifyUser } from "controllers/auth";
import express from "express";
import { authMiddleware } from "middlewares/auth.middleware";

const authRoute = express.Router();

authRoute.post("/login", loginUser);
authRoute.post("/register", registerUser);
authRoute.get("/verify", authMiddleware, verifyUser);
export default authRoute;
