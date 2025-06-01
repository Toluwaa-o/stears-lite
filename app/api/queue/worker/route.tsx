import { NextApiRequest, NextApiResponse } from "next";
import { dequeueCompanyJob } from "@/lib/queue";
import connectDB from "@/lib/mongodb";
import Company from "@/models/CompanyData";
import normalizeCompanyData from "@/utils/NormaliseData";

async function fetchCompanyData(slug: string) {
    const res = await fetch(`https://lite-api.onrender.com/information/${slug}`);
    if (!res.ok) throw new Error("Failed to fetch company data");
    return res.json();
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectDB();

        const slug = await dequeueCompanyJob();
        if (!slug) {
            return res.status(200).json({ message: "No jobs in queue" });
        }

        const data = await fetchCompanyData(slug);
        const normalized = normalizeCompanyData(data);
        const createdDoc = await Company.create(normalized);

        return res.status(200).json({ message: "Job processed", slug, company: createdDoc });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Job processing failed" });
    }
}
