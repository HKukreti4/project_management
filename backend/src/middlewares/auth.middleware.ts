import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "models/UserModel";

// Extend Request to include user
export interface AuthRequest extends Request {
  user?: any;
}
const JWT_SECRET: string = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || "7d";
export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.replace("Bearer ", "");
    console.log(token);
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    console.log("checkuser", user);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }
    req.user = decoded;
    console.log("decodeduser", decoded);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
