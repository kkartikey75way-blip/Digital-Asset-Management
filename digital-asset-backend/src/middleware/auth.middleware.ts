import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { verifyAccessToken } from "../utils/jwt";

export interface AuthUser {
    id: string;
    role: "admin" | "manager" | "viewer";
    tokenVersion: number;
}

export interface AuthRequest<
    P extends ParamsDictionary = ParamsDictionary,
    ReqBody = unknown,
    ReqQuery extends ParsedQs = ParsedQs
> extends Request<P, unknown, ReqBody, ReqQuery> {
    user?: AuthUser;
}

export const protect = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void => {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
        return;
    }

    try {
        const token = header.split(" ")[1];
        const decoded = verifyAccessToken(token);

        req.user = decoded;

        next();
    } catch {
        res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};
