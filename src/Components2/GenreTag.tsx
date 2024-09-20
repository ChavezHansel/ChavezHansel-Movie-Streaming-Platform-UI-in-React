type GenreCarouselProps = {
    name: string;
    white: boolean;
};

const GenreTag = ({ name, white }: GenreCarouselProps) => {
    return <p className={`${white}? '' font-bold px-2 py-1 text-sm sm:px-4 sm:py-2 rounded-full sm:text-base bg-white text-black`}>{name}</p>;
};

export default GenreTag;
