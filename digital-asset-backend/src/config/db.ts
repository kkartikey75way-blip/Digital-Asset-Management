import mongoose from "mongoose";
import { env } from "./env";

export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(env.mongoUri);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Failed");
        process.exit(1);
    }
};
