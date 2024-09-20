import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const MainLayout = () => {
    return (
        <>
            <Header />
            <main className="m-auto w-full  md:flex   min-h-screen">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;
