import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const MainLayout = () => {
    return (
        <>
            <Header />
            <main className="m-auto container p-5 pt-16 md:pt-5 md:flex md:justify-center md:items-center min-h-screen">
                <div className="md:w-2/3 lg:w-3/6  xl:w-2/5">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;
