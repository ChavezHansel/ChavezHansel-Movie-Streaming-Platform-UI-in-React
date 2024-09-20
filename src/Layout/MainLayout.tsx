import { Outlet } from "react-router-dom";
import Header from "../Components/Header.tsx";
import Footer from "../Components/Footer.tsx";

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
