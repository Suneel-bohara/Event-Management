const jwt = require('jsonwebtoken');

const protectAdmin = (req, res, next) => {
  // Get token from header
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    
    // Check if the user is actually an admin
    if (!decoded.isAdmin) {
      return res.status(403).json({ message: "Access denied: Admin permissions required" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = { protectAdmin };