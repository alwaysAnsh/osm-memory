import Admin from '../../models/admin.model.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Admin Login Controller
export const adminLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Find admin by username
    const admin = await Admin.findOne({ username });
    console.log("admin: ", admin)
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials of admin' });
    }

    
    // Check password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials of password' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: admin._id, username: admin.username }, // Payload
      process.env.JWT_SECRET_KEY, // Secret key
      { expiresIn: '1d' } // Token expiration
    );

    return res.status(200).json({
        success : true,
        message: 'Login successful',
        admin,
        token, // Send token to client
    });
  } catch (error) {
    console.error('Error in admin login:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
