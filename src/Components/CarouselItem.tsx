import useMovies from "../hooks/useMovies";
import { Movie } from "../Types";
import CarouselActions from "./CarouselActions";
import CarouselDetails from "./CarouselDetails";

type CarouselItemProps = {
    movie: Movie;
};

const CarouselItem = ({ movie }: CarouselItemProps) => {
    const { genres } = useMovies();
    const movieGenres = movie.genre_ids.map((id) => {
        const genre = genres.find((g) => g.id === id);
        return genre ? genre.name : "Unknown";
    });

    return (
        <div className="max-w-[75rem] px-4 md:px-6 md:mt-40 mx-auto text-2xl h-full flex flex-col items-center justify-center w-full text-white">
            <CarouselActions movie={movie} />
            <CarouselDetails movie={movie} movieGenres={movieGenres} />
        </div>
    );
};

export default CarouselItem;
