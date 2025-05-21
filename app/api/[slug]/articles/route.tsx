import connectDB from "@/lib/mongodb";
import { CompanyDataModel } from "@/models/CompanyData";
import fetchGoogleNews from "@/utils/FetchArticles";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: Promise<{ slug: string }> }): Promise<NextResponse> => {
  await connectDB;

  // const company = await CompanyDataModel.findById(slug).select('company')
  // if (!company) {
  //   throw Error("Could not find company in database")
  // }

  const articles = await fetchGoogleNews('opay')

  return NextResponse.json({ articles, success: true }, { status: 200 });
};