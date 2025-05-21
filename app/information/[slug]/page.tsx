import { CompanyData } from "@/types/Interfaces";
import test_data from "@/data/testData.json"
import Home from "../components/Dashboard";
import parseFinancialString from "@/utils/NumberParser";

async function getCompanyData(slug: string): Promise<CompanyData> {
    console.log(slug)
    return test_data
    // const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/information/${slug}`, { cache: 'force-cache' });
    // if (!res.ok) {
    //     const errorData = await res.json();
    //     throw new Error(errorData.error || "Something went wrong! Please try again.");
    // }
    // return res.json();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const data = await getCompanyData(slug);

    return {
        title: `${data.company} - Company Insights`,
        description: `Explore comprehensive data about ${data.company}, including public sentiment, macroeconomic context in ${data.country}, and financial history.`,
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
