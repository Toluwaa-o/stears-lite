import { MacroMetric } from '@/types/Interfaces'
import { LineChart } from '@mui/x-charts'

type Props = {
    metric: MacroMetric
}

const LineChartComponent = ({ metric }: Props) => {
    return (
        < div className="mb-5" >
            <p className="text-xs text-gray-400 mb-2">5-Year Trend</p>
            <LineChart
                margin={{ top: 10, bottom: 30, left: 20, right: 10 }}
                xAxis={[
                    {
                        data: metric.trend.year,
                        tickLabelStyle: { fill: 'white', fontSize: 10 },
                    },
                ]}
                yAxis={[
                    {
                        tickLabelStyle: { fill: 'white', fontSize: 10 },
                    },
                ]}
                series={[
                    {
                        data: metric.trend.value,
                        area: false,
                        color: '#4ADE80',
                    },
                ]}
                height={160}
                sx={{
                    backgroundColor: '#121212',
                    '.MuiChartsAxisLine-root': { stroke: 'white' },
                    '.MuiChartsTickLabel-root': { fill: 'white' },
                    '.MuiChartsGrid-line': { stroke: '#333' },
                }}
            />
        </div >
    )
}

export default LineChartComponent;