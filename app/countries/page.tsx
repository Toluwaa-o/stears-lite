import { CountryData } from "@/types/Interfaces"
import CountriesTable from "./components/CountriesTable"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Countries - Stears Lite",
};

const getCountriesData = async (): Promise<CountryData[]> => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/countries`)
    // { next: { revalidate: 60 * 60 * 24 } }

    if (!response.ok) throw Error("Something went wrong while fetching countries data!")
    const countriesData = await response.json()

    return countriesData.data
}

const Page = async () => {
    const data = await getCountriesData()

    return (
        <CountriesTable data={data} />
    )
}

export default Page