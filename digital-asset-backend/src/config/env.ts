import dotenv from "dotenv";

dotenv.config();

const requiredVars = [
    "MONGO_URI",
    "ACCESS_TOKEN_SECRET",
    "REFRESH_TOKEN_SECRET",
    "ENCRYPTION_SECRET",
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_USER",
    "SMTP_PASS",
];

requiredVars.forEach((key) => {
    if (!process.env[key]) {
        throw new Error(`Missing environment variable: ${key}`);
    }
});

export const env = {
    port: process.env.PORT || "5000",
    nodeEnv: process.env.NODE_ENV || "development",

    mongoUri: process.env.MONGO_URI as string,

    accessSecret: process.env.ACCESS_TOKEN_SECRET as string,
    refreshSecret: process.env.REFRESH_TOKEN_SECRET as string,

    accessExpiry: process.env.ACCESS_TOKEN_EXPIRES || "15m",
    refreshExpiry: process.env.REFRESH_TOKEN_EXPIRES || "7d",

    encryptionSecret: process.env.ENCRYPTION_SECRET as string,

    smtpHost: process.env.SMTP_HOST as string,
    smtpPort: process.env.SMTP_PORT as string,
    smtpUser: process.env.SMTP_USER as string,
    smtpPass: process.env.SMTP_PASS as string,
};
