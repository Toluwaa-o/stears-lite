import { CompanyData } from "@/types/Interfaces";

const normalizeCompanyData = (rawData: CompanyData) => {
    return {
        company: rawData.company,
        description: rawData.description || "",
        country: rawData.country,
        company_info_fixed: {
            annual_revenue: rawData.company_info_fixed['annual revenue'] || "",
            venture_funding: rawData.company_info_fixed['venture funding'] || "",
            revenue_per_employee: rawData.company_info_fixed['revenue per employee'] || "",
            total_funding: rawData.company_info_fixed['total funding'] || "",
            current_valuation: rawData.company_info_fixed['current valuation'] || "",
            employee_count: rawData.company_info_fixed['employee count'] || "",
            investors: rawData.company_info_fixed.investors || 0,
            industry: rawData.company_info_fixed.industry || "",
        },
        company_info: rawData.company_info || {},
        competitors: {
            competitor_name: rawData.competitors['Competitor Name'] || [],
            revenue: rawData.competitors.Revenue || [],
            number_of_employees: rawData.competitors['Number of Employees'] || [],
            employee_growth: rawData.competitors['Employee Growth'] || [],
            total_funding: rawData.competitors['Total Funding'] || [],
            valuation: rawData.competitors.Valuation || [],
        },
        funding: rawData.funding || {},
    };
}

export default normalizeCompanyData