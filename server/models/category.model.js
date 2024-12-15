// // models/Category.js

import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  fileUrl: {
    type: String, // URL of the file (questions document) stored on Cloudinary
    required: true,
  },
  iconUrl: {
    type: String, // URL of the icon/image stored on Cloudinary
    default: "", // Optional, can be empty if no icon is uploaded
  },
});

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    default: "",
  },
  subcategories: [subcategorySchema], // Embedded subcategories
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
