"use client";

import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-black px-6 text-center">
            <h1 className="text-[6rem] sm:text-[8rem] font-extrabold text-black tracking-tight">
                404
            </h1>
            <p className="text-xl sm:text-2xl text-gray-900 mb-6">
                Oops! The page you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
                href="/"
                className="text-sm sm:text-base px-6 py-2 rounded-md border border-black hover:bg-black hover:text-white transition"
            >
                Go Back Home
            </Link>
        </div>
    );
}
