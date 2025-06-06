interface CompanyHeaderProps {
    company: string;
    description: string;
    country: string;
    company_info: {
        [key: string]: string;
    };
    company_info_fixed: {
        [key: string]: string;
    };
    updated_at: Date
}

const CompanyHeader: React.FC<CompanyHeaderProps> = ({ company, description, country, company_info, company_info_fixed, updated_at }) => {
    return (
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-xl p-6 shadow-lg shadow-black/30 text-white">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">{company.replace('(company)', '').trim()}</h1>
                    <p className="hidden md:block text-blue-100 mt-2 max-w-2xl md:max-w-full">
                        {description.length > 500 ? description.slice(0, 498) + '...' : description}
                    </p>
                    <p className="text-blue-100 mt-2 max-w-2xl md:hidden">
                        {description.length > 150 ? description.slice(0, 147) + '...' : description}
                    </p>

                    <div className="flex flex-wrap md:flex-nowrap items-center mt-4 gap-2 space-x-4 md:gap-[unset]">
                        {company_info?.website && (
                            <a
                                href={`https://${company_info.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-500/20 px-3 py-1 rounded-full text-sm flex items-center hover:underline"
                            >
                                {/* Link Icon */}
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M12.293 2.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-6.586 6.586a1 1 0 01-1.414 0L9 12.414l-1.293 1.293a1 1 0 01-1.414-1.414L7.586 11 6 9.414a1 1 0 011.414-1.414L9 9.586l1.293-1.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                {company_info.website}
                            </a>
                        )}

                        <span className="bg-blue-500/20 px-3 py-1 rounded-full text-sm flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            {country}
                        </span>
                        <span className="bg-blue-500/20 px-3 py-1 rounded-full text-sm flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6 4V2a2 2 0 012-2h4a2 2 0 012 2v2h4a2 2 0 012 2v3H0V6a2 2 0 012-2h4zm0 0V2a1 1 0 011-1h4a1 1 0 011 1v2H6zM0 11h20v5a2 2 0 01-2 2H2a2 2 0 01-2-2v-5z" />
                            </svg>
                            Industry : {company_info?.industry ? company_info.industry : company_info_fixed.industry || 'N/A'}
                        </span>
                        <span className="bg-blue-500/20 px-3 py-1 rounded-full text-sm flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6 2a1 1 0 011 1v1h6V3a1 1 0 112 0v1h1a2 2 0 012 2v2H1V6a2 2 0 012-2h1V3a1 1 0 112 0v1zm13 7H1v7a2 2 0 002 2h14a2 2 0 002-2V9z" />
                            </svg>
                            Founded : {company_info.founded?.split(';')[0] || 'N/A'}
                        </span>
                        <span className="bg-blue-500/20 px-3 py-1 rounded-full text-sm flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-9V6a.75.75 0 011.5 0v3.25H14a.75.75 0 010 1.5h-4.75a.75.75 0 01-.75-.75z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Last updated:{" "}
                            {new Date(updated_at).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                        </span>
                    </div>

                    {/* Disclaimer */}
                    <p className="text-blue-200 text-xs italic mt-4 max-w-2xl">
                        Note: Figures such as revenue, valuation, funding, e.t.c are based on publicly available sources and may not be independently verified.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CompanyHeader;