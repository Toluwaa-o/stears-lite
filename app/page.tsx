import SearchBar from "./components/ui/SearchBar";

export default function Home() {
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
      <SearchBar />
    </div>
  );
}
