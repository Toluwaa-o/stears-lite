import { Article, MacroDetails } from "@/types/Interfaces";
import useIsLargeScreen from '@/hooks/Resize';
import MacroCharts from '../macro/MacroCharts';
import ArticlesList from '../articles/ArticlesList';
import InfoTable from './InfoTable';
import TabOptions from './TabOptions';

interface Props {
    articles: Article[],
    company_information: Record<string, string>,
    section: string,
    setSection: React.Dispatch<React.SetStateAction<string>>,
    macro_details: MacroDetails,
    country: string
}

const CompanyInformationSection = ({ articles, company_information, section, setSection, macro_details, country }: Props) => {
    const domainSuffixes = ['.com', '.co', '.org', '.net', '.io', '.gov', '.ai'];

    const isLargeScreen = useIsLargeScreen();

    const tabOptions = isLargeScreen
        ? [
            { key: 'overview', label: 'Overview' },
            { key: 'macro', label: 'Indicators' },
        ]
        : [
            { key: 'info', label: 'Info' },
            { key: 'articles', label: 'Articles' },
            { key: 'macro', label: 'Indicators' },
        ];

    return (
        <div className='pb-2 flex flex-col gap-4 max-h-[80vh] overflow-y-scroll custom-scroll lg:max-h-[60%] lg:relative'>
            <TabOptions section={section} setSection={setSection} tabOptions={tabOptions} />

            {isLargeScreen ? (
                section === 'overview' && (
                    <div className="grid lg:grid-cols-2 gap-6 h-full overflow-y-scroll custom-scroll">
                        {/* Info Section */}
                        <InfoTable company_information={company_information} domainSuffixes={domainSuffixes} />

                        {/* Articles Section */}
                        <ArticlesList articles={articles} />
                    </div>
                )
            ) : (
                <>
                    {section === 'info' && <InfoTable company_information={company_information} domainSuffixes={domainSuffixes} />}
                    {section === 'articles' && <ArticlesList articles={articles} />}
                </>
            )}

            {section === 'macro' && <MacroCharts macro_details={macro_details} country={country} />}



        </div>
    )
}

export default CompanyInformationSection