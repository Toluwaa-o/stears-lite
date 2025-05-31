export default function Sources() {
    const sources = [
        { name: "Wikipedia", url: "https://wikipedia.org" },
        { name: "Google", url: "https://google.com" },
        { name: "Stears", url: "https://www.stears.co" },
        { name: "Crunchbase", url: "https://crunchbase.com" },
        { name: "PitchBook", url: "https://pitchbook.com" },
        { name: "DuckDuckGo", url: "https://duckduckgo.com" },
        { name: "TechCabal", url: "https://techcabal.com" },
        { name: "Growjo", url: "https://growjo.com" },
    ];

    return (
        <div className="flex flex-col gap-10 px-4 py-12 max-w-4xl mx-auto lg:max-w-6xl xl:max-w-7xl">
            <div className="space-y-4 max-w-2xl">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
                    Data Sources & References
                </h2>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                    We gather data from trusted and reputable sources to provide you with accurate and up-to-date company insights.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-base sm:text-lg">
                    {sources.map((source) => (
                        <li key={source.name}>
                            <a
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                {source.name}
                            </a>
                        </li>
                    ))}
                    <li className="text-gray-500 italic">and various other online sources</li>
                </ul>
            </div>
        </div>

    );
}
