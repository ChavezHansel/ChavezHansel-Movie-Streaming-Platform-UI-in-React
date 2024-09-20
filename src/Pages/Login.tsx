import AuthForm from "../components/AuthForm.tsx";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth.tsx";
import { LoginData } from "../types/index.ts";
import { toast } from "react-toastify";
const Login = () => {
    const { login } = useAuth();
    const handleLogin = async (data: LoginData): Promise<void> => {
        const { email, password } = data;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            console.error("El correo electrónico no es válido.");
            return;
        }
        if (!password || password.length < 6) {
            toast.error("La contraseña debe tener al menos 6 caracteres.", {
                autoClose: 1500,
            });
            return;
        }
        login(data);
    };

    return (
        <>
            <h1 className="text-xl font-semibold uppercase mb-4 text-center">
                Login
            </h1>
            <AuthForm isLogin={true} onSubmit={handleLogin} />
            <p className="text-sm">
                Don´t have an account?{" "}
                <Link
                    to={"/auth/signup"}
                    className="text-blue-700 border-b border-b-neutral-900 hover:border-b transition-all duration-500 ease-in-out hover:border-b-blue-700"
                >
                    Sign up
                </Link>
            </p>
        </>
    );
};

export default Login;
