import { useMemo } from "react";
import { useGetAnalyticsQuery } from "../../services/analyticsApi";
import StatsCard from "../../components/ui/StatsCard";
import CostChart from "../../components/dashboard/CostChart";
import LoadingState from "../../components/ui/LoadingState";

const AnalyticsPage = () => {
    const { data, isLoading } = useGetAnalyticsQuery();

    const monthlyData = useMemo(
        () => data?.monthlyCosts ?? [],
        [data]
    );

    if (isLoading) {
        return (
            <LoadingState label="Loading analytics..." />
        );
    }

    if (!data) {
        return (
            <div className="rounded-xl bg-white p-6 text-sm text-slate-500 shadow-sm">
                No analytics data available yet. Once assets
                and renewals are recorded, you&apos;ll see
                monthly cost trends here.
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid gap-8 md:grid-cols-3">
                <StatsCard
                    label="Total Inventory"
                    value={data.totalAssets}
                />
                <StatsCard
                    label="Annual Investment"
                    value={`₹${data.totalCost.toLocaleString()}`}
                />
                <StatsCard
                    label="Resource Efficiency"
                    value={
                        data.monthlyCosts.length > 0
                            ? `₹${Math.round(
                                data.totalCost /
                                data.monthlyCosts.length
                            ).toLocaleString()}`
                            : "—"
                    }
                />
            </div>

            <div className="glass-card p-10 rounded-[2.5rem]">
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-slate-900">Cost Trajectory</h3>
                    <p className="text-sm text-slate-500 font-medium">Monthly expenditure analysis across all vendors</p>
                </div>
                <CostChart data={monthlyData} />
            </div>

            <div className="glass-card p-10 rounded-[2.5rem] bg-indigo-950 text-white border-none">
                <div className="mb-8">
                    <h3 className="text-xl font-bold">Annual Budgeting</h3>
                    <p className="text-sm text-indigo-300 font-medium">Forecast vs. actual digital expenditure</p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-4">
                        <div className="stat-label text-indigo-400">Projected Budget</div>
                        <div className="text-4xl font-black">₹{(data.totalCost * 1.1).toLocaleString()}</div>
                        <div className="h-2 w-full bg-indigo-900/50 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 w-full"></div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="stat-label text-indigo-400">Actual Spend</div>
                        <div className="text-4xl font-black">₹{data.totalCost.toLocaleString()}</div>
                        <div className="h-2 w-full bg-indigo-900/50 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-400 w-[90%]"></div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                        <span className="text-2xl">💡</span>
                        <p className="text-sm font-medium text-indigo-200">
                            You are currently <span className="text-emerald-400 font-bold">10% under budget</span>.
                            Great work on managing your enterprise subscriptions!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;

