import Carousel from "../components/carousel/Carousel.tsx";
import RecentlyUpdatedSection from "../components/recentlyUpdated/RecentlyUpdatedSection.tsx";

const Home = () => {
    return (
        <div className="min-w-full bg-black lg:mt-20">
            <Carousel />
            <div className="max-w-[1200px] mx-auto w-full py-20 px-4">
                <RecentlyUpdatedSection />
            </div>
        </div>
    );
};

export default Home;
