import { Genre, Movie } from "../../types";
import Runtime from "../common/Runtime";
import VoteAverage from "../common/VoteAverage";
import { Link } from "react-router-dom";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import GenreTag from "../GenreTag";
type MovieCardProps = {
    movie: Movie;
    genres: Genre[];
};

const TreandingMovieCard = ({ movie, genres }: MovieCardProps) => {
    return (
        <div className="relative group">
            <div className="relative rounded-lg hover:bg-black overflow-hidden">
                <img
                    src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                    alt={movie.title}
                    className="w-full h-64 object-cover rounded-lg"
                />
                <div className="flex w-full justify-between absolute z-20 top-4 px-4">
                    <Runtime value={movie.runtime} />
                    <VoteAverage value={movie.vote_average} />
                </div>
                <Link
                    to={`/movie/${movie.id}`}
                    className="absolute inset-0 h-full w-full bg-black/35 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500"
                >
                    <button>
                        <IoMdArrowDroprightCircle className="h-16 w-16 z-10 text-white" />
                    </button>
                </Link>
            </div>
            <div className="flex items-center justify-between mt-2">
                <h3 className="text-lg lg:text-2xl truncate flex-grow text-white font-bold mr-2">
                    {movie.title}
                </h3>
            </div>
            <div className="flex gap-2 overflow-x-hidden flex-shrink text-sm text-gray-500 mt-2">
                {movie.genre_ids.slice(0, 3).map((genreId) => {
                    const genre = genres.find((g) => g.id === genreId);
                    return genre ? (
                        <GenreTag
                            key={genreId}
                            white={false}
                            name={genre.name}
                            style="max-w-[200px] truncate text-xs px-2 py-1"
                        />
                    ) : null;
                })}
            </div>
        </div>
    );
};

export default TreandingMovieCard;
