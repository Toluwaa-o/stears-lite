import { CompanyData } from '@/types/Interfaces'
import Link from 'next/link'

type Props = {
    company: CompanyData
}

const CompanyCard = ({ company }: Props) => {
    const industry = company.company_info?.industry || company.company_info_fixed?.industry;
    const company_name = company.company.replace('(company)', '').trim()

    return (
        <li className="h-full">
            <Link
                href={`/companies/${company_name}`}
                className="flex flex-col h-full p-4 border border-gray-200 rounded-xl hover:shadow-sm transition bg-white"
            >
                <div className="flex-grow">
                    <h3 className="text-lg font-medium text-gray-900">{company_name}</h3>

                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {company.description || "No description available."}
                    </p>
                </div>

                {industry && (
                    <p className="inline-block mt-3 text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded-md w-fit">
                        {industry}
                    </p>
                )}
            </Link>
        </li>
    )
}

export default CompanyCard