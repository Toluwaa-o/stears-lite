'use client'

import { useEffect, useState, FormEvent } from "react"
import { IoMdSearch } from "react-icons/io";
import { useRouter } from 'next/navigation'

const SearchBar = () => {
    const router = useRouter()
    const companyNames = [
        "Dangote Group",
        "MTN Group",
        "Safaricom",
        "Jumia",
        "Interswitch",
        "Andela",
        "Paystack",
        "Opay",
    ]

    const randomStartingInteger = Math.floor(Math.random() * companyNames.length);

    const [placeholderCompany, setPlaceHolderCompany] = useState<string>(companyNames[randomStartingInteger])

    useEffect(() => {
        const updatePlaceHolderCompany = setInterval(() => {
            const newRandomInteger = Math.floor(Math.random() * companyNames.length);

            if (companyNames[newRandomInteger] !== placeholderCompany) {
                setPlaceHolderCompany(companyNames[newRandomInteger])
            } else {
                if (newRandomInteger === companyNames.length - 1) {
                    setPlaceHolderCompany(companyNames[newRandomInteger - 1])
                } else {
                    setPlaceHolderCompany(companyNames[newRandomInteger + 1])
                }
            }
        }, 10000)

        return () => clearInterval(updatePlaceHolderCompany)
    }, [companyNames, placeholderCompany])

    const [company, setCompany] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("")

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (company.trim()) {
            router.push(`/information/${company.trim().toLowerCase()}`);
        } else {
            setErrorMessage("Please, enter a company name.")
        }
    }

    useEffect(() => {
        if (errorMessage) {
            const timeout = setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [errorMessage]);

    return (
        <form
            className="flex flex-col items-center justify-center gap-4 w-full"
            onSubmit={handleSubmit}
        >
            <div className={`flex items-center border ${errorMessage ? 'border-red-400' : 'border-gray-500'} bg-[#1a1a1a] rounded-md overflow-hidden h-12 w-full max-w-2xl focus-within:ring-2 ${errorMessage ? 'focus-within:ring-red-400' : 'focus-within:ring-white'} transition`}>
                <input
                    type="text"
                    aria-label="Company"
                    placeholder={`${errorMessage ? errorMessage : 'Search ' + '"' + placeholderCompany + '"'}`}
                    name="company"
                    className={`bg-transparent ${errorMessage ? "placeholder:text-red-400" : 'placeholder:text-gray-500'} w-full h-full px-4 py-2 outline-none text-sm sm:text-base placeholder-gray-400 text-white`}
                    onChange={(e) => setCompany(e.target.value)}
                />
                <button
                    type="submit"
                    className="h-full px-4 hover:bg-gray-700 transition"
                >
                    <IoMdSearch fill={`${errorMessage ? 'oklch(70.4% 0.191 22.216)' : 'white'}`} size={20} />
                </button>
            </div>
        </form>
    )
}

export default SearchBar