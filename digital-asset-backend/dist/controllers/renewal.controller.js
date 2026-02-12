"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRenewalHistoryController = exports.renewAssetController = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const response_1 = require("../utils/response");
const renewal_service_1 = require("../services/renewal.service");
exports.renewAssetController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const assetId = Array.isArray(req.params.assetId)
        ? req.params.assetId[0]
        : req.params.assetId;
    const renewal = await (0, renewal_service_1.renewAsset)(assetId, req.body.cost);
    (0, response_1.sendResponse)(res, 201, "Asset renewed", renewal);
});
exports.getRenewalHistoryController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const assetId = Array.isArray(req.params.assetId)
        ? req.params.assetId[0]
        : req.params.assetId;
    const history = await (0, renewal_service_1.getRenewalHistory)(assetId);
    (0, response_1.sendResponse)(res, 200, "Renewal history fetched", history);
});
