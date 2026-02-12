import mongoose, { Schema, Document } from "mongoose";

export type UserRole = "admin" | "manager" | "viewer";

export interface IUser extends Document {
    email: string;
    password: string;
    role: UserRole;
    tokenVersion: number;
    isVerified: boolean;
    verificationToken?: string;
}

const UserSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["admin", "manager", "viewer"],
            default: "viewer",
        },
        tokenVersion: {
            type: Number,
            default: 0,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
        },
    },
    { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
