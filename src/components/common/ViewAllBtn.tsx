import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";
type ViewAllBtnProps = {
    url: string;
};

const ViewAllBtn = ({ url }: ViewAllBtnProps) => {
    return (
        <Link
            to={url}
            className="text-gray-400 hover:text-white transition-all duration-500 ease-in-out flex gap-2  items-center text-lg md:text-xl font-semibold"
        >
            View All <GoArrowRight className="" />
        </Link>
    );
};

export default ViewAllBtn;
