import { LiaCalendar } from "react-icons/lia";
import { RxTimer } from "react-icons/rx";
import { IoMdStar } from "react-icons/io";
import { formatVoteAverage } from "../../util/index.ts";
import GenreTag from "../GenreTag.tsx";
import { Movie } from "../../types/index.ts";

type CarouselDetailsProps = {
    movie: Movie;
    movieGenres: string[];
};

const CarouselDetails = ({ movie, movieGenres }: CarouselDetailsProps) => {
    return (
        <div className="max-w-[50rem] self-start mt-4 md:mt-14">
            <h2 className="font-extrabold text-xl md:text-2xl lg:text-4xl">
                {movie.title}
            </h2>
            <div className="flex gap-2 flex-wrap mt-4">
                {movieGenres.map((genre: string) => (
                    <GenreTag name={genre} key={genre} white={false} />
                ))}
                <p className="text-base font-semibold ml-2 flex gap-1 items-center">
                    <LiaCalendar className="text-xl" />
                    {movie.release_date.split("-")[0]}
                </p>
                <p className="text-base font-semibold ml-2 flex gap-1 items-center">
                    <RxTimer className="text-xl" />
                    {movie.runtime}
                </p>
                <p className="text-base font-semibold ml-2 flex gap-1 items-center">
                    <IoMdStar className="text-xl" />
                    {formatVoteAverage(Number(movie.vote_average))}
                </p>
            </div>
            <p className="mt-7 text-sm md:text-lg font-medium">
                {movie.overview}
            </p>
        </div>
    );
};

export default CarouselDetails;
