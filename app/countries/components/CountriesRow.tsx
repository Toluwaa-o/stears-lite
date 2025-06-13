import { CountryData } from "@/types/Interfaces"
import { indicatorCategories, indicatorOrder } from "./IndicatorCategories"
import FormatIndicators from "@/utils/FormatIndicators"
import Link from "next/link"


type Props = {
    countryData: CountryData,
    allData: CountryData[]
}

const CountriesRow: React.FC<Props> = ({ countryData, allData }: Props) => {
    const allCategoriesData: (string | number | null)[] = []

    for (const key of Object.keys(indicatorCategories)) {
        for (const val in indicatorCategories[key]) {
            allCategoriesData.push(countryData.data[indicatorCategories[key][val]])
        }
    }

    const formatValue = (title: string, val: number | string | null) => {
        const raw = typeof val === "string" ? parseFloat(val) : val;
        const valueColor = FormatIndicators(title, raw, allData)
        for (const key of Object.keys(indicatorCategories)) {
            if (indicatorCategories[key].includes(title)) {
                return (
                    <th
                        className={`px-6 py-4 whitespace-nowrap text-sm ${valueColor} font-semibold`}
                        key={title}
                    >
                        {raw != null && !isNaN(raw) ? raw.toFixed(2) : 'N/A'}
                    </th>
                );
            }
        }
    };

    return (
        <tr className="relative">
            <th className={`px-6 py-4 whitespace-nowrap text-left text-sm font-medium text-gray-900 sticky left-0 bg-gray-50`}>
                <Link href={`/countries/${countryData.name}`}>
                    <span className="truncate hover:underline" title={countryData.name}>
                        {countryData.name}
                    </span>
                </Link>
            </th>
            {indicatorOrder.map(title => (
                formatValue(title, countryData.data[title])
            ))}
        </tr>
    )
}

export default CountriesRow