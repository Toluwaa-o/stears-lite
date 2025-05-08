import { TbMoodNeutralFilled } from "react-icons/tb";
import { RiEmotionHappyFill, RiEmotionUnhappyFill } from "react-icons/ri";

type Props = {
    sentiment_score: number,
}

const SentimentIcon = (props: Props) => {
    if (props.sentiment_score > 0.05) return <RiEmotionHappyFill color='#00FF7F' size={25} />
    else if (props.sentiment_score < -0.05) return <RiEmotionUnhappyFill color="#FF4C4C" size={25} />
    else return <TbMoodNeutralFilled color="#FFD700" size={25} />
}

export default SentimentIcon;