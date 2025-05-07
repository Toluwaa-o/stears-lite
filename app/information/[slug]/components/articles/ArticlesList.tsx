// ArticlesList.tsx
import React from 'react';
import Chevron from '../ui/Chevron'; // Adjust path as needed
import { Article } from '../../../../../types/Interfaces';

interface ArticlesListProps {
    articles: Article[];
}

const ArticlesList = ({ articles }: ArticlesListProps) => {
    return (
        <div className="block lg:block h-full overflow-y-scroll custom-scroll lg:max-h-[50vh]">
            <div className="transition-all gap-4 grid pb-4">
                <div className="flex flex-col gap-4">
                    {articles.map(({ id, title, published, link, source, source_link, sentiment_score }) => {
                        const date = new Date(published);
                        return (
                            <div key={id} className="flex flex-col max-w-full">
                                <div className="grid gap-2 my-6 min-h-[12vh]">
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={link}
                                        className="text-base font-semibold flex items-center gap-2 hover:underline hover:text-blue-400 transition-all max-w-full overflow-hidden"
                                    >
                                        <div className="shrink-0">
                                            <Chevron sentiment_score={sentiment_score} />
                                        </div>
                                        <h3 className="break-words text-sm sm:text-base text-white leading-tight">
                                            {title.replace(/^[^\w\s]+/, '').trim()}
                                        </h3>
                                    </a>
                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href={source_link}
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
        </div>
    );
};

export default ArticlesList;
