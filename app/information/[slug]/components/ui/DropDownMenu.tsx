const DropDownMenu = ({ selectedCategory, setSelectedCategory, categories }: { selectedCategory: string, setSelectedCategory: Function, categories: string[] }) => {
    return (
        <div className="flex justify-center">
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full sm:w-auto px-4 py-2 bg-[#1A1A1A] border border-[#333] rounded-lg text-white text-sm sm:text-base"
            >
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default DropDownMenu;