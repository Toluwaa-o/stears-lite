import { CountryData } from '@/types/Interfaces'
import { indicatorOrder } from './IndicatorCategories'

type Props = {
    allData: CountryData[]
}

const CountriesFooter: React.FC<Props> = ({ allData }: Props) => {
    const fieldAverages = []

    for (const i in indicatorOrder) {
        const title = indicatorOrder[i]

        const allValues = allData
            .map(obv => obv.data[title])
            .filter(v => typeof v === "number") as number[];

        fieldAverages.push(allValues.reduce((a, b) => a + b) / allValues.length)
    }

    const formatValue = (val: number | string | null) => {
        const raw = typeof val === "string" ? parseFloat(val) : val;


        return (
            <th
                className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-bold`}
                key={val}
            >
                {raw != null && !isNaN(raw) ? raw.toFixed(2) : 'N/A'}
            </th>
        );

    };
    return (
        <tfoot className="bg-gray-50 border-t">
            <tr>
                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-semibold text-gray-900">
                    Averages:
                </td>
                {fieldAverages.map(val => (

                    formatValue(val)
                ))}
            </tr>
        </tfoot>

    )
}

export default CountriesFooter