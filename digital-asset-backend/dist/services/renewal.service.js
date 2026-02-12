"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRenewalHistory = exports.renewAsset = void 0;
const renewal_model_1 = __importDefault(require("../models/renewal.model"));
const asset_model_1 = __importDefault(require("../models/asset.model"));
const ApiError_1 = require("../utils/ApiError");
const renewAsset = async (assetId, cost) => {
    const asset = await asset_model_1.default.findById(assetId);
    if (!asset)
        throw new ApiError_1.ApiError(404, "Asset not found");
    const renewal = await renewal_model_1.default.create({
        asset: assetId,
        cost,
    });
    return renewal;
};
exports.renewAsset = renewAsset;
const getRenewalHistory = async (assetId) => {
    return renewal_model_1.default.find({ asset: assetId }).sort({
        renewedAt: -1,
    });
};
exports.getRenewalHistory = getRenewalHistory;
