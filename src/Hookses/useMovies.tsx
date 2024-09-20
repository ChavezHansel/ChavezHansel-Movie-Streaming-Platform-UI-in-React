import { useContext } from "react";
import MoviesContext from "../Contexx/MoviesContext.tsx";

const useMovies = () => {
    return useContext(MoviesContext);
};
export default useMovies;
