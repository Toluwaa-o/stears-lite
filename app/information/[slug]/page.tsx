import { CompanyData, Article } from "@/types/Interfaces";
import PageStructure from "./components/layout/PageStructure";

async function getCompanyData(slug: string): Promise<CompanyData> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/information/${slug}`);
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Something went wrong! Please try again.");
    }
    return res.json();
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const data = await getCompanyData(params.slug);
    return {
        title: `${data.company} - Company Insights`,
        description: `Explore comprehensive data about ${data.company}, including public sentiment, macroeconomic context in ${data.country}, and financial history.`,
    };
}

const page = async ({ params }: { params: { slug: string } }) => {
    const data = await getCompanyData(params.slug);

    const { articles, company, description, country, macro_details, company_information } = data;

    const positives = articles.filter((article: Article) => article.sentiment_score > 0.05);
    const percentage_of_positives = (positives.length / articles.length) * 100;

    const negatives = articles.filter((article: Article) => article.sentiment_score < -0.05);
    const percentage_of_negatives = (negatives.length / articles.length) * 100;

    return (
        <PageStructure
            percentage_of_negatives={percentage_of_negatives}
            percentage_of_positives={percentage_of_positives}
            articles={articles}
            company={company}
            company_information={company_information}
            country={country}
            description={description}
            macro_details={macro_details}
        />
    );
};

export default page;
