import mongoose from "mongoose";

const CompanyInfoFixedSchema = new mongoose.Schema({
    annual_revenue: { type: String, required: true },
    venture_funding: { type: String, required: true },
    revenue_per_employee: { type: String, required: true },
    total_funding: { type: String, required: true },
    current_valuation: { type: String, required: true },
    employee_count: { type: String, required: true },
    investors: { type: String, required: true },
    industry: { type: String, required: true },
}, { _id: false });

const CompetitorDataSchema = new mongoose.Schema({
    competitor_name: [{ type: String, required: true }],
    revenue: [{ type: String, required: true }],
    number_of_employees: [{ type: String, required: true }],
    employee_growth: [{ type: String, required: true }],
    total_funding: [{ type: String, required: true }],
    valuation: [{ type: String, required: true }],
}, { _id: false });

const FundingRoundSchema = new mongoose.Schema({
    date: [{ type: String, required: true }],
    amount: [{ type: String, required: true }],
    round: [{ type: String, required: true }],
    lead_investors: [{ type: String, required: true }],
    reference: [{ type: String, required: true }],
}, { _id: false });

const CompanySchema = new mongoose.Schema({
    company: { type: String, required: true },
    description: { type: String, required: true },
    country: { type: String, required: true },
    company_info_fixed: { type: CompanyInfoFixedSchema, required: true },
    company_info: { type: mongoose.Schema.Types.Mixed, required: true }, // for dynamic structure
    competitors: { type: CompetitorDataSchema, required: true },
    funding: { type: FundingRoundSchema, required: true },
    created_at: { type: Date, default: () => new Date(), required: true },
    updated_at: { type: Date, default: () => new Date(), required: true },
});

CompanySchema.pre('save', function (next) {
    this.updated_at = new Date();
    next();
});

export default mongoose.models.Company || mongoose.model("Company", CompanySchema);
