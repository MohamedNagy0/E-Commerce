import image1 from "../../assets/images/product1.jpg";
import image2 from "../../assets/images/product2.jpg";
import image3 from "../../assets/images/product3.jpg";
import image4 from "../../assets/images/product4.jpg";
import image5 from "../../assets/images/product5.jpg";

export default function HomeSilder() {
    const silderImages = [
        { img: image1, id: 1 },
        { img: image2, id: 2 },
        { img: image3, id: 3 },
    ];
    return (
        <>
            <section className=" mb-6">
                <div className="wrapper grid grid-cols-12">
                    <div className="col-span-8">
                        <swiper-container
                            style={{ height: "100%" }}
                            loop={true}
                        >
                            {silderImages.map((obj) => {
                                return (
                                    <swiper-slide
                                        key={obj.id}
                                        style={{ height: "100%" }}
                                    >
                                        <img
                                            src={obj.img}
                                            className="w-full h-full object-cover cursor-grab"
                                        />
                                    </swiper-slide>
                                );
                            })}
                        </swiper-container>
                    </div>
                    <div className="col-span-4 bg-teal-700">
                        <div>
                            <img
                                src={image5}
                                className="w-full h-full"
                                alt=""
                            />
                        </div>
                        <div>
                            <img
                                src={image4}
                                className="w-full h-full"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
