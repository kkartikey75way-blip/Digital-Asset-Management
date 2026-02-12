import Asset, { IAsset, AssetCategory } from "../models/asset.model";
import { encryptText, decryptText } from "../utils/encrypt";
import { getPagination } from "../utils/pagination";
import { ApiError } from "../utils/ApiError";
import { ParsedQs } from "qs";

export interface CreateAssetInput {
    name: string;
    category: AssetCategory;
    licenseKey: string;
    cost: number;
    expiryDate: Date;
    vendor: string;
    contractFile?: string;
}

interface AssetQuery extends ParsedQs {
    category?: AssetCategory;
    page?: string;
    limit?: string;
    search?: string;
}

export const createAsset = async (
    data: CreateAssetInput,
    userId: string
) => {
    const encryptedKey = encryptText(data.licenseKey);

    return Asset.create({
        ...data,
        licenseKey: encryptedKey,
        owner: userId,
    });
};

export const getAssets = async (
    userId: string,
    userRole: string,
    query: AssetQuery
) => {
    const { page, limit, skip } = getPagination(query);

    interface AssetFilter {
        isDeleted: boolean;
        category?: AssetCategory;
        name?: { $regex: string; $options: string };
    }

    const filter: AssetFilter = {
        isDeleted: false,
    };

    if (query.category) {
        filter.category = query.category;
    }

    if (
        typeof query.search === "string" &&
        query.search.trim().length > 0
    ) {
        filter.name = {
            $regex: query.search.trim(),
            $options: "i",
        };
    }

    const [items, total] = await Promise.all([
        Asset.find(filter)
            .populate("vendor")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }),
        Asset.countDocuments(filter),
    ]);

    const decryptedItems = items.map((item) => {
        const itemObj = item.toObject();
        if (itemObj.licenseKey) {
            try {
                itemObj.licenseKey = decryptText(itemObj.licenseKey);
            } catch (error) {
                itemObj.licenseKey = "Error decrypting key";
            }
        }
        return itemObj;
    });

    return {
        data: decryptedItems,
        total,
        page,
        limit,
    };
};

export const deleteAsset = async (
    assetId: string,
    userId: string
): Promise<void> => {
    const asset = await Asset.findOne({
        _id: assetId,
        owner: userId,
    });

    if (!asset) {
        throw new ApiError(404, "Asset not found");
    }

    asset.isDeleted = true;
    await asset.save();
};
