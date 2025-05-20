interface KeyMetricsProps {
    metrics: {
        [key: string]: string;
    };
    employeeCount: number
}

const KeyMetrics: React.FC<KeyMetricsProps> = ({ metrics, employeeCount }) => {
    const formatKey = (key: string) => {
        return key.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
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
            {importantMetrics.map((metricKey) => (
                <div key={metricKey} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                    <h3 className="text-gray-600 text-sm font-medium">{formatKey(metricKey)}</h3>

                    {metricKey === 'employee count' ? (
                        <div className="flex items-center mt-1">
                            <p className="text-2xl font-bold mr-3 text-gray-900">{employeeCount}</p>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${metrics[metricKey]?.startsWith('-')
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-green-100 text-green-800'
                                }`}>
                                {!metrics[metricKey]?.startsWith('-') ? (
                                    <svg className="-ml-0.5 mr-1 h-3 w-3 text-green-800" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="-ml-0.5 mr-1 h-3 w-3 text-red-800" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                                {metrics[metricKey] || 'N/A'}
                            </span>
                        </div>
                    ) : (
                        <p className="text-2xl font-bold mt-1 text-gray-900">
                            {metrics[metricKey] || 'N/A'}
                        </p>
                    )}

                    {metricKey === 'employee count' && (
                        <span className={`text-xs mt-1 block ${metrics[metricKey]?.startsWith('-')
                                ? 'text-red-600'
                                : 'text-green-600'
                            }`}>
                            {metrics[metricKey]?.startsWith('-') ? 'Decreased' : 'Increased'} from previous year
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default KeyMetrics;