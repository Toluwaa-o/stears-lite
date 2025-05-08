import { TbChevronsUp, TbChevronsDown } from "react-icons/tb";
import { LuChevronsUpDown } from "react-icons/lu";

type Props = {
    sentiment_score: number,
    label: boolean
}

const Chevron = (props: Props) => {
    if (props.sentiment_score > 0.05) return <TbChevronsUp color='#00FF7F' size={props.label ? 15 : 25} />
    else if (props.sentiment_score < -0.05) return <TbChevronsDown color="#FF4C4C" size={props.label ? 15 : 25} />
    else return <LuChevronsUpDown color="#FFD700" size={props.label ? 15 : 25} />
}

export default Chevron;