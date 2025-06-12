import connectDB from "@/lib/mongodb"
import Company from "@/models/Company"
import { CompanyData } from "@/types/Interfaces"
import NoCompaniesMessage from "../components/NoCompaniesMessage"
import CompanyCard from "../components/CompanyCard"

const getCountryCompanies = async (slug: string): Promise<CompanyData[]> => {
    await connectDB()
    const countries = await Company.find({ country: { $regex: slug, $options: "i" } }, { _id: 0 })
    return countries
}

const page = async ({ params, }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params
    const companies = await getCountryCompanies(slug)
    if (!companies || companies.length === 0) {
        return (
            <NoCompaniesMessage slug={slug} />
        )
    }

    return (
        <div className="px-6 py-12 max-w-6xl mx-auto">
            <div className="mb-10">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 capitalize">
                    Companies in {slug}
                </h1>
                <p className="mt-2 text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                    This is a curated list of companies in <strong>{slug}</strong> for which we currently have data. You can still search for other companies using the search bar. Click on any company to explore detailed insights.
                </p>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {companies.map((company: CompanyData) => <CompanyCard company={company} key={company.company} />)}
            </ul>

        </div>
    )
}

export default page