import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../models/user.model";
import { sendEmail } from "./email.service";
import { ApiError } from "../utils/ApiError";
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
} from "../utils/jwt";

export const loginUser = async (
    email: string,
    password: string
) => {
    const user = await User.findOne({ email });
    if (!user)
        throw new ApiError(400, "Invalid credentials");

    if (!user.isVerified) {
        throw new ApiError(401, "Please verify your email address");
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch)
        throw new ApiError(400, "Invalid credentials");

    const payload = {
        id: user._id.toString(),
        role: user.role,
        tokenVersion: user.tokenVersion,
    };

    return {
        accessToken: generateAccessToken(payload),
        refreshToken: generateRefreshToken(payload),
    };
};

export const registerUser = async (
    email: string,
    password: string,
    role: "admin" | "manager" | "viewer" = "viewer"
) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(400, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
        email,
        password: hashedPassword,
        role,
        verificationToken,
    });

    const verificationUrl = `http://localhost:5173/verify?token=${verificationToken}`;

    await sendEmail(
        user.email,
        "Activate your account",
        `<h3>Welcome!</h3>
         <p>Please activate your account by clicking the link below:</p>
         <a href="${verificationUrl}">${verificationUrl}</a>`
    );

    return {
        id: user._id,
        email: user.email,
        role: user.role,
    };
};

export const verifyUser = async (token: string) => {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
        throw new ApiError(400, "Invalid or expired verification token");
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    return {
        email: user.email,
        role: user.role
    };
};

export const refreshUserToken = async (
    refreshToken: string
) => {
    if (!refreshToken)
        throw new ApiError(401, "Refresh token missing");

    const decoded = verifyRefreshToken(refreshToken);

    const user = await User.findById(decoded.id);

    if (!user)
        throw new ApiError(401, "User not found");

    if (user.tokenVersion !== decoded.tokenVersion) {
        throw new ApiError(401, "Token invalidated");
    }

    const newPayload = {
        id: user._id.toString(),
        role: user.role,
        tokenVersion: user.tokenVersion,
    };

    return {
        accessToken: generateAccessToken(newPayload),
        refreshToken: generateRefreshToken(newPayload),
        role: user.role,
    };
};

export const logoutUser = async (userId: string) => {
    await User.findByIdAndUpdate(userId, {
        $inc: { tokenVersion: 1 },
    });
};
