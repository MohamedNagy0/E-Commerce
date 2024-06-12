import onlinePaymentImg from "../../assets/images/online1.png";
import cashPaymentImg from "../../assets/images/cash1.png";
import axios from "axios";
import { Formik, useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { CartContext } from "../../Context/Cart.context";
import { userContext } from "../../Context/User.context";
import { Navigate, useNavigate } from "react-router-dom";

export default function CheckOut({ totalPrice }) {
    const navigate = useNavigate();
    const { cartProducts, setCartProducts } = useContext(CartContext);
    const { token, phone } = useContext(userContext);
    const [payment, setPayMent] = useState(null);

    // function clearInputs() {
    //     formik.values.shippingAddress.city = "";
    //     formik.values.shippingAddress.phone = "";
    //     formik.values.shippingAddress.details = "";
    // }

    // function changeTouchedValue() {
    //     formik.touched.shippingAddress.city = false;
    //     formik.touched.shippingAddress.details = false;
    //     formik.touched.shippingAddress.phone = false;
    // }

    async function createCashOrder(values) {
        let toastId;

        try {
            const options = {
                method: "POST",
                url: `https://ecommerce.routemisr.com/api/v1/orders/${cartProducts.data._id}`,
                data: {
                    values,
                },
                headers: { token },
            };

            toastId = toast.loading("Waiting...");

            const { data } = await axios.request(options);

            toast.dismiss(toastId);

            toast("Order Created Successfully", {
                duration: 2000,
                position: "top-center",
                icon: (
                    <span className="bg-primary size-1 p-3 rounded-full flex justify-center items-center">
                        <i className="fa-solid fa-check text-white"></i>
                    </span>
                ),
            });
            setCartProducts([]);
            navigate("/allorders");
        } catch (error) {}
    }

    async function createOnlineOrder(values) {
        let toastId;

        try {
            const options = {
                method: "POST",
                url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartProducts.data._id}?url=http://localhost:5173`,
                data: {
                    values,
                },

                headers: { token },
            };

            toastId = toast.loading("Waiting...");

            const { data } = await axios.request(options);
            toast.dismiss(toastId);
            if (data.status == "success") {
                window.location.href = data.session.url;
            }
        } catch (error) {}
    }

    // const formValidation = Yup.object({
    //     details: Yup.string()
    //         .required("Details is required")
    //         .min(3, "Details must more then 3 characters")
    //         .max(50, "Details must less then 50 characters"),
    //     phone: Yup.string()
    //         .required("Phone is required")
    //         .matches(/^01[0125][0-9]{8}$/, "Phone is invalid"),
    //     city: Yup.string()
    //         .required("City name is required")
    //         .min(3, "City name must more then 3 characters")
    //         .max(10, "City name must less then 11 characters"),
    // });

    // function formValidation(values) {
    //     const errors = {};

    //     if (!values.shippingAddress.details) {
    //         errors.details = "Details is required";
    //     } else if (values.shippingAddress.details.length < 3) {
    //         errors.details = "Details must more then 3 characters";
    //     } else if (values.shippingAddress.details.length > 50) {
    //         errors.details = "Details must less then 50 characters";
    //     }

    //     if (!values.shippingAddress.city) {
    //         errors.city = "City is required";
    //     } else if (values.shippingAddress.city.length < 3) {
    //         errors.city = "City must more then 3 characters";
    //     } else if (values.shippingAddress.city.length > 11) {
    //         errors.city = "City must less then 11 characters";
    //     }

    //     if (!values.shippingAddress.phone) {
    //         errors.phone = "phone is required";
    //     } else if (!/^01[0125][0-9]{8}$/.test(values.shippingAddress.phone)) {
    //         errors.phone = "Phone is invalid";
    //     }

    //     return errors;
    // }

    const formik = useFormik({
        initialValues: {
            shippingAddress: {
                details: "",
                phone: phone,
                city: "",
            },
        },

        // validationSchema: formValidation,

        // validate: formValidation,

        onSubmit: (values) => {
            if (payment == "online") {
                createOnlineOrder(values);
            } else {
                createCashOrder(values);
            }
        },
    });

    return (
        <>
            <div className="container  max-w-[535px] mt-12">
                <span className="block mt-12 mx-auto w-[200px] rounded-full h-[2px] bg-primary"></span>
                <h2 className="text-center my-2 font-bold text-lg Outfit">
                    Check Out
                </h2>
                <span className="block  mx-auto w-[200px] rounded-full h-[2px] bg-primary"></span>

                <form
                    id="checkOut"
                    className="w-full p-8 border border-gray-300 rounded-lg duration-700 target:border-darkPrimary   flex flex-col gap-6 mt-12"
                    onSubmit={formik.handleSubmit}
                >
                    <h3 className="font-bold text-lg -ml-2">Cart totals</h3>

                    <div className="flex  gap-4 items-center">
                        <span className="font-bold">SubTotal :</span>
                        <span className="text-primary font-semibold">
                            ${totalPrice}
                        </span>
                    </div>
                    <div>
                        <input
                            className="form-control w-full placeholder:text-sm"
                            autoComplete="off"
                            type="text"
                            placeholder="Enter Your City Name"
                            name="shippingAddress.city"
                            value={formik.values.shippingAddress.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>

                    {/* {formik.errors.city &&
                        formik.touched.shippingAddress.city && (
                            <p className="text-red-600 font-bold text-sm -my-3">
                                *{formik.errors.city}
                            </p>
                        )} */}

                    <div>
                        <input
                            className="form-control w-full placeholder:text-sm"
                            autoComplete="off"
                            type="tel"
                            placeholder="Enter Your Phone"
                            name="shippingAddress.phone"
                            value={formik.values.shippingAddress.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    {/* {formik.errors.phone &&
                        formik.touched.shippingAddress.phone && (
                            <p className="text-red-600 font-bold text-sm -my-3 ">
                                *{formik.errors.phone}
                            </p>
                        )} */}
                    <div>
                        <textarea
                            className="w-full min-h-20 form-control placeholder:text-sm"
                            placeholder="Details"
                            name="shippingAddress.details"
                            value={formik.values.shippingAddress.details}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    {/* {formik.errors.details &&
                        formik.touched.shippingAddress.details && (
                            <p className="text-red-600 font-bold text-sm -my-3 ">
                                *{formik.errors.details}
                            </p>
                        )} */}

                    <div className=" flex  gap-4 justify-between items-center">
                        <button
                            onClick={() => {
                                setPayMent("cash");
                            }}
                            type="submit"
                            className="btn-primary w-full flex py-1 text-nowrap items-center justify-center gap-2"
                        >
                            <img
                                className="size-10"
                                src={cashPaymentImg}
                                alt="Cash Payment Img"
                            />
                            <span> Cash Order</span>
                        </button>
                        <button
                            onClick={() => {
                                setPayMent("online");
                            }}
                            type="submit"
                            className="btn-primary flex py-1 text-nowrap items-center justify-center gap-2 hover:text-white hover:bg-primary bg-white text-darkPrimary w-full"
                        >
                            <img
                                className="size-10 object-cover"
                                src={onlinePaymentImg}
                                alt="Online Payment Img"
                            />
                            <span>Online Order</span>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
