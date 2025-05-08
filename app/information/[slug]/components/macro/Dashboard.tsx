'use client'

import LineChartComponent from '../charts/LineChartComponent'
import BarChartComponent from '../charts/BarChartComponent'
import VolatilityToolTip from '../ui/VolatilityToolTip'
import TooltipPage from '../ui/IndicatorTooltip'
import { MacroDetails } from '@/types/Interfaces'

const Dashboard = ({ macro_details, selectedCategory }: { macro_details: MacroDetails, selectedCategory: string }) => {
    return (
        <div className="flex overflow-x-auto gap-4 sm:gap-6 snap-x snap-mandatory scroll-smooth pb-2 -mx-2 px-2">
            {Object.entries(macro_details[selectedCategory]).map(([indicatorName, metric]) => (
                <div
                    key={indicatorName}
                    className="min-w-[85vw] sm:min-w-[360px] md:min-w-[320px] lg:min-w-[280px] bg-[#1A1A1A] border border-[#333] rounded-2xl shadow-md p-4 snap-start transition-all duration-300 hover:scale-[1.01]"
                >
                    <span className="flex items-center gap-2 cursor-pointer text-white">
                        <TooltipPage metric={metric} />
                        <p className="text-sm font-medium text-gray-300 mb-1">{indicatorName}</p>

                        {/* Badge */}
                        <VolatilityToolTip volatility_label={metric.volatility_label} />
                    </span>

                    <p className="text-2xl font-bold text-white mb-4">
                        {metric.current_value.toLocaleString()} {
                            typeof metric.percentage_difference === 'number' && metric.percentage_difference ?
                                <span className={`ml-2 text-sm text-gray-400`}>
                                    (<span className={`${metric.percentage_difference > 0 ? 'text-green-500' : 'text-red-500'}`}>{metric.percentage_difference > 0 ? '+' : ''}{(metric.percentage_difference).toFixed(1)}%</span> vs 2020)
                                </span>
                                : ''}
                    </p>



                    {/* Line Chart */}
                    <LineChartComponent metric={metric} />

                    {/* Bar Chart */}
                    <BarChartComponent metric={metric} />
                </div>
            ))}
        </div>
    )
}

export default Dashboard;