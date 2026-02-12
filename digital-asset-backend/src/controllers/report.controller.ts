import { Response } from "express";
import PDFDocument from "pdfkit";
import Asset from "../models/asset.model";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthRequest } from "../middleware/auth.middleware";
import { Parser } from "json2csv";

export const exportAssetsCSV = asyncHandler(
    async (req, res: Response) => {
        const authReq = req as AuthRequest;

        const assets = await Asset.find({
            isDeleted: false,
        }).populate("vendor");

        if (!assets.length) {
            res.status(404).json({
                success: false,
                message: "No assets found",
            });
            return;
        }

        const formattedData = assets.map((asset) => {
            const vendorName =
                asset.vendor &&
                    typeof asset.vendor === "object" &&
                    "name" in asset.vendor
                    ? asset.vendor.name
                    : "";

            return {
                Name: asset.name,
                Category: asset.category,
                Cost: asset.cost,
                ExpiryDate: asset.expiryDate,
                Vendor: vendorName,
                CreatedAt: asset.createdAt,
            };
        });

        const parser = new Parser();
        const csv = parser.parse(formattedData);

        res.header("Content-Type", "text/csv");
        res.attachment("assets-report.csv");

        res.send(csv);
    }
);


export const exportAssetsPDF =
    asyncHandler(async (req: AuthRequest, res: Response) => {
        const assets = await Asset.find({
            isDeleted: false,
        });

        const doc = new PDFDocument();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=assets.pdf"
        );

        doc.pipe(res);

        doc.fontSize(18).text("Asset Report", {
            align: "center",
        });

        doc.moveDown();

        assets.forEach((asset) => {
            doc
                .fontSize(12)
                .text(`Name: ${asset.name}`)
                .text(`Category: ${asset.category}`)
                .text(`Cost: ${asset.cost}`)
                .text(`Expiry: ${asset.expiryDate}`)
                .moveDown();
        });

        doc.end();
    });
