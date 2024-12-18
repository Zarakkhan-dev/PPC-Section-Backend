import jwt from 'jsonwebtoken';
import db from '../Config/db.js';

// Generate Access Token
export const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: '1d' }  
    );
};

// Generate Refresh Token
export const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '12h' }  
    );
};

// Middleware to save or update tokens in the database for the user
export const saveTokens = async (user, accessToken, refreshToken) => {
    await db('admin')
        .where('id', user.id)
        .update({
            accessToken,
            refreshToken,
        });
};

// Middleware to handle token creation and saving during user login/signup
export const handleTokenGeneration = async (user, res) => {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    
    await saveTokens(user, accessToken, refreshToken);
    
};
