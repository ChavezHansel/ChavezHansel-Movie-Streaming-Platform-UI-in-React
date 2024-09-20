import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

type NavLinkProps = {
    links: { name: string; path: string }[];
};

const NavLinks = ({ links }: NavLinkProps) => {
    const location = useLocation();
    
    return (
        <ul className="flex list-none items-center">
            {links.map((link) => (
                <li key={link.name} className="mx-4">
                    <Link
                        to={link.path}
                        className="text-white font-semibold hover:text-yellow-300 transition-all duration-500 ease-in-out relative"
                    >
                        {link.name}
                        {location.pathname === link.path && (
                            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 translate-y-1.5 w-2 h-2 bg-red-full rounded-full"></span>
                        )}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default NavLinks;
