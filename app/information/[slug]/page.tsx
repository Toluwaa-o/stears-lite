import { CompanyData } from "@/types/Interfaces";
import Home from "../components/Dashboard";
import parseFinancialString from "@/utils/NumberParser";
import Company from "@/models/CompanyData";
import normalizeCompanyData from "@/utils/NormaliseData";
import { notFound } from "next/navigation";

async function getCompanyData(slug: string): Promise<CompanyData> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${slug}/data`, { cache: 'force-cache' });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Something went wrong! Please try again.");
    }

    let data = await res.json();

    if (data.result.length < 1) {
        const res = await fetch(`https://lite-api.onrender.com/information/${slug}`)
        if (res.ok) {
            const result = await res.json()

            const createdDoc = await Company.create(normalizeCompanyData(result));

            data = createdDoc
        } else {
            return notFound()
        }
    }

    if (data.result) {
        const queryParts = [
            data.result.company,
            data.result.company_info?.industry,
            data.result.company_info?.founders,
            'company'
        ].filter(Boolean);

        const query = queryParts.join(' ');

        const encodedQuery = encodeURIComponent(query);
        const second_res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${encodedQuery}/articles`, { cache: 'no-cache' });
        if (!second_res.ok) {
            const errorData = await second_res.json();
            throw new Error(errorData.error || "Something went wrong! Please try again.");
        }

        const second_data = await second_res.json();
        data.result['articles'] = second_data.articles
        return data.result;
    } else {
        throw new Error("No company found matching your query.");
    }
}


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const data = await getCompanyData(slug);

    return {
        title: `${data.company} - Company Insights`,
        description: `Explore detailed data about ${data.company}, including funding, valuation, investors, revenue, employee count, and recent news.`,
    };
}

const page = async ({ params, }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params
    const data = await getCompanyData(slug);

    // const { articles, company, description, country, company_info, company_info_fixed, funding, competitors } = data;
    const totalRevenue = parseFinancialString(data.company_info_fixed["annual revenue"]) || 0
    const revenuePerEmployee = parseFinancialString(data.company_info_fixed["revenue per employee"]) || 0
    const employee_count = totalRevenue / revenuePerEmployee

    return (
        <Home data={data} employeeCount={Math.round(employee_count)} />
    );
};

export default page;
