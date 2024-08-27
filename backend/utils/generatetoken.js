import jwt from "jsonwebtoken";
import { envVars } from "../config/envVars.js";

export const generateTokenAndSetCookie = (id, res) => {
  const token = jwt.sign({ id }, envVars.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
    secure: envVars.NODE_ENV !== "development",
  });

  return token;
};
