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

const Subcategory = mongoose.model("Subcategory", subcategorySchema);

export default Subcategory;