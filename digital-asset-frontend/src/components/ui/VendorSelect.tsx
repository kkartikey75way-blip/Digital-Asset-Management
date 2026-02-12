import type { Vendor } from "../../services/vendorApi";

interface VendorSelectProps {
    vendors: Vendor[];
    isLoading: boolean;
}

const VendorSelect = ({
    vendors,
    isLoading,
}: VendorSelectProps) => {
    const defaultLabel = isLoading
        ? "Loading vendors..."
        : "Select Vendor";

    return (
        <>
            <option value="">{defaultLabel}</option>
            {vendors.map((vendor) => (
                <option key={vendor._id} value={vendor._id}>
                    {vendor.name}
                </option>
            ))}
        </>
    );
};

export default VendorSelect;
