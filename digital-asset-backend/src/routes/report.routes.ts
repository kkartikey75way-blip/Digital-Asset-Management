import { Router } from "express";
import { protect } from "../middleware/auth.middleware";
import {
    exportAssetsCSV,
    exportAssetsPDF,
} from "../controllers/report.controller";

const router = Router();

// Match frontend paths: /reports/assets/csv and /reports/assets/pdf
router.get("/assets/csv", protect, exportAssetsCSV);
router.get("/assets/pdf", protect, exportAssetsPDF);

export default router;
