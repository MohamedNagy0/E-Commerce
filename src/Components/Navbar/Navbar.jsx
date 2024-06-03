import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
export default function Navbar() {
    return (
        <>
            <nav
                className={`${styles.nav} bg-light p-4 fixed left-0 top-0 right-0 z-50`}
            >
                <div className="container">
                    <div className="row flex gap-6 items-center">
                        <h1 className="text-2xl font-[900]">
                            <Link to="/">
                                <i className="fa-brands fa-opencart text-primary mr-2"></i>
                                <span>FreshCart</span>
                            </Link>
                        </h1>

                        <ul className="flex gap-4 nav-links items-center mr-auto text-gray-500">
                            <li>
                                <NavLink to="/">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="products">Products</NavLink>
                            </li>
                            <li>
                                <NavLink to="categories">Categories</NavLink>
                            </li>
                            <li>
                                <NavLink to="brands">Brands</NavLink>
                            </li>
                        </ul>

                        <ul className="flex gap-4 items-center">
                            <li>
                                <a
                                    target="_blank"
                                    href="https://www.facebook.com"
                                >
                                    <i className="fa-brands hover:-translate-y-1 duration-300 fa-facebook text-[#0866ff] "></i>
                                </a>
                            </li>
                            <li>
                                <a
                                    target="_blank"
                                    href="https://www.instagram.com"
                                >
                                    <i className="fa-brands hover:-translate-y-1 duration-300 fa-instagram text-[#ff115b]"></i>
                                </a>
                            </li>
                            <li>
                                <a
                                    target="_blank"
                                    href="https://www.twitter.com"
                                >
                                    <i className="fa-brands hover:-translate-y-1 duration-300 fa-x-twitter"></i>
                                </a>
                            </li>
                            <li>
                                <a
                                    target="_blank"
                                    href="https://www.linkedin.com"
                                >
                                    <i className="fa-brands hover:-translate-y-1 duration-300 fa-linkedin text-[#0a66c2]"></i>
                                </a>
                            </li>
                        </ul>

                        <ul className="flex gap-4 items-center text-gray-500">
                            <li>
                                <NavLink to="/auth/login">Login</NavLink>
                            </li>
                            <li>
                                <NavLink to="/auth/register">Sign up</NavLink>
                            </li>
                            <li>
                                <a className="text-black" href="/">
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
