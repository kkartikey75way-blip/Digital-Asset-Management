import FormError from "./FormError";

interface FileInputProps {
    label: string;
    onChange: (file?: File) => void;
    error?: string;
}

const FileInput = ({
    label,
    onChange,
    error,
}: FileInputProps) => {
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        onChange(file);
    };

    return (
        <div>
            <label className="block text-sm font-medium mb-1">
                {label}
            </label>

            <input
                type="file"
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
            />

            <FormError message={error} />
        </div>
    );
};

export default FileInput;
