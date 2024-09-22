import Carousel from "../components/carousel/Carousel.tsx";
import NewReleaseMovies from "../components/newReleases/NewReleaseMovies.tsx";
import NewReleaseSeries from "../components/newReleases/NewReleaseSeries.tsx";
import RecentlyUpdatedSection from "../components/recentlyUpdated/RecentlyUpdatedSection.tsx";
import RecommendedSection from "../components/recomendedMedia/RecommendedSection.tsx";
import TreandingMovieSection from "../components/treandingMovie/TreandingMovieSection.tsx";

const Home = () => {
    return (
        <div className="min-w-full bg-black lg:mt-20">
            <Carousel />
            <div className="max-w-[1200px] mx-auto w-full flex flex-col gap-10 py-20 px-4">
                <RecentlyUpdatedSection />
                <TreandingMovieSection />
                <NewReleaseMovies />
                <NewReleaseSeries />
                <RecommendedSection />
            </div>
        </div>
    );
};

export default Home;
