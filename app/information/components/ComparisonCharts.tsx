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

interface ChartDataItem {
    name: string;
    revenue: number | null;
    valuation: number | null;
    employees: number;
    funding: number | null;
    isMainCompany: boolean;
}

const ComparisonCharts = ({ companyData }: ComparisonChartProps) => {
    // Prepare data for visualization
    const prepareComparisonData = (): ChartDataItem[] => {
        const mainCompany: ChartDataItem = {
            name: companyData.companyName,
            revenue: parseFinancialString(companyData.company_info_fixed['annual revenue']),
            valuation: parseFinancialString(companyData.company_info_fixed['current valuation']),
            employees: companyData.employeeCount || 0,
            funding: parseFinancialString(companyData.company_info_fixed['total funding']),
            isMainCompany: true,
        };

        const competitorsData = companyData.competitors['Competitor Name']
            .map((name, index): ChartDataItem => ({
                name,
                revenue: parseFinancialString(companyData.competitors['Revenue'][index]),
                valuation: parseFinancialString(companyData.competitors['Valuation'][index]),
                employees: parseInt(companyData.competitors['Number of Employees'][index] || '0'),
                funding: parseFinancialString(companyData.competitors['Total Funding'][index]),
                isMainCompany: false,
            }))
            .filter(item => item.revenue !== null) as ChartDataItem[];

        // Sort competitors by revenue (descending)
        const sortedCompetitors = [...competitorsData].sort((a, b) => (b.revenue || 0) - (a.revenue || 0));
        
        return [mainCompany, ...sortedCompetitors];
    };

    const chartData = prepareComparisonData();

    // Funding timeline data preparation
    const fundingData = companyData.funding.Date.map((date, index) => ({
        date,
        amount: parseFinancialString(companyData.funding.Amount[index]),
        round: companyData.funding.Round[index],
        investor: companyData.funding['Lead Investors'][index],
    })).filter(item => item.amount !== null);

    // Custom bar shape with different colors for main company
    const renderCustomBar = (props: any) => {
        const { fill, x, y, width, height, payload } = props;
        const isMain = payload.isMainCompany;
        return (
            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                fill={isMain ? '#6366f1' : '#3b82f6'}
                rx={4}
                ry={4}
            />
        );
    };

    // Custom area shape with different colors
    const renderCustomArea = (props: any) => {
        const { points, payload } = props;
        const isMain = payload.isMainCompany;
        const path = points.map((p: any) => `${p.x},${p.y}`).join(' L');
        return (
            <path
                d={`M${path}`}
                fill={isMain ? '#c4b5fd' : '#a5b4fc'}
                stroke={isMain ? '#7c3aed' : '#6366f1'}
                strokeWidth={2}
                fillOpacity={0.6}
            />
        );
    };

    return (
        <div className="space-y-8">
            {/* Revenue Comparison Chart */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Revenue Comparison ($M)</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            layout="vertical"
                            margin={{ left: 100, right: 20 }}
                            barSize={30}
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                            <XAxis type="number" />
                            <YAxis 
                                type="category" 
                                dataKey="name" 
                                width={120} 
                                tick={{ fontSize: 12 }}
                            />
                            <Tooltip 
                                formatter={(value) => [`$${value}M`, 'Revenue']}
                                contentStyle={{ borderRadius: '8px' }}
                            />
                            <Legend />
                            <Bar
                                dataKey="revenue"
                                name="Annual Revenue"
                                shape={renderCustomBar}
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
                            <BarChart
                                data={chartData.filter(d => d.valuation !== null)}
                                layout="vertical"
                                margin={{ left: 100, right: 20 }}
                                barSize={30}
                            >
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                <XAxis type="number" />
                                <YAxis 
                                    type="category" 
                                    dataKey="name" 
                                    width={120} 
                                    tick={{ fontSize: 12 }}
                                />
                                <Tooltip 
                                    formatter={(value) => [`$${value}B`, 'Valuation']}
                                    contentStyle={{ borderRadius: '8px' }}
                                />
                                <Legend />
                                <Bar
                                    dataKey="valuation"
                                    name="Valuation"
                                    // shape={(props) => renderCustomBar({ 
                                    //     ...props, 
                                    //     fill: props.payload.isMainCompany ? '#8b5cf6' : '#10b981'
                                    // })}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">Employee Count</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={chartData}
                                margin={{ left: 20, right: 20 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                <YAxis scale="log" />
                                <Tooltip />
                                <Legend />
                                <Area
                                    type="monotone"
                                    dataKey="employees"
                                    name="Employees"
                                    // shape={renderCustomArea}
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
                                contentStyle={{ borderRadius: '8px' }}
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