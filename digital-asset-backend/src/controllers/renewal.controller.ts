import { Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { asyncHandler } from "../utils/asyncHandler";
import { sendResponse } from "../utils/response";
import {
    renewAsset,
    getRenewalHistory,
} from "../services/renewal.service";
import { AuthRequest } from "../middleware/auth.middleware";

export const renewAssetController =
    asyncHandler(
        async (
            req: AuthRequest<{ assetId: string }, { cost: number }>,
            res: Response
        ) => {
            const assetId = Array.isArray(req.params.assetId)
                ? req.params.assetId[0]
                : req.params.assetId;

            const renewal = await renewAsset(
                assetId,
                req.body.cost
            );

            sendResponse(res, 201, "Asset renewed", renewal);
        });

export const getRenewalHistoryController =
    asyncHandler(async (req, res: Response) => {
        const assetId = Array.isArray(req.params.assetId)
            ? req.params.assetId[0]
            : req.params.assetId;

        const history = await getRenewalHistory(
            assetId
        );

        sendResponse(res, 200, "Renewal history fetched", history);
    });
