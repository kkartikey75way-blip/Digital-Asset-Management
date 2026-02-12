import mongoose, { Schema, Document } from "mongoose";

export interface IVendor extends Document {
    name: string;
    contactEmail: string;
    phone?: string;
    website?: string;
    isDeleted: boolean;
}

const VendorSchema = new Schema<IVendor>(
    {
        name: {
            type: String,
            required: true,
            index: true,
        },
        contactEmail: {
            type: String,
            required: true,
        },
        phone: String,
        website: String,
        isDeleted: {
            type: Boolean,
            default: false,
            index: true,
        },
    },
    { timestamps: true }
);


export default mongoose.model<IVendor>(
    "Vendor",
    VendorSchema
);
