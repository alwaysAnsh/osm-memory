import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    
    verified: { 
      type: Boolean, 
      default: false 
    },
    
    
    progress: [
      {
        subcategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' },
        completedIndices: [Number], // Tracks indices of completed questions in the parsed file
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
