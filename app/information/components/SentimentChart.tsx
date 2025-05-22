import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    TooltipItem
} from 'chart.js';
import { Article } from '@/types/Interfaces';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface SentimentChartProps {
    articles: Article[];
}

const SentimentChart: React.FC<SentimentChartProps> = ({ articles }) => {
    // Group articles by month and calculate average sentiment
    const monthlyData = articles.reduce((acc, article) => {
        const date = new Date(article.published);
        const monthYear = `${date.getFullYear()}-${date.getMonth()}`;

        if (!acc[monthYear]) {
            acc[monthYear] = {
                count: 0,
                total: 0,
                date: new Date(date.getFullYear(), date.getMonth(), 1)
            };
        }

        acc[monthYear].count += 1;
        acc[monthYear].total += article.sentiment_score;

        return acc;
    }, {} as Record<string, { count: number; total: number; date: Date }>);

    const sortedMonths = Object.keys(monthlyData).sort();
    const labels = sortedMonths.map(month => {
        const date = monthlyData[month].date;
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    });
    const data = sortedMonths.map(month => {
        return monthlyData[month].total / monthlyData[month].count;
    });

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Average Sentiment Score',
                data,
                backgroundColor: data.map(score => {
                    if (score > 0.6) return '#10B981'; // green
                    if (score > 0.3) return '#3B82F6'; // blue
                    return '#6B7280'; // gray
                }),
                borderColor: data.map(score => {
                    if (score > 0.6) return '#059669'; // darker green
                    if (score > 0.3) return '#2563EB'; // darker blue
                    return '#4B5563'; // darker gray
                }),
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                callbacks: {
                    label: (context: TooltipItem<'bar'>) => {
                        return `${(context.raw as number).toFixed(2)}%`;
                    }
                }
            }
        },
        scales: {
            y: {
                min: 0,
                max: 1,
            },
        },
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h2 className="font-semibold text-lg mb-4">News Sentiment Analysis</h2>
            <div className="h-64">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
};

export default SentimentChart;