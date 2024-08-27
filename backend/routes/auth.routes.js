import express from "express";
import { logout, login, signup,authCheck } from "../controller/auth.controller.js";
import {protectRoute} from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/login", login);

router.post("/logout", logout);

router.post("/signup", signup);

router.get("/authCheck",protectRoute,authCheck);

export default router;
