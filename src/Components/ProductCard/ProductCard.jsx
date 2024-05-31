export default function ProductCard({ products }) {
    let { category, ratingsAverage, price, images, title, ratingsQuantity } =
        products;
    return (
        <>
            <article className="productCard flex flex-col gap-3 col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 2xl:col-span-2 shadow-md rounded-md overflow-hidden">
                <header className="relative">
                    <img
                        src={images[0]}
                        className="w-full"
                        alt={ratingsQuantity.description}
                    />
                    <div className="layer opacity-0 hover:opacity-100 duration-300 flex justify-center items-center gap-4 absolute top-0 right-0 bottom-0 left-0 bg-slate-600 bg-opacity-25">
                        <div className="icon hover:-translate-y-1 duration-300 cursor-pointer bg-primary flex justify-center items-center size-12 bg-opacity-70 rounded-full text-white">
                            <i className="fa-regular fa-heart"></i>
                        </div>
                        <div className="icon hover:-translate-y-1 duration-300 cursor-pointer bg-primary flex justify-center items-center size-12 bg-opacity-70 rounded-full text-white">
                            <i className="fa-solid fa-cart-plus"></i>
                        </div>
                        <div className="icon hover:-translate-y-1 duration-300 cursor-pointer bg-primary flex justify-center items-center size-12 bg-opacity-70 rounded-full text-white">
                            <i className="fa-solid fa-eye"></i>
                        </div>
                    </div>
                </header>
                <footer className="py-6 px-5">
                    <header>
                        <h2 className="line-clamp-1 text-primary">{title}</h2>
                        <h2 className="line-clamp-1 font-semibold my-2">
                            {category.name}
                        </h2>
                    </header>
                    <footer className="flex justify-between items-center">
                        <span>{price} $</span>
                        <div className="rating flex gap-2 items-center">
                            <span>
                                <i className="fa-solid fa-star text-rating"></i>
                            </span>
                            <span>{ratingsAverage}</span>
                        </div>
                    </footer>
                </footer>
            </article>
        </>
    );
}
