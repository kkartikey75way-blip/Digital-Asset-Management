import mongoose, { Schema, Document } from "mongoose";

export interface IRenewal extends Document {
    asset: mongoose.Types.ObjectId;
    renewedAt: Date;
    cost: number;
}

const RenewalSchema = new Schema<IRenewal>(
    {
        asset: {
            type: Schema.Types.ObjectId,
            ref: "Asset",
            required: true,
            index: true,
        },
        renewedAt: {
            type: Date,
            default: Date.now,
        },
        cost: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    { timestamps: true }
);

RenewalSchema.index({ asset: 1, renewedAt: -1 });

export default mongoose.model<IRenewal>(
    "Renewal",
    RenewalSchema
);
