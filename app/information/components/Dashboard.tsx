'use client'

import CompanyHeader from '../components/CompanyHeader';
import KeyMetrics from '../components/KeyMetrics';
import ArticlesFeed from '../components/ArticlesFeed';
import CompetitorsTable from '../components/CompetitorsTable';
import FundingTimeline from '../components/FundingTimeline';
import SentimentChart from '../components/SentimentChart';
import { CompanyData } from '@/types/Interfaces';

interface CompanyDataProps {
    data: CompanyData,
    employeeCount: number
}

const Home: React.FC<CompanyDataProps> = ({ data, employeeCount }) => {

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <CompanyHeader
                    company={data.company}
                    description={data.description}
                    country={data.country}
                    company_info={data.company_info}
                    company_info_fixed={data.company_info_fixed}
                />

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
                    <KeyMetrics metrics={data.company_info_fixed} employeeCount={employeeCount} />
                </div>

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <SentimentChart articles={data.articles} />
                        <CompetitorsTable competitors={data.competitors} />
                    </div>

                    <div className="space-y-6">
                        <FundingTimeline funding={data.funding} />
                        <ArticlesFeed articles={data.articles} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;