import { useState, createContext, ReactNode, useEffect } from "react";
import { Serie } from "../types/index.ts";
import clienteAxios from "../config/clienteAxios.ts";

type SeriesProviderProps = {
    children: ReactNode;
};
type SeriesContextType = {
    recentlyUpdated: Serie[];
    newRelease: Serie[];
    recommended: Serie[];
    displayedRecentlyUpdated: Serie[];
    // setSession: React.Dispatch<React.SetStateAction<string>>;
    // // loading: boolean;
    // logout: () => void;
    // register: (data: RegisterData) => Promise<void>;
    // login: (data: LoginData) => Promise<void>;
};
const defaultContextValue: SeriesContextType = {
    recentlyUpdated: [],
    displayedRecentlyUpdated: [],
    newRelease: [],
    recommended: [],
};
const SeriesContext = createContext<SeriesContextType>(defaultContextValue);

const SeriesProvider = ({ children }: SeriesProviderProps) => {
    const [recentlyUpdated, setRecentlyUpdated] = useState<Serie[]>([]);
    const [newRelease, setNewRelease] = useState<Serie[]>([]);
    const [recommended, setRecommended] = useState<Serie[]>([]);

    const fetchSeriesDetails = async (seriesId: number) => {
        try {
            const response = await clienteAxios.get(
                `/tv/${seriesId}?api_key=${import.meta.env.VITE_API_KEY}`
            );
            return response.data;
        } catch (error) {
            console.error(
                `Error fetching details for series ${seriesId}:`,
                error
            );
            return null;
        }
    };
    const fetchNewRelease = async () => {
        try {
            const response = await clienteAxios.get(
                `/tv/on_the_air?api_key=${import.meta.env.VITE_API_KEY}`
            );
            const series = response.data.results.slice(0, 4); // Fetching 4 series
            const seriesWithDetails = await Promise.all(
                series.map(async (seriesItem: any) => {
                    const seriesDetails = await fetchSeriesDetails(
                        seriesItem.id
                    );

                    if (seriesDetails) {
                        return {
                            ...seriesDetails,
                            ...seriesItem,
                        };
                    }
                    return seriesItem;
                })
            );

            setNewRelease(seriesWithDetails);
        } catch (error) {
            console.error("Error fetching new release series:", error);
        }
    };
    const fetchRecentlyUpdated = async () => {
        try {
            const changesResponse = await clienteAxios.get(
                `/tv/changes?api_key=${import.meta.env.VITE_API_KEY}`
            );
            const filteredChangedSeries = changesResponse.data.results.filter(
                (item: { id: number; adult?: boolean }) => item.adult == false
            );
            const changedSeriesIds = filteredChangedSeries.map(
                (item: { id: number }) => item.id
            );
            const seriesDetailsPromises = changedSeriesIds.map(
                async (id: number) => {
                    try {
                        const seriesDetails = await clienteAxios.get(
                            `/tv/${id}?api_key=${import.meta.env.VITE_API_KEY}`
                        );
                        return seriesDetails.data;
                    } catch (error) {
                        console.error(
                            `Error fetching details for series ${id}:`,
                            error
                        );
                        return null;
                    }
                }
            );
            const seriesDetails = await Promise.all(seriesDetailsPromises);
            const filteredSeriesDetails = seriesDetails.filter(
                (series) => series !== null
            );
            setRecentlyUpdated(filteredSeriesDetails);
        } catch (error) {
            console.error("Error fetching recently updated series:", error);
        }
    };
    const fetchRecommended = async () => {
        try {
            const response = await clienteAxios.get(
                `/tv/top_rated?api_key=${import.meta.env.VITE_API_KEY}`
            );
            const filteredChangedSeries = response.data.results.filter(
                (item: { id: number; adult?: boolean }) => item.adult == false
            );
            const changedSeriesIds = filteredChangedSeries.map(
                (item: { id: number }) => item.id
            );
            const seriesDetailsPromises = changedSeriesIds.map(
                async (id: number) => {
                    try {
                        const seriesDetails = await clienteAxios.get(
                            `/tv/${id}?api_key=${import.meta.env.VITE_API_KEY}`
                        );
                        let formats: string[] = [];
                        if (seriesDetails.data.backdrop_path) {
                            formats.push("CAM");
                        }
                        if (seriesDetails.data.poster_path) {
                            formats.push("HD");
                        }
                        return { ...seriesDetails.data, formats };
                    } catch (error) {
                        console.error(
                            `Error fetching details for series ${id}:`,
                            error
                        );
                        return null;
                    }
                }
            );
            const seriesDetails = await Promise.all(seriesDetailsPromises);

            const filteredSeriesDetails = seriesDetails.filter(
                (series) => series !== null
            );
            setRecommended(filteredSeriesDetails);
            //setLoading(false);
        } catch (error) {
            console.error("Error fetching recommended movies:", error);
            //setError("Failed to fetch recommended movies.");
            //setLoading(false);
        }
    };
    useEffect(() => {
        fetchRecommended();
        fetchNewRelease();
        fetchRecentlyUpdated();
    }, []);
    const displayedRecentlyUpdated: Serie[] = recentlyUpdated.slice(5, 9);
    return (
        <SeriesContext.Provider
            value={{
                recentlyUpdated,
                newRelease,
                recommended,
                displayedRecentlyUpdated,
            }}
        >
            {children}
        </SeriesContext.Provider>
    );
};
export { SeriesProvider };
export default SeriesContext;
