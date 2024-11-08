const jwt = require('jsonwebtoken');

const generateToken = (res, userId) => { 

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
    
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'production', // USE SECURE COOKEIS IN PRODUCTION ONLY
        sameSite: 'strict', //Prevent CSRF protection
        maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    })
    console.log(`Token generated for user ${userId}`);
    
    return token
}

module.exports = generateToken;