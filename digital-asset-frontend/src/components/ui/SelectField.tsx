import type { ReactNode } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import FormError from "./FormError";

interface SelectFieldProps {
    label: string;
    registration: UseFormRegisterReturn;
    error?: string;
    children: ReactNode;
}

const SelectField = ({
    label,
    registration,
    error,
    children,
}: SelectFieldProps) => {
    return (
        <div>
            <label className="block text-sm font-medium mb-1">
                {label}
            </label>

            <select
                {...registration}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            >
                {children}
            </select>

            <FormError message={error} />
        </div>
    );
};

export default SelectField;
