import connectDB from "@/lib/mongodb";
import fetchGoogleNews from "@/utils/FetchArticles";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { slug: string } }  // Correct type for second argument
): Promise<NextResponse> {
  await connectDB;

  // Access params from context
  const { slug } = context.params;
  console.log(slug);

  // Use request for something meaningful
  const headers = request.headers;
  console.log(headers)
  const articles = await fetchGoogleNews('opay');
  return NextResponse.json({ articles, success: true }, { status: 200 });
};