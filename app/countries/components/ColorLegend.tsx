'use client'

import { useState } from "react";

const ColorLegend = () => {
    const [open, setOpen] = useState(false);

    const legendItems = [
        { color: "bg-green-600", label: "Good" },
        { color: "bg-gray-500", label: "Moderate" },
        { color: "bg-red-500", label: "Concerning" },
    ];

    return (
        <div className="bg-gray-50 rounded-md border border-gray-200 mt-3">
            {/* Legend Header */}
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 focus:outline-none"
            >
                <span>Legend</span>
                <svg
                    className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Collapsible Content */}
            {open && (
                <div className="px-4 py-2 pb-3 flex flex-wrap gap-4 items-center text-sm">
                    {legendItems.map(({ color, label }) => (
                        <div key={label} className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-sm ${color} ring-1 ring-gray-300`} />
                            <span className="text-gray-600">{label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ColorLegend;
