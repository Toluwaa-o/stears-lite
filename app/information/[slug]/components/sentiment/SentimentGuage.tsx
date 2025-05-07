'use client'

import { legendClasses } from '@mui/x-charts';
import { PieChart } from '@mui/x-charts/PieChart';


type Props = {
    percentage_of_positives: number,
    percentage_of_negatives: number,
    section: string
}

const SentimentGuage = ({ percentage_of_positives, percentage_of_negatives, section }: Props) => {
    return (
        <div
            className={`${section === 'articles' ? 'flex' : 'hidden'
                } flex-col text-white w-full transition-all duration-200 lg:flex`}
        >
            <div className="flex flex-col lg:flex-row justify-between gap-4 w-full">

                {/* Title Section */}
                <div className="mb-4 lg:mb-0">
                    <p className="text-lg font-semibold tracking-tight text-white">
                        Public Perception{' '}
                        <span className="text-[#A0A0A0]">(via Articles)</span>
                    </p>
                </div>

                {/* Pie Chart Section */}
                <div className="flex justify-center lg:justify-end">
                    <PieChart
                        width={120}
                        height={120}
                        series={[
                            {
                                data: [
                                    { id: 0, value: percentage_of_positives, label: 'Positive', color: '#00FF7F' },
                                    { id: 1, value: percentage_of_negatives, label: 'Negative', color: '#FF4C4C' },
                                    {
                                        id: 2,
                                        value: 100 - (percentage_of_positives + percentage_of_negatives),
                                        label: 'Neutral',
                                        color: '#FFD700',
                                    },
                                ],
                                innerRadius: 30,
                            },
                        ]}
                        sx={{
                            [`& .${legendClasses.root}`]: {
                                color: 'white',
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '1rem',
                                flexWrap: 'wrap',
                                marginTop: '1rem',
                            },
                            [`& .${legendClasses.label}`]: {
                                color: 'white',
                                fontSize: '0.875rem',
                            },
                            [`& .${legendClasses.mark}`]: {
                                borderColor: 'white',
                            },
                        }}
                    />
                </div>
            </div>
        </div>

    )
}

export default SentimentGuage;