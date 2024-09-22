import { Genre, Movie } from "../../types";
import TreandingMovieCard from "./TreandingMovieCard";

interface TreandingMoviesGridProps {
    moviesTrending: Movie[];
    genres: Genre[];
}

const TreandingMoviesGrid = ({
    moviesTrending,
    genres,
}: TreandingMoviesGridProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {moviesTrending.map((movie) => (
                <TreandingMovieCard
                    key={movie.id}
                    movie={movie}
                    genres={genres}
                />
            ))}
        </div>
    );
};

export default TreandingMoviesGrid;
