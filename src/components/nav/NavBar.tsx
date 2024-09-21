import SearchBar from "./SearchBar.tsx";
import NavLinks from "./NavLinks.tsx";
import { navLinks } from "../../data/data.ts";
import AuthLinks from "./AuthLinks.tsx";

const NavBar = () => {
    return (
        <nav className="flex flex-col lg:fixed z-10 bg-black w-full min-h-20 items-center gap-4 lg:flex-row lg:gap-0 p-4 justify-center">
            <NavLinks links={navLinks.slice(0, 3)} />
            <SearchBar placeholder="Search movies..." />
            <NavLinks links={navLinks.slice(3, 6)} />
            <AuthLinks />
        </nav>
    );
};

export default NavBar;
