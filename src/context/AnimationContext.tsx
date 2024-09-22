import { useState, createContext, ReactNode, useEffect } from "react";
import { Animation } from "../types/index.ts";
import clienteAxios from "../config/clienteAxios.ts";
import { formatRuntime } from "../util/index.ts";
type AnimationProviderProps = {
    children: ReactNode;
};
type AnimationContextType = {
    recommended: Animation[];
    fetchRecommendedAnimations: () => void;
};
const defaultContextValue: AnimationContextType = {
    recommended: [],
    fetchRecommendedAnimations: () => {},
};
const AnimationContext =
    createContext<AnimationContextType>(defaultContextValue);

const AnimationProvider = ({ children }: AnimationProviderProps) => {
    const [recommended, setRecommended] = useState<Animation[]>([]);

    const fetchRecommendedAnimations = async () => {
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
    };
    useEffect(() => {
        fetchRecommendedAnimations();
    }, []);
    return (
        <AnimationContext.Provider
            value={{
                recommended,
                fetchRecommendedAnimations,
            }}
        >
            {children}
        </AnimationContext.Provider>
    );
};

export { AnimationProvider };
export default AnimationContext;
