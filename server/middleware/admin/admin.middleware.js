import jwt from 'jsonwebtoken';

// Middleware to authenticate and authorize admin
const adminAuth = (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized access. Token is missing.' });
    }

    // Extract the token
    const token = authHeader.split(' ')[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("decoded admin: ", decoded)

    // Check if the token corresponds to an admin
    if (!decoded || !decoded.username) {
      return res.status(403).json({ message: 'Forbidden. Admin access only.' });
    }

    // Attach admin info to the request object
    req.admin = decoded;

    // Proceed to the next middleware/route handler
    next();
  } catch (error) {
    console.error('Error in adminAuth middleware:', error.message);
    res.status(401).json({ message: 'Unauthorized. Invalid or expired token.' });
  }
};

export default adminAuth;
