import { Outlet } from "react-router-dom";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

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
