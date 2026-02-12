import nodemailer from "nodemailer";
import { env } from "../config/env";

export const sendEmail = async (
    to: string,
    subject: string,
    html: string
) => {
    const transporter = nodemailer.createTransport({
        host: env.smtpHost,
        port: Number(env.smtpPort),
        secure: false,
        auth: {
            user: env.smtpUser,
            pass: env.smtpPass,
        },
    });

    await transporter.sendMail({
        from: env.smtpUser,
        to,
        subject,
        html,
    });
};
