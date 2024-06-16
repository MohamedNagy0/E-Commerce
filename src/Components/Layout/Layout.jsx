import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Modal from "../Modal/Modal";
import LoginForm from "../LoginForm/LoginForm";
import { useContext } from "react";
import { CartContext } from "../../Context/Cart.context";

export default function Layout() {
    const { setIsOpen, isOpen } = useContext(CartContext);
    return (
        <>
            <Navbar />
            <main className="container pt-[80px] pb-[320px] max-md:pb-[380px]">
                <Outlet />
            </main>
            <Modal isOpen={isOpen}>
                <LoginForm />
            </Modal>
            <Footer />
        </>
    );
}
