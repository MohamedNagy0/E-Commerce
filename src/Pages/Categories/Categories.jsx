import { useContext, useEffect } from "react";
import { CartContext } from "../../Context/Cart.context";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";

export default function Categories() {
    const { getCategories, AllCategories } = useContext(CartContext);

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
            {AllCategories ? (
                <>
                    <h2 className="text-center border-b border-t py-2 text-primary text-lg">
                        Shop by category
                    </h2>
                    <section className="wrapper grid grid-cols-12 px-2">
                        {AllCategories.map((category) => (
                            <div
                                key={category._id}
                                className="flex flex-col  justify-center items-center p-4 col-span-4 md:col-span-3 lg:md:col-span-2 "
                            >
                                <Link
                                    to={`/category/${category._id}`}
                                    className="inline-block mb-6 size-[150px] rounded-xl shadow-md cursor-pointer  p-1"
                                >
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="size-full object-cover rounded-xl "
                                    />
                                    <h2 className="mt-3 font-semibold text-center">
                                        {category.name}
                                    </h2>
                                </Link>
                            </div>
                        ))}
                    </section>
                </>
            ) : (
                <Loading />
            )}
        </>
    );
}
