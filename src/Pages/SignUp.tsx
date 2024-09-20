import { Link } from "react-router-dom";
import AuthForm from "../Components/AuthForm.tsx";
import useAuth from "../Hooks/useAuth.tsx";
import { toast } from "react-toastify";
import { SignUpData } from "../Types/index.ts";
const Signup = () => {
    const { register } = useAuth();
    const handleSignup = async (data: SignUpData) => {
        console.log(data);
        const { name, email, password, confirmPassword } = data;
        if (!name || name.trim().length < 3) {
            toast.error("El nombre debe tener al menos 3 caracteres.", {
                autoClose: 1500,
            });
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            toast.error("El correo electrónico no es válido.", {
                autoClose: 1500,
            });
            return;
        }
        if (!password || password.length < 6) {
            toast.error("La contraseña debe tener al menos 6 caracteres.", {
                autoClose: 1500,
            });
            return;
        }
        if (password !== confirmPassword) {
            toast.error("La contraseñas no coinciden.", {
                autoClose: 1500,
            });
            return;
        }
        await register({ name, email, password });
    };

    return (
        <>
            <h1 className="text-xl font-semibold uppercase mb-4 text-center">
                Sign up
            </h1>
            <AuthForm isLogin={false} onSubmit={handleSignup} />
            <p className="text-sm">
                Already have an account?{" "}
                <Link
                    to={"/auth/login"}
                    className="text-blue-700 border-b border-b-neutral-900 hover:border-b transition-all duration-500 ease-in-out hover:border-b-blue-700"
                >
                    Login here
                </Link>
            </p>
        </>
    );
};

export default Signup;
