import db from '../Config/db.js';
import bcrypt from 'bcryptjs';
import catchAsync from '../utils/catchAsync.js';
import AppError from "../utils/appError.js";
import { handleTokenGeneration } from '../middleware/tokenMiddleware.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const sendResetEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,  // Ensure TLS
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;

    const emailHTML = `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
            <h2 style="color: #4CAF50;">Password Reset Request</h2>
            <p>Hello,</p>
            <p>You requested to reset your password. Please click the button below to proceed:</p>
            <a href="${resetUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
            <p>If the button doesn’t work, please click the following link:</p>
            <p><a href="${resetUrl}" style="color: #4CAF50;">${resetUrl}</a></p>
            <hr style="border-top: 1px solid #f0f0f0;"/>
            <small>If you did not request this, please ignore this email.</small>
        </div>
    `;

    await transporter.sendMail({
        from: `"Car Rental Services" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Password Reset',
        html: emailHTML,
    });
};


export const signup = catchAsync(async (req, res, next) => {
    const { username, email, password } = req.body;

    const existingUser = await db('admin').where('email', email).orWhere('username', username).first();
    if (existingUser) {
        return next(new AppError('User with that email or username already exists', 400));
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const [newUser] = await db('admin').insert({
        username,
        email,
        password: hashedPassword,
    }).returning('*');

    await handleTokenGeneration(newUser, res);

    res.status(201).json({
        success: true,
        message: 'User created successfully',
        user: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
        },
    });
});

export const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await db('admin').where('email', email).first();
    if (!user) {
        return next(new AppError('User not found', 404));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return next(new AppError('Invalid credentials', 401));
    }

    await handleTokenGeneration(user, res);

    res.status(200).json({
        success: true,
        message: 'Login successful',
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            accessToken : user.accessToken,
        },
    });
});


export const forgotPassword = catchAsync(async (req, res, next) => {
    const { email } = req.body;

    const user = await db('admin').where('email', email).first();
    if (!user) {
        return next(new AppError('User not found', 404));
    }

    const token = crypto.randomBytes(20).toString('hex');
    const expires = new Date(Date.now() + 3600000).toISOString(); // Convert to ISO string

    await db('admin').where('email', email).update({
        resetPasswordToken: token,
        resetPasswordExpires: expires,
    });

    await sendResetEmail(email, token);

    res.status(200).json({
        success: true,
        message: 'Password reset email sent',
    });
});

export const resetPassword = catchAsync(async (req, res, next) => {
    const { token, newPassword } = req.body;

    const user = await db('admin').where('resetPasswordToken', token)
                                  .andWhere('resetPasswordExpires', '>', Date.now()).first();
    
    if (!user) {
        return next(new AppError('Password reset token is invalid or has expired', 400));
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await db('admin').where('id', user.id).update({
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
    });

    res.status(200).json({
        success: true,
        message: 'Password reset successful',
    });
});

export const getAllUsers = catchAsync(async (req, res, next) => {
    const users = await db('admin').select('id', 'username', 'email');
    
    res.status(200).json({
        success: true,
        data: users,
    });
});


export const getUserById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const user = await db('admin').where('id', id).select('id', 'username', 'email').first();

    if (!user) {
        return next(new AppError('User not found', 404));
    }

    res.status(200).json({
        success: true,
        data: user,
    });
});


export const updateUser = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { username, email, password } = req.body;

    const existingUser = await db('admin')
        .where('id', '!=', id)
        .andWhere((qb) => {
            qb.where('email', email).orWhere('username', username);
        })
        .first();

    if (existingUser) {
        return next(new AppError('User with that email or username already exists', 400));
    }


    const updateData = { username, email };
    if (password) {
        updateData.password = await bcrypt.hash(password, 12);
    }

    const updatedUser = await db('admin').where('id', id).update(updateData).returning(['id', 'username', 'email']);

    if (!updatedUser) {
        return next(new AppError('User not found', 404));
    }

    res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: updatedUser[0],
    });
});

export const deleteUser = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const deletedUser = await db('admin').where('id', id).del().returning(['id', 'username', 'email']);

    if (!deletedUser.length) {
        return next(new AppError('User not found', 404));
    }

    res.status(200).json({
        success: true,
        message: 'User deleted successfully',
        data: deletedUser[0],
    });
});