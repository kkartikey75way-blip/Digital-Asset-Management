"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.register = exports.logout = exports.refresh = exports.login = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const response_1 = require("../utils/response");
const ApiError_1 = require("../utils/ApiError");
const auth_service_1 = require("../services/auth.service");
const env_1 = require("../config/env");
exports.login = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await (0, auth_service_1.loginUser)(email, password);
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: env_1.env.nodeEnv === "production",
        sameSite: "strict",
    });
    (0, response_1.sendResponse)(res, 200, "Login successful", {
        accessToken,
    });
});
exports.refresh = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { accessToken, refreshToken, role } = await (0, auth_service_1.refreshUserToken)(req.cookies.refreshToken);
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: env_1.env.nodeEnv === "production",
        sameSite: "strict",
    });
    (0, response_1.sendResponse)(res, 200, "Token refreshed", {
        accessToken,
        role,
    });
});
exports.logout = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    await (0, auth_service_1.logoutUser)(req.user.id);
    res.clearCookie("refreshToken");
    (0, response_1.sendResponse)(res, 200, "Logged out successfully");
});
exports.register = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { email, password, role } = req.body;
    const user = await (0, auth_service_1.registerUser)(email, password, role);
    (0, response_1.sendResponse)(res, 201, "User registered successfully", user);
});
exports.verify = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { token } = req.query;
    if (typeof token !== "string") {
        throw new ApiError_1.ApiError(400, "Verification token is required");
    }
    const user = await (0, auth_service_1.verifyUser)(token);
    (0, response_1.sendResponse)(res, 200, "Email verified successfully", user);
});
