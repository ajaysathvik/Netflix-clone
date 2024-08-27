import express from "express";
import { searchMovie,searchPerson,searchTv,searchHistory,removeItemFromSearchHistroy } from "../controller/search.controller.js";

const router = express.Router();


router.get("/person/:query", searchPerson);
router.get("/movie/:query", searchMovie);
router.get("/tv/:query", searchTv);
router.get("/history", searchHistory);
router.delete("/history/:id", removeItemFromSearchHistroy);

export default router;