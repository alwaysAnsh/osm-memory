import otpService from "../controllers/otp.controller.js";

// Middleware to verify OTP before registering the user
export const verifyOtpMiddleware = async (req, res, next) => {
  try {
    const { mobile, otp } = req.body;

    if (!mobile || !otp) {
      return res.status(400).json({ message: "Mobile number and OTP are required" });
    }

    // Verify OTP using the otpService
    const otpVerification = await otpService.verifyOTP(mobile, otp);

    if (!otpVerification.valid) {
      return res.status(400).json({ message: otpVerification.message });
    }

    // If OTP is valid, proceed to the next middleware/controller
    next();
  } catch (error) {
    console.error("Error in OTP verification middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
