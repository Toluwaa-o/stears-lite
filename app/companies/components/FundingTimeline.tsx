import { FundingRound } from '@/types/Interfaces';


interface FundingTimelineProps {
    funding: FundingRound
}

const FundingTimeline: React.FC<FundingTimelineProps> = ({ funding }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
                <h2 className="font-semibold text-lg">Funding History</h2>
            </div>
            <div className="p-4">
                <div className="space-y-4">
                    {funding?.Date?.length > 0 ? funding.Date.map((date, index) => (
                        <div key={index} className="flex">
                            <div className="flex flex-col items-center mr-4">
                                <div className="w-3 h-3 rounded-full bg-blue-500 mt-1"></div>
                                {index < funding.Date.length - 1 && (
                                    <div className="w-px h-full bg-gray-300"></div>
                                )}
                            </div>
                            <div className="flex-1 pb-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-medium">{funding.Round[index]}</h3>
                                        <p className="text-sm text-gray-500">{funding["Lead Investors"][index]}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">{funding.Amount[index]}</p>
                                        <p className="text-sm text-gray-500">{formatDate(date)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : <p className="text-sm text-gray-500 italic px-6 py-4">No funding data available</p>}
                </div>
            </div>
        </div>
    );
};

export default FundingTimeline;