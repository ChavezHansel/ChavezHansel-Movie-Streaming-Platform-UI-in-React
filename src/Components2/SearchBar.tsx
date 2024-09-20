import { IoSearchSharp } from "react-icons/io5";

type SearchBarProps = {
    placeholder: string;
};

const SearchBar = ({ placeholder }: SearchBarProps) => {
    return (
        <div className="relative">
            <input
                type="text"
                placeholder={placeholder}
                className="rounded-full font-medium outline-none transition-all duration-500 ease-in-out border-2 focus:border-red-full placeholder:text-black placeholder:font-semibold py-2 px-5 min-w-60 xs:min-w-[20rem] sm:min-w-[22rem] md:min-w-[24rem] lg:min-w-[26rem]"
            />
            <button className="hover:text-red-600 transition-all duration-500 ease-in-out">
                <IoSearchSharp className="absolute right-2 top-1/2 -translate-y-1/2  text-2xl" />
            </button>
        </div>
    );
};

export default SearchBar;
