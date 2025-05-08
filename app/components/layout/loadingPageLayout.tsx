'use client';

import CircularIndeterminate from '@/app/components/ui/CircularLoader';
import { useEffect, useState } from 'react';

const messages = [
    'Scraping the web...',
    'Gathering data...',
    'Organizing data...',
    'Visualizing the data...',
    'Almost done...',
];

interface Prop {
    scrapingPage: boolean
}

const LoadingPageLayout = ({ scrapingPage }: Prop) => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
        }, 5000); // 5 seconds per step

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen max-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-4 absolute top-0 left-0 w-screen z-[101]">
            <div className="mb-6 scale-125 animate-spin-slow">
                <CircularIndeterminate />
            </div>
            {scrapingPage && <div className="text-base sm:text-base md:text-base font-medium text-center animate-fade-in transition-all duration-500">
                {messages[step]}
            </div>}
        </div>
    );
}

export default LoadingPageLayout;