import { benchmarkIndicators } from "@/app/countries/components/IndicatorCategories";
import { CountryData } from "@/types/Interfaces";

const FormatIndicators = (title: string, raw: number | null, allData: CountryData[]) => {
    let valueColor = "text-gray-700"; // default
    const allValues = allData
        .map(obv => obv.data[title])
        .filter(v => typeof v === "number") as number[];

    if (benchmarkIndicators.includes(title)) {
        if (typeof raw === "number" && allValues.length > 5) {
            const sorted = [...allValues].sort((a, b) => a - b);
            const index = sorted.findIndex(v => v >= raw);
            const percentile = (index / sorted.length) * 100;

            if (percentile >= 75) valueColor = "text-green-500";
            else if (percentile >= 40) valueColor = "text-gray-500";
            else valueColor = "text-red-500";
        }
    } else {
        if (typeof raw === 'number') {
            switch (title) {
                case "Inflation rate (%)":
                    if (raw < 6) valueColor = "text-green-500";
                    else if (raw < 12) valueColor = "text-gray-500";
                    else valueColor = "text-red-500";
                    break;

                case "Official exchange rate (local currency units per US$)":
                    if (raw < 200) valueColor = "text-green-500";
                    else if (raw < 800) valueColor = "text-gray-500";
                    else valueColor = "text-red-500";
                    break;

                case "Fiscal balance (% of GDP)":
                case "Current account (% of GDP)":
                    if (raw > 0) valueColor = "text-green-500";
                    else if (raw > -5) valueColor = "text-gray-500";
                    else valueColor = "text-red-500";
                    break;

                case "Public debt (% of GDP)":
                    if (raw < 60) valueColor = "text-green-500";
                    else if (raw < 90) valueColor = "text-gray-500";
                    else valueColor = "text-red-500";
                    break;

                case "Unemployment rate (% of labor force)":
                    if (raw < 6) valueColor = "text-green-500";
                    else if (raw < 12) valueColor = "text-gray-500";
                    else valueColor = "text-red-500";
                    break;

                case "Employment to population ratio (%)":
                    if (raw > 60) valueColor = "text-green-500";
                    else if (raw > 40) valueColor = "text-gray-500";
                    else valueColor = "text-red-500";
                    break;
            }
        }
    }

    return valueColor
}

export default FormatIndicators;