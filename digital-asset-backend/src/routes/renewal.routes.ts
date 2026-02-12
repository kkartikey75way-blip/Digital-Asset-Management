import { Router } from "express";
import {
    renewAssetController,
    getRenewalHistoryController,
} from "../controllers/renewal.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post(
    "/:assetId",
    protect,
    renewAssetController
);

router.get(
    "/:assetId",
    protect,
    getRenewalHistoryController
);

export default router;
