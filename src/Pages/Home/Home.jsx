import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import ProductCard from "../../Components/ProductCard/ProductCard";
import HomeSilder from "../../Components/HomeSilder/HomeSilder";
import CategorySilder from "../../Components/CategorySilder/CategorySilder";
import Title from "../../Components/Title/Title";

export default function Home() {
    //https://ecommerce.routemisr.com/api/v1/products
    const [productsArr, setProductsArr] = useState(null);
    async function getAllProducts() {
        const options = {
            method: "GET",
            url: "https://ecommerce.routemisr.com/api/v1/products",
        };

        let { data } = await axios.request(options);
        setProductsArr(data.data);
    }
    useEffect(() => {
        getAllProducts();
    }, []);
    return (
        <>
            {productsArr ? (
                <section>
                    <HomeSilder />

                    <CategorySilder />

                    <Title name="Products" />

                    <div className="wrapper grid grid-cols-12 gap-5">
                        {productsArr.map((obj, index) => {
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
