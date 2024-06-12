import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

export default function Layout() {
    return (
        <>
            <Navbar />
            <main className="container pt-[80px] pb-[320px] max-md:pb-[380px]">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
