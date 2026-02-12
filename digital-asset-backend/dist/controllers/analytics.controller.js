"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticsController = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const response_1 = require("../utils/response");
const analytics_service_1 = require("../services/analytics.service");
exports.analyticsController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const analytics = await (0, analytics_service_1.getCostAnalytics)(req.user.id);
    (0, response_1.sendResponse)(res, 200, "Analytics fetched", analytics);
});
