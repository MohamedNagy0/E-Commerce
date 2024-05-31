import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../Pages/Loading/Loading";
import { Link } from "react-router-dom";

//https://ecommerce.routemisr.com/api/v1/categories

export default function CategorySilder() {
    const [AllCategories, setAllCategories] = useState(null);

    async function getCategories() {
        const options = {
            method: "GET",
            url: "https://ecommerce.routemisr.com/api/v1/categories",
        };
        let { data } = await axios.request(options);
        setAllCategories(data.data);
    }
    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
            {AllCategories ? (
                <section className="">
                    <div className="bg-light">
                        <swiper-container loop={true} slides-per-view={6}>
                            {AllCategories.map((obj) => {
                                return (
                                    <swiper-slide key={obj._id}>
                                        <Link to={`/categories/${obj._id}`}>
                                            <img
                                                src={obj.image}
                                                className="w-full h-72 object-cover cursor-pointer"
                                            />
                                        </Link>
                                        <h2 className="my-2 font-semibold text-center">
                                            {obj.name}
                                        </h2>
                                    </swiper-slide>
                                );
                            })}
                        </swiper-container>
                    </div>
                </section>
            ) : (
                <Loading />
            )}
        </>
    );
}
