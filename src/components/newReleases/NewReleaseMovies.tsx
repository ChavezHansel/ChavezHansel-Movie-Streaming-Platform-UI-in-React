import useMovies from "../../hooks/useMovies";
import { Link } from "react-router-dom";
import ViewAllBtn from "../common/ViewAllBtn";
import MediaCard from "../MediaCard";

const NewReleaseSection = () => {
    const { newRelease: moviesNewRelease } = useMovies();

    return (
        <section>
            <div className="flex justify-between w-full flex-col items-center mb-2 xs:flex-row">
                <Link
                    to={"/movies"}
                    className="text-2xl md:text-3xl font-bold text-white mb-4"
                >
                    New Release - Movies
                </Link>
                AQUI VA A TENER BOTONES DE MOVIES SERIES ANIMATION
                <ViewAllBtn url={"/movies"} />
            </div>
            <div className="text-white grid gap-4 xs:grid-cols-2 sm:grid-cols-4 md:gap-6">
                {moviesNewRelease.map((movie) => (
                    <MediaCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        posterPath={movie.poster_path}
                        formats={movie.formats}
                        runtime={movie.runtime}
                        type="movies"
                    />
                ))}
            </div>
        </section>
    );
};

export default NewReleaseSection;
