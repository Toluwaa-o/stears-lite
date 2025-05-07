'use client'

import { useEffect, useState } from 'react'
import CompanyInformationSection from '../company-info/CompanyInformationSection'
import SentimentGuage from '../sentiment/SentimentGuage'
import { Article, MacroDetails } from '../../../../../types/Interfaces'
import useIsLargeScreen from '@/hooks/Resize'
import Description from './Description'

type Props = {
    country: string,
    company: string,
    percentage_of_negatives: number,
    percentage_of_positives: number,
    description: string,
    company_information: Record<string, string>,
    articles: Article[],
    macro_details: MacroDetails
}

const PageStructure = ({ company, country, percentage_of_negatives, percentage_of_positives, description, company_information, articles, macro_details }: Props) => {
    const isLargeScreen = useIsLargeScreen();

    const [section, setSection] = useState<string>('info'); // default to mobile-safe

    useEffect(() => {
        const defaultSection = isLargeScreen ? 'overview' : 'info';
        setSection(defaultSection);
    }, [isLargeScreen]);

    return (
        <div className="flex flex-col gap-6 w-full max-w-full text-white min-h-screen px-4 sm:px-6 lg:px-8 py-6">
            {/* Company Card */}
            <div className="space-y-6 border border-[#1F1F1F] rounded-2xl p-6 bg-[#0F0F0F] w-full max-w-3xl mx-auto lg:max-h-[40%]">

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    {/* Company Info */}
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                        {company.replace("_", " ")}{' '}
                        <span className="text-[#A0A0A0] text-lg sm:text-xl">
                            ({country})
                        </span>
                    </h2>

                    {/* Sentiment Gauge */}
                    <div className="flex-shrink-0">
                        <SentimentGuage
                            percentage_of_positives={percentage_of_positives}
                            percentage_of_negatives={percentage_of_negatives}
                            section={section}
                        />
                    </div>
                </div>

                {/* Description */}
                <Description section={section} description={description} />
            </div>

            {/* Additional Info Section */}
            <CompanyInformationSection
                articles={articles}
                company_information={company_information}
                section={section}
                setSection={setSection}
                macro_details={macro_details}
                country={country}
            />
        </div>

    )
}

export default PageStructure