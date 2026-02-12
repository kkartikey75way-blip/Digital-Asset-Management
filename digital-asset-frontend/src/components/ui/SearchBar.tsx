interface SearchBarProps {
    value: string;
    onSearchChange: (value: string) => void;
}

const SearchBar = ({
    value,
    onSearchChange,
}: SearchBarProps) => {
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        onSearchChange(e.target.value);
    };

    return (
        <input
            type="text"
            placeholder="Search assets..."
            value={value}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
    );
};

export default SearchBar;
