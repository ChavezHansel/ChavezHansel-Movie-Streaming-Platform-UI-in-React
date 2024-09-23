import { useState, createContext, ReactNode, useEffect } from "react";
import { Animation, Movie } from "../types/index.ts";
import clienteAxios from "../config/clienteAxios.ts";
import { formatRuntime } from "../util/index.ts";
type AnimationProviderProps = {
    children: ReactNode;
};
type AnimationContextType = {
    recommended: Animation[];
    fetchRecommended: () => void;
};
const defaultContextValue: AnimationContextType = {
    recommended: [],
    fetchRecommended: () => {},
};
const AnimationContext =
    createContext<AnimationContextType>(defaultContextValue);

const AnimationProvider = ({ children }: AnimationProviderProps) => {
    const [recommended, setRecommended] = useState<Animation[]>([]);
    const fetchMovieDetails = async (movieId: number) => {
        try {
            const response = await clienteAxios.get(
                `/movie/${movieId}?api_key=${import.meta.env.VITE_API_KEY}`
            );
            const movieData = response.data;
            let formats: string[] = [];
            if (movieData.backdrop_path) {
                formats = ["CAM"];
            }
            if (movieData.poster_path) {
                formats = ["HD"];
            }

            return {
                ...movieData,
                formats,
            };
        } catch (error) {
            console.error(
                `Error fetching details for movie ${movieId}:`,
                error
            );
            return null;
        }
    };

    const fetchRecommended = async () => {
        try {
            const response = await clienteAxios.get(
                `/discover/movie?api_key=${
                    import.meta.env.VITE_API_KEY
                }&with_genres=16`
            );
            const animatedMovies = response.data.results;

            const moviesWithRuntime = await Promise.all(
                animatedMovies.map(async (movie: Movie) => {
                    const movieDetails = await fetchMovieDetails(movie.id);
                    if (movieDetails) {
                        const formattedRuntime = formatRuntime(
                            movieDetails.runtime
                        );
                        return { ...movieDetails, runtime: formattedRuntime };
                    }
                    return movie;
                })
            );
            setRecommended(moviesWithRuntime);
        } catch (error) {
            console.error("Error fetching animated movies:", error);
        }
    };
    /* const fetchRecommended = async () => {
        try {
            const response = await clienteAxios.get(
                `/movie/957452/recommendations?api_key=${
                    import.meta.env.VITE_API_KEY
                }`
            );
            const fetchedAnimations = response.data.results;
            const fetchMovieRuntime = async (movieId: number) => {
                try {
                    const movieDetails = await clienteAxios.get(
                        `/movie/${movieId}?api_key=${
                            import.meta.env.VITE_API_KEY
                        }`
                    );
                    return movieDetails.data.runtime;
                } catch (error) {
                    console.error(
                        `Error fetching runtime for movie ${movieId}:`,
                        error
                    );
                    return 0;
                }
            };
            const animationsWithDetails = await Promise.all(
                fetchedAnimations.map(async (movie: any) => {
                    let formats: string[] = [];
                    if (movie.backdrop_path) {
                        formats.push("CAM");
                    }
                    if (movie.poster_path) {
                        formats.push("HD");
                    }
                    const runtime = await fetchMovieRuntime(movie.id);

                    return {
                        ...movie,
                        formats,
                        runtime: formatRuntime(runtime),
                    };
                })
            );

            setRecommended(animationsWithDetails);
        } catch (error) {
            console.error("Error fetching recommended animations:", error);
        }
    };*/
    useEffect(() => {
        fetchRecommended();
    }, []);
    return (
        <AnimationContext.Provider
            value={{
                recommended,
                fetchRecommended,
            }}
        >
            {children}
        </AnimationContext.Provider>
    );
};

export { AnimationProvider };
export default AnimationContext;
