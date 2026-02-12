import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export const asyncHandler =
    <
        P extends ParamsDictionary = ParamsDictionary,
        ResBody = unknown,
        ReqBody = unknown,
        ReqQuery extends ParsedQs = ParsedQs
    >(
        fn: (
            req: Request<P, ResBody, ReqBody, ReqQuery>,
            res: Response<ResBody>,
            next: NextFunction
        ) => Promise<void>
    ) =>
        (
            req: Request<P, ResBody, ReqBody, ReqQuery>,
            res: Response<ResBody>,
            next: NextFunction
        ): void => {
            Promise.resolve(fn(req, res, next)).catch(next);
        };
