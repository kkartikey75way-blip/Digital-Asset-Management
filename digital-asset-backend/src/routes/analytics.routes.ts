import { Router } from "express";
import { analyticsController } from "../controllers/analytics.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.get("/", protect, analyticsController);

export default router;
