export interface Article {
    id: string;
    title: string;
    published: string;
    link: string;
    source: string;
    source_link: string;
    sentiment_score: number;
}

export interface Competitors {
    "Competitor Name": string[];
    Revenue: string[];
    "Number of Employees": string[];
    "Employee Growth": string[];
    "Total Funding": string[];
    Valuation: string[];
}

export interface FundingRound {
    Date: string[];
    Amount: string[];
    Round: string[];
    "Lead Investors": string[];
    Reference: string[];
}

export interface CompanyData {
    company: string;
    company_info_fixed: {
        [key: string]: string;
    };
    company_info: {
        [key: string]: string;
    };
    description: string;
    country: string;
    articles: Article[];
    competitors: Competitors;
    funding: FundingRound;
    updated_at: Date;
    created_at: Date;
}

export interface CountryData {
    name: string,
    data: {
        [key: string]: number | string | null;
    };
    updated_at: Date
}