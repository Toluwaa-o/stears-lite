"use client";

import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-6 text-center">
            <h1 className="text-[6rem] sm:text-[8rem] font-extrabold text-white tracking-tight">
                404
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-6">
                Oops! The page you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
                href="/"
                className="text-sm sm:text-base px-6 py-2 rounded-md border border-white hover:bg-white hover:text-black transition"
            >
                Go Back Home
            </Link>
        </div>
    );
}
