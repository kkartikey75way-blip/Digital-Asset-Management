interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) => {
    if (totalPages <= 1) return null;

    const pages = Array.from(
        { length: totalPages },
        (_, i) => i + 1
    );

    return (
        <div className="flex gap-2 justify-center mt-6">
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-1 rounded ${page === currentPage
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200"
                        }`}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
