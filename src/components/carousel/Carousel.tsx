import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination } from "swiper/modules";
import useMovies from "../../hooks/useMovies.tsx";
import CarouselItem from "./CarouselItem.tsx";
const Carousel = () => {
    const { movies } = useMovies();
    const pagination = {
        clickable: true,
        renderBullet: (index: number, className: string): string => {
            return (
                '<span class="' +
                index +
                " " +
                className +
                ' bg-red-full text-3xl w-3 h-3 sm:w-5 sm:h-5"></span>'
            );
        },
    };

    return (
        <Swiper
            pagination={pagination}
            loop={movies.length >= 3}
            modules={[Pagination, Autoplay]}
            className="mySwiper w-full min-w-full"
            slidesPerView={1}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            speed={1200}
            //onSlideChange={() => console.log("slide change")}
            // onSwiper={(swiper) => console.log(swiper)}
        >
            {movies ? (
                movies.map((movie) => {
                    return (
                        <SwiperSlide
                            key={movie.id}
                            className="w-full h-[35rem] md:h-[47rem] object-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.poster_path}')`,
                                backgroundSize: "cover",
                            }}
                        >
                            <div className="absolute inset-0 bg-black opacity-50"></div>
                            <div className="relative z-10 h-full flex items-center justify-center">
                                <CarouselItem key={movie.id} movie={movie} />
                            </div>
                        </SwiperSlide>
                    );
                })
            ) : (
                <p>No</p>
            )}
        </Swiper>
    );
};

export default Carousel;
