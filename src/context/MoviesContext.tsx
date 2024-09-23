import { useState, createContext, ReactNode, useEffect } from "react";
import { Movie, Genre } from "../types/index.ts";
import clienteAxios from "../config/clienteAxios.ts";
import { formatRuntime } from "../util/index.ts";

type MoviesProviderProps = {
    children: ReactNode;
};
type MoviesContextType = {
    carousel: Movie[];
    trending: Movie[];
    newRelease: Movie[];
    genres: Genre[];
    recommended: Movie[];
    // setSession: React.Dispatch<React.SetStateAction<string>>;
    // // loading: boolean;
    // logout: () => void;
    // register: (data: RegisterData) => Promise<void>;
    // login: (data: LoginData) => Promise<void>;
};
const defaultContextValue: MoviesContextType = {
    carousel: [],
    newRelease: [],
    trending: [],
    genres: [],
    recommended: [],
};
const MoviesContext = createContext<MoviesContextType>(defaultContextValue);

const MoviesProvider = ({ children }: MoviesProviderProps) => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [carousel, setCarousel] = useState<Movie[]>([]);
    const [trending, setTrending] = useState<Movie[]>([]);
    const [newRelease, setNewRelease] = useState<Movie[]>([]);
    const [recommended, setRecommended] = useState<Movie[]>([]);
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

    const fetchGenres = async () => {
        try {
            const response = await clienteAxios.get(
                `/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}`
            );
            setGenres(response.data.genres);
        } catch (error) {
            console.error("Error fetching genres:", error);
        }
    };

    const fetchTrendingMovies = async () => {
        try {
            const response = await clienteAxios.get(
                `/trending/movie/week?api_key=${import.meta.env.VITE_API_KEY}`
            );
            const trendingMovies = response.data.results.slice(0, 9);
            const moviesWithRuntime = await Promise.all(
                trendingMovies.map(async (movie: Movie) => {
                    const movieDetails = await fetchMovieDetails(movie.id);
                    if (movieDetails) {
                        const formattedRuntime = formatRuntime(
                            movieDetails.runtime
                        );
                        return { ...movie, runtime: formattedRuntime };
                    }
                    return movie;
                })
            );
            setCarousel(moviesWithRuntime.slice(0, 5));
            setTrending(moviesWithRuntime.slice(6, 9));
            // console.log(carousel);
        } catch (error) {
            console.error("Error fetching trending movies:", error);
        }
    };

    const fetchNewReleaseMovies = async () => {
        try {
            const response = await clienteAxios.get(
                `/movie/now_playing?api_key=${import.meta.env.VITE_API_KEY}`
            );
            const movies = response.data.results.slice(0, 4);
            const moviesWithDetails = await Promise.all(
                movies.map(async (movie: Movie) => {
                    const movieDetails = await fetchMovieDetails(movie.id);

                    if (movieDetails) {
                        const formattedRuntime = formatRuntime(
                            movieDetails.runtime
                        );
                        return {
                            ...movieDetails,
                            ...movie,
                            runtime: formattedRuntime,
                        };
                    }
                    return movie;
                })
            );

            setNewRelease(moviesWithDetails);
        } catch (error) {
            console.error("Error fetching new release movies:", error);
        }
    };
    const fetchRecommendedMovies = async () => {
        try {
            const response = await clienteAxios.get(
                `/movie/top_rated?api_key=${import.meta.env.VITE_API_KEY}`
            );
            const movies = response.data.results;
            const moviesWithDetails = await Promise.all(
                movies.map(async (movie: Movie) => {
                    const movieDetails = await fetchMovieDetails(movie.id);
                    if (movieDetails) {
                        const formattedRuntime = formatRuntime(
                            movieDetails.runtime
                        );
                        return {
                            ...movieDetails,
                            ...movie,
                            runtime: formattedRuntime,
                        };
                    }
                    return movie;
                })
            );

            setRecommended(moviesWithDetails);
            //setLoading(false);
        } catch (error) {
            console.error("Error fetching recommended movies:", error);
            //setError("Failed to fetch recommended movies.");
            //setLoading(false);
        }
    };
    useEffect(() => {
        fetchNewReleaseMovies();
        fetchGenres();
        fetchRecommendedMovies();
        fetchTrendingMovies();
    }, []);

    return (
        <MoviesContext.Provider
            value={{
                recommended,
                genres,
                carousel,
                newRelease,
                trending,
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
};

export { MoviesProvider };
export default MoviesContext;
