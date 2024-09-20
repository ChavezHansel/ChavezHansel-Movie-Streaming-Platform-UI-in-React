import { useState, createContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { LoginData, RegisterData } from "../Types";
import { checkIfUserExists, loginUser, openDatabase } from "../data/DB";
import { toast } from "react-toastify";

type AuthProviderProps = {
    children: ReactNode;
};
type AuthContextType = {
    session: string;
    setSession: React.Dispatch<React.SetStateAction<string>>;
    // loading: boolean;
    logout: () => void;
    register: (data: RegisterData) => Promise<void>;
    login: (data: LoginData) => Promise<void>;
};
const defaultContextValue: AuthContextType = {
    session: localStorage.getItem("session") || "",
    setSession: () => {},
    //loading: true,
    logout: () => {},
    register: async () => {},
    login: async () => {},
};
const AuthContext = createContext<AuthContextType>(defaultContextValue);

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [session, setSession] = useState<string>(
        localStorage.getItem("session") || ""
    );
    //const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const register = async (data: RegisterData): Promise<void> => {
        const { name, email, password } = data;
        const userExists = await checkIfUserExists(email);
        if (userExists) {
            toast.error("Este correo ya está registrado.", {
                theme: "dark",
                autoClose: 1500,
            });
            return;
        }
        const db = await openDatabase();
        return new Promise<void>((resolve, reject) => {
            const transaction = db.transaction("users", "readwrite");
            const store = transaction.objectStore("users");
            const user = { name, email, password };
            const request = store.add(user);

            request.onsuccess = function () {
                toast.success("Usuario registrado con éxito.", {
                    theme: "dark",
                    autoClose: 1500,
                });
                navigate("/auth/login");
                resolve();
            };

            request.onerror = function () {
                toast.error("Error al registrar el usuario.", {
                    theme: "dark",
                    autoClose: 1500,
                });
                reject();
            };
        });
    };

    const login = async (data: LoginData): Promise<void> => {
        const { email, password } = data;

        try {
            const loginSuccessful = await loginUser(email, password);
            if (loginSuccessful) {
                toast.success("Acceso permitido.", {
                    theme: "dark",
                    autoClose: 1500,
                });
                console.log(loginSuccessful);
                setSession(loginSuccessful);
                localStorage.setItem("session", loginSuccessful);
                navigate("/");
            } else {
                toast.error("Email o contraseña incorrectos.", {
                    theme: "dark",
                    autoClose: 1500,
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        localStorage.removeItem("session");
        setSession("");
    };

    return (
        <AuthContext.Provider
            value={{
                session,
                setSession,
                //  loading,
                logout,
                register,
                login,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
export default AuthContext;
