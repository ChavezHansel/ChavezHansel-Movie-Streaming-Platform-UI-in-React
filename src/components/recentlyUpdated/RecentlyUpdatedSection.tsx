import { Link } from "react-router-dom";
import useSeries from "../../hooks/useSeries";
import SerieCard from "./SerieCard";
import { GoArrowRight } from "react-icons/go";

const RecentlyUpdatedSection = () => {
    const { displayedRecentlyUpdated } = useSeries();

    return (
        <section className="recently-updated-section">
            <h2 className="text-3xl font-bold text-white mb-6">
                Recently Updated
            </h2>
            <div className="flex flex-col flex-wrap justify-start xs:flex-row gap-4 md:gap-6 items-start xl:items-center ">
                {displayedRecentlyUpdated.map((serie) => (
                    <SerieCard key={serie.id} serie={serie} />
                ))}
                <Link
                    to={"series"}
                    className="h-20 w-20 rounded-full mx-auto hover:bg-gray-400 transition-all duration-500 ease-in-out flex font-light items-center justify-center text-5xl bg-white"
                >
                    <GoArrowRight className="text-black font-light" />
                </Link>
            </div>
        </section>
    );
};

export default RecentlyUpdatedSection;
