import { Router } from "express";
import authRoutes from "./auth.routes";
import assetRoutes from "./asset.routes";
import vendorRoutes from "./vendor.routes";
import renewalRoutes from "./renewal.routes";
import analyticsRoutes from "./analytics.routes";
import reportRoutes from "./report.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/assets", assetRoutes);
router.use("/vendors", vendorRoutes);
router.use("/renewals", renewalRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/reports", reportRoutes);


export default router;
