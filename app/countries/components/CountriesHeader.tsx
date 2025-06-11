import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { category_colors, indicator_descriptions, indicatorCategories } from './IndicatorCategories'

const CountriesHeader = ({ sortFieldChange, setAscending, sortField, ascending }: { sortFieldChange: (field: string) => void, setAscending: (field: boolean) => void, sortField: string, ascending: boolean }) => {
    const allCategories: string[] = []

    for (const key of Object.keys(indicatorCategories)) {
        for (const val in indicatorCategories[key]) {
            allCategories.push(indicatorCategories[key][val])
        }
    }

    const clickHandler = (title: string) => {
        if (sortField === title) {
            setAscending(!ascending)
        } else {
            sortFieldChange(title)
            setAscending(true)
        }
    }

    const formatTitle = (title: string) => {
        for (const key of Object.keys(indicatorCategories)) {
            if (indicatorCategories[key].indexOf(title) >= 0) {
                return (
                    <th
                        key={title}
                        scope="col"
                        role="columnheader"
                        tabIndex={0}
                        aria-label={`Sort by ${title} ${title === sortField ? (ascending ? '(ascending)' : '(descending)') : ''}`}
                        onClick={() => clickHandler(title)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') clickHandler(title);
                        }}
                        className={`px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer ${category_colors[key]} max-w-[11rem] h-[3rem]`}
                    >
                        <div className="flex items-center gap-1 truncate justify-between" title={`${title}: ${indicator_descriptions[title]}`}>
                            <span className="truncate">{title}</span>
                            <span className="w-5 h-5 flex items-center justify-center">
                                {title === sortField ? (
                                    ascending ? (
                                        <IoMdArrowDropup className="text-gray-500 w-5 h-5" aria-hidden="true" />
                                    ) : (
                                        <IoMdArrowDropdown className="text-gray-500 w-5 h-5" aria-hidden="true" />
                                    )
                                ) : null}
                            </span>
                        </div>
                    </th>

                )
            }
        }
    }

    return (
        <thead className="bg-gray-50 sticky top-0">
            <tr className="relative">
                <th className={`px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-normal break-words max-w-[10rem] cursor-pointer sticky left-0 bg-gray-50`} onClick={() => clickHandler('name')}>
                    <div className="flex items-center gap-1 truncate" title='Country name'><span className="truncate">Country</span>
                        {'name' === sortField && (
                            ascending ? (
                                <IoMdArrowDropup className="text-gray-500 w-5 h-5" />
                            ) : (
                                <IoMdArrowDropdown className="text-gray-500 w-5 h-5" />
                            )
                        )}</div></th>
                {allCategories.map(title => formatTitle(title))}
            </tr>
        </thead>
    )
}

export default CountriesHeader