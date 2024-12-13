import OTP from '../models/otp.model.js'

// Generate and store OTP in MongoDB
export const generateOTP = async (mobile) => {
  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // Valid for 5 minutes

  // Check if an OTP already exists for the mobile number
  const existingOtp = await OTP.findOne({ mobile });

  if (existingOtp) {
    // Update the OTP and expiration time
    existingOtp.otp = otp;
    existingOtp.expiresAt = expiresAt;
    await existingOtp.save();
  } else {
    // Create a new OTP document
    await OTP.create({ mobile, otp, expiresAt });
  }

  return otp;
};

// Verify OTP
export const verifyOTP = async (mobile, enteredOtp) => {
  const otpData = await OTP.findOne({ mobile });

  if (!otpData) {
    return { valid: false, message: "OTP not found" };
  }

  if (Date.now() > new Date(otpData.expiresAt)) {
    await OTP.deleteOne({ mobile }); // Remove expired OTP
    return { valid: false, message: "OTP expired" };
  }

  if (otpData.otp === enteredOtp) {
    await OTP.deleteOne({ mobile }); // Remove OTP after successful verification
    return { valid: true };
  }

  return { valid: false, message: "Invalid OTP" };
};

export default { generateOTP, verifyOTP };
