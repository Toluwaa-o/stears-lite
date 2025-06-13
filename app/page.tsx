import connectDB from "@/lib/mongodb";
import SearchBar from "./components/ui/SearchBar";
import Company from "@/models/Company";
import { Article, Competitors, FundingRound } from "@/types/Interfaces";

export interface CompanyFull {
  _id: string;
  __v: number;
  company: string;
  company_info_fixed: {
    [key: string]: string;
  };
  company_info: {
    [key: string]: string;
  };
  description: string;
  country: string;
  articles: Article[];
  competitors: Competitors;
  funding: FundingRound;
  updated_at: Date;
  created_at: Date;
}

// async function warmUpRender() {
//   try {
//     await fetch(`${process.env.LITE_API}`, { cache: "no-store" });
//   } catch (e) {
//     console.log("Warm-up failed:", e);
//   }
// }


async function getAllCompanies(): Promise<CompanyFull[]> {
  try {
    // await warmUpRender();
    await connectDB();
    const allCompanies = await Company.find({}).lean();
    return allCompanies as CompanyFull[];
  } catch (error) {
    console.log(error)
    return [
      { company: "Dangote Group" },
      { company: "MTN Group" },
      { company: "Safaricom" },
      { company: "Jumia" },
      { company: "Interswitch" },
      { company: "Andela" },
      { company: "Paystack" },
      { company: "Opay" },
    ] as CompanyFull[];
  }
}


const Home = async () => {
  const result = await getAllCompanies()
  const companyNames = result.map(res => res.company.replace("(company)", "").trim())

  return (
    <div className="flex flex-col gap-10 px-4 py-12 max-w-4xl mx-auto lg:max-w-6xl xl:max-w-7xl">
      <div className="space-y-4 max-w-2xl">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
          Stay Ahead with Smarter African Company Insights
        </h2>
        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
          Make smarter investment decisions with company data and insights — all in one place.
          <span className="hidden md:inline">
            {" "}Search any African company to see key news, financial data, and curated reports from trusted sources.
          </span>
        </p>
      </div>

      <SearchBar names={companyNames} isHeader={false} />
      <div className="bg-gray-50 text-gray-700 px-5 py-4 text-sm rounded-lg border border-gray-200">
        <p>
          <strong className="font-medium">Note:</strong> Company information is collected from publicly available online sources. If a company has little or no online presence, details may be incomplete or unavailable.
        </p>
      </div>

    </div>
  );
}

export default Home;