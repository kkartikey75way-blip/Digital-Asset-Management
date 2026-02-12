import Asset from "../models/asset.model";

export const getCostAnalytics = async (
    userId: string
) => {
    const matchStage = {
        isDeleted: false,
    };

    const [monthlyAgg, yearlyAgg, totalAssets, totalCostAgg] =
        await Promise.all([
            Asset.aggregate([
                { $match: matchStage },
                {
                    $group: {
                        _id: {
                            year: { $year: "$createdAt" },
                            month: { $month: "$createdAt" },
                        },
                        totalCost: { $sum: "$cost" },
                    },
                },
                { $sort: { "_id.year": 1, "_id.month": 1 } },
            ]),
            Asset.aggregate([
                { $match: matchStage },
                {
                    $group: {
                        _id: { year: { $year: "$createdAt" } },
                        totalCost: { $sum: "$cost" },
                    },
                },
                { $sort: { "_id.year": 1 } },
            ]),
            Asset.countDocuments(matchStage),
            Asset.aggregate([
                { $match: matchStage },
                {
                    $group: {
                        _id: null,
                        totalCost: { $sum: "$cost" },
                    },
                },
            ]),
        ]);

    const totalCost =
        totalCostAgg[0]?.totalCost ?? 0;

    const monthlyCosts = monthlyAgg.map(
        (entry) => ({
            month: `${entry._id.year}-${String(
                entry._id.month
            ).padStart(2, "0")}`,
            total: entry.totalCost,
        })
    );

    const yearlyCosts = yearlyAgg.map(
        (entry) => ({
            year: entry._id.year,
            total: entry.totalCost,
        })
    );

    return {
        totalAssets,
        totalCost,
        monthlyCosts,
        yearlyCosts,
    };
};
