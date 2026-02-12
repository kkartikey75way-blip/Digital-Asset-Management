import type { UseFormRegisterReturn } from "react-hook-form";
import FormError from "./FormError";

interface InputFieldProps {
    label: string;
    type?: string;
    placeholder?: string;
    registration: UseFormRegisterReturn;
    error?: string;
}

const InputField = ({
    label,
    type = "text",
    placeholder,
    registration,
    error,
}: InputFieldProps) => {
    return (
        <div>
            <label className="block text-sm font-medium mb-1">
                {label}
            </label>

            <input
                type={type}
                placeholder={placeholder}
                {...registration}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <FormError message={error} />
        </div>
    );
};

export default InputField;
