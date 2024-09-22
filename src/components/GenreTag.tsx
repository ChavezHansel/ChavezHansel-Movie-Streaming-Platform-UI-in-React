type GenreCarouselProps = {
    name: string;
    white: boolean;
    style?: string;
};

const GenreTag = ({ name, white, style }: GenreCarouselProps) => {
    return (
        <p
            className={
                white
                    ? "font-bold px-2 py-1 text-sm sm:px-4 sm:py-2 rounded-full sm:text-base bg-white text-black"
                    : "font-light text-white text-sm md:text-lg px-4 py-1 bg-red-full rounded-lg " +
                      style
            }
        >
            {name}
        </p>
    );
};

export default GenreTag;
