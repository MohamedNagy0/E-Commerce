import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import ReactImageGallery from "react-image-gallery";
import { CartContext } from "../../Context/Cart.context";
import BackButton from "../../Components/BackButton/BackButton";

// https://ecommerce.routemisr.com/api/v1/products/6428de2adc1175abc65ca05b
export default function ProductDetails() {
    const [data, setData] = useState(null);
    const { addProductToCart } = useContext(CartContext);
    let { productId } = useParams();
    async function getProductDetails() {
        let { data } = await axios.get(
            `https://ecommerce.routemisr.com/api/v1/products/${productId}`
        );
        setData(data.data);
        console.log(data.data);
    }
    useEffect(() => {
        getProductDetails();
    }, []);

    const productImages = data?.images.map((imageUrl) => {
        return {
            original: imageUrl,
            thumbnail: imageUrl,
            originalAlt: data.description,
            thumbnailAlt: data.description,
        };
    });

    return (
        <>
            {data ? (
                <>
                    <section>
                        <div className="container">
                            <div className="wrapper grid grid-cols-12 gap-6">
                                <div className="col-span-12 md:col-span-4">
                                    <div className="inner max-md:px-12">
                                        <ReactImageGallery
                                            items={productImages}
                                            showNav={false}
                                            showFullscreenButton={false}
                                            showPlayButton={false}
                                            autoPlay={true}
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-8 max-md:p-8 p-4">
                                    <header>
                                        <div className="flex justify-between items-center">
                                            <h2 className="font-bold text-3xl mb-1">
                                                Woman Shawl
                                            </h2>
                                            <BackButton />
                                        </div>
                                        <h3 className="text-primary font-semibold text-sm ml-1">
                                            {data.category.name}
                                        </h3>
                                        <div className="text-gray-500 ml-1 text-sm">
                                            <span>{data.brand?.name}</span>
                                            <span className="mx-1">|</span>
                                            <span className="text-green-500">
                                                Available
                                            </span>
                                        </div>
                                    </header>
                                    <p className="text-slate-500 my-4 ml-1">
                                        {data.description}
                                    </p>
                                    <footer className="ml-1">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <span className="mr-1">
                                                    <span
                                                        className={`mr-1 text-lg font-semibold text-primary ${
                                                            data.priceAfterDiscount
                                                                ? "text-sm line-through font-light text-slate-400"
                                                                : ""
                                                        }`}
                                                    >
                                                        ${data.price}
                                                    </span>
                                                    <span className="text-lg font-semibold text-primary">
                                                        $
                                                        {
                                                            data.priceAfterDiscount
                                                        }
                                                    </span>
                                                </span>
                                            </div>
                                            <div>
                                                <i className="fa-solid text-yellow-400 fa-star mr-1"></i>
                                                <span>
                                                    {data.ratingsAverage}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <button
                                                onClick={() => {
                                                    addProductToCart({
                                                        productId: data.id,
                                                    });
                                                }}
                                                className="btn-primary w-full group"
                                            >
                                                <i className="fa-solid fa-cart-plus mr-2 group-hover:animate-shake"></i>
                                                <span>ADD TO CART </span>
                                            </button>
                                        </div>
                                    </footer>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            ) : (
                <Loading />
            )}
        </>
    );
}
