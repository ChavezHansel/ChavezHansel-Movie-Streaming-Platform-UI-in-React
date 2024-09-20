import { useContext } from "react";
import MoviesContext from "../context/MoviesContext.tsx";

const useMovies = () => {
    return useContext(MoviesContext);
};
export default useMovies;
