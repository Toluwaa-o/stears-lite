import mongoose from "mongoose";

const CompanyInfoFixedSchema = new mongoose.Schema({
    annual_revenue: { type: String },
    venture_funding: { type: String },
    revenue_per_employee: { type: String },
    total_funding: { type: String },
    current_valuation: { type: String },
    employee_count: { type: String },
    investors: { type: String },
    industry: { type: String },
}, { _id: false });

const CompetitorDataSchema = new mongoose.Schema({
    competitor_name: [{ type: String }],
    revenue: [{ type: String }],
    number_of_employees: [{ type: String }],
    employee_growth: [{ type: String }],
    total_funding: [{ type: String }],
    valuation: [{ type: String }],
}, { _id: false });

const FundingRoundSchema = new mongoose.Schema({
    date: [{ type: String }],
    amount: [{ type: String }],
    round: [{ type: String }],
    lead_investors: [{ type: String }],
    reference: [{ type: String }],
}, { _id: false });

const CompanySchema = new mongoose.Schema({
    company: { type: String, required: true },
    description: { type: String },
    country: { type: String, required: true },
    company_info_fixed: { type: CompanyInfoFixedSchema, required: true },
    company_info: { type: mongoose.Schema.Types.Mixed },
    competitors: { type: CompetitorDataSchema },
    funding: { type: FundingRoundSchema },
    created_at: { type: Date, default: () => new Date() },
    updated_at: { type: Date, default: () => new Date() },
});

CompanySchema.pre('save', function (next) {
    this.updated_at = new Date();
    next();
});

export default mongoose.models.Company || mongoose.model("Company", CompanySchema);
