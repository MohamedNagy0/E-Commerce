import { useContext } from "react";
import { CartContext } from "../../Context/Cart.context";
import ProductCard from "../../Components/ProductCard/ProductCard";

export default function Products() {
    const { getAllProducts, allProductsList } = useContext(CartContext);

    return (
        <>
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
        </>
    );
}
