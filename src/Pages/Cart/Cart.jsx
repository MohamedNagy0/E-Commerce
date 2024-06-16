import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/Cart.context";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CheckOut from "../../Components/CheckOut/CheckOut";
import BackButton from "../../Components/BackButton/BackButton";
import formatMoney from "../../Helpers/helpers";

export default function Cart() {
    const [placeHolderImage, setPlaceHolderImage] = useState("block");
    const [imgShow, setImgShow] = useState("hidden");

    const {
        getAllProductsCart,
        cartProducts,
        deleteSingleProduct,
        updateProductCount,
        clearAllCartProducts,
        cartAnimation,
        userOrders,
    } = useContext(CartContext);

    useEffect(() => {
        getAllProductsCart();
    }, []);

    return (
        <>
            {cartProducts == null ? (
                <Loading />
            ) : (
                <section className="bg-light cart-section p-5 mx-4  rounded-3xl">
                    <div className="container">
                        <header className="flex justify-between items-start px-2 my-4 gap-4">
                            <div className="flex items-center gap-6">
                                <BackButton />
                                <h2 className="flex items-center gap-2">
                                    <span className="text-2xl font-bold">
                                        Shop Cart
                                    </span>
                                    <i className="fa-brands fa-opencart fa-lg text-primary"></i>
                                </h2>
                            </div>
                            {cartProducts.length != 0 ? (
                                <div className="flex flex-col justify-center items-center gap-3">
                                    <h3 className="font-semibold flex text-nowrap text-primary">
                                        <span className="text-darkPrimary">
                                            Total Price :{" "}
                                        </span>
                                        <span className="text-xs  ml-1">$</span>
                                        <span>
                                            {cartProducts.data.totalCartPrice}
                                        </span>
                                    </h3>
                                    <a
                                        href="#checkOut"
                                        className="btn-primary bg-white text-primary hover:text-white hover:border-primary border border-darkPrimary max-md:p-1 max-md:text-xs text-sm"
                                    >
                                        Check Out
                                    </a>
                                </div>
                            ) : (
                                ""
                            )}
                        </header>

                        {cartProducts.length == 0 ? (
                            <footer className="p-5 m-16 flex flex-col justify-center items-center gap-2 text-center">
                                <p>There are not items yet.</p>
                                <Link
                                    to="/"
                                    className="btn-primary text-nowrap "
                                >
                                    Add your first product to cart
                                </Link>
                            </footer>
                        ) : (
                            <>
                                <div className="mt-4 md:px-4">
                                    <div>
                                        {cartProducts.data.products.map(
                                            (product) => (
                                                <article
                                                    key={product._id}
                                                    className="wrapper grid grid-cols-12 gap-6 mt-4 border-b-2 pb-8"
                                                >
                                                    <div className="col-span-4 md:col-span-3 lg:col-span-2">
                                                        <div className="inner rounded-3xl overflow-hidden  border-2 ">
                                                            <img
                                                                className={`w-full ${imgShow}`}
                                                                src={
                                                                    product
                                                                        .product
                                                                        .imageCover
                                                                }
                                                                alt={
                                                                    product
                                                                        .product
                                                                        .title
                                                                }
                                                            />
                                                            <div
                                                                className={`w-full h-[150px] bg-gray-300 animate-pulse ${placeHolderImage}`}
                                                            ></div>
                                                            <div className="hidden">
                                                                {setTimeout(
                                                                    () => {
                                                                        setPlaceHolderImage(
                                                                            "hidden"
                                                                        );
                                                                        if (
                                                                            placeHolderImage ==
                                                                            "hidden"
                                                                        ) {
                                                                            setImgShow(
                                                                                "block"
                                                                            );
                                                                        }
                                                                    },
                                                                    850
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-span-8 md:col-span-9 lg:col-span-10  flex  max-lg:flex-col max-md:gap-4 justify-center items-start md:items-center">
                                                        <div className="flex flex-col gap-1 w-full ">
                                                            <Link
                                                                to={`/product/${product.product._id}`}
                                                                className="font-bold text-xl max-lg:line-clamp-1 hover:text-primary duration-300"
                                                            >
                                                                {
                                                                    product
                                                                        .product
                                                                        .title
                                                                }
                                                            </Link>
                                                            <div className="flex  gap-2 items-center">
                                                                <span className="mr1-1">
                                                                    Rate :
                                                                </span>
                                                                <span className="text-primary">
                                                                    <i className="fa-solid text-yellow-400 fa-star mr-1"></i>
                                                                    {
                                                                        product
                                                                            .product
                                                                            .ratingsAverage
                                                                    }
                                                                </span>
                                                            </div>

                                                            <div className="text-primary text-base ">
                                                                <span className=" text-darkPrimary mr-1">
                                                                    Price :
                                                                </span>
                                                                <span>
                                                                    {formatMoney(
                                                                        product.price
                                                                    )}
                                                                </span>
                                                            </div>

                                                            <div className="text-gray-500 text-sm">
                                                                <span>
                                                                    {
                                                                        product
                                                                            .product
                                                                            .category
                                                                            ?.name
                                                                    }
                                                                </span>
                                                                <span className="mx-1">
                                                                    |
                                                                </span>
                                                                <span>
                                                                    {
                                                                        product
                                                                            .product
                                                                            .brand
                                                                            ?.name
                                                                    }
                                                                </span>
                                                                <span className="mx-1">
                                                                    |
                                                                </span>
                                                                <span className="text-green-500">
                                                                    Available
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="flex md:max-lg:mt-2 justify-between items-center w-full">
                                                            <div className="flex justify-center items-center gap-5 border-2 self-center  px-4 py-1 md:py-2 rounded-2xl ">
                                                                <button
                                                                    onClick={() => {
                                                                        if (
                                                                            product.count <=
                                                                            1
                                                                        ) {
                                                                            deleteSingleProduct(
                                                                                product
                                                                                    .product
                                                                                    ._id
                                                                            );
                                                                        } else {
                                                                            updateProductCount(
                                                                                {
                                                                                    productId:
                                                                                        product
                                                                                            .product
                                                                                            ._id,
                                                                                    productCount:
                                                                                        product.count -
                                                                                        1,
                                                                                }
                                                                            );
                                                                        }
                                                                    }}
                                                                    className=" flex justify-center items-center"
                                                                >
                                                                    <i className="fa-solid fa-minus text-xs hover:text-primary duration-300"></i>
                                                                </button>
                                                                <span
                                                                    className={`font-bold text-base ${cartAnimation}`}
                                                                >
                                                                    {
                                                                        product.count
                                                                    }
                                                                </span>
                                                                <button
                                                                    onClick={() => {
                                                                        var r =
                                                                            document.querySelector(
                                                                                ":root"
                                                                            );
                                                                        r.style.setProperty(
                                                                            "--countColor",
                                                                            "green"
                                                                        );
                                                                        updateProductCount(
                                                                            {
                                                                                productId:
                                                                                    product
                                                                                        .product
                                                                                        ._id,
                                                                                productCount:
                                                                                    product.count +
                                                                                    1,
                                                                            }
                                                                        );
                                                                    }}
                                                                    className="flex justify-center items-center"
                                                                >
                                                                    <i className="fa-solid fa-plus text-xs hover:text-primary duration-300"></i>
                                                                </button>
                                                            </div>

                                                            <div className="text-primary text-sm flex flex-col justify-center items-center">
                                                                <span className="font-medium text-sm text-darkPrimary">
                                                                    Total Price
                                                                </span>
                                                                <span className="text-base flex ">
                                                                    <span className="text-xs">
                                                                        EGP
                                                                    </span>

                                                                    {product.price *
                                                                        product.count}
                                                                </span>
                                                            </div>

                                                            <button
                                                                className="group order-last"
                                                                onClick={() => {
                                                                    withReactContent(
                                                                        Swal
                                                                    ).fire({
                                                                        title: "Are you sure?",
                                                                        text: "Do you want to delete this product ?",
                                                                        icon: "warning",
                                                                        showCancelButton: true,
                                                                        confirmButtonColor:
                                                                            "#09c",
                                                                        confirmButtonText:
                                                                            "Yes, delete it!",
                                                                        iconColor:
                                                                            "#09c",
                                                                        preConfirm:
                                                                            () => {
                                                                                deleteSingleProduct(
                                                                                    product
                                                                                        .product
                                                                                        ._id
                                                                                );
                                                                            },
                                                                    });
                                                                }}
                                                            >
                                                                <i className="fa-solid fa-xmark text-base hidden md:flex border-2 border-transparent  hover:text-red-600 hover:border-red-600 size-1 justify-center items-center p-3 rounded-full  group-hover:rotate-90 duration-300 text-gray-500"></i>
                                                                <span className="btn-primary md:hidden rounded-3xl group text-xs px-2 py-1 bg-red-600 hover:bg-red-500 duration-300">
                                                                    {" "}
                                                                    <i className="fa-solid fa-trash-can  mr-2 group-hover:animate-shake"></i>{" "}
                                                                    Delete
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </article>
                                            )
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                        {cartProducts.length != 0 ? (
                            <div className="text-right">
                                <button
                                    onClick={() => {
                                        withReactContent(Swal).fire({
                                            title: "Are you sure?",
                                            text: "Do you want to clear your cart ?",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#09c",
                                            confirmButtonText: "Yes, clear it!",
                                            iconColor: "#09c",
                                            preConfirm: () => {
                                                clearAllCartProducts();
                                            },
                                        });
                                    }}
                                    className="btn-primary capitalize group text-sm px-3 py-1 bg-red-600 hover:bg-red-500 duration-300 mt-5"
                                >
                                    <i className="fa-solid fa-trash-can mr-2 group-hover:animate-shake"></i>
                                    <span>Clear all products</span>
                                </button>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    {cartProducts.length != 0 ? (
                        <CheckOut
                            totalPrice={cartProducts.data.totalCartPrice}
                            userPhone={
                                userOrders ? userOrders[0]?.user.phone : ""
                            }
                        />
                    ) : (
                        ""
                    )}
                </section>
            )}
        </>
    );
}
