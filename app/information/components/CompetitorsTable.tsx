import { Competitors } from '@/types/Interfaces';


interface CompetitorsTableProps {
    competitors: Competitors;
}

const CompetitorsTable: React.FC<CompetitorsTableProps> = ({ competitors }) => {
    const formatValue = (value: string) => {
        if (value === 'N/A') return <span className="text-gray-400">N/A</span>;
        return value;
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
                <h2 className="font-semibold text-lg">Competitors Comparison</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Competitor</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valuation</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {competitors["Competitor Name"].map((competitor, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{competitor}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatValue(competitors.Revenue[index])}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatValue(competitors["Number of Employees"][index])}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {competitors["Employee Growth"][index]?.startsWith('-') ? (
                                        <span className="text-red-500">{competitors["Employee Growth"][index]}</span>
                                    ) : (
                                        <span className="text-green-500">{competitors["Employee Growth"][index] || 'N/A'}</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatValue(competitors.Valuation[index])}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompetitorsTable;