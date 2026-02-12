"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVendorController = exports.getVendorsController = exports.createVendorController = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const response_1 = require("../utils/response");
const vendor_service_1 = require("../services/vendor.service");
exports.createVendorController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const vendor = await (0, vendor_service_1.createVendor)(req.body);
    (0, response_1.sendResponse)(res, 201, "Vendor created", vendor);
});
exports.getVendorsController = (0, asyncHandler_1.asyncHandler)(async (_, res) => {
    const vendors = await (0, vendor_service_1.getVendors)();
    (0, response_1.sendResponse)(res, 200, "Vendors fetched", vendors);
});
exports.deleteVendorController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    await (0, vendor_service_1.deleteVendor)(id);
    (0, response_1.sendResponse)(res, 200, "Vendor deleted");
});
