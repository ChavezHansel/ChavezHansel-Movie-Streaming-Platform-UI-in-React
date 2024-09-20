import { Outlet } from "react-router";

const AuthLayout = () => {
    return (
        <main className="min-h-screen bg-auth-bg bg-center bg-cover text-white flex justify-center items-center">
            <div className="rounded-md bg-neutral-900 px-4 py-10 md:px-12 md:py-14 md:min-w-96">
                <Outlet />
            </div>
        </main>
    );
};

export default AuthLayout;
