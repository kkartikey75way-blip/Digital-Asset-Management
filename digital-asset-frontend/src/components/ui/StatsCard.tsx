interface StatsCardProps {
    label: string;
    value: string | number;
}

const StatsCard = ({ label, value }: StatsCardProps) => {
    return (
        <div className="glass-card p-6 rounded-2xl">
            <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">{label}</p>
            <h3 className="text-3xl font-bold mt-2 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                {value}
            </h3>
        </div>
    );
};

export default StatsCard;
