"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const renewal_controller_1 = require("../controllers/renewal.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/:assetId", auth_middleware_1.protect, renewal_controller_1.renewAssetController);
router.get("/:assetId", auth_middleware_1.protect, renewal_controller_1.getRenewalHistoryController);
exports.default = router;
