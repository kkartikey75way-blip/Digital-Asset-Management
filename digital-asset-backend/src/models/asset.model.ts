import mongoose, { Schema, Document } from "mongoose";
import { IVendor } from "./vendor.model";

export type AssetCategory =
    | "software"
    | "domain"
    | "cloud"
    | "hardware";

export interface IAsset extends Document {
    name: string;
    category: AssetCategory;
    licenseKey: string;
    cost: number;
    expiryDate: Date;
    owner: mongoose.Types.ObjectId;
    vendor: mongoose.Types.ObjectId | IVendor;
    contractFile?: string;
    isDeleted: boolean;

    createdAt: Date;
    updatedAt: Date;
}

const AssetSchema = new Schema<IAsset>(
    {
        name: {
            type: String,
            required: true,
            index: true,
        },
        category: {
            type: String,
            enum: ["software", "domain", "cloud", "hardware"],
            required: true,
            index: true,
        },
        licenseKey: {
            type: String,
            required: true,
        },
        cost: {
            type: Number,
            required: true,
            min: 0,
        },
        expiryDate: {
            type: Date,
            required: true,
            index: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        vendor: {
            type: Schema.Types.ObjectId,
            ref: "Vendor",
            required: true,
        },
        contractFile: {
            type: String,
        },
        isDeleted: {
            type: Boolean,
            default: false,
            index: true,
        },
    },
    { timestamps: true }
);

AssetSchema.index({ owner: 1, category: 1 });


export default mongoose.model<IAsset>(
    "Asset",
    AssetSchema
);
