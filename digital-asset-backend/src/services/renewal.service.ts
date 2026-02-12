import Renewal from "../models/renewal.model";
import Asset from "../models/asset.model";
import { ApiError } from "../utils/ApiError";

export const renewAsset = async (
    assetId: string,
    cost: number
) => {
    const asset = await Asset.findById(assetId);

    if (!asset)
        throw new ApiError(404, "Asset not found");

    const renewal = await Renewal.create({
        asset: assetId,
        cost,
    });

    return renewal;
};

export const getRenewalHistory = async (
    assetId: string
) => {
    return Renewal.find({ asset: assetId }).sort({
        renewedAt: -1,
    });
};
