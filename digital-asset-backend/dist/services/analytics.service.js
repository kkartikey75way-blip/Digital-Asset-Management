"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCostAnalytics = void 0;
const asset_model_1 = __importDefault(require("../models/asset.model"));
const getCostAnalytics = async (userId) => {
    const matchStage = {
        isDeleted: false,
    };
    const [monthlyAgg, yearlyAgg, totalAssets, totalCostAgg] = await Promise.all([
        asset_model_1.default.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                    },
                    totalCost: { $sum: "$cost" },
                },
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } },
        ]),
        asset_model_1.default.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: { year: { $year: "$createdAt" } },
                    totalCost: { $sum: "$cost" },
                },
            },
            { $sort: { "_id.year": 1 } },
        ]),
        asset_model_1.default.countDocuments(matchStage),
        asset_model_1.default.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: null,
                    totalCost: { $sum: "$cost" },
                },
            },
        ]),
    ]);
    const totalCost = totalCostAgg[0]?.totalCost ?? 0;
    const monthlyCosts = monthlyAgg.map((entry) => ({
        month: `${entry._id.year}-${String(entry._id.month).padStart(2, "0")}`,
        total: entry.totalCost,
    }));
    const yearlyCosts = yearlyAgg.map((entry) => ({
        year: entry._id.year,
        total: entry.totalCost,
    }));
    return {
        totalAssets,
        totalCost,
        monthlyCosts,
        yearlyCosts,
    };
};
exports.getCostAnalytics = getCostAnalytics;
