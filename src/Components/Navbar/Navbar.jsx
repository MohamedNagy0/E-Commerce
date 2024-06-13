import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../Context/User.context";
import { CartContext } from "../../Context/Cart.context";
export default function Navbar() {
    const [open, setOpen] = useState(false);
    const { token, logOut } = useContext(userContext);
    const { getAllProductsCart, cartProducts, cartAnimation } =
        useContext(CartContext);
    useEffect(() => {
        getAllProductsCart();
    }, []);

    return (
        <>
            <nav
                className={`${styles.nav} bg-light p-4 fixed left-0 top-0 right-0 z-50`}
            >
                <div className="container">
                    <div className="row flex  gap-4 items-center max-md:flex-wrap">
                        <h1 className="text-2xl font-bold text-nowrap">
                            <Link to="/">
                                <i className="fa-brands fa-opencart text-primary mr-2"></i>
                                <span>FreshCart</span>
                            </Link>
                        </h1>

                        {token ? (
                            <Link
                                to="/cart"
                                className={`ml-auto ${cartAnimation} hover:text-slate-700  duration-300 relative md:order-3 cursor-pointer`}
                            >
                                <i className="fa-solid fa-cart-shopping fa-lg"></i>
                                {cartProducts ? (
                                    <span className="bg-primary font-extrabold  text-sm p-3 size-1 rounded-full text-white flex justify-center items-center absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
                                        {cartProducts == null
                                            ? 0
                                            : cartProducts.numOfCartItems || 0}
                                    </span>
                                ) : (
                                    ""
                                )}
                            </Link>
                        ) : (
                            ""
                        )}

                        <span
                            className={`md:hidden ${!token ? "ml-auto" : ""} `}
                            onClick={() => {
                                setOpen(!open);
                            }}
                        >
                            <i className="fa-solid fa-bars cursor-pointer  text-lg"></i>
                        </span>

                        <ul
                            className={`${
                                open ? "flex" : "hidden"
                            }  max-md:w-full max-md:flex-col md:flex gap-4 nav-links items-center mr-auto text-gray-500`}
                        >
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

                            {token ? (
                                <li>
                                    <NavLink to="allorders">Orders</NavLink>
                                </li>
                            ) : (
                                ""
                            )}
                        </ul>

                        <ul
                            className={` ${
                                open ? "flex" : "hidden"
                            } max-md:w-full order-4  md:flex justify-center gap-3 items-center`}
                        >
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

                        <ul
                            className={` ${
                                open ? "flex" : "hidden"
                            }  gap-4 max-md:w-full order-5 md:flex justify-center items-center  text-gray-500`}
                        >
                            {!token ? (
                                <>
                                    <li>
                                        <NavLink to="/auth/login">
                                            Login
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            className="text-nowrap"
                                            to="/auth/register"
                                        >
                                            Sign up
                                        </NavLink>
                                    </li>
                                </>
                            ) : (
                                <li onClick={logOut}>
                                    <i
                                        className="max-lg:block hidden fa-solid fa-arrow-right-from-bracket text-red-500 text-lg cursor-pointer"
                                        title="Log out"
                                    ></i>
                                    <span className="text-red-500 hidden lg:block text-base cursor-pointer font-semibold">
                                        Log out
                                    </span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
