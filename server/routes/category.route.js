// routes/categoryRoutes.js
import express from "express";

import {
  createCategory,
  createSubcategory,
  deleteCategory,
  getCategory,
  getFileUrlForSubcategory,
  showAllCategories,
  updateCategory,
  updateCategoryName,
  updateSubcategory,
} from "../controllers/category.controller.js";

import adminAuth from "../middleware/admin/admin.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { userAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

// Create Category and Subcategory
router.post(
  "/create-category",
  adminAuth,
  upload, // Use the already configured upload middleware
  createCategory
);

router.post(
  "/create-sub-category",
  adminAuth,
  upload, // Use the already configured upload middleware
  createSubcategory
);

// Update Category and Subcategory
router.put(
  "/subcategory/:subcategoryId",
  adminAuth,
  upload, // Use the already configured upload middleware
  updateSubcategory
);

router.put(
  "/category/:id",
  adminAuth,
  upload, // Use the already configured upload middleware
  updateCategoryName
);
// Delete Category
router.delete("/delete-category/:id", adminAuth, deleteCategory);

//show all categories
router.get("/get-all-categories", showAllCategories);
router.get("/get-category/:categoryId", adminAuth, getCategory);
router.post(
  "/get-fileurlBySubcategoryName",
  userAuth,
  getFileUrlForSubcategory
);

export default router;
