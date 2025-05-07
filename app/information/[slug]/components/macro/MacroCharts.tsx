'use client'

import React, { useState } from 'react';
import { MacroDetails } from '../../../../../types/Interfaces';
import DropDownMenu from '../ui/DropDownMenu';
import Dashboard from './Dashboard';

interface MacroChartsProps {
    macro_details: MacroDetails;
    country: string
}

const MacroCharts = ({ macro_details, country }: MacroChartsProps) => {
    const categories = Object.keys(macro_details);
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    return (
        <div className="block w-full">
            <div className="flex flex-col gap-6 pb-8 px-4 sm:px-6 lg:px-10 xl:px-16 max-w-screen-xl mx-auto">
                {/* Dropdown Menu */}
                <DropDownMenu selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categories={categories} />

                {/* Selected Category Charts */}
                <div className="bg-[#121212] rounded-2xl shadow-lg p-4 sm:p-6 border border-[#2A2A2A]">
                    <h3 className="text-lg sm:text-xl font-bold text-white border-b border-[#333] pb-3 mb-6">
                        {selectedCategory} ({country})
                    </h3>

                    <Dashboard macro_details={macro_details} selectedCategory={selectedCategory} />
                </div>
            </div>
        </div>
    );
};

export default MacroCharts;
