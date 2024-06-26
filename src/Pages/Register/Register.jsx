import axios from "axios";
import { Formik, useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../Context/User.context";

export default function Register() {
    const { setToken } = useContext(userContext);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);

    function clearInputs() {
        formik.values.email = "";
    }

    function changeTouchedValue() {
        formik.touched.name = false;
        formik.touched.email = false;
        formik.touched.phone = false;
        formik.touched.password = false;
        formik.touched.rePassword = false;
    }

    async function formSubmit(values) {
        let toastId;

        try {
            const options = {
                method: "POST",
                url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
                data: values,
            };

            toastId = toast.loading("Waiting...");

            const { data } = await axios.request(options);

            if (data.message == "success") {
                localStorage.setItem("token", data.token);
                setToken(localStorage.getItem("token"));
                toast.dismiss(toastId);
                toast(
                    <span className="text-darkPrimary ">
                        Welcome to Fresh Cart{" "}
                        <span className="font-bold">{data.user.name}</span>
                    </span>,
                    {
                        duration: 2000,
                        position: "top-center",
                        icon: (
                            <span className="bg-primary size-1 p-3 rounded-full flex justify-center items-center">
                                <i className="fa-solid fa-check text-white"></i>
                            </span>
                        ),
                    }
                );
                navigate("/");
            }
        } catch (error) {
            clearInputs();
            changeTouchedValue();
            toast.dismiss(toastId);
            toast.error(error.response.data.message);
            setErrorMessage(error.response.data.message);
        }
    }

    const formValidation = Yup.object({
        name: Yup.string()
            .required("name is required")
            .min(3, "name must more then 3 characters")
            .max(10, "name must less then 11 characters"),
        email: Yup.string()
            .required("email is required")
            .email("email is invalid"),
        phone: Yup.string()
            .required("phone is required")
            .matches(/^01[0125][0-9]{8}$/, "phone is invalid"),
        password: Yup.string()
            .required("password is required")
            .min(6, "password must be 6 characters")
            .max(6, "password must be 6 characters"),
        rePassword: Yup.string()
            .required("Re-Password is required")
            .oneOf([Yup.ref("password")], "Re-Password is invalid"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            rePassword: "",
        },
        validationSchema: formValidation,
        onSubmit: formSubmit,
    });

    return (
        <>
            <div className="container max-md:px-6 max-w-[535px]">
                <h2 className="text-primary font-bold text-3xl my-6 text-center">
                    <i className="fa-regular fa-user mr-2"></i>
                    <span>Register Now</span>
                </h2>
                <form
                    className="w-full flex flex-col gap-6"
                    onSubmit={formik.handleSubmit}
                >
                    <div>
                        <input
                            className="form-control w-full"
                            autoComplete="off"
                            type="text"
                            placeholder="Enter Your Name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    {formik.errors.name && formik.touched.name && (
                        <p className="text-red-600 font-bold text-sm -my-3">
                            *{formik.errors.name}
                        </p>
                    )}
                    <div>
                        <input
                            className="form-control w-full"
                            autoComplete="off"
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter Your Email"
                        />
                    </div>
                    {formik.errors.email && formik.touched.email && (
                        <p className="text-red-600 font-bold text-sm -my-3">
                            *{formik.errors.email}
                        </p>
                    )}
                    <div>
                        <input
                            className="form-control w-full"
                            autoComplete="off"
                            type="tel"
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter Your Phone"
                        />
                    </div>
                    {formik.errors.phone && formik.touched.phone && (
                        <p className="text-red-600 font-bold text-sm -my-3">
                            *{formik.errors.phone}
                        </p>
                    )}
                    <div>
                        <input
                            className="form-control w-full"
                            autoComplete="off"
                            type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter Your Password"
                        />
                    </div>
                    {formik.errors.password && formik.touched.password && (
                        <p className="text-red-600 font-bold text-sm -my-3">
                            *{formik.errors.password}
                        </p>
                    )}
                    <div>
                        <input
                            className="form-control w-full"
                            autoComplete="off"
                            type="password"
                            name="rePassword"
                            value={formik.values.rePassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter Your Re-Password"
                        />
                    </div>
                    {formik.errors.rePassword && formik.touched.rePassword && (
                        <p className="text-red-600 font-bold text-sm -mt-3">
                            *{formik.errors.rePassword}
                        </p>
                    )}
                    <div className="mt-2 flex flex-col gap-4 justify-between items-center">
                        <button type="submit" className="btn-primary w-full">
                            Sign up
                        </button>
                        <Link
                            to="/auth/login"
                            className="text-primary text-sm hover:underline"
                        >
                            Already have an account ?
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}
