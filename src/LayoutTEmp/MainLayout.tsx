import { Outlet } from "react-router-dom";
import Header from "../Components2/Header.tsx";
import Footer from "../Components2/Footer.tsx";

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
