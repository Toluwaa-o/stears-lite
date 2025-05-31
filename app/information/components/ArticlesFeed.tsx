import { Article } from '@/types/Interfaces';

interface ArticlesFeedProps {
    articles: Article[];
}

const ArticlesFeed: React.FC<ArticlesFeedProps> = ({ articles }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const getSentimentColor = (score: number) => {
        if (score > 0.6) return 'bg-green-100 text-green-800';
        if (score > 0.3) return 'bg-blue-100 text-blue-800';
        if (score > 0) return 'bg-gray-100 text-gray-800';
        return 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
                <h2 className="font-semibold text-lg">Recent News & Articles</h2>
            </div>
            <div className="divide-y divide-gray-100">
                {articles.slice(0, 6).map((article) => (
                    <a
                        key={article.id}
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <h3 className="font-medium">{article.title}</h3>
                                <div className="flex items-center mt-2 text-sm text-gray-500">
                                    <span>{article.source}</span>
                                    <span className="mx-2">•</span>
                                    <span>{formatDate(article.published)}</span>
                                </div>
                            </div>
                            {/* {article.sentiment_score > 0 && (
                                <span className={`text-xs px-2 py-1 rounded-full ${getSentimentColor(article.sentiment_score)}`}>
                                    {article.sentiment_score.toFixed(2)}
                                </span>
                            )} */}
                        </div>
                    </a>
                ))}
            </div>
            {/* {articles.length > 5 && (
                <div className="p-4 text-center border-t border-gray-100">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View all {articles.length} articles
                    </button>
                </div>
            )} */}
        </div>
    );
};

export default ArticlesFeed;