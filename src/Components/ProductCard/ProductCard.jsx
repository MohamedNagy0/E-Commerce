import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/Cart.context";

export default function ProductCard({ products }) {
    let {
        category,
        ratingsAverage,
        price,
        title,
        ratingsQuantity,
        id,
        imageCover,
    } = products;

    const { addProductToCart } = useContext(CartContext);
    return (
        <>
            <article className="productCard group flex flex-col gap-3 col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 2xl:col-span-2 shadow-md rounded-md overflow-hidden">
                <header className="relative">
                    <Link to={`/product/${id}`}>
                        <img
                            src={imageCover}
                            className="w-full"
                            alt={ratingsQuantity.description}
                        />
                    </Link>

                    <div className="layer -translate-y-1/2  flex justify-center items-center gap-4 absolute top-1/2 left-1/2  -translate-x-1/2">
                        <div className="icon opacity-0 translate-y-20 group-hover:translate-y-0 group-hover:opacity-100 hover:animate-cart duration-300 cursor-pointer bg-primary flex justify-center items-center size-12 bg-opacity-70 rounded-full text-white">
                            <i className="fa-regular fa-heart"></i>
                        </div>
                        <div
                            onClick={() => {
                                addProductToCart({ productId: id });
                            }}
                            className="icon opacity-0 translate-y-20 group-hover:translate-y-0 group-hover:opacity-100 hover:animate-cart duration-700 cursor-pointer bg-primary flex justify-center items-center size-12 bg-opacity-70 rounded-full text-white"
                        >
                            <i className="fa-solid fa-cart-plus"></i>
                        </div>
                        <Link
                            to={`/product/${id}`}
                            className="icon opacity-0 translate-y-20 group-hover:translate-y-0 group-hover:opacity-100 hover:animate-cart duration-1000 cursor-pointer bg-primary flex justify-center items-center size-12 bg-opacity-70 rounded-full text-white"
                        >
                            <i className="fa-solid fa-eye"></i>
                        </Link>
                    </div>
                </header>
                <footer className="py-6 px-5">
                    <header>
                        <h2 className="line-clamp-1 text-primary">{title}</h2>
                        <h2 className="line-clamp-1 font-semibold my-2">
                            {category.name}
                        </h2>
                    </header>
                    <footer className="flex justify-between items-center">
                        <span>{price} $</span>
                        <div className="rating flex gap-2 items-center">
                            <span>
                                <i className="fa-solid fa-star text-rating"></i>
                            </span>
                            <span>{ratingsAverage}</span>
                        </div>
                    </footer>
                </footer>
            </article>
        </>
    );
}
