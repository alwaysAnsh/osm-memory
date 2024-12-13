import mongoose from "mongoose";

const verification = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
  token: { type: String, required: true },
  
  
  createdAt: { type: Date, required: true },
  expiresAt: { type: Date, required: true },
});

const Verification = mongoose.model("Verification", verification);

export default Verification;
