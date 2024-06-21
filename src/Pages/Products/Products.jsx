import { useContext, useEffect } from "react";
import { CartContext } from "../../Context/Cart.context";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Loading from "../Loading/Loading";

export default function Products() {
    const { getAllProducts, allProductsList } = useContext(CartContext);

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <>
            {allProductsList ? (
                <div className="wrapper grid grid-cols-12 gap-5 max-md:px-16">
                    {allProductsList.map((obj) => {
                        return <ProductCard products={obj} key={obj.id} />;
                    })}
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
}
