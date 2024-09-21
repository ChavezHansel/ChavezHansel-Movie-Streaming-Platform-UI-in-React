import { useState, createContext, ReactNode, useEffect } from "react";
import { Serie } from "../types/index.ts";
import clienteAxios from "../config/clienteAxios.ts";

type SeriesProviderProps = {
    children: ReactNode;
};
type SeriesContextType = {
    recentlyUpdatedSeries: Serie[];
    displayedRecentlyUpdated: Serie[];
    // setSession: React.Dispatch<React.SetStateAction<string>>;
    // // loading: boolean;
    // logout: () => void;
    // register: (data: RegisterData) => Promise<void>;
    // login: (data: LoginData) => Promise<void>;
};
const defaultContextValue: SeriesContextType = {
    recentlyUpdatedSeries: [],
    displayedRecentlyUpdated: [],
};
const SeriesContext = createContext<SeriesContextType>(defaultContextValue);

const SeriesProvider = ({ children }: SeriesProviderProps) => {
    const [recentlyUpdatedSeries, setRecentlyUpdatedSeries] = useState<Serie[]>(
        []
    );

    useEffect(() => {
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
                setRecentlyUpdatedSeries(filteredSeries);
            } catch (error) {
                console.error("Error fetching recently updated series:", error);
            }
        };
        fetchRecentlyUpdatedSeries();
    }, []);
    const displayedRecentlyUpdated: Serie[] = recentlyUpdatedSeries.slice(21, 25);
    return (
        <SeriesContext.Provider
            value={{ recentlyUpdatedSeries, displayedRecentlyUpdated }}
        >
            {children}
        </SeriesContext.Provider>
    );
};
export { SeriesProvider };
export default SeriesContext;
