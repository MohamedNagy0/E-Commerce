import { useContext, useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import ProductCard from "../../Components/ProductCard/ProductCard";
import HomeSilder from "../../Components/HomeSilder/HomeSilder";
import CategorySilder from "../../Components/CategorySilder/CategorySidler";
import Title from "../../Components/Title/Title";
import { CartContext } from "../../Context/Cart.context";

export default function Home() {
    const { getAllHomeProducts, allHomeProducts } = useContext(CartContext);

    useEffect(() => {
        getAllHomeProducts();
    }, []);

    return (
        <>
            {allHomeProducts ? (
                <section>
                    <HomeSilder />

                    <CategorySilder />

                    <div id="products-section">
                        <Title name="Products" />
                    </div>

                    <div className="wrapper grid grid-cols-12 gap-5 max-md:px-16">
                        {allHomeProducts.map((obj, index) => {
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
