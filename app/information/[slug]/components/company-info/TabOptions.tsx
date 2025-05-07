interface Option {
    "key": string,
    "label": string
}


const TabOptions = ({ tabOptions, section, setSection }: { tabOptions: Option[], section: string, setSection: Function }) => {
    return (
        <span className="flex items-center text-sm gap-3 tracking-wider mb-4 lg:sticky lg:top-0 lg:bg-black lg:z-50">
            {tabOptions.map(({ key, label }) => (
                <p
                    key={key}
                    className={`px-4 py-2 border-b-2 ${section === key
                        ? 'border-white text-white font-semibold'
                        : 'border-transparent text-[#888] hover:text-white'
                        } cursor-pointer transition-all duration-200`}
                    onClick={() => setSection(key)}
                >
                    {label}
                </p>
            ))}
        </span>
    )
}

export default TabOptions;