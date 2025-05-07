import { MacroMetric } from '@/types/Interfaces'
import { BarChart } from '@mui/x-charts'

type Props = {
    metric: MacroMetric
}

const BarChartComponent = ({ metric }: Props) => {
    return (
        <div>
            <p className="text-xs text-gray-400 mb-2">Regional vs National</p>
            <BarChart
                margin={{ top: 10, bottom: 30, left: 20, right: 10 }}
                xAxis={[
                    {
                        data: ['Regional', 'National'],
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
                        data: [
                            metric.comparison.regional,
                            metric.comparison.national,
                        ],
                        color: '#60A5FA',
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
        </div>
    )
}

export default BarChartComponent;