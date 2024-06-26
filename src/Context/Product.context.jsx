import axios from "axios";
import React, { createContext, useContext, useState } from "react";

export const ProductContext = createContext("");

export default function ProductProvider({ children }) {
    const [allHomeProducts, setAllHomeProducts] = useState(null);
    const [AllCategories, setAllCategories] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [allProductsList, setAllProductsList] = useState(null);
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
    return (
        <>
            <ProductContext.Provider
                value={{
                    allHomeProducts,
                    getAllHomeProducts,
                    getCategories,
                    AllCategories,
                    isOpen,
                    setIsOpen,
                    getAllProducts,
                    allProductsList,
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
            </ProductContext.Provider>
        </>
    );
}
