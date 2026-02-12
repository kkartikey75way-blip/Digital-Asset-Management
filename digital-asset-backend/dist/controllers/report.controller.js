"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportAssetsPDF = exports.exportAssetsCSV = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const asset_model_1 = __importDefault(require("../models/asset.model"));
const asyncHandler_1 = require("../utils/asyncHandler");
const json2csv_1 = require("json2csv");
exports.exportAssetsCSV = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const authReq = req;
    const assets = await asset_model_1.default.find({
        isDeleted: false,
    }).populate("vendor");
    if (!assets.length) {
        res.status(404).json({
            success: false,
            message: "No assets found",
        });
        return;
    }
    const formattedData = assets.map((asset) => {
        const vendorName = asset.vendor &&
            typeof asset.vendor === "object" &&
            "name" in asset.vendor
            ? asset.vendor.name
            : "";
        return {
            Name: asset.name,
            Category: asset.category,
            Cost: asset.cost,
            ExpiryDate: asset.expiryDate,
            Vendor: vendorName,
            CreatedAt: asset.createdAt,
        };
    });
    const parser = new json2csv_1.Parser();
    const csv = parser.parse(formattedData);
    res.header("Content-Type", "text/csv");
    res.attachment("assets-report.csv");
    res.send(csv);
});
exports.exportAssetsPDF = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const assets = await asset_model_1.default.find({
        isDeleted: false,
    });
    const doc = new pdfkit_1.default();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=assets.pdf");
    doc.pipe(res);
    doc.fontSize(18).text("Asset Report", {
        align: "center",
    });
    doc.moveDown();
    assets.forEach((asset) => {
        doc
            .fontSize(12)
            .text(`Name: ${asset.name}`)
            .text(`Category: ${asset.category}`)
            .text(`Cost: ${asset.cost}`)
            .text(`Expiry: ${asset.expiryDate}`)
            .moveDown();
    });
    doc.end();
});
