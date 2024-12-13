import User from "../models/user.model.js";
import Flashcard from '../models/flashcard.model.js'
import Category from "../models/category.model.js";
import axios from 'axios'

// Fetch user progress for a specific subcategory
export const getSubcategoryProgress = async (req, res) => {
    const { userId, subcategoryId } = req.params;
    
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const category = await Category.findOne({ "subcategories._id": subcategoryId });
      if (!category) return res.status(404).json({ message: "Subcategory not found" });
  
      const subcategory = category.subcategories.id(subcategoryId);
  
      // Fetch the file from the URL
      const response = await axios.get(subcategory.fileUrl);
      const fileData = response.data;
    //   console.log("file data: ", fileData)
  
      // Find user progress for this subcategory
      const userProgress = user.progress.find((p) => p.subcategoryId.toString() === subcategoryId);
    //   console.log("user progress: ", userProgress)
      const completedIndices = userProgress ? userProgress.completedIndices : [];
    //   console.log("completed indices: ", completedIndices)
  
      res.status(200).json({ fileData, completedIndices });
    } catch (err) {
      res.status(500).json({ message: "Error fetching progress", error: err.message });
    }
  };

// Update user progress when a flashcard is answered correctly
export const updateSubcategoryProgress = async (req, res) => {
    const { userId, subcategoryId } = req.params;
    const { index } = req.body; // Index of the correctly answered question
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const progressEntry = user.progress.find((p) => p.subcategoryId.toString() === subcategoryId);
  
      if (progressEntry) {
        // Avoid duplicate indices
        if (!progressEntry.completedIndices.includes(index)) {
          progressEntry.completedIndices.push(index);
        }
      } else {
        // Create a new progress entry
        user.progress.push({ subcategoryId, completedIndices: [index] });
      }
  
      await user.save();
      res.status(200).json({ message: "Progress updated successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error updating progress", error: err.message });
    }
  };

// Reset progress for a specific subcategory
export const resetSubcategoryProgress = async (req, res) => {
    const { userId, subcategoryId } = req.params;
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      // Filter out the progress for this subcategory
      user.progress = user.progress.filter((p) => p.subcategoryId.toString() !== subcategoryId);
  
      await user.save();
      res.status(200).json({ message: "Progress reset successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error resetting progress", error: err.message });
    }
  };
