import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/Cart.context";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Loading from "../Loading/Loading";
import formatMoney from "../../Helpers/helpers";

export default function Products() {
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState(true);
    const {
        getAllProducts,
        allProductsList,
        setProductLimitation,
        productLimitation,
        setRange,
        range,
        url,
        setPriceSort,
    } = useContext(CartContext);
    useEffect(() => {
        getAllProducts();
    }, [url]);

    return (
        <>
            {allProductsList ? (
                <>
                    {open ? (
                        <div
                            onClick={(e) => {
                                if (
                                    e.target ==
                                    document.querySelector(".filter")
                                ) {
                                    setOpen(!open);
                                }
                            }}
                            className="filter bg-black bg-opacity-25 absolute top-0 right-0   left-0 bottom-0 z-50"
                        >
                            <div className="bg-white flex flex-col gap-3 p-4 fixed top-0 left-0 w-[350px] h-full">
                                <header className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold  uppercase">
                                        <span className="relative after:bg-darkPrimary after:absolute after:top-full after:left-0 after:w-full after:h-[1px]">
                                            Sort
                                        </span>
                                    </h2>
                                    <i
                                        onClick={() => {
                                            setOpen(!open);
                                        }}
                                        className="fa-solid fa-xmark cursor-pointer"
                                    ></i>
                                </header>
                                <div>
                                    <h2 className="font-semibold">Price :</h2>
                                    <form>
                                        <div
                                            onClick={() => {
                                                setPriceSort("+");
                                                setChecked(true);
                                            }}
                                        >
                                            <label
                                                className="cursor-pointer flex gap-2 items-center"
                                                htmlFor="priceSmaller"
                                            >
                                                <span>smaller to Bigger</span>
                                                <span className="size-3 rounded-full p-[5px] flex justify-center items-center border border-primary ">
                                                    {checked ? (
                                                        <span className="size-1 rounded-full p-[3px] inline-block bg-primary"></span>
                                                    ) : (
                                                        ""
                                                    )}
                                                </span>
                                            </label>
                                            <input
                                                className="hidden"
                                                id="priceSmaller"
                                                type="radio"
                                                name="priceSort"
                                            />
                                        </div>
                                        <div
                                            onClick={() => {
                                                setPriceSort("-");
                                                setChecked(false);
                                            }}
                                        >
                                            <label
                                                className="cursor-pointer flex gap-2 items-center"
                                                htmlFor="priceBigger"
                                            >
                                                <span>Bigger to smaller</span>
                                                <span className="size-3 rounded-full p-[5px] border border-primary flex justify-center items-center">
                                                    {!checked ? (
                                                        <span className="size-1 rounded-full p-[3px] inline-block bg-primary"></span>
                                                    ) : (
                                                        ""
                                                    )}
                                                </span>
                                            </label>
                                            <input
                                                className="hidden"
                                                id="priceBigger"
                                                type="radio"
                                                name="priceSort"
                                            />
                                        </div>
                                    </form>
                                </div>

                                <h2 className="text-xl font-bold  uppercase">
                                    <span className="relative after:bg-darkPrimary after:absolute after:top-full after:left-0 after:w-full after:h-[1px]">
                                        Filter
                                    </span>
                                </h2>
                                <div className="flex flex-col gap-1">
                                    <h3 className="font-semibold">
                                        Price Range :
                                    </h3>
                                    <div>
                                        <input
                                            type="range"
                                            min={149}
                                            max={50000}
                                            value={range}
                                            onChange={(e) =>
                                                setRange(e.target.value)
                                            }
                                        />
                                    </div>

                                    <p className="flex items-center gap-1">
                                        <span className="text-sm">
                                            Max Salary is
                                        </span>
                                        <span>({formatMoney(range)})</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}

                    <h2 className="mb-6 p-2">
                        <span
                            onClick={() => {
                                setOpen(!open);
                            }}
                            className="text-primary px-6 py-2 border border-primary cursor-pointer"
                        >
                            Filter & Sort
                        </span>
                    </h2>

                    <div className="wrapper grid grid-cols-12 gap-5 max-md:px-16">
                        {allProductsList.map((obj) => {
                            return <ProductCard products={obj} key={obj.id} />;
                        })}
                    </div>
                    {productLimitation != 50 ? (
                        <div className="text-center mt-6">
                            <button
                                type="button"
                                onClick={() => {
                                    setProductLimitation(
                                        productLimitation + 10
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
                </>
            ) : (
                <Loading />
            )}
        </>
    );
}
