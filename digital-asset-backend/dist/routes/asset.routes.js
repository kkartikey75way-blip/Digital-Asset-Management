"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asset_controller_1 = require("../controllers/asset.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const upload_middleware_1 = require("../middleware/upload.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const router = (0, express_1.Router)();
// Match frontend field name "contractFile" from AssetForm
router.post("/", auth_middleware_1.protect, (0, role_middleware_1.authorize)("admin", "manager"), upload_middleware_1.upload.single("contractFile"), asset_controller_1.createAssetController);
router.get("/", auth_middleware_1.protect, asset_controller_1.getAssetsController);
router.delete("/:id", auth_middleware_1.protect, (0, role_middleware_1.authorize)("admin", "manager"), asset_controller_1.deleteAssetController);
exports.default = router;
