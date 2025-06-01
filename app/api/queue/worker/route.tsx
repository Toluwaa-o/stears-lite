import { dequeueCompanyJob } from "@/lib/queue";
import connectDB from "@/lib/mongodb";
import Company from "@/models/CompanyData";
import normalizeCompanyData from "@/utils/NormaliseData";
import { NextRequest, NextResponse } from "next/server";

async function fetchCompanyData(slug: string) {
    const res = await fetch(`https://lite-api.onrender.com/information/${slug}`);
    if (!res.ok) throw new Error("Failed to fetch company data");
    return res.json();
}

export default async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();

        const slug = await dequeueCompanyJob();
        if (!slug) {
            return NextResponse.json({ message: "No jobs in queue" }, { status: 200 });
        }

        const data = await fetchCompanyData(slug);
        const normalized = normalizeCompanyData(data);
        const createdDoc = await Company.create(normalized);

        return NextResponse.json({ message: "Job processed", slug, company: createdDoc }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Job processing failed" }, { status: 500 });
    }
}
