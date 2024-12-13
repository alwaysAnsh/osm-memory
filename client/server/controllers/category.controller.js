import Category from '../models/category.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js';





//abhi ke liye ye wala controller koi kaam ka nhi hai
export const updateCategory = async (req, res , next ) => {
    try {
        const { name, description } = req.body;

        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { name, description }, 
            { new: true }
        );

        res.status(200).json({ 
            success: true,
            message: 'Category updated successfully', 
            category: updatedCategory 
        });

      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};


// delete category
export const deleteCategory = async (req, res, next ) => {
    try {
        await Category.findByIdAndDelete(req.params.id );
        res.status(200).json({ 
          success: true,
          message: 'Category deleted successfully' });
      } catch (error) {
        res.status(500).json({ 
          success: false,
          message: error.message });
      }
}


// create category
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists!" });
    }

    // Create new category
    const newCategory = new Category({
      name,
      description,
      subcategories: [], // Initially no subcategories
    });

    await newCategory.save();

    res.status(201).json({ message: "Category created successfully!", category: newCategory });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createSubcategory = async (req, res) => {
  try {
    const {  parentCategory, name, description } = req.body;
    
    const file = req.file; // Uploaded file from multer
    console.log("parent category: ", parentCategory)
    console.log("name of sub : ", name)

    // Check if parent category exists
    const parentCategoryExists = await Category.findOne({ name: parentCategory });
    if (!parentCategoryExists) {
      return res.status(404).json({ success: false, message: "Parent category not found! Create one" });
    }

    // Upload file to Cloudinary
    const cloudinaryResponse = await uploadOnCloudinary(file.path);

    // Create subcategory object
    const newSubcategory = {
      name,
      description,
      fileUrl: cloudinaryResponse.secure_url, // File URL from Cloudinary
    };

    // Push the subcategory to the parent category
    parentCategoryExists.subcategories.push(newSubcategory);
    await parentCategoryExists.save();

    res.status(201).json({
      success: true,
      message: "Subcategory created successfully!",
      category: parentCategoryExists,
    });
  } catch (error) {
    console.error("Error creating subcategory:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




//update category
export const updateCategoryName = async (req, res ) => {
  try {
    const { name } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        { name }, 
        { new: true }
    );

    res.status(200).json({ 
        success: true,
        message: 'Category updated successfully', 
        category: updatedCategory 
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const updateSubcategory = async (req, res) => {
  try {
    const { categoryName, subcategoryName, newName } = req.body; // Names from the request
    const file = req.file; // New file from the request

    // Validate inputs
    if (!categoryName || !subcategoryName) {
      return res.status(400).json({ success: false, message: "Category and Subcategory names are required" });
    }
    if (!newName && !file) {
      return res.status(400).json({ success: false, message: "Provide at least one field to update (newName or file)" });
    }

    // Find the category by its name
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    // Find the subcategory within the category
    const subcategory = category.subcategories.find(
      (sub) => sub.name.toLowerCase() === subcategoryName.toLowerCase()
    );
    if (!subcategory) {
      return res.status(404).json({ success: false, message: "Subcategory not found" });
    }

    // Update the subcategory's name if provided
    if (newName) {
      subcategory.name = newName;
    }

    // Update the subcategory's file if provided
    if (file) {
      const cloudinaryResponse = await uploadToCloudinary(file.path, "subcategories");
      subcategory.fileUrl = cloudinaryResponse.secure_url; // Save new file URL to the subcategory
    }

    // Save the updated category document
    await category.save();

    res.status(200).json({
      success: true,
      message: "Subcategory updated successfully",
      subcategory,
    });
  } catch (error) {
    console.error("Error updating subcategory:", error);
    res.status(500).json({ success: false, message: "Internal server error", error });
  }
};



//get Categories
export const showAllCategories = async (req, res, next ) => {
  try {
    const categories = await Category.find();
    if(!categories){
      return res.status(404).json({
        success: false,
        message: "No categories found"
      })
    }

    return res.status(201).json({
      success: true,
      message: "Categories fetched successfully",
      categories
    })


  } catch (error) {
    console.error("Error fetching categories:", error.message);
    res.status(500).json({ message: "Failed to fetch categories." });
  }
}

// export const getCategory = async (req, res, next ) => {
//   try {
//     const {categoryId} = req.params
//     if(!categoryId){
//       return res.status(404).json({
//         success: false, 
//         message: "categoryId is not provided"
//       })
//     }

//     const category = await Category.findById(categoryId)
//     if(!category){
//       return res.status(404).json({
//         success: false, 
//         message: "category doesn't exist, check again"
//       })
//     }
//     return res.status(201).json({
//       success: true,
//       message: "Category fetched successfully",
//       category,
//     })
//   } catch (error) {
//     console.error("Error fetching category:", error.message);
//     res.status(500).json({ success: false,message: "Failed to fetch category." });
//   }
// }

export const getCategory = async (req, res) => {
  const { categoryId } = req.params;
  console.log("cate id: ", categoryId)

  try {
    // Fetch category by ID
    const category = await Category.findById(categoryId).populate("subcategories");
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
    return res.status(500).json({ message: "Server error. Could not fetch category details." });
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