import connectDB from "@/lib/mongodb";
import fetchGoogleNews from "@/utils/FetchArticles";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ slug: string }>;

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
): Promise<NextResponse> {
  await connectDB;

  const { slug } = await params;
  const cleanedSlug = slug.replace('%20', ' ')

  const articles = await fetchGoogleNews(cleanedSlug);
  return NextResponse.json({ articles, success: true }, { status: 200 });
};