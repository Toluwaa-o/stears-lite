'use client';

import { useEffect, useState } from 'react';
import { RiSearchEyeLine } from 'react-icons/ri';

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
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-white px-4 fixed top-0 left-0 z-[101]">
            <div className="relative mb-8 w-28 h-28">
                {/* Animated gradient ring */}
                <div className="absolute inset-0 border-[6px] border-gray-100 rounded-full"></div>
                <div className="absolute inset-0 border-[6px] border-transparent border-t-blue-500 border-r-blue-500 rounded-full animate-spin"></div>

                {/* Your logo centered */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <RiSearchEyeLine
                        size={32}
                        className="text-blue-500 animate-pulse-slow"
                    />
                </div>
            </div>

            {scrapingPage && (
                <div className="max-w-md text-center space-y-4">
                    <p className="text-lg font-medium text-gray-700">
                        {messages[step]}
                    </p>
                </div>
            )}
        </div>
    );
}

export default LoadingPageLayout;