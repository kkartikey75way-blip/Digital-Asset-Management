import { Router } from "express";
import {
    login,
    refresh,
    logout,
    register,
    verify,
} from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";
import { authLimiter } from "../middleware/rateLimit.middleware";

const router = Router();

router.post("/login", authLimiter, login);
router.post("/register", authLimiter, register);
router.post("/refresh", refresh);
router.post("/logout", protect, logout);
router.get("/verify", verify);

export default router;
