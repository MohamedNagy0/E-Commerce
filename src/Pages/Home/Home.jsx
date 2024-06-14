import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import ProductCard from "../../Components/ProductCard/ProductCard";
import HomeSilder from "../../Components/HomeSilder/HomeSilder";
import CategorySilder from "../../Components/CategorySilder/CategorySidler";
import Title from "../../Components/Title/Title";

export default function Home() {
    //https://ecommerce.routemisr.com/api/v1/products
    const [allProductsList, setAllProductsList] = useState(null);
    async function getAllProducts() {
        const options = {
            method: "GET",
            url: "https://ecommerce.routemisr.com/api/v1/products",
        };

        let { data } = await axios.request(options);
        console.log(data);
        setAllProductsList(data.data);
    }

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <>
            {allProductsList ? (
                <section>
                    <HomeSilder />

                    <CategorySilder />

                    <div id="products-section">
                        <Title name="Products" />
                    </div>

                    <div className="wrapper grid grid-cols-12 gap-5 max-md:px-16">
                        {allProductsList.map((obj, index) => {
                            return (
                                <ProductCard
                                    products={obj}
                                    index={index}
                                    key={obj.id}
                                />
                            );
                        })}
                    </div>
                </section>
            ) : (
                <Loading />
            )}
        </>
    );
}
