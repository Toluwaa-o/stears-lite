'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => {
        console.error(error); // Log it for debugging
    }, [error]);

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
            <h1 className="text-[6rem] sm:text-[7rem] font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                Error
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-md leading-relaxed">
                {error.message || "Something went wrong. Please try again."}
            </p>

            <div className="flex gap-4">
                <button
                    onClick={() => reset()}
                    className="px-6 py-3 border border-blue-600 text-blue-600 text-sm sm:text-base font-medium rounded-md hover:bg-blue-600 hover:text-white transition-colors duration-200"
                >
                    Try Again
                </button>
                <Link
                    href="/"
                    className="px-6 py-3 bg-blue-600 text-white text-sm sm:text-base font-medium rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}
