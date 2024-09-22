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
    useEffect(() => {
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
        const fetchNewReleaseSeries = async () => {
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
        const fetchRecentlyUpdatedSeries = async () => {
            try {
                const changesResponse = await clienteAxios.get(
                    `/tv/changes?api_key=${import.meta.env.VITE_API_KEY}`
                );

                const changedSeriesIds = changesResponse.data.results.map(
                    (item: { id: number }) => item.id
                );
                const seriesDetailsPromises = changedSeriesIds.map(
                    async (id: number) => {
                        const seriesDetails = await clienteAxios.get(
                            `/tv/${id}?api_key=${import.meta.env.VITE_API_KEY}`
                        );
                        return seriesDetails.data;
                    }
                );
                const seriesDetails = await Promise.all(seriesDetailsPromises);
                const filteredSeries = seriesDetails.filter(
                    (series) => !series.adult
                );
                setRecentlyUpdated(filteredSeries);
            } catch (error) {
                console.error("Error fetching recently updated series:", error);
            }
        };
        fetchNewReleaseSeries();
        fetchRecentlyUpdatedSeries();
    }, []);
    const displayedRecentlyUpdated: Serie[] = recentlyUpdated.slice(21, 25);
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
