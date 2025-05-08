interface InfoTableProps {
    company_information: Record<string, string>;
    domainSuffixes: string[];
}

const InfoTable = ({ company_information, domainSuffixes }: InfoTableProps) => {
    return (
        <div className="h-full w-full">
            <table className="w-full table-fixed border-separate border-spacing-y-2">
                <tbody>
                    {Object.entries(company_information).map(([key, value], i) => (
                        <tr key={key} className={i % 2 === 0 ? 'bg-[#1a1a1a]' : 'bg-[#2a2a2a]'}>
                            <td className="text-sm text-gray-400 font-medium w-1/3 px-4 py-2 align-top capitalize">
                                {key}
                            </td>
                            <td className="text-sm text-gray-100 px-4 py-2 max-w-0">
                                {domainSuffixes.some((suffix) => value.includes(suffix)) ? (
                                    <a
                                        href={`https://${value}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent max-w-full custom-scroll"
                                    >
                                        {value}
                                    </a>
                                ) : (
                                    <div className="block overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent max-w-full custom-scroll">
                                        {value}
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};

export default InfoTable;
