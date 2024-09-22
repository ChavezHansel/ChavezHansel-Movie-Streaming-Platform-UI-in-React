import useMovies from "../../hooks/useMovies";
import { Link } from "react-router-dom";
import ViewAllBtn from "../common/ViewAllBtn";
import TreandingMoviesGrid from "./TreandingMoviesGrid";

const TreandingMovieSection = () => {
    const { trending: moviesTrending, genres } = useMovies();

    return (
        <section>
            <div className="flex justify-between w-full">
                <Link
                    to={"/movies"}
                    className="text-2xl md:text-3xl font-bold text-white mb-4"
                >
                    Trending Movies
                </Link>
                <ViewAllBtn url={"/movies"} />
            </div>
            <TreandingMoviesGrid
                genres={genres}
                moviesTrending={moviesTrending}
            />
        </section>
    );
};

export default TreandingMovieSection;
