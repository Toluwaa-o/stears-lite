import { CountryData } from "@/types/Interfaces"
import CountriesTable from "./components/CountriesTable"

export const getCountriesData = async (): Promise<CountryData[]> => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/countries`,
        { cache: 'no-cache' })

    if (!response.ok) throw Error("Something went wrong while fetching countries data!")
    const countriesData = await response.json()

    return countriesData.data
}

const page = async () => {
    const data = await getCountriesData()
    
    return (
        <CountriesTable data={data} />
    )
}

export default page