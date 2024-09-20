import { useContext } from "react";
import AuthContext from "../Context/AuthContext.tsx";

const useAuth = () => {
    return useContext(AuthContext);
};
export default useAuth;
