import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    useGetVendorsQuery,
    useCreateVendorMutation,
    useDeleteVendorMutation,
} from "../../services/vendorApi";
import LoadingState from "../../components/ui/LoadingState";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";
import { showSuccess, showError } from "../../utils/toast";
import { useAppSelector } from "../../store/hooks";

const vendorSchema = z.object({
    name: z.string().min(1, "Vendor name is required"),
    contactEmail: z
        .string()
        .email("Valid email is required"),
    phone: z.string().optional(),
    website: z
        .string()
        .url("Enter a valid URL")
        .optional()
        .or(z.literal("")),
});

type VendorFormData = z.infer<typeof vendorSchema>;

const VendorsPage = () => {
    const { data, isLoading } = useGetVendorsQuery();
    const [createVendor, { isLoading: isCreating }] =
        useCreateVendorMutation();
    const [deleteVendor] = useDeleteVendorMutation();
    const { role } = useAppSelector((state) => state.auth);
    const isAdmin = role === "admin";

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<VendorFormData>({
        resolver: zodResolver(vendorSchema),
    });

    const vendors = data?.data ?? [];

    const onSubmit = async (formData: VendorFormData) => {
        try {
            await createVendor(formData).unwrap();
            showSuccess("Vendor created");
            reset();
        } catch {
            showError("Failed to create vendor");
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this vendor?")) return;
        try {
            await deleteVendor(id).unwrap();
            showSuccess("Vendor deleted successfully");
        } catch {
            showError("Failed to delete vendor");
        }
    };

    if (isLoading) {
        return <LoadingState label="Loading vendors..." />;
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)]">
                <div className="lg:sticky lg:top-32 self-start">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="glass-card p-10 rounded-[2.5rem] border-white/40 space-y-6"
                    >
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                                Partner <span className="text-indigo-600">Onboarding</span>
                            </h3>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Register new vendor</p>
                        </div>

                        <div className="space-y-4">
                            <InputField
                                label="Vendor Name"
                                placeholder="e.g. Microsoft"
                                registration={register("name")}
                                error={errors.name?.message}
                            />
                            <InputField
                                label="Contact Email"
                                type="email"
                                placeholder="e.g. contact@vendor.com"
                                registration={register("contactEmail")}
                                error={errors.contactEmail?.message}
                            />
                            <InputField
                                label="Phone Number"
                                placeholder="+1 555 123 4567"
                                registration={register("phone")}
                                error={errors.phone?.message}
                            />
                            <InputField
                                label="Website URL"
                                placeholder="https://vendor.com"
                                registration={register("website")}
                                error={errors.website?.message}
                            />
                        </div>

                        <div className="pt-4">
                            <Button
                                type="submit"
                                label="Secure Onboard"
                                loading={isCreating}
                            />
                        </div>
                    </form>
                </div>

                <section className="space-y-6">
                    <div className="glass-card p-8 rounded-[2rem] flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">Managed Partners</h3>
                            <p className="text-sm text-slate-500 font-medium">Strategic vendors and subscription providers</p>
                        </div>
                        <div className="stat-value text-indigo-600">{vendors.length}</div>
                    </div>

                    <div className="grid gap-4">
                        {vendors.length === 0 ? (
                            <div className="glass-card flex flex-col items-center justify-center p-20 rounded-[2rem] text-center">
                                <span className="text-5xl mb-4">🤝</span>
                                <h3 className="text-lg font-bold text-slate-800">No vendors yet</h3>
                                <p className="mt-2 text-slate-500 max-w-xs mx-auto">
                                    Start by adding your first vendor partner using the onboarding form.
                                </p>
                            </div>
                        ) : (
                            vendors.map((vendor) => (
                                <div
                                    key={vendor._id}
                                    className="glass-card p-8 group flex items-center justify-between transition-all duration-500"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl group-hover:bg-indigo-50 group-hover:scale-110 transition-all">
                                            {vendor.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                                {vendor.name}
                                            </h4>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-sm font-medium text-slate-500">{vendor.contactEmail}</span>
                                                {vendor.website && (
                                                    <a
                                                        href={vendor.website}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-xs font-bold text-indigo-400 hover:text-indigo-600 uppercase tracking-widest"
                                                    >
                                                        Visit Site
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="hidden sm:block">
                                            <div className="stat-label">Communication</div>
                                            <div className="text-xs font-bold text-emerald-500 bg-emerald-50 px-3 py-1 rounded-lg">ACTIVE</div>
                                        </div>
                                        {isAdmin && (
                                            <button
                                                onClick={() => handleDelete(vendor._id)}
                                                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                                title="Delete Vendor"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default VendorsPage;
