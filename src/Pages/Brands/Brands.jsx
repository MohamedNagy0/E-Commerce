import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";

export default function Brands() {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [currentPageStyle, setCurrentPageStyle] = useState(true);

    async function getAllBrands() {
        try {
            const options = {
                method: "GET",
                url: `https://ecommerce.routemisr.com/api/v1/brands?page=${pageNum}`,
            };

            let { data } = await axios.request(options);
            setData(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllBrands();
    }, [pageNum]);
    return (
        <>
            {data ? (
                <>
                    <section className="wrapper grid grid-cols-12 gap-2 px-2 pb-16 ">
                        {data.data.map((brand) => (
                            <Link
                                to={`/brand/${brand._id}`}
                                key={brand._id}
                                className="col-span-4 md:col-span-3 lg:md:col-span-2 "
                            >
                                <img
                                    src={brand.image}
                                    alt={brand.name}
                                    className="size-36 rounded-full shadow-md p-2 cursor-pointer object-contain hover:scale-[1.2] hover:-translate-y-8 duration-500"
                                />
                            </Link>
                        ))}
                    </section>
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex justify-center items-center gap-4 pb-[320px] max-md:pb-[380px]">
                        <i
                            onClick={() => {
                                setPageNum(1);
                                setCurrentPageStyle(true);
                            }}
                            className="fa-solid ont-bold cursor-pointer text-primary fa-angle-left"
                        ></i>
                        <div className="flex items-center gap-1">
                            <span
                                onClick={() => {
                                    setCurrentPageStyle(true);
                                    setPageNum(1);
                                }}
                                className={`size-3 cursor-pointer border text-white ${
                                    currentPageStyle
                                        ? "bg-primary"
                                        : "bg-slate-300"
                                } rounded-md p-3 flex justify-center items-center`}
                            >
                                1
                            </span>

                            <span
                                onClick={() => {
                                    setCurrentPageStyle(false);
                                    setPageNum(2);
                                }}
                                className={`size-3 cursor-pointer border ${
                                    !currentPageStyle
                                        ? "bg-primary"
                                        : "bg-slate-300"
                                } text-white rounded-md p-3 flex justify-center items-center`}
                            >
                                2
                            </span>
                        </div>

                        <i
                            onClick={() => {
                                setPageNum(2);
                                setCurrentPageStyle(false);
                            }}
                            className="fa-solid ont-bold cursor-pointer text-primary fa-angle-right"
                        ></i>
                    </div>
                </>
            ) : (
                <Loading />
            )}
        </>
    );
}
