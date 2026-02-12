const LoadingState = ({ label }: { label?: string }) => {
    return (
        <div className="text-center py-6 text-gray-500">
            {label ?? "Loading..."}
        </div>
    );
};

export default LoadingState;
