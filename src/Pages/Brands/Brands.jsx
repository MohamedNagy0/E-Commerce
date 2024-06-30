import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";

export default function Brands() {
    const [data, setData] = useState(null);
    const [productLimitation, setProductLimitation] = useState(30);

    async function getAllBrands() {
        try {
            const options = {
                method: "GET",
                url: `https://ecommerce.routemisr.com/api/v1/brands?limit=${productLimitation}`,
            };

            let { data } = await axios.request(options);
            setData(data);
        } catch (error) {}
    }

    useEffect(() => {
        getAllBrands();
    }, [productLimitation]);
    return (
        <>
            {data ? (
                <>
                    <h2 className="text-center border-b border-t py-2 text-primary text-lg">
                        Shop by Brand
                    </h2>
                    {data.data.length == 0 ? (
                        <p className="text-center mt-8 text-xl">
                            <span className=" text-white   bg-yellow-400 py-3 px-5">
                                Sorry no more "Brands" right now
                            </span>
                        </p>
                    ) : (
                        ""
                    )}

                    <section className="wrapper grid grid-cols-12 gap-2 px-2 pb-16 mt-4 ">
                        {data.data.map((brand) => (
                            <Link
                                to={`/brand/${brand._id}`}
                                key={brand._id}
                                className="col-span-4 md:col-span-3 lg:md:col-span-2  flex items-center justify-center "
                            >
                                <img
                                    src={brand.image}
                                    alt={brand.name}
                                    className="size-36 bg-white rounded-full shadow-md p-2 cursor-pointer object-contain hover:scale-[1.2] hover:-translate-y-8 duration-500"
                                />
                            </Link>
                        ))}
                    </section>

                    {productLimitation == 30 && data.data.length != 0 ? (
                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => {
                                    setProductLimitation(
                                        productLimitation + 20
                                    );
                                }}
                                className="btn-primary text-sm"
                            >
                                Show More
                            </button>
                        </div>
                    ) : (
                        ""
                    )}

                    {productLimitation == 50 && data.data.length != 0 ? (
                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => {
                                    setProductLimitation(
                                        productLimitation - 20
                                    );
                                }}
                                className="btn-primary text-sm"
                            >
                                Show less
                            </button>
                        </div>
                    ) : (
                        ""
                    )}
                </>
            ) : (
                <Loading />
            )}
        </>
    );
}
