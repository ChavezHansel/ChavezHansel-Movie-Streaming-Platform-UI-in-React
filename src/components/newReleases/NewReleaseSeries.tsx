// SeriesSection.tsx
import useSeries from "../../hooks/useSeries";
import { Link } from "react-router-dom";
import ViewAllBtn from "../common/ViewAllBtn";
import MediaCard from "../MediaCard";

const NewReleaseSeries = () => {
    const { newRelease: seriesNewRelease } = useSeries();

    return (
        <section>
            <div className="flex justify-between w-full flex-col items-center mb-2 xs:flex-row">
                <Link
                    to={"/series"}
                    className="text-2xl md:text-3xl font-bold text-white mb-4"
                >
                    New Release - Series
                </Link>
                <ViewAllBtn url={"/series"} />
            </div>
            <div className="text-white grid gap-4 xs:grid-cols-2 sm:grid-cols-4 md:gap-6">
                {seriesNewRelease.map((serie) => (
                    <MediaCard
                        key={serie.id}
                        id={serie.id}
                        title={serie.name}
                        posterPath={serie.poster_path}
                        formats={["HD"]}
                        type="series" // Specify the media type
                    />
                ))}
            </div>
        </section>
    );
};

export default NewReleaseSeries;
