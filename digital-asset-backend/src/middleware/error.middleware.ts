import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { env } from "../config/env";

export const errorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    let statusCode = 500;
    let message = "Internal Server Error";
    let stack: string | undefined;

    if (err instanceof ApiError) {
        statusCode = err.statusCode;
        message = err.message;
        stack = err.stack;
    } else if (err instanceof Error) {
        message = err.message;
        stack = err.stack;
    }

    res.status(statusCode).json({
        success: false,
        message,
        stack: env.nodeEnv === "development" ? stack : undefined,
    });
};
