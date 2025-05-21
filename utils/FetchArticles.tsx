import axios from 'axios';
import { parseString } from 'xml2js';
import getSentimentCategory from './sentimentAnalyzer';
import removeEmojis from './textUtils';

interface Article {
    id: string;
    title: string;
    published: string; // ISO format date string
    link: string;
    source: string;
    source_link: string;
    sentiment_score: number;
}

interface GoogleNewsRSS {
    rss: {
        channel: Array<{
            item?: Array<{
                title: string[];
                link: string[];
                pubDate: string[];
                guid: Array<{ _?: string }> | string[];
                source?: Array<{ _: string; $: { url: string } }>;
            }>;
        }>;
    };
}

/**
 * Fetches the latest news articles about a company from Google News
 * @param companyName - The name of the company to search for
 * @param limit - Maximum number of articles to return (default: 15)
 * @returns Promise with array of Article objects
 * @throws Error when fetching or parsing fails
 */
const fetchGoogleNews = async (
    companyName: string,
    limit: number = 15
): Promise<Article[]> => {
    const query = companyName.replace(/\s+/g, '+');
    const articles: Article[] = [];

    try {
        const rssUrl = `https://news.google.com/rss/search?q=${query}`;
        const response = await axios.get(rssUrl);

        // Parse XML response with proper typing
        const parsedData = await new Promise<GoogleNewsRSS>((resolve, reject) => {
            parseString(response.data, (err, result: GoogleNewsRSS) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        const entries = parsedData.rss.channel[0].item || [];

        // Sort by date (newest first)
        const sortedEntries = entries.sort((a, b) =>
            new Date(b.pubDate[0]).getTime() - new Date(a.pubDate[0]).getTime()
        );

        // Process articles up to the limit
        for (const entry of sortedEntries.slice(0, limit)) {
            const rawTitle = entry.title[0].split(' - ')[0];
            const cleanTitle = removeEmojis(rawTitle);
            const score = getSentimentCategory(cleanTitle);

            // Handle different GUID formats
            const id = Array.isArray(entry.guid)
                ? (typeof entry.guid[0] === 'string' ? entry.guid[0] : entry.guid[0]._ || '')
                : '';

            articles.push({
                id,
                title: cleanTitle,
                published: new Date(entry.pubDate[0]).toISOString(),
                link: entry.link[0],
                source: entry.source?.[0]._ || 'Unknown',
                source_link: entry.source?.[0].$.url || '',
                sentiment_score: score
            });
        }

        return articles;

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        console.error(`Error fetching Google News: ${errorMessage}`);
        throw new Error(`Failed to fetch news: ${errorMessage}`);
    }
}

export default fetchGoogleNews;