import { Competitors, FundingRound } from '@/types/Interfaces';
import parseFinancialString from '@/utils/NumberParser';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ScatterController, LogarithmicScale, TooltipItem } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ScatterController,
    LogarithmicScale,
);

interface ComparisonChartProps {
    companyData: {
        company_info_fixed: Record<string, string>;
        competitors: Competitors;
        funding: FundingRound;
        companyName: string;
        employeeCount: number;
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
    const MAIN_COMPANY_COLOR = '#7c3aed';  // Vibrant purple
    const COMPETITOR_COLOR = '#22d3ee';    // Bright teal (high contrast to purple)
    const HIGHLIGHT_EFFECT = {
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowBlur: 8,
        shadowOffsetX: 2,
        shadowOffsetY: 2
    };


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

    // Revenue chart options
    const revenueOptions = {
        indexAxis: 'y' as const,
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Revenue Comparison ($)',
            },
            tooltip: {
                callbacks: {
                    label: (context: TooltipItem<'bar'>) => {
                        return `$${(context.raw as number).toLocaleString()}`;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Revenue ($)'
                }
            }
        }
    };

    const revenueChartData = {
        labels: chartData.map(item => item.name),
        datasets: [{
            label: 'Annual Revenue',
            data: chartData.map(item => item.revenue),
            backgroundColor: chartData.map(item =>
                item.isMainCompany
                    ? MAIN_COMPANY_COLOR
                    : COMPETITOR_COLOR
            ),
            borderColor: chartData.map(item =>
                item.isMainCompany
                    ? '#5b21b6'  // Darker purple border
                    : '#0d9488'  // Darker teal border
            ),
            borderWidth: 1,
            borderRadius: 2,
            borderSkipped: false,
            // Add special effects to main company bars
            hoverBackgroundColor: chartData.map(item =>
                item.isMainCompany ? '#9333ea' : '#06b6d4'
            ),
            ...HIGHLIGHT_EFFECT
        }]
    };


    // Valuation chart options
    const valuationOptions = {
        indexAxis: 'y' as const,
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Valuation Comparison ($)',
            },
            tooltip: {
                callbacks: {
                    label: (context: TooltipItem<'bar'>) => {
                        return `$${(context.raw as number).toLocaleString()}`;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Valuation ($B)'
                }
            }
        }
    };

    const valuationChartData = {
        labels: chartData.filter(d => d.valuation !== null).map(item => item.name),
        datasets: [{
            label: 'Valuation',
            data: chartData.filter(d => d.valuation !== null).map(item => item.valuation),
            backgroundColor: chartData.filter(d => d.valuation !== null).map(item =>
                item.isMainCompany
                    ? MAIN_COMPANY_COLOR
                    : COMPETITOR_COLOR
            ),
            borderColor: chartData.filter(d => d.valuation !== null).map(item =>
                item.isMainCompany ? '#5b21b6' : '#0d9488'
            ),
            borderWidth: 1,
            borderRadius: 2,
            borderSkipped: false,
            // Add striped pattern to main company bars
            pattern: chartData.filter(d => d.valuation !== null).map(item =>
                item.isMainCompany
                    ? { shape: 'diagonalRight', spacing: 5, color: 'rgba(255,255,255,0.6)' }
                    : undefined
            ),
            ...HIGHLIGHT_EFFECT
        }]
    };

    // Employee chart options
    const employeeOptions = {
        indexAxis: 'x' as const, // Horizontal bars
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Employee Count Comparison',
            },
            tooltip: {
                callbacks: {
                    label: (context: TooltipItem<'bar'>) => {
                        return `$${(context.raw as number).toLocaleString()} employees`;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Number of Employees (log scale)'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Company'
                }
            }
        }
    };

    const employeeChartData = {
        labels: chartData.map(item => item.name),
        datasets: [{
            label: 'Employees',
            data: chartData.map(item => item.employees),
            backgroundColor: chartData.map(item =>
                item.isMainCompany
                    ? 'rgba(124, 58, 237, 0.8)' // Purple with opacity
                    : 'rgba(34, 211, 238, 0.6)' // Teal with opacity
            ),
            borderColor: chartData.map(item =>
                item.isMainCompany
                    ? 'rgb(124, 58, 237)' // Solid purple
                    : 'rgb(34, 211, 238)' // Solid teal
            ),
            borderWidth: 1,
            borderRadius: 2,
            borderSkipped: false,
            // Special effect for main company
            hoverBackgroundColor: chartData.map(item =>
                item.isMainCompany
                    ? 'rgba(124, 58, 237, 1)' // Full opacity on hover
                    : 'rgba(34, 211, 238, 0.8)'
            ),
        }]
    };


    // Funding timeline options
    const fundingOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Funding History',
            },
            // Replace lines 277-280 with:
            tooltip: {
                callbacks: {
                    label: (context: TooltipItem<'line'>) => {
                        return `$${(context.raw as number).toLocaleString()}`;
                    },
                    title: (context: TooltipItem<'line'>[]) => {
                        const item = fundingData[context[0].dataIndex];
                        return `Round: ${item.round}`;
                    }
                }
            }
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Amount ($M)'
                }
            }
        }
    };

    const fundingChartData = {
        labels: fundingData.map(item => item.date),
        datasets: [
            {
                label: 'Funding Amount',
                data: fundingData.map(item => item.amount),
                borderColor: '#ec4899',
                backgroundColor: '#ec4899',
                borderWidth: 2,
                tension: 0.1,
            }
        ]
    };

    return (
        <div className="space-y-8">
            {/* Revenue Comparison Chart */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <Bar options={revenueOptions} data={revenueChartData} />
            </div>

            {/* Valuation vs Employee Count */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <Bar options={valuationOptions} data={valuationChartData} />
                </div>

                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <Bar options={employeeOptions} data={employeeChartData} />
                </div>
            </div>

            {/* Funding Timeline */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <Line options={fundingOptions} data={fundingChartData} />
            </div>
        </div>
    );
};

export default ComparisonCharts;