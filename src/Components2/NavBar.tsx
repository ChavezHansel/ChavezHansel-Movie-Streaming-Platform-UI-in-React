import SearchBar from "./SearchBar.tsx";
import NavLinks from "./NavLinks.tsx";
import { navLinks } from "../Datass/data.ts";
import AuthLinks from "./AuthLinks.tsx";

const NavBar = () => {
    return (
        <nav className="flex flex-col items-center gap-4 lg:flex-row lg:gap-0 p-4 justify-center">
            <NavLinks links={navLinks.slice(0, 3)} />
            <SearchBar placeholder="Search movies..." />
            <NavLinks links={navLinks.slice(3, 6)} />
            <AuthLinks />
        </nav>
    );
};

export default NavBar;
