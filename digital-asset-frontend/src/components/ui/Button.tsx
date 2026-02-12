interface ButtonProps {
    label: string;
    loading?: boolean;
    type?: "button" | "submit";
    onClick?: () => void;
}

const Button = ({
    label,
    loading = false,
    type = "button",
    onClick,
}: ButtonProps) => {
    const displayLabel = loading ? "Please wait..." : label;

    return (
        <button
            type={type}
            disabled={loading}
            onClick={onClick}
            className="premium-button premium-gradient px-6 py-2.5 rounded-xl font-medium shadow-premium hover:shadow-glow transition-all disabled:opacity-50 disabled:translate-y-0"
        >
            {displayLabel}
        </button>
    );
};

export default Button;
