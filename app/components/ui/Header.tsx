"use client";

import Link from "next/link";
import { AiOutlineHome, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { RiSearchEyeLine } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { Playfair_Display } from "next/font/google";
import { BiWorld } from 'react-icons/bi';
import { FiDatabase } from 'react-icons/fi';
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { IoMdSearch } from "react-icons/io";

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: "600",
    variable: "--font-playfair",
});

export default function Header() {
    const pathname = usePathname();
    const [display, setDisplay] = useState<string>("hidden");
    const [showSearch, setShowSearch] = useState<boolean>(false)

    const isHome = pathname === "/";
    const isSource = pathname === '/sources'
    const isCountries = pathname === '/countries'

    useEffect(() => {console.log(showSearch)}, [showSearch])
    const companyNames = [
        { company: "Dangote Group" },
        { company: "MTN Group" },
        { company: "Safaricom" },
        { company: "Jumia" },
        { company: "Interswitch" },
        { company: "Andela" },
        { company: "Paystack" },
        { company: "Opay" },
    ].map(res => res.company.replace("(company)", "").trim())

    return (
        <header className="w-full px-4 py-3 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50 flex items-center justify-between">
            {/* Logo and title */}
            <div className="flex items-center gap-2">
                <RiSearchEyeLine size={22} className="text-black" />
                <Link
                    href="/"
                    className={`${playfair.className} text-lg sm:text-xl font-semibold tracking-tight text-gray-800 hover:opacity-80 transition`}
                >
                    Stears Lite
                </Link>
            </div>

            {/* Mobile menu icon */}
            <AiOutlineMenu
                className="md:hidden text-gray-700"
                size={26}
                onClick={() => setDisplay("flex")}
            />


            {/* Navigation links */}
            <nav
                className={`${display} md:flex items-center text-[15px] font-medium text-gray-600 fixed right-0 top-0 bg-white h-screen w-screen flex flex-col p-8 gap-8 shadow-sm border-l border-gray-100 md:p-2 md:bg-transparent md:shadow-none md:border-none md:h-fit md:w-fit md:relative md:inset-0`}
            >
                {/* Mobile Close Icon */}
                <AiOutlineClose
                    size={24}
                    className="md:hidden ml-auto text-gray-700 hover:text-black cursor-pointer transition"
                    onClick={() => setDisplay("hidden")}
                />

                <ul className="flex flex-col gap-4 md:flex-row md:gap-8 items-center">
                    {!isHome && <li className="hidden md:flex transition-all">
                        {!showSearch && <IoMdSearch
                            className='text-gray-600'
                            size={20}
                            onClick={() => setShowSearch(true)}
                        />}
                        {showSearch && <SearchBar names={companyNames} isHeader={true} setShowSearch={setShowSearch} showSearch={showSearch} />}
                    </li>}

                    {!isCountries && (
                        <li onClick={() => setDisplay("hidden")}>
                            <Link
                                href="/countries"
                                className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-gray-100 hover:text-gray-900 transition"
                            >
                                <BiWorld className="w-7 h-7 md:w-5 md:h-5 text-gray-600" />
                                <span className="tracking-tight text-lg md:text-sm">Countries</span>
                            </Link>
                        </li>
                    )}

                    {!isSource && (
                        <li onClick={() => setDisplay("hidden")}>
                            <Link
                                href="/sources"
                                className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-gray-100 hover:text-gray-900 transition"
                            >
                                <FiDatabase className="w-7 h-7 md:w-5 md:h-5 text-gray-600" />
                                <span className="tracking-tight text-lg md:text-sm">Sources</span>
                            </Link>
                        </li>
                    )}

                    {!isHome && (
                        <li onClick={() => setDisplay("hidden")}>
                            <Link
                                href="/"
                                className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-gray-100 hover:text-gray-900 transition"
                            >
                                <AiOutlineHome className="w-7 h-7 md:w-5 md:h-5 text-gray-600" />
                                <span className="tracking-tight text-lg md:text-sm">Home</span>
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}
