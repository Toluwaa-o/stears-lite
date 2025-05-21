import { Competitors, FundingRound } from '@/types/Interfaces';
import parseFinancialString from '@/utils/NumberParser';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

interface ComparisonChartProps {
    companyData: {
        company_info_fixed: Record<string, string>;
        competitors: Competitors;
        funding: FundingRound,
        companyName: string,
        employeeCount: number
    };
}

const ComparisonCharts = ({ companyData }: ComparisonChartProps) => {
    // Prepare data for visualization
    const prepareComparisonData = () => {
        const mainCompany = {
            name: companyData.companyName,
            revenue: parseFinancialString(companyData.company_info_fixed['annual revenue']),
            valuation: parseFinancialString(companyData.company_info_fixed['current valuation']),
            employees: companyData.employeeCount || 0,
            funding: parseFinancialString(companyData.company_info_fixed['total funding']),
        };

        return companyData.competitors['Competitor Name'].map((name, index) => ({
            name,
            revenue: parseFinancialString(companyData.competitors['Revenue'][index]),
            valuation: parseFinancialString(companyData.competitors['Valuation'][index]),
            employees: parseInt(companyData.competitors['Number of Employees'][index] || '0'),
            funding: parseFinancialString(companyData.competitors['Total Funding'][index]),
            isMainCompany: false,
        })).filter(item => item.revenue !== null).concat({
            ...mainCompany,
            isMainCompany: true,
        });
    };

    const chartData = prepareComparisonData();

    // Funding timeline data preparation
    const fundingData = companyData.funding.Date.map((date, index) => ({
        date,
        amount: parseFinancialString(companyData.funding.Amount[index]),
        round: companyData.funding.Round[index],
        investor: companyData.funding['Lead Investors'][index],
    })).filter(item => item.amount !== null);

    return (
        <div className="space-y-8">
            {/* Revenue Comparison Chart */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Revenue Comparison ($M)</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value) => [`$${value}M`, 'Revenue']} />
                            <Legend />
                            <Bar
                                dataKey="revenue"
                                fill="#3b82f6"
                                name="Annual Revenue"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Valuation vs Funding */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">Valuation Comparison ($B)</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData.filter(d => d.valuation !== null)}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip formatter={(value) => [`$${value}B`, 'Valuation']} />
                                <Bar
                                    dataKey="valuation"
                                    fill="#10b981"
                                    name="Valuation"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">Employee Count</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis scale="log" />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="employees"
                                    stroke="#6366f1"
                                    fill="#a5b4fc"
                                    name="Employees"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Funding Timeline */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Funding History</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={fundingData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip
                                formatter={(value) => [`$${value}M`, 'Amount']}
                                labelFormatter={(date) => `Round: ${fundingData.find(d => d.date === date)?.round}`}
                            />
                            <Line
                                type="monotone"
                                dataKey="amount"
                                stroke="#ec4899"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                                name="Funding Amount"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default ComparisonCharts;