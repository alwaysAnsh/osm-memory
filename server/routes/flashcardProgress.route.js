import express from "express";
import { getSubcategoryProgress, resetSubcategoryProgress, updateSubcategoryProgress } from "../controllers/flashcardProgress.controller.js";


const router = express.Router();

router.get("/progress/:userId/:subcategoryId", getSubcategoryProgress);
router.post("/progress/:userId/:subcategoryId", updateSubcategoryProgress);
router.delete("/progress/:userId/:subcategoryId", resetSubcategoryProgress);

export default router;
