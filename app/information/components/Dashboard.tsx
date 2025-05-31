'use client'

import CompanyHeader from '../components/CompanyHeader';
import KeyMetrics from '../components/KeyMetrics';
import ArticlesFeed from '../components/ArticlesFeed';
import CompetitorsTable from '../components/CompetitorsTable';
import FundingTimeline from '../components/FundingTimeline';
import SentimentChart from '../components/SentimentChart';
import { CompanyData } from '@/types/Interfaces';
import { useState } from 'react';
import ComparisonCharts from './ComparisonCharts';

interface CompanyDataProps {
    data: CompanyData,
    employeeCount: number
}

const Home: React.FC<CompanyDataProps> = ({ data, employeeCount }) => {
    const [isChartSection, setIsChartSection] = useState(false)

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <CompanyHeader
                    company={data.company}
                    description={data.description}
                    country={data.country}
                    company_info={data.company_info}
                    company_info_fixed={data.company_info_fixed}
                    updated_at={data.updated_at}
                />

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
                    <KeyMetrics
                        metrics={data.company_info_fixed}
                        employeeCount={employeeCount}
                        competitors={data.competitors}
                        companyName={data.company}
                    />
                </div>

                <div className="space-y-8">
                    {/* Tab Switcher */}
                    <div className="flex border-b border-gray-200 pt-[4rem]">
                        <button
                            onClick={() => setIsChartSection(false)}
                            className={`px-4 py-3 font-medium text-sm sm:text-base transition-colors duration-200 ${!isChartSection
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Tables
                        </button>
                        <button
                            onClick={() => setIsChartSection(true)}
                            className={`px-4 py-3 font-medium text-sm sm:text-base transition-colors duration-200 ${isChartSection
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}>
                            Charts
                        </button>
                    </div>

                    {/* Content Area */}
                    {isChartSection ? (
                        <ComparisonCharts companyData={{ company_info_fixed: data.company_info_fixed, competitors: data.competitors || [], funding: data.funding || [], companyName: data.company, employeeCount: employeeCount }} />
                    ) : (
                        <div className="mt-2 grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-6">
                                <SentimentChart articles={data.articles} />
                                <CompetitorsTable competitors={data.competitors} />
                            </div>
                            <div className="space-y-6">
                                <FundingTimeline funding={data.funding} />
                                <ArticlesFeed articles={data.articles} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;

