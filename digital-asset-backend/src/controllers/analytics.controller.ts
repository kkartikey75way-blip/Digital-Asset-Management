import { Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendResponse } from "../utils/response";
import { getCostAnalytics } from "../services/analytics.service";
import { AuthRequest } from "../middleware/auth.middleware";

export const analyticsController =
    asyncHandler(async (req: AuthRequest, res: Response) => {
        const analytics = await getCostAnalytics(
            req.user!.id
        );

        sendResponse(res, 200, "Analytics fetched", analytics);
    });
