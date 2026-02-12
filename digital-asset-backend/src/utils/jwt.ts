import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";
import { env } from "../config/env";

export interface TokenPayload extends JwtPayload {
    id: string;
    role: "admin" | "manager" | "viewer";
    tokenVersion: number;
}

export const generateAccessToken = (
    payload: TokenPayload
): string => {
    const options: SignOptions = {
        expiresIn: env.accessExpiry as SignOptions["expiresIn"],
    };

    return jwt.sign(payload, env.accessSecret, options);
};

export const generateRefreshToken = (
    payload: TokenPayload
): string => {
    const options: SignOptions = {
        expiresIn: env.refreshExpiry as SignOptions["expiresIn"],
    };

    return jwt.sign(payload, env.refreshSecret, options);
};

export const verifyAccessToken = (
    token: string
): TokenPayload => {
    return jwt.verify(
        token,
        env.accessSecret
    ) as TokenPayload;
};

export const verifyRefreshToken = (
    token: string
): TokenPayload => {
    return jwt.verify(
        token,
        env.refreshSecret
    ) as TokenPayload;
};
