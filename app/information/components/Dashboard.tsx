'use client'

import { useState, useEffect, Suspense, lazy } from 'react';
import { CompanyData } from '@/types/Interfaces';
import LoadingPageLayout from '@/app/components/layout/loadingPageLayout';
import InlineError from '@/app/components/layout/errorComponent';

const CompanyHeader = lazy(() => import('../components/CompanyHeader'));
const KeyMetrics = lazy(() => import('../components/KeyMetrics'));
const ArticlesFeed = lazy(() => import('../components/ArticlesFeed'));
const CompetitorsTable = lazy(() => import('../components/CompetitorsTable'));
const FundingTimeline = lazy(() => import('../components/FundingTimeline'));
const SentimentChart = lazy(() => import('../components/SentimentChart'));
const ComparisonCharts = lazy(() => import('./ComparisonCharts'));

interface CompanyDataProps {
    data: CompanyData,
}

const Home: React.FC<CompanyDataProps> = ({ data }) => {
    const [isChartSection, setIsChartSection] = useState(false);
    const [companyData, setCompanyData] = useState<CompanyData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!data.company_info_fixed) {
            fetch(`https://lite-api.onrender.com/information/${data.company}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`Request failed with status ${res.status}`);
                    }
                    return res.json();
                })
                .then(info => {
                    info['articles'] = data['articles']
                    setCompanyData(info)
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                    setError('Could not load company data');
                });
        } else {
            setCompanyData(data);
        }
    }, []);

    if (error) return <InlineError message={error} />;

    if (!companyData) return <LoadingPageLayout scrapingPage={true} />;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <Suspense fallback={<div className="text-gray-500 text-center py-8 text-sm sm:text-base animate-pulse">Loading header...</div>}>
                    <CompanyHeader
                        company={companyData.company}
                        description={companyData.description}
                        country={companyData.country}
                        company_info={companyData.company_info}
                        company_info_fixed={companyData.company_info_fixed}
                        updated_at={companyData.updated_at}
                    />
                </Suspense>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
                    <Suspense fallback={<div className="text-gray-500 text-center py-8 text-sm sm:text-base animate-pulse">Loading key metrics...</div>}>
                        <KeyMetrics
                            metrics={companyData.company_info_fixed}
                            employeeCount={Number(companyData.company_info_fixed.employees)}
                            competitors={companyData.competitors}
                            companyName={companyData.company}
                        />
                    </Suspense>
                </div>

                <div className="space-y-8">
                    {/* Tab Switcher */}
                    <div className="flex border-b border-gray-200 pt-[4rem]">
                        <button
                            onClick={() => setIsChartSection(false)}
                            className={`px-4 py-3 font-medium text-sm sm:text-base transition-colors duration-200 ${!isChartSection
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}>
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
                        <Suspense fallback={<div className="text-gray-500 text-center py-8 text-sm sm:text-base animate-pulse">Loading charts...</div>}>
                            <ComparisonCharts
                                companyData={{
                                    company_info_fixed: companyData.company_info_fixed,
                                    competitors: companyData.competitors || [],
                                    funding: companyData.funding || [],
                                    companyName: companyData.company,
                                    employeeCount: Number(companyData.company_info_fixed.employees)
                                }}
                            />
                        </Suspense>
                    ) : (
                        <div className="mt-2 grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-6">
                                <Suspense fallback={<div className="text-gray-500 text-center py-8 text-sm sm:text-base animate-pulse">Loading sentiment chart...</div>}>
                                    <SentimentChart articles={companyData.articles} />
                                </Suspense>
                                <Suspense fallback={<div className="text-gray-500 text-center py-8 text-sm sm:text-base animate-pulse">Loading competitors table...</div>}>
                                    <CompetitorsTable competitors={companyData.competitors} />
                                </Suspense>
                            </div>
                            <div className="space-y-6">
                                <Suspense fallback={<div className="text-gray-500 text-center py-8 text-sm sm:text-base animate-pulse">Loading funding timeline...</div>}>
                                    <FundingTimeline funding={companyData.funding} />
                                </Suspense>
                                <Suspense fallback={<div className="text-gray-500 text-center py-8 text-sm sm:text-base animate-pulse">Loading articles feed...</div>}>
                                    <ArticlesFeed articles={companyData.articles} />
                                </Suspense>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
