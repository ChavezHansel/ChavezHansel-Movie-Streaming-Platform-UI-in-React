import { Serie } from "../../types";

type SeriesProps = {
    serie: Serie;
};

const SerieCard = ({ serie }: SeriesProps) => {
    console.log(serie)
    return (
        <div className="gap-4 text-white rounded-md flex min-w-[14rem] max-w-[15rem]">
            <div className="min-w-16 ">
                <img
                    src={`https://image.tmdb.org/t/p/w300${serie.poster_path}`}
                    alt={serie.name}
                    className="w-16 object-cover rounded-lg"
                />
            </div>
            <div className="flex gap-1 flex-col justify-center">
                <h3 className="text-base text-white font-medium">
                    {serie.name}
                </h3>
                <p className="text-sm ">
                    Series/S{serie.last_episode_to_air?.season_number}/EP
                    {serie.last_episode_to_air?.episode_number}
                </p>
                <p className="text-sm ">
                    {new Date(serie.last_air_date).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
};
export default SerieCard;
