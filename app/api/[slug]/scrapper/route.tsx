import connectDB from "@/lib/mongodb";
import Company from "@/models/CompanyData";
import normalizeCompanyData from "@/utils/NormaliseData";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ slug: string }>;

export async function GET(
    request: NextRequest,
    { params }: { params: Params }
): Promise<NextResponse> {
    await connectDB();

    const { slug } = await params;

    try {
        const res = await fetch(`https://lite-api.onrender.com/information/${slug}`)
        if (res.ok) {
            const result = await res.json()
            const createdDoc = await Company.create(normalizeCompanyData(result));

            return NextResponse.json({ result: createdDoc }, { status: 200 })
        }
        return NextResponse.json({ success: false, error: `${slug} company not found` }, { status: 404 });
    } catch (error) {
        console.error("Search error:", error);
        return NextResponse.json({ success: false, error: "Search failed" }, { status: 500 });
    }
}
