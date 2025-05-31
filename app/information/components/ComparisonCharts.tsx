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
            revenue: parseFinancialString(companyData.company_info_fixed['annual revenue'] || '0'),
            valuation: parseFinancialString(companyData.company_info_fixed['current valuation'] || '0'),
            employees: companyData.employeeCount || 0,
            funding: parseFinancialString(companyData.company_info_fixed['total funding'] || '0'),
            isMainCompany: true,
        };

        const competitorsData = (companyData.competitors?.['Competitor Name'] || []).map((name, index): ChartDataItem => ({
            name,
            revenue: parseFinancialString(companyData.competitors?.['Revenue']?.[index] || '0'),
            valuation: parseFinancialString(companyData.competitors?.['Valuation']?.[index] || '0'),
            employees: parseInt(companyData.competitors?.['Number of Employees']?.[index] || '0'),
            funding: parseFinancialString(companyData.competitors?.['Total Funding']?.[index] || '0'),
            isMainCompany: false,
        })).filter(item => item.revenue !== null);

        // Sort competitors by revenue (descending)
        const sortedCompetitors = [...competitorsData].sort((a, b) => (b?.revenue || 0) - (a?.revenue || 0));
        return [mainCompany, ...sortedCompetitors];
    };

    const chartData = prepareComparisonData();

    // Funding timeline data preparation
    const fundingData = (companyData.funding?.Date || []).map((date, index) => ({
        date,
        amount: parseFinancialString(companyData.funding?.Amount?.[index] || ''),
        round: companyData.funding?.Round?.[index] || '',
        investor: companyData.funding?.['Lead Investors']?.[index] || '',
    })).filter(item => item.amount !== null);

    // check if data range spans multiple orders of magnitude for logarithmic scale use
    const useLogScale = (values: (number | null)[]) => {
        const filtered = values.filter(v => v !== null && v > 0) as number[];
        if (filtered.length < 2) return false;
        const max = Math.max(...filtered);
        const min = Math.min(...filtered);
        return max / min >= 100;
    };

    // Decide scale type for revenue, valuation, employees
    const revenueValues = chartData.map(item => item.revenue);
    const valuationValues = chartData.map(item => item.valuation);
    const employeeValues = chartData.map(item => item.employees);

    const revenueLog = useLogScale(revenueValues);
    const valuationLog = useLogScale(valuationValues);
    const employeeLog = useLogScale(employeeValues);

    // Revenue chart options
    const revenueOptions = {
        indexAxis: 'y' as const,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' as const },
            title: { display: true, text: 'Revenue Comparison ($)' },
            tooltip: {
                callbacks: {
                    label: (context: TooltipItem<'bar'>) => `$${(context.raw as number).toLocaleString()}`
                }
            }
        },
        scales: {
            x: {
                type: revenueLog ? 'logarithmic' as const : 'linear' as const,
                title: { display: true, text: `Revenue $${revenueLog ? ' (log scale)' : ''}` },
                min: revenueLog ? 1 : undefined,
            }
        }
    };

    const revenueChartData = {
        labels: chartData.map(item => item.name),
        datasets: [{
            label: 'Annual Revenue',
            data: chartData.map(item => item.revenue),
            backgroundColor: chartData.map(item =>
                item.isMainCompany ? MAIN_COMPANY_COLOR : COMPETITOR_COLOR
            ),
            borderColor: chartData.map(item =>
                item.isMainCompany ? '#5b21b6' : '#0d9488'
            ),
            borderWidth: 1,
            borderRadius: 2,
            borderSkipped: false,
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
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' as const },
            title: { display: true, text: 'Valuation Comparison ($)' },
            tooltip: {
                callbacks: {
                    label: (context: TooltipItem<'bar'>) => `$${(context.raw as number).toLocaleString()}`
                }
            }
        },
        scales: {
            x: {
                type: valuationLog ? 'logarithmic' as const : 'linear' as const,
                title: { display: true, text: `Valuation $${valuationLog ? ' (log scale)' : ''}` },
                min: valuationLog ? 1 : undefined,
            }
        }
    };

    const valuationChartData = {
        labels: chartData.filter(d => d.valuation !== null && d.valuation !== 0).map(item => item.name),
        datasets: [{
            label: 'Valuation',
            data: chartData.filter(d => d.valuation !== null && d.valuation !== 0).map(item => item.valuation),
            backgroundColor: chartData.filter(d => d.valuation !== null && d.valuation !== 0).map(item =>
                item.isMainCompany ? MAIN_COMPANY_COLOR : COMPETITOR_COLOR
            ),
            borderColor: chartData.filter(d => d.valuation !== null && d.valuation !== 0).map(item =>
                item.isMainCompany ? '#5b21b6' : '#0d9488'
            ),
            borderWidth: 1,
            borderRadius: 2,
            borderSkipped: false,
            ...HIGHLIGHT_EFFECT
        }]
    };

    // Employee chart options
    const employeeOptions = {
        indexAxis: 'y' as const,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' as const },
            title: { display: true, text: 'Employee Count Comparison' },
            tooltip: {
                callbacks: {
                    label: (context: TooltipItem<'bar'>) =>
                        `${(context.raw as number).toLocaleString()} employees`
                }
            }
        },
        scales: {
            x: {
                type: employeeLog ? 'logarithmic' as const : 'linear' as const,
                title: {
                    display: true,
                    text: `Number of Employees${employeeLog ? ' (log scale)' : ''}`
                },
                min: employeeLog ? 1 : undefined
            },
            y: {
                type: 'category' as const,
                title: { display: true, text: 'Company' }
            }
        }
    };


    const employeeChartData = {
        labels: chartData.map(item => item.name),
        datasets: [{
            label: 'Employees',
            data: chartData.map(item => item.employees),
            backgroundColor: chartData.map(item =>
                item.isMainCompany ? 'rgba(124, 58, 237, 0.8)' : 'rgba(34, 211, 238, 0.6)'
            ),
            borderColor: chartData.map(item =>
                item.isMainCompany ? 'rgb(124, 58, 237)' : 'rgb(34, 211, 238)'
            ),
            borderWidth: 1,
            borderRadius: 2,
            borderSkipped: false,
            hoverBackgroundColor: chartData.map(item =>
                item.isMainCompany ? 'rgba(124, 58, 237, 1)' : 'rgba(34, 211, 238, 0.8)'
            ),
        }]
    };

    // Funding timeline options
    const fundingOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' as const },
            title: { display: true, text: 'Funding History' },
            tooltip: {
                callbacks: {
                    label: (context: TooltipItem<'line'>) => `$${(context.raw as number).toLocaleString()}`,
                    title: (context: TooltipItem<'line'>[]) => {
                        const item = fundingData[context[0].dataIndex];
                        return `Round: ${item.round}`;
                    }
                }
            }
        },
        scales: {
            y: {
                title: { display: true, text: 'Amount ($M)' }
            }
        }
    };

    const fundingChartData = {
        labels: fundingData.map(item => item.date),
        datasets: [{
            label: 'Funding Amount',
            data: fundingData.map(item => item.amount),
            borderColor: '#ec4899',
            backgroundColor: '#ec4899',
            borderWidth: 2,
            tension: 0.1,
        }]
    };

    // Accessibility label helper for charts
    const getAriaLabel = (title: string) => `Chart showing ${title.toLowerCase()}`;

    const hasRevenueData = chartData.some(item => item.revenue !== null);
    const hasValuationData = chartData.some(item => item.valuation !== null);
    const hasEmployeeData = chartData.some(item => item.employees > 0);
    const hasFundingData = fundingData.length > 0;

    return (
        <div className="space-y-8">
            {/* Revenue Comparison Chart */}
            {parseFinancialString(companyData.company_info_fixed['annual revenue'] || '0') !== 0 && hasRevenueData && (
                <section aria-label={getAriaLabel('Revenue Comparison')} role="region" tabIndex={0}>
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200 grid">
                        <div className="relative h-[350px] sm:h-[450px] md:h-[600px]"><Bar options={revenueOptions} data={revenueChartData} /></div>

                        <p className="mt-2 text-sm text-gray-600 m-auto">
                            <span className="inline-block w-4 h-4 mr-2" style={{ backgroundColor: MAIN_COMPANY_COLOR }} aria-hidden="true"></span> Main Company&nbsp;&nbsp;
                            <span className="inline-block w-4 h-4 mr-2" style={{ backgroundColor: COMPETITOR_COLOR }} aria-hidden="true"></span> Competitors
                        </p>
                    </div>
                </section>
            )}

            {/* Valuation vs Employee Count */}
            {(hasValuationData || hasEmployeeData) && (
                <section aria-label="Valuation and Employee Count Comparison" role="region" tabIndex={0} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {parseFinancialString(companyData.company_info_fixed['current valuation'] || '0') !== 0 && hasValuationData && (
                        <div className="bg-white p-6 rounded-lg shadow border border-gray-200 grid">
                            <div className="relative h-[300px] sm:h-[350px] md:h-[400px]"><Bar options={valuationOptions} data={valuationChartData} /></div>

                            <p className="mt-2 text-sm text-gray-600 m-auto">
                                <span className="inline-block w-4 h-4 mr-2" style={{ backgroundColor: MAIN_COMPANY_COLOR }} aria-hidden="true"></span> Main Company&nbsp;&nbsp;
                                <span className="inline-block w-4 h-4 mr-2" style={{ backgroundColor: COMPETITOR_COLOR }} aria-hidden="true"></span> Competitors
                            </p>
                        </div>
                    )}

                    {!isNaN(companyData.employeeCount) && hasEmployeeData && (
                        <div className="bg-white p-6 rounded-lg shadow border border-gray-200 grid">
                            <div className="relative h-[300px] sm:h-[350px] md:h-[400px]"><Bar options={employeeOptions} data={employeeChartData} /></div>

                            <p className="mt-2 text-sm text-gray-600 m-auto">
                                <span className="inline-block w-4 h-4 mr-2" style={{ backgroundColor: 'rgba(124, 58, 237, 0.8)' }} aria-hidden="true"></span> Main Company&nbsp;&nbsp;
                                <span className="inline-block w-4 h-4 mr-2" style={{ backgroundColor: 'rgba(34, 211, 238, 0.6)' }} aria-hidden="true"></span> Competitors
                            </p>
                        </div>
                    )}
                </section>
            )}

            {/* Funding Timeline */}
            {parseFinancialString(companyData.company_info_fixed['total funding'] || '0') !== 0 && hasFundingData && (
                <section aria-label="Funding History Timeline" role="region" tabIndex={0}>
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200 grid">
                        <div className="relative h-[300px] sm:h-[350px] md:h-[400px]"><Line options={fundingOptions} data={fundingChartData} /></div>

                        <p className="mt-2 text-sm text-gray-600 m-auto">
                            Funding rounds and amounts over time.
                        </p>
                    </div>
                </section>
            )}

            {
                (
                    (parseFinancialString(companyData.company_info_fixed['current valuation'] || '0') === 0
                        && parseFinancialString(companyData.company_info_fixed['total funding'] || '0') === 0
                        && parseFinancialString(companyData.company_info_fixed['annual revenue'] || '0') === 0
                        && isNaN(companyData.employeeCount))
                    ||
                    (!hasRevenueData && !hasValuationData && !hasEmployeeData && !hasFundingData)
                ) && (
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200 text-center text-gray-500">
                        <p>Unfortunately, the publicly available data for this company is limited.</p>
                    </div>
                )
            }

        </div>
    );
};

export default ComparisonCharts;
