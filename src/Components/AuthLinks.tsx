import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const AuthLinks = () => {
    const { session, logout } = useAuth();
    return (
        <>
            {session === "" ? (
                <Link
                    className="text-white font-semibold bg-red-600 hover:bg-red-700 px-4 py-1.5 transition-all duration-500 ease-in-out relative"
                    to="/auth/login"
                >
                    Login/Signup
                </Link>
            ) : (
                <button
                    onClick={() => logout()}
                    className="text-white bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded-lg font-semibold  transition-all duration-500 ease-in-out relative"
                >
                    Logout
                </button>
            )}
        </>
    );
};

export default AuthLinks;
