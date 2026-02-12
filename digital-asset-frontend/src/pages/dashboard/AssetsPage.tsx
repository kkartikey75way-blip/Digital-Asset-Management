import { useState, useMemo } from "react";

import { useGetAssetsQuery } from "../../services/assetApi";
import AssetForm from "../../components/form/AssetForm";
import AssetCard from "../../components/dashboard/AssetCard";
import Pagination from "../../components/ui/Pagination";
import ExportButtons from "../../components/dashboard/ExportButtons";
import SearchBar from "../../components/ui/SearchBar";
import LoadingState from "../../components/ui/LoadingState";

const AssetsPage = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const { data, isLoading } = useGetAssetsQuery({
        page,
        limit: 5,
        search,
    });

    // Memoized Data
    const assets = useMemo(() => data?.data ?? [], [data]);

    const totalPages = useMemo(() => {
        if (!data) return 0;
        return Math.ceil(data.total / data.limit);
    }, [data]);

    // Handlers
    const handleSearchChange = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    if (isLoading) {
        return <LoadingState label="Loading assets..." />;
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)]">
                <div className="lg:sticky lg:top-32 self-start">
                    <AssetForm />
                </div>

                <section className="space-y-6">
                    <div className="glass-card flex flex-col gap-4 p-6 rounded-[2rem] sm:flex-row sm:items-center sm:justify-between">
                        <div className="w-full sm:max-w-md">
                            <SearchBar
                                value={search}
                                onSearchChange={handleSearchChange}
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <ExportButtons />
                        </div>
                    </div>

                    <div className="grid gap-4">
                        {assets.length === 0 ? (
                            <div className="glass-card flex flex-col items-center justify-center p-20 rounded-[2rem] text-center">
                                <span className="text-5xl mb-4">🔍</span>
                                <h3 className="text-lg font-bold text-slate-800">No assets found</h3>
                                <p className="mt-2 text-slate-500 max-w-xs mx-auto">
                                    Try adjusting your search or add a new license using the form on the left.
                                </p>
                            </div>
                        ) : (
                            assets.map((asset) => (
                                <AssetCard
                                    key={asset._id}
                                    id={asset._id}
                                    name={asset.name}
                                    category={asset.category}
                                    cost={asset.cost}
                                    licenseKey={asset.licenseKey}
                                />
                            ))
                        )}
                    </div>

                    <div className="flex justify-center pt-4">
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={setPage}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AssetsPage;
