"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { RiSearchEyeLine } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: "600",
    variable: "--font-playfair",
});

export default function Header() {
    const pathname = usePathname();

    useEffect(() => {
        fetch("https://lite-api.onrender.com/").catch(() => {
            // warm up render backend
        });
    }, []);

    const isHome = pathname === "/";
    const isSource = pathname === '/sources'

    return (
        <header className="w-full px-6 py-4 border-b border-gray-800 bg-gray-50 text-black sticky top-0 z-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <RiSearchEyeLine size={26} className="text-black" />
                <Link
                    href="/"
                    className={`${playfair.className} text-xl tracking-tight hover:opacity-80 transition`}
                >
                    Stears Lite
                </Link>
            </div>

            <nav className="flex items-center gap-4">
                {!isSource && (
                    <Link
                        href="/sources"
                        className="text-sm text-gray-800 hover:text-black underline-offset-4 hover:underline transition-colors duration-200"
                    >
                        Sources
                    </Link>
                )}

                {!isHome && (
                    <Link
                        href="/"
                        className="hidden md:inline-flex items-center text-gray-800 hover:text-black transition-colors duration-200"
                    >
                        <AiOutlineHome className="w-5 h-5" />
                    </Link>
                )}
            </nav>


        </header>
    );
}
