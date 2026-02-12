"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAssetController = exports.getAssetsController = exports.createAssetController = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const response_1 = require("../utils/response");
const asset_service_1 = require("../services/asset.service");
exports.createAssetController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const assetBody = req.body;
    const asset = await (0, asset_service_1.createAsset)({
        ...assetBody,
        contractFile: req.file?.filename,
    }, req.user.id);
    (0, response_1.sendResponse)(res, 201, "Asset created", asset);
});
exports.getAssetsController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const assets = await (0, asset_service_1.getAssets)(req.user.id, req.user.role, req.query);
    (0, response_1.sendResponse)(res, 200, "Assets fetched", assets);
});
exports.deleteAssetController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    await (0, asset_service_1.deleteAsset)(req.params.id, req.user.id);
    (0, response_1.sendResponse)(res, 200, "Asset deleted");
});
