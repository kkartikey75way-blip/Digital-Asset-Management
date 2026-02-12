import { Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";

import { asyncHandler } from "../utils/asyncHandler";
import { sendResponse } from "../utils/response";
import { AuthRequest } from "../middleware/auth.middleware";
import {
    createVendor,
    getVendors,
    deleteVendor,
    CreateVendorInput,
} from "../services/vendor.service";

export const createVendorController = asyncHandler(async (req: AuthRequest<ParamsDictionary, CreateVendorInput>, res: Response) => {
    const vendor = await createVendor(req.body);
    sendResponse(res, 201, "Vendor created", vendor);
});

export const getVendorsController = asyncHandler(async (_, res: Response) => {
    const vendors = await getVendors();
    sendResponse(res, 200, "Vendors fetched", vendors);
});

export const deleteVendorController = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    await deleteVendor(id as string);
    sendResponse(res, 200, "Vendor deleted");
});
