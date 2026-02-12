import { useState } from "react";

import { useDeleteAssetMutation } from "../../services/assetApi";
import { useAppSelector } from "../../store/hooks";
import { showSuccess, showError } from "../../utils/toast";
import { canDeleteAsset, canRenewAsset } from "../../utils/role";
import RenewalForm from "../form/RenewalForm";
import RenewalHistory from "./RenewalHistory";

interface AssetCardProps {
    id: string;
    name: string;
    category: string;
    cost: number;
    licenseKey: string;
}

const AssetCard = ({
    id,
    name,
    category,
    cost,
    licenseKey,
}: AssetCardProps) => {
    // Hooks & Store
    const [showKey, setShowKey] = useState(false);
    const role = useAppSelector((state) => state.auth.role);
    const [deleteAsset, { isLoading }] = useDeleteAssetMutation();

    const handleDelete = async () => {
        try {
            await deleteAsset(id).unwrap();
            showSuccess("Asset deleted");
        } catch {
            showError("Failed to delete asset");
        }
    };

    return (
        <div className="glass-card p-8 rounded-[2.5rem] space-y-8 group hover:animate-float overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/10 transition-colors"></div>

            <div className="flex justify-between items-start relative z-10">
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform duration-500">
                            {category === 'software' ? '💿' : category === 'cloud' ? '☁️' : category === 'domain' ? '🌐' : '💻'}
                        </div>
                        <div>
                            <h4 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight">
                                {name}
                            </h4>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                {category}
                            </span>
                        </div>
                    </div>

                    <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-100/50 flex items-center justify-between group/key">
                        <div className="space-y-1">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">License Key</span>
                            <p className="font-mono text-sm font-bold text-slate-700 tracking-wider">
                                {showKey ? licenseKey : "•••• •••• •••• ••••"}
                            </p>
                        </div>
                        <button
                            onClick={() => setShowKey(!showKey)}
                            className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-white hover:shadow-sm transition-all duration-300"
                            title={showKey ? "Hide Key" : "Show Key"}
                        >
                            {showKey ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                    <div className="text-2xl font-black text-indigo-600 tracking-tighter">
                        ₹{cost.toLocaleString()}
                    </div>
                    {canDeleteAsset(role) && (
                        <button
                            type="button"
                            disabled={isLoading}
                            onClick={handleDelete}
                            className="p-2.5 rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-50 hover:shadow-inner transition-all duration-300"
                            title="Decommission Asset"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            <div className="pt-8 border-t border-slate-100 relative z-10">
                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="space-y-6">
                        {canRenewAsset(role) && (
                            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100/50">
                                <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Extend License</h5>
                                <RenewalForm assetId={id} />
                            </div>
                        )}
                    </div>

                    <div className="p-6 rounded-3xl bg-indigo-50/30 border border-indigo-100/50">
                        <RenewalHistory assetId={id} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssetCard;
