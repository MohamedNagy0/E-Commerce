import axios from "axios";
import { createContext, useContext, useState } from "react";
import { userContext } from "./User.context";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

export const CartContext = createContext("");

export default function CartProvider({ children }) {
    const { token } = useContext(userContext);
    const [cartProducts, setCartProducts] = useState(null);
    const [userOrders, setUserOrders] = useState(null);
    const [cartAnimation, setCartAnimation] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [allProductsList, setAllProductsList] = useState(null);
    const [allHomeProducts, setAllHomeProducts] = useState(null);
    const [AllCategories, setAllCategories] = useState(null);
    const [range, setRange] = useState(50000);
    const [pageNum, setPageNum] = useState(1);
    const [womanCategory, setWomanCategory] = useState("");
    const [manCategory, setManCategory] = useState("");
    const [electronicsCategory, setElectronicsCategory] = useState("");
    const [canonBrand, setCanonBrand] = useState("");
    const [dellBrand, setDellBrand] = useState("");
    const [defactoBrand, setDefactoBrand] = useState("");
    const [pumaBrand, setPumaBrand] = useState("");
    const [priceSort, setPriceSort] = useState("+");
    const allProductsUrl = `https://ecommerce.routemisr.com/api/v1/products?page=${pageNum}&limit=10&sort=${priceSort}price&price[lte]=${range}${canonBrand}${dellBrand}${defactoBrand}${pumaBrand}${manCategory}${womanCategory}${electronicsCategory}`;

    async function getAllProducts() {
        const options = {
            method: "GET",
            url: allProductsUrl,
        };

        let { data } = await axios.request(options);
        setAllProductsList(data);
    }

    async function getAllHomeProducts() {
        const options = {
            method: "GET",
            url: "https://ecommerce.routemisr.com/api/v1/products?limit=12",
        };

        let { data } = await axios.request(options);
        setAllHomeProducts(data.data);
    }

    async function getCategories() {
        const options = {
            method: "GET",
            url: "https://ecommerce.routemisr.com/api/v1/categories",
        };
        let { data } = await axios.request(options);
        setAllCategories(data.data);
    }

    async function addProductToCart({ productId }) {
        let toastId;
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "POST",
                headers: {
                    token,
                },
                data: {
                    productId,
                },
            };

            toastId = toast.loading("Adding your product...", {
                position: "top-right",
                style: {
                    marginTop: "48px",
                },
            });

            setCartAnimation(false);

            let { data } = await axios.request(options);

            setCartAnimation("animate-cart");

            toast.dismiss(toastId);
            setCartProducts(data);
            toast(<span className="text-sm">{data.message}</span>, {
                duration: 2000,
                position: "top-right",
                style: {
                    marginTop: "48px",
                },
                icon: (
                    <span className="bg-primary size-1 p-3 rounded-full flex justify-center items-center">
                        <i className="fa-solid fa-check text-white"></i>
                    </span>
                ),
            });
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(
                error.response.status == 500
                    ? "Not Available Now"
                    : "Try later please",
                {
                    position: "top-right",
                    style: {
                        marginTop: "48px",
                    },
                }
            );
        }
    }

    async function getUserOrders() {
        let jwtObject = {};
        if (token) {
            jwtObject = jwtDecode(token);
        }
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/user/${jwtObject.id}`,
                method: "GET",
            };
            const { data } = await axios.request(options);

            setUserOrders(data);
        } catch (error) {}
    }

    async function getAllProductsCart() {
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "GET",
                headers: {
                    token,
                },
            };

            let { data } = await axios.request(options);
            getUserOrders();

            if (data.numOfCartItems === 0) {
                setCartProducts([]);
            } else {
                setCartProducts(data);
            }
        } catch (error) {
            if (error.response.data.message.includes("No cart")) {
                setCartProducts([]);
            }
        }
    }

    async function deleteSingleProduct(productId) {
        let toastId;

        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                method: "DELETE",
                headers: {
                    token,
                },
            };
            toastId = toast.loading("Deleting your product...", {
                position: "top-right",
                style: {
                    marginTop: "50px",
                },
            });
            setCartAnimation(false);

            let { data } = await axios.request(options);
            console.log(data);

            setCartAnimation("animate-cart");

            toast.dismiss(toastId);
            toast(
                <span className="text-sm">Product Removed successfully</span>,
                {
                    duration: 2000,
                    position: "top-right",
                    style: {
                        marginTop: "50px",
                    },
                    icon: (
                        <span className="bg-primary size-1 p-3 rounded-full flex justify-center items-center">
                            <i className="fa-solid fa-check text-white"></i>
                        </span>
                    ),
                }
            );

            if (data.numOfCartItems === 0) {
                setCartProducts([]);
            } else {
                setCartProducts(data);
            }
        } catch (error) {}
    }

    async function clearAllCartProducts() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart`,
                method: "DELETE",
                headers: {
                    token,
                },
            };

            setCartAnimation(false);

            let { data } = await axios.request(options);

            setCartAnimation("animate-cart");

            setCartProducts([]);
        } catch (error) {}
    }

    async function updateProductCount({ productId, productCount }) {
        let toastId;

        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                method: "PUT",
                headers: {
                    token,
                },
                data: {
                    count: productCount,
                },
            };
            toastId = toast.loading("waiting...", {
                position: "top-right",
                style: {
                    marginTop: "48px",
                },
            });

            setCartAnimation(false);
            let { data } = await axios.request(options);
            setCartAnimation("animate-cart");

            toast.dismiss(toastId);
            toast(
                `${
                    productCount == 1
                        ? `You have ${productCount} piece now`
                        : `You have ${productCount} pieces now`
                } `,
                {
                    duration: 2000,
                    position: "top-right",
                    style: {
                        marginTop: "48px",
                    },
                    icon: (
                        <span className="bg-primary size-1 p-3 rounded-full flex justify-center items-center">
                            <i className="fa-solid fa-check text-white"></i>
                        </span>
                    ),
                }
            );
            setCartProducts(data);
        } catch (error) {}
    }

    return (
        <>
            <CartContext.Provider
                value={{
                    addProductToCart,
                    getAllProductsCart,
                    cartProducts,
                    setCartProducts,
                    deleteSingleProduct,
                    updateProductCount,
                    clearAllCartProducts,
                    cartAnimation,
                    userOrders,
                    getUserOrders,
                    isOpen,
                    setIsOpen,
                    getAllProducts,
                    allProductsList,
                    allHomeProducts,
                    getAllHomeProducts,
                    getCategories,
                    AllCategories,
                    range,
                    setRange,
                    allProductsUrl,
                    priceSort,
                    setPriceSort,
                    pageNum,
                    setPageNum,
                    womanCategory,
                    setWomanCategory,
                    manCategory,
                    setManCategory,
                    electronicsCategory,
                    setElectronicsCategory,
                    canonBrand,
                    setCanonBrand,
                    dellBrand,
                    setDellBrand,
                    defactoBrand,
                    setDefactoBrand,
                    pumaBrand,
                    setPumaBrand,
                }}
            >
                {children}
            </CartContext.Provider>
        </>
    );
}
