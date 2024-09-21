import React from "react";
import MovieImage from "./SerieImage";
import { Movie, Serie } from "../../types";
import MovieDetails from "./SerieDetails";
type RecentlyUpdatedCardProps = {
    serie: Serie;
};

const RecentlyUpdatedCard = ({ serie }: RecentlyUpdatedCardProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
   
        </div>
      );
};
export default RecentlyUpdatedCard;
