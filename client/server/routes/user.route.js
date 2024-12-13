import express from 'express'
import { changePassword, loginWithEmail, loginWithOTP, registerWithEmail, registerWithOTP, requestPasswordReset, resetPassword, sendOtp, verifyEmail } from '../controllers/auth.controller.js';
import { verifyOtpMiddleware } from '../middleware/otp.middleware.js';

const router = express.Router();

router.post('/login-email', loginWithEmail)
router.post('/register-email', registerWithEmail)
router.get("/verify-email/:token", verifyEmail);


// ************************************************************************************
// ************************************************************************************
// *****************************PASSWORD RESET ROUTES*******************************
// ************************************************************************************
// ************************************************************************************


router.post("/request-passwordreset", requestPasswordReset);
router.get("/reset-password/:userId/:token", resetPassword);
router.post("/reset-password", changePassword);

// ************************************************************************************
// ************************************************************************************
// *****************************MOBILE OTP ROUTES*******************************
// ************************************************************************************
// ************************************************************************************

router.post('/send-otp', sendOtp)
router.post('/register-mobile', verifyOtpMiddleware, registerWithOTP)
router.post('/login-mobile', loginWithOTP)

export default router