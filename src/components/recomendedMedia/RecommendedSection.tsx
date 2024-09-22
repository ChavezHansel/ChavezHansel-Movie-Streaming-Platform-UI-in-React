import { useEffect, useState } from "react";
import useMovies from "../../hooks/useMovies";
import useSeries from "../../hooks/useSeries";
import useAnimation from "../../hooks/useAnimation";
import { Animation, Movie, Serie } from "../../types";
import ViewAllBtn from "../common/ViewAllBtn";
import MediaCard from "../MediaCard";
import { Link } from "react-router-dom";

const RecommendedSection = () => {
    const { recommended: movies } = useMovies();
    const { recommended: series } = useSeries();
    const { recommended: animation } = useAnimation();
    const [activeCategory, setActiveCategory] = useState<
        "movies" | "series" | "animation"
    >("movies");
    const [content, setContent] = useState<Movie[] | Serie[] | Animation[]>([]);

    useEffect(() => {
        switch (activeCategory) {
            case "movies":
                setContent(movies);
                break;
            case "series":
                setContent(series);
                break;
            case "animation":
                setContent(animation);
                break;
            default:
                setContent(movies);
        }
    }, [activeCategory, movies, series, animation]);
    return (
        <section>
            <div className="flex justify-between w-full flex-col items-center mb-4 xs:flex-row">
                <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                    <Link
                        to={`/${activeCategory}`}
                        className="text-2xl md:text-3xl font-bold text-white mb-4"
                    >
                        Recommended
                    </Link>
                    <div className="flex gap-4">
                        <button
                            className={`px-4 py-2 ${
                                activeCategory === "movies"
                                    ? "bg-red-full "
                                    : "bg-transparent "
                            } text-white rounded-lg border-2 border-red-full `}
                            onClick={() => setActiveCategory("movies")}
                        >
                            Movies
                        </button>
                        <button
                            className={`px-4 py-2 ${
                                activeCategory === "series"
                                    ? "bg-red-full"
                                    : "bg-transparent "
                            } text-white rounded-lg border-2 border-red-full `}
                            onClick={() => setActiveCategory("series")}
                        >
                            Series
                        </button>
                        <button
                            className={`px-4 py-2 ${
                                activeCategory === "animation"
                                    ? "bg-red-full"
                                    : "bg-transparent "
                            } text-white rounded-lg border-2 border-red-full `}
                            onClick={() => setActiveCategory("animation")}
                        >
                            Animation
                        </button>
                    </div>
                </div>
                <ViewAllBtn url={`/${activeCategory}`} />
            </div>
            <div className="text-white grid gap-4 xs:grid-cols-2 sm:grid-cols-4 md:gap-6">
                {content.map((item: any) => (
                    <MediaCard
                        key={item.id}
                        id={item.id}
                        title={item.title || item.name} // name for series
                        posterPath={item.poster_path}
                        formats={item.formats}
                        runtime={item.runtime}
                        type={activeCategory}
                    />
                ))}
            </div>
        </section>
    );
};

export default RecommendedSection;
