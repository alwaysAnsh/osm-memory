import Category from "../models/category.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs";

// Update category name or description
export const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Category updated successfully.",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating category:", error.message);
    res.status(500).json({ message: "Failed to update category." });
  }
};
// delete category
export const deleteCategory = async (req, res, next) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists!" });
    }

    const newCategory = new Category({
      name,
      description,
      subcategories: [],
    });

    await newCategory.save();

    res.status(201).json({
      success: true,
      message: "Category created successfully!",
      category: newCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new subcategory
export const createSubcategory = async (req, res) => {
  try {
    const { parentCategory, name, description } = req.body;

    if (!req.files?.file || !req.files?.icon) {
      return res.status(400).json({
        success: false,
        message: "Both a questions file and an icon are required!",
      });
    }

    const questionsFilePath = req.files.file[0]?.path;
    const iconFilePath = req.files.icon[0]?.path;

    // Upload files
    const questionsUpload = await uploadOnCloudinary(questionsFilePath);
    const iconUpload = await uploadOnCloudinary(iconFilePath);

    const parentCategoryData = await Category.findOne({ name: parentCategory });
    if (!parentCategoryData) {
      return res
        .status(404)
        .json({ message: "Parent category does not exist. Create it first!" });
    }

    const newSubcategory = {
      name,
      description,
      fileUrl: questionsUpload.secure_url,
      iconUrl: iconUpload.secure_url,
    };

    parentCategoryData.subcategories.push(newSubcategory);
    await parentCategoryData.save();

    res.status(201).json({
      success: true,
      message: "Subcategory created successfully!",
      category: parentCategoryData,
    });
  } catch (error) {
    console.error("Error creating subcategory:", error.message);
    res.status(500).json({ message: "Failed to create subcategory." });
  }
};

// Update an existing subcategory
export const updateSubcategory = async (req, res) => {
  try {
    const { subcategoryId } = req.params;
    const { newName } = req.body;

    // Find the category containing the subcategory
    const category = await Category.findOne({
      "subcategories._id": subcategoryId,
    });
    if (!category) {
      return res
        .status(404)
        .json({ message: "Category or subcategory not found." });
    }

    // Find the specific subcategory
    const subcategory = category.subcategories.id(subcategoryId);

    // Update the subcategory name if provided
    if (newName) subcategory.name = newName;

    // If a file (e.g., questions) is provided, upload it
    if (req.file?.path) {
      const upload = await uploadOnCloudinary(req.file.path);
      subcategory.fileUrl = upload.secure_url;
    }

    // If an icon is provided, upload it
    if (req.files?.icon?.[0]?.path) {
      const iconUpload = await uploadOnCloudinary(req.files.icon[0].path);
      subcategory.iconUrl = iconUpload.secure_url;
    }

    // Save the updated category
    await category.save();

    res.status(200).json({
      success: true,
      message: "Subcategory updated successfully.",
      subcategory,
    });
  } catch (error) {
    console.error("Error updating subcategory:", error.message);
    res.status(500).json({ message: "Failed to update subcategory." });
  }
};

//update category
export const updateCategoryName = async (req, res) => {
  try {
    const { name } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get Categories
export const showAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.status(404).json({
        success: false,
        message: "No categories found",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Categories fetched successfully",
      categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    res.status(500).json({ message: "Failed to fetch categories." });
  }
};

export const getCategory = async (req, res) => {
  const { categoryId } = req.params;
  console.log("cate id: ", categoryId);

  try {
    // Fetch category by ID
    const category = await Category.findById(categoryId).populate(
      "subcategories"
    );
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    // Fetch subcategories for the category
    // const subcategories = await Subcategory.find({ parentCategory: categoryId });

    // Respond with category details and subcategories
    return res.status(200).json({
      category,
      subcategories: category.subcategories,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error. Could not fetch category details." });
  }
};

export const getFileUrlForSubcategory = async (req, res, next) => {
  const { categoryName, subcategoryName } = req.body; // Expecting these in the request body
  try {
    // Find the category by name
    const category = await Category.findOne({ name: categoryName });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Find the subcategory within the category
    const subcategory = category.subcategories.find(
      (sub) => sub.name === subcategoryName
    );

    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    // Return the file URL of the subcategory
    return res.status(200).json({
      message: "File URL retrieved successfully",
      fileUrl: subcategory.fileUrl,
      subcategoryId: subcategory._id,
    });
  } catch (error) {
    console.error("Error fetching file URL:", error);
    return res.status(500).json({
      message: "An error occurred while retrieving the file URL",
      error: error.message,
    });
  }
};
