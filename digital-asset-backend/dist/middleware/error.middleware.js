"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const ApiError_1 = require("../utils/ApiError");
const env_1 = require("../config/env");
const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Internal Server Error";
    let stack;
    if (err instanceof ApiError_1.ApiError) {
        statusCode = err.statusCode;
        message = err.message;
        stack = err.stack;
    }
    else if (err instanceof Error) {
        message = err.message;
        stack = err.stack;
    }
    res.status(statusCode).json({
        success: false,
        message,
        stack: env_1.env.nodeEnv === "development" ? stack : undefined,
    });
};
exports.errorHandler = errorHandler;
