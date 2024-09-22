import { formatVoteAverage } from "../../util";
import { IoMdStar } from "react-icons/io";
type VoteAverageProps = {
    value: string;
};

const VoteAverage = ({ value }: VoteAverageProps) => {
    return (
        <p className="text-base font-semibold text-white ml-2 flex gap-1 items-center">
            <IoMdStar className="text-xl" />
            {formatVoteAverage(Number(value))}
        </p>
    );
};

export default VoteAverage;
