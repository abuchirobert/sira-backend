const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const protect = async (req, res, next) => {
    const token = req.cookies?.jwt;

    if (!token) {
        return res.status(401).json({ message: 'Not Authorized, token missing' });
    }

    try {
        // Check if JWT_SECRET exists
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is not defined in environment variables');
            return res.status(500).json({ message: 'Server configuration error' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        

        // Fetch user and exclude the password field
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Not Authorized, user not found' });
        }

        // Attach user to the request object
        req.user = user;

        // Proceed to the next middleware
        next();
    } catch (error) {
        console.error('Authentication Error:', error.message);
        return res.status(401).json({ message: 'Not Authorized, token invalid or expired' });
    }
};

module.exports = protect;
