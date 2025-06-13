import connectDB from "@/lib/mongodb";
import Company from "@/models/Company";
import { NextRequest, NextResponse } from "next/server";
import Fuse from "fuse.js";

type Params = Promise<{ slug: string }>;

export async function GET(
    request: NextRequest,
    { params }: { params: Params }
): Promise<NextResponse> {
    await connectDB();

    const { slug } = await params;
    const cleanedSlug = slug.replace('%20', ' ')

    try {
        // 1. Try regex search first, limit 1
        const regexResult = await Company.findOne({
            company: { $regex: cleanedSlug, $options: "i" },
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

        const fuseResults = fuse.search(cleanedSlug);
        if (fuseResults.length > 0) {
            return NextResponse.json({ result: fuseResults[0].item, success: true }, { status: 200 });
        }

        const data = { "company": cleanedSlug }
        return NextResponse.json({ result: data }, { status: 200 })
    } catch (error) {
        console.error("Search error:", error);
        return NextResponse.json({ success: false, error: "Search failed" }, { status: 500 });
    }
}
