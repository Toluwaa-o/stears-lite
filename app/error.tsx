'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => {
        console.error(error); // Log it for debugging
    }, [error]);

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-6 text-center">
            <h1 className="text-[6rem] sm:text-[7rem] font-extrabold tracking-tight">Error</h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-6 max-w-md">
                {error.message || "Something went wrong. Please try again."}
            </p>

            <div className="flex gap-4">
                <button
                    onClick={() => reset()}
                    className="px-6 py-2 border border-white text-sm sm:text-base rounded-md hover:bg-white hover:text-black transition"
                >
                    Try Again
                </button>
                <Link
                    href="/"
                    className="px-6 py-2 border border-white text-sm sm:text-base rounded-md hover:bg-white hover:text-black transition"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}
