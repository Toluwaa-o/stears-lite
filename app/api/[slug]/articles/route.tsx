// import connectDB from "@/lib/mongodb";
// import fetchGoogleNews from "@/utils/FetchArticles";
// import { NextRequest, NextResponse } from "next/server";

// export const GET = async (request: NextRequest, { params }: { params: { slug: string } }): Promise<NextResponse> => {
//   await connectDB;
//   const { slug } = params;
//   console.log(slug);

//   // Use request for something meaningful
//   const headers = request.headers;
//   console.log(headers)
//   const articles = await fetchGoogleNews('opay');
//   return NextResponse.json({ articles, success: true }, { status: 200 });
// };