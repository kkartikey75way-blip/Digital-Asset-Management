import { Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";

import { asyncHandler } from "../utils/asyncHandler";
import { sendResponse } from "../utils/response";
import { AuthRequest } from "../middleware/auth.middleware";
import {
    createAsset,
    getAssets,
    deleteAsset,
    CreateAssetInput,
} from "../services/asset.service";

interface DeleteParams extends ParamsDictionary {
    id: string;
}

export const createAssetController = asyncHandler(async (req: AuthRequest, res: Response) => {
    const assetBody = req.body as CreateAssetInput;
    const asset = await createAsset(
        {
            ...assetBody,
            contractFile: req.file?.filename,
        },
        req.user!.id
    );

    sendResponse(res, 201, "Asset created", asset);
});

export const getAssetsController = asyncHandler(async (req: AuthRequest, res: Response) => {
    const assets = await getAssets(
        req.user!.id,
        req.user!.role,
        req.query
    );

    sendResponse(res, 200, "Assets fetched", assets);
});

export const deleteAssetController = asyncHandler<DeleteParams>(async (req: AuthRequest<DeleteParams>, res: Response) => {
    await deleteAsset(req.params.id, req.user!.id);
    sendResponse(res, 200, "Asset deleted");
});
