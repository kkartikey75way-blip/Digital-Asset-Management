import ExportButtons from "../../components/dashboard/ExportButtons";
import { useGetAnalyticsQuery } from "../../services/analyticsApi";
import LoadingState from "../../components/ui/LoadingState";

const ReportsPage = () => {
    const { data, isLoading } = useGetAnalyticsQuery();

    if (isLoading) {
        return <LoadingState label="Preparing reports..." />;
    }

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <section className="relative overflow-hidden rounded-[2.5rem] p-1 shadow-premium">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 animate-gradient-xy"></div>
                <div className="relative flex flex-col gap-8 rounded-[2.4rem] bg-slate-950/90 backdrop-blur-2xl px-12 py-10 text-white lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-xl">
                        <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
                            Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Central.</span>
                        </h2>
                        <p className="mt-6 text-lg text-slate-300 font-medium leading-relaxed">
                            Export comprehensive data for your audits, budgeting, and compliance requirements in one click.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <ExportButtons />
                    </div>
                </div>
            </section>

            <div className="grid gap-8 md:grid-cols-3">
                <div className="glass-card p-8 group">
                    <div className="stat-label">Total Assets</div>
                    <div className="stat-value text-indigo-600">{data?.totalAssets ?? 0}</div>
                    <p className="mt-2 text-xs font-bold text-slate-400">CURRENT INVENTORY</p>
                </div>
                <div className="glass-card p-8 group">
                    <div className="stat-label">Total Investment</div>
                    <div className="stat-value text-emerald-600">₹{data?.totalCost.toLocaleString() ?? 0}</div>
                    <p className="mt-2 text-xs font-bold text-slate-400">ANNUAL SPEND</p>
                </div>
                <div className="glass-card p-8 group">
                    <div className="stat-label">Data Fidelity</div>
                    <div className="stat-value text-purple-600">100%</div>
                    <p className="mt-2 text-xs font-bold text-slate-400">ENCRYPTED & VERIFIED</p>
                </div>
            </div>

            <section className="glass-card p-10">
                <div className="max-w-2xl">
                    <h3 className="text-2xl font-black text-slate-900">Custom Data Export</h3>
                    <p className="mt-4 text-slate-500 font-medium leading-relaxed">
                        Need a custom report? Our API-driven architecture allows for granular data extraction.
                        Use the buttons above to download the latest snapshots of your digital estate.
                    </p>
                    <div className="mt-8 flex gap-4">
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            CSV Format (Excel Compatible)
                        </div>
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
                            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                            PDF Format (Audit Ready)
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ReportsPage;
