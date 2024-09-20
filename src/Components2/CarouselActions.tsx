import { TiMediaPlay } from "react-icons/ti";
import { Movie } from "../Types2/index.ts";
import WatchButton from "./WatchButton.tsx";
import { MdOutlineAccessTimeFilled } from "react-icons/md";

type CarouselActionsProps = {
    movie: Movie;
};

const CarouselActions = ({ movie }: CarouselActionsProps) => {
    return (
        <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 md:flex-row gap-4 md:gap-10">
            <WatchButton
                label="Watch Now"
                link={movie.poster_path}
                icon={
                    <TiMediaPlay className="text-red-full bg-white rounded-full h-5 w-5 flex items-center justify-center text-sm" />
                }
                variant="primary"
            />
            <WatchButton
                label="Watch Later"
                icon={<MdOutlineAccessTimeFilled />}
                variant="secondary"
            />
        </div>
    );
};
export default CarouselActions;
