"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVendor = exports.getVendors = exports.createVendor = void 0;
const vendor_model_1 = __importDefault(require("../models/vendor.model"));
const ApiError_1 = require("../utils/ApiError");
const createVendor = async (data) => {
    const exists = await vendor_model_1.default.findOne({
        name: data.name,
        isDeleted: false,
    });
    if (exists)
        throw new ApiError_1.ApiError(400, "Vendor already exists");
    return vendor_model_1.default.create(data);
};
exports.createVendor = createVendor;
const getVendors = async () => {
    return vendor_model_1.default.find({ isDeleted: false }).sort({
        createdAt: -1,
    });
};
exports.getVendors = getVendors;
const deleteVendor = async (id) => {
    const vendor = await vendor_model_1.default.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!vendor)
        throw new ApiError_1.ApiError(404, "Vendor not found");
    return vendor;
};
exports.deleteVendor = deleteVendor;
