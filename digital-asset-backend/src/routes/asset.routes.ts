import { Router } from "express";
import {
    createAssetController,
    getAssetsController,
    deleteAssetController,
} from "../controllers/asset.controller";
import { protect } from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";

import { authorize } from "../middleware/role.middleware";

const router = Router();

// Match frontend field name "contractFile" from AssetForm
router.post(
    "/",
    protect,
    authorize("admin", "manager"),
    upload.single("contractFile"),
    createAssetController
);

router.get("/", protect, getAssetsController);

router.delete(
    "/:id",
    protect,
    authorize("admin", "manager"),
    deleteAssetController
);

export default router;
