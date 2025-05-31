import connectDB from "@/lib/mongodb";
import fetchGoogleNews from "@/utils/FetchArticles";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { slug: string } }  // Correct type for second argument
): Promise<NextResponse> {
  await connectDB;

  const { slug } = await context.params;

  const articles = await fetchGoogleNews(slug);
  return NextResponse.json({ articles, success: true }, { status: 200 });
};