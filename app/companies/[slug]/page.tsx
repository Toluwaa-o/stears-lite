import { CompanyData } from "@/types/Interfaces";
import Home from "../components/Dashboard";

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
        const data = await fetchWithErrorHandling(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${slug}/data`,
            { cache: 'no-cache' }
        );

        const companyInformation = data.result

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

    return (
        <Home data={data} />
    );
};

export default page;
