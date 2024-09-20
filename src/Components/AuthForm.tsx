import { ChangeEvent, FormEvent, useState } from "react";
import { LoginData, SignUpData } from "../Types/index.ts";
type AuthFormProps<T> = {
    isLogin: boolean;
    onSubmit: (data: T) => Promise<void>;
};

const AuthForm = <T extends SignUpData | LoginData>({
    isLogin,
    onSubmit,
}: AuthFormProps<T>) => {
    const [formData, setFormData] = useState<SignUpData>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData as T);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {!isLogin && (
                <div className="flex flex-col gap-1">
                    <label className="text-sm after:content-['*'] after:ml-0.5 after:text-red-500">
                        Full Name
                    </label>
                    <input
                        className="bg-neutral-700 text-neutral-950 border border-neutral-700 focus:border-green-600 outline-none px-2 py-1"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
            )}
            <div className="flex flex-col gap-1">
                <label className="text-sm after:content-['*'] after:ml-0.5 after:text-red-500">
                    Email{" "}
                </label>
                <input
                    className="bg-neutral-700 text-neutral-950 border border-neutral-700 focus:border-green-600 outline-none px-2 py-1"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm after:content-['*'] after:ml-0.5 after:text-red-500">
                    Password
                </label>
                <input
                    className="bg-neutral-700 text-neutral-950 border border-neutral-700 focus:border-green-600 outline-none px-2 py-1"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>

            {!isLogin && (
                <div className="flex flex-col gap-1">
                    <label className="text-sm after:content-['*'] after:ml-0.5 after:text-red-500">
                        Confirm Password
                    </label>
                    <input
                        className="bg-neutral-700 text-neutral-950 border border-neutral-700 focus:border-green-600 outline-none px-2 py-1"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
            )}

            <button
                className="bg-sky-500 hover:bg-sky-700 duration-500 transition-all ease-in-out px-2 py-2 my-4"
                type="submit"
            >
                {isLogin ? "Login" : "Signup"}
            </button>
        </form>
    );
};

export default AuthForm;
