import { LiaCalendar } from "react-icons/lia";

import GenreTag from "../GenreTag.tsx";
import { Movie } from "../../types/index.ts";
import VoteAverage from "../common/VoteAverage.tsx";
import Runtime from "../common/Runtime.tsx";

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
                    <GenreTag name={genre} key={genre} white={true} />
                ))}
                <p className="text-base font-semibold ml-2 flex gap-1 items-center">
                    <LiaCalendar className="text-xl" />
                    {movie.release_date.split("-")[0]}
                </p>
                <Runtime value={movie.runtime} />
                <VoteAverage value={movie.vote_average} />
            </div>
            <p className="mt-7 text-sm md:text-lg font-medium">
                {movie.overview}
            </p>
        </div>
    );
};

export default CarouselDetails;
