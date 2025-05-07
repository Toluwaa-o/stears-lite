import { MacroMetric } from '@/types/Interfaces';
import * as Tooltip from '@radix-ui/react-tooltip';
import { IoIosInformationCircleOutline } from 'react-icons/io';

type Props = {
    metric: MacroMetric,
}

const TooltipPage = ({ metric }: Props) => {
    return (
        <Tooltip.Provider>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <IoIosInformationCircleOutline className="text-lg" />
                </Tooltip.Trigger>

                <Tooltip.Portal>
                    <Tooltip.Content
                        side="right"
                        sideOffset={8}
                        className="z-50 bg-gray-800 text-white text-xs px-3 py-2 rounded shadow-lg"
                    >
                        {metric.description}
                        <Tooltip.Arrow className="fill-gray-800" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    )
}

export default TooltipPage;