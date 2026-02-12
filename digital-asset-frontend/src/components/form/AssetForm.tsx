import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateAssetMutation } from "../../services/assetApi";
import { useGetVendorsQuery } from "../../services/vendorApi";
import { useMemo } from "react";

import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import VendorSelect from "../ui/VendorSelect";
import Button from "../ui/Button";
import FileInput from "../ui/FileInput";
import { useAppSelector } from "../../store/hooks";
import { canCreateAsset } from "../../utils/role";
import { showSuccess, showError } from "../../utils/toast";

const assetSchema = z.object({
    name: z.string().min(1, "Asset name is required"),
    category: z.enum(["software", "domain", "cloud", "hardware"]),
    licenseKey: z.string().min(1, "License key is required"),
    cost: z.number().min(0, "Cost must be positive"),
    expiryDate: z.string().min(1, "Expiry date is required"),
    vendor: z.string().min(1, "Vendor is required"),
    contractFile: z
        .instanceof(File)
        .optional(),
});


type AssetFormData = z.infer<typeof assetSchema>;

const AssetForm = () => {
    const [createAsset, { isLoading }] =
        useCreateAssetMutation();

    const { data, isLoading: isVendorsLoading } =
        useGetVendorsQuery();

    const vendors = useMemo(
        () => data?.data ?? [],
        [data]
    );

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<AssetFormData>({
        resolver: zodResolver(assetSchema),
    });

    const onSubmit = async (formData: AssetFormData) => {
        try {
            const data = new FormData();

            data.append("name", formData.name);
            data.append("category", formData.category);
            data.append("licenseKey", formData.licenseKey);
            data.append("cost", String(formData.cost));
            data.append("expiryDate", formData.expiryDate);
            data.append("vendor", formData.vendor);

            if (formData.contractFile) {
                data.append("contractFile", formData.contractFile);
            }

            await createAsset(data).unwrap();
            showSuccess("Asset created successfully");
            reset();
        } catch {
            showError("Failed to create asset");
        }
    };

    const role = useAppSelector(
        (state) => state.auth.role
    );

    if (!canCreateAsset(role)) {
        return null;
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="glass-card p-10 rounded-[2.5rem] space-y-6 border-white/40"
        >
            <div className="mb-6">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    Add <span className="text-indigo-600">New Asset</span>
                </h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Register new license</p>
            </div>

            <div className="space-y-4">
                <InputField
                    label="Asset Name"
                    placeholder="e.g. Adobe Creative Cloud"
                    registration={register("name")}
                    error={errors.name?.message}
                />

                <div className="grid grid-cols-2 gap-4">
                    <SelectField
                        label="Category"
                        registration={register("category")}
                        error={errors.category?.message}
                    >
                        <option value="">Select Category</option>
                        <option value="software">Software</option>
                        <option value="domain">Domain</option>
                        <option value="cloud">Cloud</option>
                        <option value="hardware">Hardware</option>
                    </SelectField>

                    <InputField
                        label="Cost (₹)"
                        type="number"
                        placeholder="Investment"
                        registration={register("cost", {
                            valueAsNumber: true,
                        })}
                        error={errors.cost?.message}
                    />
                </div>

                <InputField
                    label="License Key"
                    placeholder="Enter activation token"
                    registration={register("licenseKey")}
                    error={errors.licenseKey?.message}
                />

                <div className="grid grid-cols-2 gap-4">
                    <InputField
                        label="Expiry Date"
                        type="date"
                        registration={register("expiryDate")}
                        error={errors.expiryDate?.message}
                    />

                    <SelectField
                        label="Vendor"
                        registration={register("vendor")}
                        error={errors.vendor?.message}
                    >
                        <VendorSelect
                            vendors={vendors}
                            isLoading={isVendorsLoading}
                        />
                    </SelectField>
                </div>

                <FileInput
                    label="Contract / Invoice (optional)"
                    onChange={(file) =>
                        setValue("contractFile", file)
                    }
                    error={errors.contractFile?.message}
                />
            </div>

            <div className="pt-4">
                <Button
                    type="submit"
                    label="Deploy Asset"
                    loading={isLoading}
                />
            </div>
        </form>
    );
};

export default AssetForm;
