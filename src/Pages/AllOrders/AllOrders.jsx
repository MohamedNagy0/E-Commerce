import { useContext, useEffect } from "react";
import { CartContext } from "../../Context/Cart.context";
import Loading from "../Loading/Loading";

export default function AllOrders() {
    const { getUserOrders, userOrders } = useContext(CartContext);

    useEffect(() => {
        getUserOrders();
    }, []);

    return (
        <>
            {userOrders ? (
                <section>
                    <header>
                        <h2>{userOrders.length}</h2>
                    </header>

                    <div className="flex items-center gap-3">
                        <div className="flex flex-col gap-4 items-center justify-center">
                            <div className="relative p-[11px] size-1 border  border-primary rounded-full  flex items-center justify-center after:w-[1px]  after:h-[17px] after:translate-x-1/2  after:bg-slate-400 after:absolute after:top-full after:right-1/2">
                                <div className=" size-1 p-[7px] rounded-full bg-primary"></div>
                            </div>
                            <div className="relative p-[11px] size-1 border  border-primary rounded-full  flex items-center justify-center after:w-[1px]  after:h-[17px] after:translate-x-1/2  after:bg-slate-400 after:absolute after:top-full after:right-1/2">
                                <div className=" size-1 p-[7px] rounded-full bg-primary"></div>
                            </div>
                            <div className="relative p-[11px] size-1 border  border-primary rounded-full  flex items-center justify-center after:w-[1px]  after:h-[17px] after:translate-x-1/2  after:bg-slate-400 after:absolute after:top-full after:right-1/2">
                                <div className=" size-1 p-[7px] rounded-full bg-primary"></div>
                            </div>
                            <div className="relative p-[11px] size-1 border  border-primary rounded-full  flex items-center justify-center after:w-[1px]  after:h-[17px] after:translate-x-1/2  after:bg-slate-400 after:absolute after:top-full after:right-1/2">
                                <div className=" size-1 p-[7px] rounded-full bg-primary"></div>
                            </div>
                            <div className=" p-[11px] size-1 border rounded-full flex items-center justify-center border-primary">
                                <div className=" size-1 p-[7px] rounded-full bg-primary"></div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h2>Ordered</h2>
                            <h2>Confirmed</h2>
                            <h2>Out for delivery</h2>
                            <h2>Delivered</h2>
                            <h2>Payed</h2>
                        </div>
                    </div>
                </section>
            ) : (
                <Loading />
            )}
        </>
    );
}
