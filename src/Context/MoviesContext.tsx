import { useState, createContext, ReactNode, useEffect } from "react";
import { Movie, Genre } from "../Types";
import clienteAxios from "../config/clienteAxios";
import { formatRuntime } from "../utils";

type MoviesProviderProps = {
    children: ReactNode;
};
type MoviesContextType = {
    movies: Movie[];
    genres: Genre[];
    // setSession: React.Dispatch<React.SetStateAction<string>>;
    // // loading: boolean;
    // logout: () => void;
    // register: (data: RegisterData) => Promise<void>;
    // login: (data: LoginData) => Promise<void>;
};
const defaultContextValue: MoviesContextType = {
    movies: [],
    genres: [],
};
const MoviesContext = createContext<MoviesContextType>(defaultContextValue);

const MoviesProvider = ({ children }: MoviesProviderProps) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    useEffect(() => {
        const fetchMovieDetails = async (movieId: number) => {
            try {
                const response = await clienteAxios.get(
                    `/movie/${movieId}?api_key=${import.meta.env.VITE_API_KEY}`
                );
                return response.data.runtime;
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
                    `/trending/movie/week?api_key=${
                        import.meta.env.VITE_API_KEY
                    }`
                );
                const trendingMovies = response.data.results.slice(0, 5);

                const moviesWithRuntime = await Promise.all(
                    trendingMovies.map(async (movie: Movie) => {
                        const runtime: string = formatRuntime(
                            await fetchMovieDetails(movie.id)
                        );
                        return { ...movie, runtime };
                    })
                );
                setMovies(moviesWithRuntime);
            } catch (error) {
                console.error("Error fetching trending movies:", error);
            }
        };
        fetchGenres();
        fetchTrendingMovies();
    }, []);

    return (
        <MoviesContext.Provider value={{ movies, genres }}>
            {children}
        </MoviesContext.Provider>
    );
};

export { MoviesProvider };
export default MoviesContext;
