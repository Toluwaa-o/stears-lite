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
                    <h1 className="text-3xl font-bold">{company.replace('company', '').trim()}</h1>
                    <p className="hidden md:block text-blue-100 mt-2 max-w-2xl md:max-w-full">
                        {description.length > 500 ? description.slice(0, 498) + '...' : description}
                    </p>
                    <p className="text-blue-100 mt-2 max-w-2xl md:hidden">
                        {description.length > 150 ? description.slice(0, 147) + '...' : description}
                    </p>

                    <div className="flex flex-wrap md:flex-nowrap items-center mt-4 gap-2 space-x-4 md:gap-[unset]">
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
                        <span className="bg-blue-500/20 px-3 py-1 rounded-full text-sm">
                            Industry : {company_info?.industry ? company_info.industry : company_info_fixed.industry || 'N/A'}
                        </span>
                        <span className="bg-blue-500/20 px-3 py-1 rounded-full text-sm">
                            Founded : {company_info.founded?.split(';')[0] || 'N/A'}
                        </span>
                        <span className="bg-blue-500/20 px-3 py-1 rounded-full text-sm">
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
                        Note: Figures such as revenue, valuation, and funding are based on publicly available sources and may not be independently verified.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CompanyHeader;