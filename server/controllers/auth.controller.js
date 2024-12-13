import User from "../models/user.model.js";
import Verification from "../models/verification.model.js";
import { compareString, createJWT, hashString } from "../utils/index.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { resetPasswordLink, sendVerificationEmail } from "../utils/sendEmail.js";
import otpService from '../controllers/otp.controller.js'
import twilio from 'twilio'
import PasswordReset from "../models/PasswordReset.js";



//send otp
export const sendOtp = async (req, res) => {
  try {
    const { mobile } = req.body;
    console.log("mobile no.: ", mobile)

    // Generate OTP
    const otp = await otpService.generateOTP(mobile);
    console.log("otp generated: ", otp)

    // Send OTP using Twilio
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    await client.messages.create({
      body: `Your OTP is ${otp}. It is valid for 5 minutes.`,
      from: '+16814164982',
      to: `${mobile}`,
    });

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Failed to send OTP", error });
  }
};


export const registerWithEmail = async (req, res, next) => {
    console.log("Request Body:", req.body); // Add this log
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    } = req.body;
  
    // Validate required fields
    if (!firstName || !email || !password ) {
      return res.status(400).json({ success: false, message: "Provide Required Fields!" });
    }
    if(password !== confirmPassword)
    {
      return res.status(400).json({success: false, message: "Passwords do not match"})
    }
    // Normalize email
    const normalizedEmail = email.toLowerCase();
  
    try {
      // Check if the user already exists
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(400).json({ message: "Email Address already exists" });
      }
  
      // Hash the password
      const hashedPassword = await hashString(password);
  
      // Generate a verification token (for email verification)
      const token = uuidv4(); // Generate a random token
      const hashedToken = await hashString(token); // Store the hashed token
  
    //   Store the verification token in the database for this email
      await Verification.create({
        firstName,
        lastName,
        email: normalizedEmail,
        password: hashedPassword,
        verified: true,
        token: hashedToken, // Store the hashed token
        createdAt: Date.now(),
        expiresAt: Date.now() + 3600000, // 1 hour expiry for the token
      });
  
      // Send verification email
      try {
        await sendVerificationEmail(
          { email: normalizedEmail, token, firstName },
          res
        );
        return res.status(201).json({
          success: true,
          message: "Registration successful. Please verify your email.",
        });
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        return res.status(500).json({
          message: "Failed to send verification email. Please try again.",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error. Try again later." });
    }
};


export const verifyEmail = async (req, res) => {
    const { token } = req.params; // Get the token from the URL
    const { email } = req.query;
    const normalizedEmail = email.toLowerCase();
    try {
      // Find the verification record
      const verificationRecord = await Verification.findOne({
        email: normalizedEmail,
      });
  
      if (!verificationRecord) {
        return res.status(400).json({ message: "Invalid or expired token." });
      }
  
      // Check if token has expired
      if (verificationRecord.expiresAt < Date.now()) {
        // If the token has expired, delete the verification record
        await Verification.findByIdAndDelete(verificationRecord._id);
        return res
          .status(400)
          .json({ message: "Token has expired. Please register again." });
      }
  
      // Compare the token with the stored hashed token
      const isMatch = await bcrypt.compare(token, verificationRecord.token);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid or expired token." });
      }
  
      // Create the user now that the email is verified
      const {
        firstName,
        lastName,
        email,
        password,
       
      } = verificationRecord;
  
      const user = await User.create({
        firstName,
        lastName,
        email,
        password, // Password is already hashed
       
        verified: true,
        
      });
      
      // Delete the verification record after user creation
      await Verification.findByIdAndDelete(verificationRecord._id);
  
      // Send success response
      return res.redirect(`${process.env.APP_FRONTEND_URL}/verification-success`);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error. Try again later." });
    }
};


export const loginWithEmail = async (req, res, next) => {
    const { email, password } = req.body;
    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide user credentials" });
    }
    const normalizedEmail = email.toLowerCase();
  
    try {
      // Find user by email
      const user = await User.findOne({ email: normalizedEmail })
      
  
      if (!user) {
        return next("Invalid email or password");
      }
  
      if (!user.verified) {
        return next("User email is not verified. Check your email and verify.");
      }
  
      // Compare password
      const isMatch = await compareString(password, user.password);
  
      if (!isMatch) {
        return next("Invalid email or password");
      }
      
  
      user.password = undefined; // Remove password before sending response
  
      const token = createJWT(user);
  
      res.status(200).json({
        success: true,
        message: "Login successful",
        user,
        token,
      });
    } catch (error) {
      console.error("Login error: ", error); // Log the error to get more details
      res.status(500).json({ message: "Server error. Please try again." });
    }
};


// ************************************************************************************
// ************************************************************************************
// ************************************************************************************
// ************************************************************************************
// *****************************MOBILE OTP CONTROLLERS*******************************
// ************************************************************************************
// ************************************************************************************
// ************************************************************************************
// ************************************************************************************

export const registerWithOTP = async (req, res) => {
  try {
    const { firstName,lastName, mobile,email, password, confirmPassword } = req.body;
    const userExists = await User.findOne({ mobile });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    if(password !== confirmPassword){
      res.status(400).json({
        success: false,
        message: "passwords do not match"
      })
    }

    // Hash the password
    const hashedPassword = await hashString(password);

    const user = new User({ 
      firstName, 
      lastName, 
      email,
      phoneNumber:mobile, 
      password: hashedPassword,  
      verified: true,
      
    });
    const savedUser = await user.save();

    res.status(201).json({
      success: true, 
      message: "Registration successfull", 
      savedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error Registering. Try again later." });
  }
};


export const loginWithOTP = async (req, res) => {
  try {
    const { mobile, password } = req.body;
    const user = await User.findOne({ mobile });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if(user.password !== password){
      return res.status(400).json({
        success: false, 
        message: "Bad credentials, incorrect password"
      })
    }

    if(!user.verified){
      return res.status(403).json({
        success: false,
        message: "forbidden. User not verified"
      })
    }

    
    // const otp = otpService.generateOTP(mobile);
    // Send OTP via SMS (e.g., using Twilio or any other service)
    //yahan par abhi mein login krne ke liye otp nahi bhej rha hu, i am only checking that ki if given mobile number is existing in the database toh mein seedha login kr rha hu user ko, and if not, then i am simply saying ki 'user not found'


    return res.status(201).json({
      success: true,
      message: "logged in successfully",
      user
    })
    

    // res.status(200).json({ message: "OTP sent successfully", otp }); // Only for testing, remove OTP from response in production
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};


//reset password via email

export const requestPasswordReset = async (req, res) => {
  try {
    
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "FAILED",
        message: "Email address not found.",
      });
    }

    const existingRequest = await PasswordReset.findOne({ email });
    if (existingRequest && existingRequest.expiresAt > Date.now()) {
      return res.status(201).json({
        status: "PENDING",
        message: "Reset password link has already been sent to your email.",
      });
    }

    // Delete existing request if expired
    await PasswordReset.findOneAndDelete({ email });

    // Send reset password link
    await resetPasswordLink(user, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export const resetPassword = async (req, res) => {
  const { userId, token } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "Invalid password reset link." });
    }

    const resetPasswordRequest = await PasswordReset.findOne({ userId });
    if (!resetPasswordRequest) {
      return res.status(400).json({ message: "Invalid or expired link." });
    }

    const { expiresAt, token: hashedToken } = resetPasswordRequest;
    if (expiresAt < Date.now()) {
      return res.status(400).json({ message: "Password reset link expired." });
    }

    const isTokenValid = await compareString(token, hashedToken);
    if (!isTokenValid) {
      return res.status(400).json({ message: "Invalid reset token." });
    }

    // If the token is valid, redirect to the SetNewPassword page
    return res.redirect(
      `${process.env.APP_FRONTEND_URL}/reset/${userId}/${token}`
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { userId, password } = req.body;
    if (!userId || !password) {
      return res
        .status(400)
        .json({ message: "User ID and password required." });
    }

    // Hash the new password
    const hashedPassword = await hashString(password);

    // Update the user's password
    const user = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );

    if (user) {
      // Delete the password reset request after successful password update
      await PasswordReset.findOneAndDelete({ userId });

      res.status(200).json({
        success: true,
        message: "Password updated successfully.",
      });
    } else {
      res.status(400).json({ message: "User not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};