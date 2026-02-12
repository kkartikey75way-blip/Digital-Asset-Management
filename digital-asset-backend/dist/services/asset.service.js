"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAsset = exports.getAssets = exports.createAsset = void 0;
const asset_model_1 = __importDefault(require("../models/asset.model"));
const encrypt_1 = require("../utils/encrypt");
const pagination_1 = require("../utils/pagination");
const ApiError_1 = require("../utils/ApiError");
const createAsset = async (data, userId) => {
    const encryptedKey = (0, encrypt_1.encryptText)(data.licenseKey);
    return asset_model_1.default.create({
        ...data,
        licenseKey: encryptedKey,
        owner: userId,
    });
};
exports.createAsset = createAsset;
const getAssets = async (userId, userRole, query) => {
    const { page, limit, skip } = (0, pagination_1.getPagination)(query);
    const filter = {
        isDeleted: false,
    };
    if (query.category) {
        filter.category = query.category;
    }
    if (typeof query.search === "string" &&
        query.search.trim().length > 0) {
        filter.name = {
            $regex: query.search.trim(),
            $options: "i",
        };
    }
    const [items, total] = await Promise.all([
        asset_model_1.default.find(filter)
            .populate("vendor")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }),
        asset_model_1.default.countDocuments(filter),
    ]);
    const decryptedItems = items.map((item) => {
        const itemObj = item.toObject();
        if (itemObj.licenseKey) {
            try {
                itemObj.licenseKey = (0, encrypt_1.decryptText)(itemObj.licenseKey);
            }
            catch (error) {
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
exports.getAssets = getAssets;
const deleteAsset = async (assetId, userId) => {
    const asset = await asset_model_1.default.findOne({
        _id: assetId,
        owner: userId,
    });
    if (!asset) {
        throw new ApiError_1.ApiError(404, "Asset not found");
    }
    asset.isDeleted = true;
    await asset.save();
};
exports.deleteAsset = deleteAsset;
