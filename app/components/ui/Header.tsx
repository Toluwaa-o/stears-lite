"use client";

import Link from "next/link";
import { useEffect } from 'react';
import { usePathname } from "next/navigation";
import { RiSearchEyeLine } from "react-icons/ri";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: "600",
    variable: "--font-playfair",
});


export default function Header() {
    const pathname = usePathname();
    
    useEffect(() => {
        fetch('https://lite-api.onrender.com/').catch(() => {
            // warm up render backend
        });
    }, []);

    const isHome = pathname === "/";

    return (
        <header className="w-full px-6 py-4 border-b border-gray-800 bg-gray-50 text-black sticky top-0 z-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <RiSearchEyeLine size={26} className="text-black" />
                <Link href="/" className={`${playfair.className} text-xl tracking-tight hover:opacity-80 transition`}>
                    Stears Lite
                </Link>
            </div>

            {!isHome && <nav>
                <Link
                    href={"/"}
                    className="text-sm px-4 py-1.5 bg-white border border-gray-700 rounded hover:bg-black text-black hover:text-white transition-colors duration-200"
                >
                    {"Back to Home"}
                </Link>
            </nav>}
        </header>
    );
}
