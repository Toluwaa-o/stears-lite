'use client'

import { useEffect, useState, FormEvent, useMemo } from "react"
import { IoMdSearch } from "react-icons/io";
import { useRouter } from 'next/navigation'

type CompanyNames = string[];

type SearchBarProps = {
    names: CompanyNames;
    isHeader: boolean;
    setShowSearch?: (value: boolean) => void;
    showSearch?: boolean
};

const SearchBar = ({ names, isHeader, setShowSearch, showSearch }: SearchBarProps) => {
    const router = useRouter()
    const companyNames = useMemo(() => names.map(n => n), [])

    const randomStartingInteger = Math.floor(Math.random() * companyNames.length);

    const [placeholderCompany, setPlaceHolderCompany] = useState<string>(companyNames[randomStartingInteger])

    const handleClick = () => {
        setShowSearch?.(!showSearch);
    };

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
        handleClick()
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
            className={`flex flex-col items-start justify-center w-full gap-4`}
            onSubmit={handleSubmit}
        >
            <div
                className={`flex items-center border ${errorMessage ? 'border-red-500' : 'border-gray-300'
                    } bg-white rounded-md overflow-hidden h-11 w-full max-w-2xl focus-within:ring-2 ${errorMessage ? 'focus-within:ring-red-500/30' : 'focus-within:ring-blue-500/30'
                    } transition-all duration-200 shadow-sm ${isHeader ? 'md:h-9 md:max-w-xl' : ''}`}
            >
                <input
                    type="text"
                    aria-label="Company"
                    placeholder={
                        errorMessage ? errorMessage : `Search "${placeholderCompany}"`
                    }
                    name="company"
                    className={`bg-transparent ${errorMessage ? 'placeholder:text-red-500' : 'placeholder:text-gray-500'
                        } w-full h-full px-4 py-1.5 outline-none ${isHeader ? 'text[0.9rem] placeholder:text-[0.9rem]' : 'text-sm sm:text-base'} text-gray-900`}
                    onChange={(e) => setCompany(e.target.value)}
                />
                <button
                    type="submit"
                    className={`h-full px-4 transition-colors ${errorMessage ? 'hover:bg-red-50' : 'hover:bg-blue-50'
                        }`}
                    title="Search"
                    aria-label="Search"
                >
                    <IoMdSearch
                        className={`${errorMessage ? 'text-red-500' : 'text-blue-600'
                            } ${isHeader ? 'text-gray-600' : 'text-blue-600'}`}
                        size={20}
                    />
                </button>
            </div>
        </form>
    )
}

export default SearchBar