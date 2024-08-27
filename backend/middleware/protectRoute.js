import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { envVars } from "../config/envVars.js";

export async function protectRoute(req, res, next) {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, envVars.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "You are not authorized" });
    }
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "You are not authorized" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log("Error in protectRoute middleware: ", err);
    return res.status(401).json({ message: "You are not authorized" });
  }
}
