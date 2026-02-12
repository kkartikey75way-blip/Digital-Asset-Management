"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const report_controller_1 = require("../controllers/report.controller");
const router = (0, express_1.Router)();
// Match frontend paths: /reports/assets/csv and /reports/assets/pdf
router.get("/assets/csv", auth_middleware_1.protect, report_controller_1.exportAssetsCSV);
router.get("/assets/pdf", auth_middleware_1.protect, report_controller_1.exportAssetsPDF);
exports.default = router;
