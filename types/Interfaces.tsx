export interface CompanyData {
    articles: Article[];
    company: string;
    description: string;
    country: string;
    macro_details: MacroDetails;
    company_information: Record<string, string>;
}

export interface Article {
    id: string;
    title: string;
    published: string;
    link: string;
    source: string;
    source_link: string;
    sentiment_score: number;
}

export interface MacroDetails {
    [category: string]: {
        [metric: string]: MacroMetric;
    };
}

export interface MacroMetric {
    description: string;
    current_value: number;
    trend: {
        year: number[];
        value: number[];
    };
    comparison: {
        regional: number;
        national: number;
    };
    percentage_difference: number;
    volatility_label: string;
}

