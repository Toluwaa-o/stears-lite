'use client'

import { useEffect, useState } from 'react'
import CountriesHeader from './CountriesHeader'
import CountriesRow from './CountriesRow'
import { CountryData } from '@/types/Interfaces'
import ColorLegend from './ColorLegend'
import CountriesFooter from './CountriesFooter'

type Props = {
    data: CountryData[]
}

const CountriesTable: React.FC<Props> = ({ data }: Props) => {
    const [countriesData, setCountriesData] = useState<CountryData[]>(data)
    const [sortField, setSortField] = useState<string>('name')
    const [ascending, setAscending] = useState<boolean>(true)

    useEffect(() => {
        const sorted = [...countriesData].sort((a, b) => {
            if (sortField === "name") {
                return ascending
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            }

            const aVal = a.data[sortField];
            const bVal = b.data[sortField];

            if (aVal == null && bVal == null) return 0;
            if (aVal == null) return 1;
            if (bVal == null) return -1;

            const result = Number(aVal) - Number(bVal);
            return ascending ? result : -result;
        });

        setCountriesData(sorted);
    }, [sortField, ascending]);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-2 py-2 bg-gray-50">
                <ColorLegend />
            </div>
            <div className="px-4 pt-2 text-sm text-gray-600">
                <p>
                    <strong>Note:</strong> All economic indicators shown are based on the most recent complete year of data available from sources like the IMF, African Monitor and World Bank, which is currently <strong>2024</strong>.
                    Due to the time required for data collection, validation, and publication, 2025 data is not yet officially released.
                </p>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 relative">
                    <CountriesHeader sortFieldChange={setSortField} setAscending={setAscending} sortField={sortField} ascending={ascending} />
                    <tbody className="bg-white divide-y divide-gray-200">
                        {countriesData.map(dt => <CountriesRow countryData={dt} allData={countriesData} key={dt.name} />)}
                    </tbody>
                    <CountriesFooter allData={countriesData} />
                </table>
            </div>
        </div >
    )
}

export default CountriesTable