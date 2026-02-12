import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import type { MonthlyCost } from "../../services/analyticsApi";

interface CostChartProps {
    data: MonthlyCost[];
}

const CostChart = ({ data }: CostChartProps) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow h-96">
            <h3 className="text-lg font-semibold mb-4">
                Monthly Cost Overview
            </h3>

            <ResponsiveContainer width="100%" height="85%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="total"
                        stroke="#4f46e5"
                        strokeWidth={3}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CostChart;
