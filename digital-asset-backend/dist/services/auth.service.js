"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.refreshUserToken = exports.verifyUser = exports.registerUser = exports.loginUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const user_model_1 = __importDefault(require("../models/user.model"));
const email_service_1 = require("./email.service");
const ApiError_1 = require("../utils/ApiError");
const jwt_1 = require("../utils/jwt");
const loginUser = async (email, password) => {
    const user = await user_model_1.default.findOne({ email });
    if (!user)
        throw new ApiError_1.ApiError(400, "Invalid credentials");
    if (!user.isVerified) {
        throw new ApiError_1.ApiError(401, "Please verify your email address");
    }
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatch)
        throw new ApiError_1.ApiError(400, "Invalid credentials");
    const payload = {
        id: user._id.toString(),
        role: user.role,
        tokenVersion: user.tokenVersion,
    };
    return {
        accessToken: (0, jwt_1.generateAccessToken)(payload),
        refreshToken: (0, jwt_1.generateRefreshToken)(payload),
    };
};
exports.loginUser = loginUser;
const registerUser = async (email, password, role = "viewer") => {
    const existingUser = await user_model_1.default.findOne({ email });
    if (existingUser) {
        throw new ApiError_1.ApiError(400, "User already exists");
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const verificationToken = crypto_1.default.randomBytes(32).toString("hex");
    const user = await user_model_1.default.create({
        email,
        password: hashedPassword,
        role,
        verificationToken,
    });
    const verificationUrl = `http://localhost:5173/verify?token=${verificationToken}`;
    await (0, email_service_1.sendEmail)(user.email, "Activate your account", `<h3>Welcome!</h3>
         <p>Please activate your account by clicking the link below:</p>
         <a href="${verificationUrl}">${verificationUrl}</a>`);
    return {
        id: user._id,
        email: user.email,
        role: user.role,
    };
};
exports.registerUser = registerUser;
const verifyUser = async (token) => {
    const user = await user_model_1.default.findOne({ verificationToken: token });
    if (!user) {
        throw new ApiError_1.ApiError(400, "Invalid or expired verification token");
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    return {
        email: user.email,
        role: user.role
    };
};
exports.verifyUser = verifyUser;
const refreshUserToken = async (refreshToken) => {
    if (!refreshToken)
        throw new ApiError_1.ApiError(401, "Refresh token missing");
    const decoded = (0, jwt_1.verifyRefreshToken)(refreshToken);
    const user = await user_model_1.default.findById(decoded.id);
    if (!user)
        throw new ApiError_1.ApiError(401, "User not found");
    if (user.tokenVersion !== decoded.tokenVersion) {
        throw new ApiError_1.ApiError(401, "Token invalidated");
    }
    const newPayload = {
        id: user._id.toString(),
        role: user.role,
        tokenVersion: user.tokenVersion,
    };
    return {
        accessToken: (0, jwt_1.generateAccessToken)(newPayload),
        refreshToken: (0, jwt_1.generateRefreshToken)(newPayload),
        role: user.role,
    };
};
exports.refreshUserToken = refreshUserToken;
const logoutUser = async (userId) => {
    await user_model_1.default.findByIdAndUpdate(userId, {
        $inc: { tokenVersion: 1 },
    });
};
exports.logoutUser = logoutUser;
