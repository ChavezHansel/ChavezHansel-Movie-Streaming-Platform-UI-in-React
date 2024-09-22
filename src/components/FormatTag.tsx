type FormatTagProps = {
    name: string;
};

const FormatTag = ({ name }: FormatTagProps) => {
    return (
        <p
            className={
                " text-white text-sm md:text-base px-1 font-medium py-1 bg-red-full rounded-md "
            }
        >
            {name}
        </p>
    );
};

export default FormatTag;
