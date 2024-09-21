import { useContext } from "react";
import SeriesContext from "../context/SeriesContext.tsx";

const useSeries = () => {
    return useContext(SeriesContext);
};
export default useSeries;
