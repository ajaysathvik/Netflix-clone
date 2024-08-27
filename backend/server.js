import express from "express";
const app = express();

import { protectRoute } from "./middleware/protectRoute.js";
import authroutes from "./routes/auth.routes.js";
import moviesRoutes from "./routes/movie.routes.js";
import tvRoutes from "./routes/tv.routes.js";
import searchRoutes from "./routes/search.routes.js";
import { envVars } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import path from "path";

const PORT = envVars.PORT || 3000;

const __dirname = path.resolve();

app.use(cookieParser());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authroutes);
app.use("/api/v1/movie", protectRoute, moviesRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

if (envVars.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
} 

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
  connectDB();
});
