import mongoose, { Schema, Document } from 'mongoose';

// Interface for Article subdocument
// interface IArticle extends Document {
//     id: string;
//     title: string;
//     published: Date;
//     link: string;
//     source: string;
//     source_link: string;
//     sentiment_score: number;
// }

// Interface for Competitors subdocument
interface ICompetitors extends Document {
    'Competitor Name': string[];
    Revenue: string[];
    'Number of Employees': string[];
    'Employee Growth': string[];
    'Total Funding': string[];
    Valuation: string[];
}

// Interface for FundingRound subdocument
interface IFundingRound extends Document {
    Date: Date[];
    Amount: string[];
    Round: string[];
    'Lead Investors': string[];
    Reference: string[];
}

// Main CompanyData interface extending Mongoose Document
interface ICompanyData extends Document {
    company: string;
    company_info_fixed: Map<string, string>;
    company_info: Map<string, string>;
    description: string;
    country: string;
    competitors: ICompetitors;
    funding: IFundingRound;
}

// Article Schema
// const ArticleSchema = new Schema<IArticle>({
//     id: { type: String, required: true },
//     title: { type: String, required: true },
//     published: { type: Date, required: true },
//     link: { type: String, required: true },
//     source: { type: String, required: true },
//     source_link: { type: String, required: true },
//     sentiment_score: { type: Number, default: 0 }
// });

// Competitors Schema
const CompetitorsSchema = new Schema<ICompetitors>({
    'Competitor Name': [{ type: String }],
    Revenue: [{ type: String }],
    'Number of Employees': [{ type: String }],
    'Employee Growth': [{ type: String }],
    'Total Funding': [{ type: String }],
    Valuation: [{ type: String }]
}, { _id: false });

// FundingRound Schema
const FundingRoundSchema = new Schema<IFundingRound>({
    Date: [{ type: Date }],
    Amount: [{ type: String }],
    Round: [{ type: String }],
    'Lead Investors': [{ type: String }],
    Reference: [{ type: String }]
}, { _id: false });

// Main CompanyData Schema
const CompanyDataSchema = new Schema<ICompanyData>({
    company: { type: String, required: true, index: true },
    company_info_fixed: {
        type: Map,
        of: String,
        default: new Map()
    },
    company_info: {
        type: Map,
        of: String,
        default: new Map()
    },
    description: { type: String, required: true },
    country: { type: String, required: true },
    // articles: [ArticleSchema],
    competitors: { type: CompetitorsSchema, required: true },
    funding: { type: FundingRoundSchema, required: true }
}, { timestamps: true });


export const CompanyDataModel = mongoose.model<ICompanyData>('CompanyData', CompanyDataSchema);