import * as Tooltip from '@radix-ui/react-tooltip';


const VolatilityToolTip = ({ volatility_label }: { volatility_label: string }) => {
    const volatilityColorMap: Record<string, string> = {
        Stable: 'bg-green-600',
        Volatile: 'bg-red-600',
        Moderate: 'bg-yellow-600', // optional level
    };

    const volatilityDescriptions: Record<string, string> = {
        Stable: 'Low variability over time — indicator values are consistent.',
        Moderate: 'Moderate fluctuations — indicator shows some year-to-year changes.',
        Volatile: 'High variability — indicator values change significantly across years.',
    };

    return (
        <Tooltip.Provider delayDuration={100}>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded text-white ${volatilityColorMap[volatility_label] || 'bg-gray-600'
                            }`}
                    >
                        {volatility_label}
                    </span>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content
                        side="top"
                        className="bg-gray-800 text-white text-xs rounded px-2 py-1 shadow-lg z-50"
                        sideOffset={5}
                    >
                        {volatilityDescriptions[volatility_label] || 'No description'}
                        <Tooltip.Arrow className="fill-gray-800" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>

    )
}

export default VolatilityToolTip;