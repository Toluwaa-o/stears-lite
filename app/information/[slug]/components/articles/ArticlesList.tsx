// ArticlesList.tsx
import React from 'react';
import SentimentIcon from '../ui/SentimentIcon'; // Adjust path as needed
import { Article } from '../../../../../types/Interfaces';

interface ArticlesListProps {
    articles: Article[];
}

const ArticlesList = ({ articles }: ArticlesListProps) => {
    return (
        <div className="h-full w-full relative">
            <div className="flex flex-col gap-4 pt-4 pb-8">
                {articles.map(({ id, title, published, link, source, source_link, sentiment_score }) => {
                    const date = new Date(published);
                    return (
                        <div key={id} className="flex flex-col max-w-full">
                            <div className="grid gap-2 min-h-[12vh]">
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-base font-semibold flex items-center gap-2 hover:underline hover:text-blue-400 transition-all max-w-full overflow-hidden"
                                >
                                    <div className="shrink-0">
                                        <SentimentIcon sentiment_score={sentiment_score} />
                                    </div>
                                    <h3 className="break-words text-sm sm:text-base text-white leading-tight">
                                        {title.replace(/^[^\w\s]+/, '').trim()}
                                    </h3>
                                </a>
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <a
                                        href={source_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="uppercase tracking-widest hover:text-blue-400 transition-all"
                                    >
                                        {source}
                                    </a>
                                    <span className="h-4 w-[1px] bg-white"></span>
                                    <p className="tracking-wider">{date.toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="w-full h-px bg-white opacity-10"></div>
                        </div>
                    );
                })}
            </div>
        </div>


    );
};

export default ArticlesList;
