import { Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendResponse } from "../utils/response";
import { ApiError } from "../utils/ApiError";
import {
    loginUser,
    refreshUserToken,
    logoutUser,
    registerUser,
    verifyUser,
} from "../services/auth.service";
import { AuthRequest } from "../middleware/auth.middleware";
import { env } from "../config/env";

interface LoginBody {
    email: string;
    password: string;
}

interface RegisterBody {
    email: string;
    password: string;
    role: "admin" | "manager" | "viewer";
}

export const login = asyncHandler<
    {},
    unknown,
    LoginBody
>(async (req, res: Response) => {
    const { email, password } = req.body;

    const { accessToken, refreshToken } =
        await loginUser(email, password);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: env.nodeEnv === "production",
        sameSite: "strict",
    });

    sendResponse(res, 200, "Login successful", {
        accessToken,
    });
});


export const refresh = asyncHandler(
    async (req, res: Response) => {
        const { accessToken, refreshToken, role } =
            await refreshUserToken(req.cookies.refreshToken);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: env.nodeEnv === "production",
            sameSite: "strict",
        });

        sendResponse(res, 200, "Token refreshed", {
            accessToken,
            role,
        });
    }
);

export const logout = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        await logoutUser(req.user!.id);

        res.clearCookie("refreshToken");

        sendResponse(res, 200, "Logged out successfully");
    }
);

export const register = asyncHandler<
    {},
    unknown,
    RegisterBody
>(async (req, res: Response) => {
    const { email, password, role } = req.body;

    const user = await registerUser(email, password, role);

    sendResponse(res, 201, "User registered successfully", user);
});

export const verify = asyncHandler(
    async (req, res: Response) => {
        const { token } = req.query;

        if (typeof token !== "string") {
            throw new ApiError(400, "Verification token is required");
        }

        const user = await verifyUser(token);

        sendResponse(res, 200, "Email verified successfully", user);
    }
);

