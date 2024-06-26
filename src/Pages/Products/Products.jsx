import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/Cart.context";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Loading from "../Loading/Loading";
import formatMoney from "../../Helpers/helpers";
import BackButton from "../../Components/BackButton/BackButton";
import filterImg from "../../assets/images/filter.png";

export default function Products() {
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState(true);
    const [searchInputValue, setSearchInputValue] = useState("");

    const {
        getAllProducts,
        allProductsList,
        setRange,
        range,
        allProductsUrl,
        setPriceSort,
        pageNum,
        setPageNum,
    } = useContext(CartContext);

    const filterData = allProductsList?.data.filter((item) =>
        item.title.toLowerCase().includes(searchInputValue.toLowerCase())
    );

    useEffect(() => {
        getAllProducts();
        setPriceSort("+");
    }, [allProductsUrl]);

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
                            className="filter bg-black bg-opacity-25 fixed top-0 right-0 left-0 bottom-0 z-50"
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
                                                <span className="size-3 rounded-full p-[6px] flex justify-center items-center border border-primary ">
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
                                                <span className="size-3 rounded-full p-[6px] border border-primary flex justify-center items-center">
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
                    <div className="sticky top-0 left-0 right-0 mt-[-80px]  pt-[70px] bg-light  px-4 pb-3 rounded-3xl bg- z-30 flex items-center justify-between mb-3 gap-6">
                        <BackButton />

                        <div className="relative">
                            <label
                                htmlFor="search"
                                className="absolute top-1/2 -translate-y-1/2 right-[15px]"
                            >
                                <i className="fa-solid fa-magnifying-glass text-slate-300 text-sm"></i>
                            </label>
                            <input
                                autoComplete="off"
                                id="search"
                                className="form-control rounded-3xl px-3 placeholder:text-sm"
                                type="text"
                                value={searchInputValue}
                                placeholder="Search"
                                onChange={(e) => {
                                    setSearchInputValue(e.target.value);
                                }}
                            />
                        </div>

                        <div
                            onClick={() => {
                                setOpen(!open);
                            }}
                            className="size-8 cursor-pointer"
                        >
                            <img
                                src={filterImg}
                                className="size-full"
                                alt="filter img"
                            />
                        </div>
                    </div>

                    <div className="wrapper mb-20 grid grid-cols-12 gap-5 max-md:px-16">
                        {filterData.map((obj) => (
                            <ProductCard products={obj} key={obj.id} />
                        ))}

                        {filterData.length != 0 ? (
                            <div className="absolute  bottom-0 left-1/2 w-[485px] -translate-x-1/2  pb-[320px] max-md:pb-[380px]  text-center flex justify-center gap-3  px-3 items-center">
                                {allProductsList.metadata.currentPage >= 3 ? (
                                    <button
                                        onClick={() => {
                                            setPageNum(1);
                                        }}
                                        className="flex items-center justify-center gap-3 text-primary"
                                    >
                                        <div className="flex items-center justify-center">
                                            <i className="fa-solid rotate-90 -mr-[5px] fa-minus"></i>
                                            <i className="fa-solid fa-angle-left"></i>
                                        </div>
                                        <span>Go to page 1</span>
                                    </button>
                                ) : (
                                    ""
                                )}

                                <div className="flex justify-center items-center gap-3">
                                    {allProductsList.metadata.currentPage !=
                                    1 ? (
                                        <button
                                            onClick={() => {
                                                setPageNum(pageNum - 1);
                                            }}
                                            className="btn-primary bg-white text-primary border hover:bg-white border-primary"
                                        >
                                            <i className="fa-solid fa-arrow-left-long"></i>
                                        </button>
                                    ) : (
                                        ""
                                    )}
                                    {allProductsList.metadata.currentPage !=
                                    6 ? (
                                        <button
                                            onClick={() => {
                                                setPageNum(pageNum + 1);
                                            }}
                                            className="btn-primary flex items-center justify-center gap-2"
                                        >
                                            <span>Next Page</span>
                                            <i className="fa-solid fa-arrow-right-long"></i>
                                        </button>
                                    ) : (
                                        ""
                                    )}
                                </div>

                                <p className="flex justify-center gap-1 items-center text-sm">
                                    <span>Page</span>
                                    <span>
                                        {allProductsList.metadata.currentPage}
                                    </span>
                                    <span>of</span>
                                    <span>
                                        {allProductsList.metadata.numberOfPages}
                                    </span>
                                </p>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </>
            ) : (
                <Loading />
            )}
        </>
    );
}
