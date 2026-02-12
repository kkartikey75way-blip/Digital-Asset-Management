import { Router } from "express";
import {
    createVendorController,
    getVendorsController,
    deleteVendorController,
} from "../controllers/vendor.controller";
import { protect } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

router.post(
    "/",
    protect,
    authorize("admin", "manager"),
    createVendorController
);

router.get("/", protect, getVendorsController);

router.delete(
    "/:id",
    protect,
    authorize("admin"),
    deleteVendorController
);

export default router;
