import { useGetRenewalsQuery } from "../../services/renewalApi";

interface RenewalHistoryProps {
    assetId: string;
}

const RenewalHistory = ({
    assetId,
}: RenewalHistoryProps) => {
    const { data, isLoading } =
        useGetRenewalsQuery(assetId);

    if (isLoading) {
        return <p className="text-xs text-slate-400 font-bold animate-pulse">SYNCING HISTORY...</p>;
    }

    if (!data?.data.length) {
        return <p className="text-xs text-slate-400 font-bold">NO PAST RENEWALS RECORDED</p>;
    }

    return (
        <div className="space-y-4">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Renewal Timeline
            </h4>

            <div className="space-y-2">
                {data.data.map((renewal) => (
                    <div
                        key={renewal._id}
                        className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 group/item hover:bg-white hover:shadow-md transition-all duration-300"
                    >
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span className="text-sm font-bold text-slate-700">
                                {new Date(renewal.renewedAt).toLocaleDateString(undefined, {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </span>
                        </div>
                        <span className="text-sm font-black text-indigo-600">
                            ₹{renewal.cost.toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RenewalHistory;
