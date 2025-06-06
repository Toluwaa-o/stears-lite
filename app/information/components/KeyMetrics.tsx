import { Competitors } from "@/types/Interfaces";
import parseFinancialString from "@/utils/NumberParser";

interface KeyMetricsProps {
    metrics: {
        [key: string]: string;
    };
    employeeCount: number;
    competitors: Competitors
    companyName: string;
}

const KeyMetrics: React.FC<KeyMetricsProps> = ({ metrics, employeeCount, competitors }) => {
    const formatKey = (key: string) => {
        return key.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const formatValue = (value: string | undefined) => {
        if (!value) return 'N/A';
        if (String(value).startsWith('$')) return value;
        return value;
    };

    const getComparisonInfo = (metricKey: string) => {
        let competitorKey: keyof Competitors | null = null;

        switch (metricKey) {
            case 'annual revenue':
                competitorKey = 'Revenue';
                break;
            case 'current valuation':
                competitorKey = 'Valuation';
                break;
            case 'total funding':
                competitorKey = 'Total Funding';
                break;
            default:
                return null;
        }

        // Get all competitor values for this metric
        const getCompetitorValues = (key: keyof Competitors): number[] => {
            const values = competitors[key];
            if (!values) return [];

            const numbers: number[] = [];
            values.forEach(val => {
                const num = parseFinancialString(val);
                if (num !== null) numbers.push(num);
            });
            return numbers;
        };

        if (!competitorKey) return null;

        const competitorValues = getCompetitorValues(competitorKey);

        if (competitorValues.length === 0) return null;

        const currentValue = parseFinancialString(metrics[metricKey]);
        if (currentValue === null) return null;

        // Calculate comparison stats
        console.log("Hitting Get comparison Info reduce....")
        const avg = competitorValues.reduce((a, b) => a + b, 0) / competitorValues.length;
        const max = Math.max(...competitorValues);
        const min = Math.min(...competitorValues);
        const percentile = competitorValues.filter(v => v < currentValue).length / competitorValues.length * 100;

        return {
            avg,
            max,
            min,
            percentile,
            isAboveAvg: currentValue > avg,
            comparisonValue: currentValue / avg
        };
    };

    const renderComparison = (metricKey: string) => {
        const comparison = getComparisonInfo(metricKey);
        if (!comparison) return null;

        return (
            <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Competitor Comparison</span>
                    <span className={`text-xs font-medium ${comparison.isAboveAvg
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-rose-600 dark:text-rose-400'
                        }`}>
                        {comparison.percentile.toFixed(0)}% Percentile
                    </span>
                </div>

                <div className="relative pt-1">
                    <div className="flex h-1.5 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                        <div
                            className={`flex-1 rounded-full ${comparison.isAboveAvg
                                ? 'bg-emerald-500/80 dark:bg-emerald-400/80'
                                : 'bg-rose-500/80 dark:bg-rose-400/80'
                                }`}
                            style={{ width: `${comparison.percentile}%` }}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                        <div className="text-gray-400 dark:text-gray-400">Min</div>
                        <div className="font-medium text-gray-600 dark:text-gray-300">
                            ${comparison.min?.toLocaleString()}
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-gray-400 dark:text-gray-400">Avg</div>
                        <div className="font-medium text-gray-600 dark:text-gray-300">
                            ${comparison.avg?.toLocaleString()}
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-gray-400 dark:text-gray-400">Max</div>
                        <div className="font-medium text-gray-600 dark:text-gray-300">
                            ${comparison.max?.toLocaleString()}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const importantMetrics = [
        'annual revenue',
        'current valuation',
        'total funding',
        'employee count',
        'investors',
        'revenue per employee'
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {importantMetrics.map((metricKey) => {
                const isGrowthMetric = metricKey === 'employee count';
                const growthValue = metrics[metricKey];
                const valueIsNumeric = !isNaN(Number(String(growthValue).replace(/[-%]/g, '')));
                const isPositiveGrowth = !String(growthValue).trim().startsWith('-');

                return (
                    <div key={metricKey} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                        <h3 className="text-gray-600 text-sm font-medium">{formatKey(metricKey) == 'Employee Count' ? 'Employees' : formatKey(metricKey)}</h3>

                        <div className="flex items-center mt-1">
                            <p className="text-2xl font-bold mr-3 text-gray-900">
                                {metricKey === 'employee count'
                                    ? valueIsNumeric
                                        ? employeeCount.toLocaleString()
                                        : 'N/A'
                                    : formatValue(metrics[metricKey])}
                            </p>


                            {valueIsNumeric && isGrowthMetric && growthValue && (
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isPositiveGrowth
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                    }`}>
                                    {isPositiveGrowth ? (
                                        <svg className="-ml-0.5 mr-1 h-3 w-3 text-green-800" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg className="-ml-0.5 mr-1 h-3 w-3 text-red-800" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                    {growthValue || 'N/A'}
                                </span>
                            )}
                        </div>

                        {valueIsNumeric && isGrowthMetric && (
                            <span className={`text-xs mt-1 block ${isPositiveGrowth ? 'text-green-600' : 'text-red-600'
                                }`}>
                                {isPositiveGrowth ? 'Increased' : 'Decreased'} from previous year
                            </span>
                        )}

                        {renderComparison(metricKey)}
                    </div>
                );
            })}
        </div>
    );
};

export default KeyMetrics;