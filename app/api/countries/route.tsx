import connectDB from "@/lib/mongodb";
import Country from "@/models/Country";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
): Promise<NextResponse> {

    await connectDB()
    const countriesData = await Country.find({}, { _id: 0 })

    return NextResponse.json({ data: countriesData }, { status: 200 })
}
