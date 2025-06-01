import { CompanyData } from "@/types/Interfaces";
import Home from "../components/Dashboard";
import parseFinancialString from "@/utils/NumberParser";
import { notFound } from "next/navigation";

async function fetchWithErrorHandling(url: string, options?: RequestInit) {
    const res = await fetch(url, options);
    if (!res.ok) {
        let errorData;
        try {
            errorData = await res.json();
        } catch {
            throw new Error("Failed to parse error response");
        }
        throw new Error(errorData.error || "Something went wrong! Please try again.");
    }
    return res.json();
}

async function getCompanyData(slug: string): Promise<CompanyData> {
    try {
        let data = await fetchWithErrorHandling(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${slug}/data`,
            { cache: 'force-cache' }
        );

        if (!data.result || data.result.length < 1) {
            console.log("No data found, entering webscraping section");
            data = await fetchWithErrorHandling(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${slug}/scrapper`,
                { cache: 'force-cache' }
            );

            if (!data.result || data.result.length < 1) {
                return notFound();
            }
        }

        const companyInformation = data.result;
        console.log(companyInformation);

        const queryParts = [
            companyInformation.company,
            companyInformation.company_info?.industry,
            companyInformation.company_info?.founders,
            'company'
        ].filter(Boolean);

        const query = queryParts.join(' ');
        const encodedQuery = encodeURIComponent(query);

        const articlesData = await fetchWithErrorHandling(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${encodedQuery}/articles`,
            { cache: 'no-cache' }
        );

        return {
            ...companyInformation,
            articles: articlesData.articles || []
        };

    } catch (error) {
        console.error("Error in getCompanyData:", error);
        throw new Error(error instanceof Error ? error.message : "Failed to fetch company data");
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
