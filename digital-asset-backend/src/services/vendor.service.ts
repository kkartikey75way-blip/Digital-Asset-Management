import Vendor from "../models/vendor.model";
import { ApiError } from "../utils/ApiError";

export interface CreateVendorInput {
    name: string;
    contactEmail: string;
    phone?: string;
    website?: string;
}

export const createVendor = async (
    data: CreateVendorInput
) => {
    const exists = await Vendor.findOne({
        name: data.name,
        isDeleted: false,
    });

    if (exists)
        throw new ApiError(400, "Vendor already exists");

    return Vendor.create(data);
};

export const getVendors = async () => {
    return Vendor.find({ isDeleted: false }).sort({
        createdAt: -1,
    });
};

export const deleteVendor = async (id: string) => {
    const vendor = await Vendor.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    );

    if (!vendor) throw new ApiError(404, "Vendor not found");

    return vendor;
};
