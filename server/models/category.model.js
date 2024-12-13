// // models/Category.js
// import mongoose from 'mongoose';

// const categorySchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   file: { 
//     type: String 
//   }, // Optional file URL
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   // flashcards: [{
//   //   type: mongoose.Schema.Types.ObjectId,
//   //   ref: 'Flashcard'
//   // }]
// });

// const Category = mongoose.model('Category', categorySchema);
// export default Category;

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
    type: String, // URL of the file stored on Cloudinary
    required: true,
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

