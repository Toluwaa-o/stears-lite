import connectDB from "@/lib/mongodb";
import Company from "@/models/CompanyData";
import { NextRequest, NextResponse } from "next/server";
import Fuse from "fuse.js";
import normalizeCompanyData from "@/utils/NormaliseData";
import { enqueueCompanyJob } from "@/lib/queue";  // <--- import your queue instance

type Params = Promise<{ slug: string }>;

export async function GET(
    request: NextRequest,
    { params }: { params: Params }
): Promise<NextResponse> {
    await connectDB();

    const { slug } = await params;

    try {
        // 1. Try regex search first, limit 1
        const regexResult = await Company.findOne({
            company: { $regex: slug, $options: "i" },
        }).lean();

        if (regexResult) {
            return NextResponse.json({ result: regexResult, success: true }, { status: 200 });
        }

        // 2. Fallback to fuse.js fuzzy search on all companies
        const allCompanies = await Company.find({}, { company: 1 }).lean();

        const fuse = new Fuse(allCompanies, {
            keys: ["company"],
            threshold: 0.3,
        });

        const fuseResults = fuse.search(slug);
        if (fuseResults.length > 0) {
            return NextResponse.json({ result: fuseResults[0].item, success: true }, { status: 200 });
        }

        // 3. Try external API fetch
        const res = await fetch(`https://lite-api.onrender.com/information/${slug}`);

        if (res.ok) {
            const data = await res.json();

            const createdDoc = await Company.create(normalizeCompanyData(data));

            return NextResponse.json({ result: createdDoc, success: true }, { status: 200 });
        }

        // 4. If all fails, enqueue the slug for background processing
        await enqueueCompanyJob(slug);

        // Return 202 Accepted to indicate background processing
        return NextResponse.json({ success: true, message: "Request accepted for processing." }, { status: 202 });

    } catch (error) {
        console.error("Search error:", error);
        return NextResponse.json({ success: false, error: "Search failed" }, { status: 500 });
    }
}
